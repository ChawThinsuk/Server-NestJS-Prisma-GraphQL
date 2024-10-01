import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Item } from './dto/item.dto';
import { UpdateItemInput } from './dto/action-dto/update-item-input.dto';
import { CreateItemInput } from './dto/action-dto/create-item.input';
import { ErrorType } from './helper/error-handle-helper';
import customError from './helper/error-handle-helper';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async createItem(data: CreateItemInput): Promise<Item> {
    const { categoryId, itemImg, desc, amount, price, costPrice, name } = data;
    const category = await this.prisma.categorySublevel1.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      customError('Category not found', ErrorType.NOT_FOUND);
    }
    const existingItem = await this.prisma.item.findUnique({
      where: { name },
    });

    if (existingItem) {
      customError(
        'An item with this name already exists. Please choose a different name.',
        ErrorType.ALREADY_EXISTS,
      );
    }
    return await this.prisma.item.create({
      data: {
        name,
        amount,
        price,
        costPrice,
        itemImg,
        desc,
        categoryId,
      },
    });
  }

  async getAllItems(): Promise<Item[]> {
    const items = this.prisma.item.findMany({
      include: {
        categorySubLevel1: {
          include: {
            categorySublevel2: true,
          },
        },
      },
    });
    if (!items) {
      customError(`No item in Database`, ErrorType.NOT_FOUND);
    }
    return items;
  }
  async getItemById(id: number): Promise<Item> {
    const item = await this.prisma.item.findUnique({
      where: { id },
      include: { categorySubLevel1: true },
    });

    if (!item) {
      customError(`Item with ID ${id} not found`, ErrorType.NOT_FOUND);
    }

    return item;
  }
  async getItemByName(name: string): Promise<Item> {
    const item = await this.prisma.item.findUnique({
      where: { name },
      include: { categorySubLevel1: true },
    });

    if (!item) {
      customError(`Item with Name ${name} not found`, ErrorType.NOT_FOUND);
    }

    return item;
  }

  async updateItem(id: number, data: UpdateItemInput): Promise<Item> {
    const item = await this.prisma.item.findUnique({
      where: { id },
    });
    if (!item) {
      customError(`Item with ID ${id} not found`, ErrorType.NOT_FOUND);
    }
    return this.prisma.item.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async deleteItem(id: number): Promise<Item> {
    const item = await this.prisma.item.findUnique({
      where: { id },
    });
    if (!item) {
      customError(`Item with ID ${id} not found`, ErrorType.NOT_FOUND);
    }
    return this.prisma.item.delete({
      where: { id },
    });
  }
}
