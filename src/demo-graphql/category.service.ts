import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategorySublevel1Input } from './dto/action-dto/create-category-sublevel1.input'; // Adjust import path
import { CategorySublevel1DTO } from './dto/category-sublevel1.dto';
import { UpdateCategorySublevel1Input } from './dto/action-dto/update-category-sublevel1.dto';
import { ErrorType } from './helper/error-handle-helper';
import customError from './helper/error-handle-helper';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategoryWithSubcategories(
    data: CreateCategorySublevel1Input,
  ): Promise<CategorySublevel1DTO> {
    const { name, desc, categorySublevel2 = [] } = data;
    const category = await this.prisma.categorySublevel1.findUnique({
      where: { name },
      include: { categorySublevel2: true }, // Include related subcategories
    });
    if (category) {
      customError(
        `category name:${name} already exist`,
        ErrorType.ALREADY_EXISTS,
      );
    }
    const subcategoryNames = categorySublevel2.map((sub) => sub.name);
    const existingSubcategories = await this.prisma.categorySublevel2.findMany({
      where: {
        name: { in: subcategoryNames },
      },
    });

    if (existingSubcategories.length > 0) {
      const existingSubcategoryNames = existingSubcategories.map(
        (sub) => sub.name,
      );
      customError(
        `SubcategoryLevel2 names: ${existingSubcategoryNames.join(', ')} already exist`,
        ErrorType.ALREADY_EXISTS,
      );
    }
    return await this.prisma.categorySublevel1.create({
      data: {
        name,
        desc,
        categorySublevel2: {
          create: categorySublevel2.map(({ name, desc }) => ({
            name,
            desc: desc || null,
          })),
        },
      },
      include: {
        categorySublevel2: true,
      },
    });
  }

  async updateCategory(
    id: number,
    data: UpdateCategorySublevel1Input,
  ): Promise<CategorySublevel1DTO> {
    const category = await this.prisma.categorySublevel1.findUnique({
      where: { id },
    });

    if (!category) {
      customError(`Category with ID ${id} not found`, ErrorType.NOT_FOUND);
    }

    if (data.name) {
      const existingCategory = await this.prisma.categorySublevel1.findUnique({
        where: { name: data.name },
      });

      if (existingCategory && existingCategory.id !== id) {
        customError(`Category Name already exists`, ErrorType.ALREADY_EXISTS);
      }
    }

    const updatedCategory = await this.prisma.categorySublevel1.update({
      where: { id },
      data: {
        ...data,
        categorySublevel2: data.categorySublevel2
          ? {
              create: data.categorySublevel2.map(({ name, desc }) => ({
                name,
                desc: desc || null,
              })),
            }
          : undefined,
      },
      include: {
        categorySublevel2: {
          include: {
            categorySublevel1: true,
          },
        },
      },
    });

    return {
      id: updatedCategory.id,
      name: updatedCategory.name,
      desc: updatedCategory.desc,
      categorySublevel2: updatedCategory.categorySublevel2.map(
        ({ id, name, desc, categorySublevel1Id, categorySublevel1 }) => ({
          id,
          name,
          desc,
          categorySublevel1Id,
          categorySublevel1,
        }),
      ),
    };
  }

  async deleteCategory(id: number): Promise<CategorySublevel1DTO> {
    const category = await this.prisma.categorySublevel1.findUnique({
      where: { id },
      include: { categorySublevel2: true }, // Include related subcategories
    });

    if (!category) {
      customError(`Category with ID ${id} not found`, ErrorType.NOT_FOUND);
    }

    if (category.categorySublevel2.length > 0) {
      customError(
        `Cannot delete category with ID ${id} because it has related subcategories.`,
        ErrorType.CANNOT_DELETE,
      );
    }
    return this.prisma.categorySublevel1.delete({
      where: { id },
    });
  }
  async getAllCategories(): Promise<CategorySublevel1DTO[]> {
    const categories = await this.prisma.categorySublevel1.findMany({
      include: {
        categorySublevel2: true,
      },
    });
    if (!categories) {
      customError(`No categories in Database`, ErrorType.NOT_FOUND);
    }
    return categories;
  }

  async getCategoryWithSubcategories(
    id: number,
  ): Promise<CategorySublevel1DTO> {
    const category = await this.prisma.categorySublevel1.findUnique({
      where: { id },
      include: {
        categorySublevel2: true,
      },
    });
    if (!category) {
      customError(`No category Id:${id} in Database`, ErrorType.NOT_FOUND);
    }
    return category;
  }
}
