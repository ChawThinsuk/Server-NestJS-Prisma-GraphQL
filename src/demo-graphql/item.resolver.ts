import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Item } from './dto/item.dto'; // Adjust the import path as necessary
import { ItemService } from './item.service';
import { CreateItemInput } from './dto/action-dto/create-item.input';
import { UpdateItemInput } from './dto/action-dto/update-item-input.dto';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Mutation(() => Item)
  async createItem(@Args('input') input: CreateItemInput): Promise<Item> {
    return await this.itemService.createItem(input);
  }
  @Query(() => [Item])
  async getAllItems(): Promise<Item[]> {
    return this.itemService.getAllItems();
  }
  @Query(() => Item)
  async getItemById(@Args('id') id: number): Promise<Item> {
    return this.itemService.getItemById(id);
  }
  @Query(() => Item)
  async getItemByName(@Args('name') name: string): Promise<Item> {
    return this.itemService.getItemByName(name);
  }
  @Mutation(() => Item)
  async updateItem(
    @Args('id') id: number,
    @Args('data') data: UpdateItemInput,
  ): Promise<Item> {
    return this.itemService.updateItem(id, data);
  }

  @Mutation(() => Item)
  async deleteItem(@Args('id') id: number): Promise<Item> {
    return this.itemService.deleteItem(id);
  }
}
