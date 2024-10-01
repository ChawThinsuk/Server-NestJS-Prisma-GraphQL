import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateCategorySublevel2Input } from './dto/action-dto/update-category-sublevel2.dto';
import { CategorySublevel2DTO } from './dto/category-sublevel2.dto';
import { CreateCategorySublevel2Input } from './dto/action-dto/create-category-sublevel2.input';
import { ErrorType } from './helper/error-handle-helper';
import customError from './helper/error-handle-helper';

@Injectable()
export class CategorySublevel2Service {
  constructor(private prisma: PrismaService) {}

  async createCategory(
    data: CreateCategorySublevel2Input,
  ): Promise<CategorySublevel2DTO> {
    const { name, desc, categorySublevel1Id } = data;

    const categoryName = await this.prisma.categorySublevel2.findUnique({
      where: { name },
      include: { categorySublevel1: true },
    });
    if (categoryName) {
      customError(
        `categorySubLevel2 name:${name} already exist`,
        ErrorType.ALREADY_EXISTS,
      );
    }
    const sub1CategoryId = await this.prisma.categorySublevel1.findUnique({
      where: { id: categorySublevel1Id },
      include: { categorySublevel2: true },
    });
    if (!sub1CategoryId) {
      customError(
        `categorySubLevel1 Id:${categorySublevel1Id} not found`,
        ErrorType.NOT_FOUND,
      );
    }

    const createData: any = {
      name,
      desc: desc || null,
    };

    if (categorySublevel1Id) {
      createData.categorySublevel1 = { connect: { id: categorySublevel1Id } };
    }

    const createdCategory = await this.prisma.categorySublevel2.create({
      data: createData,
      include: {
        categorySublevel1: true,
      },
    });
    return createdCategory;
  }

  async getAllCategories(): Promise<CategorySublevel2DTO[]> {
    const categories = await this.prisma.categorySublevel2.findMany({
      include: {
        categorySublevel1: true,
      },
    });
    if (!categories) {
      customError(`No categoriesSubLevel2 in Database`, ErrorType.NOT_FOUND);
    }
    return categories;
  }

  async getCategoryById(id: number): Promise<CategorySublevel2DTO> {
    const category = await this.prisma.categorySublevel2.findUnique({
      where: { id },
    });
    if (!category) {
      customError(`Category with ID ${id} not found`, ErrorType.NOT_FOUND);
    }
    return category;
  }

  async updateCategory(
    id: number,
    data: UpdateCategorySublevel2Input,
  ): Promise<CategorySublevel2DTO> {
    const { name, desc, categorySublevel1Id } = data;
    const categoryId = await this.prisma.categorySublevel2.findUnique({
      where: { id },
    });

    if (!categoryId) {
      customError(`Category with ID ${id} not found`, ErrorType.NOT_FOUND);
    }
    const categoryName = await this.prisma.categorySublevel2.findUnique({
      where: { name },
    });
    if (categoryName) {
      customError(
        `categorySubLevel2 name:${name} already exist`,
        ErrorType.ALREADY_EXISTS,
      );
    }
    const sub1CategoryId = await this.prisma.categorySublevel1.findUnique({
      where: { id: categorySublevel1Id },
    });
    if (!sub1CategoryId) {
      customError(
        `categorySubLevel1 Id:${categorySublevel1Id} not found`,
        ErrorType.NOT_FOUND,
      );
    }

    return this.prisma.categorySublevel2.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async deleteCategory(id: number): Promise<CategorySublevel2DTO> {
    const category = await this.prisma.categorySublevel2.findUnique({
      where: { id },
    });
    console.log('category ', category);

    if (!category) {
      customError(
        `CategorySubLevel2 with ID ${id} not found`,
        ErrorType.NOT_FOUND,
      );
    }

    return await this.prisma.categorySublevel2.delete({
      where: { id },
    });
  }
}
