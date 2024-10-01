import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateCategorySublevel1Input } from 'src/generated/graphql';
import { CategoryService } from './category.service'; // Adjust the import path as necessary
import { CategorySublevel1DTO } from './dto/category-sublevel1.dto'; // Adjust import path as necessary
import { UpdateCategorySublevel1Input } from './dto/action-dto/update-category-sublevel1.dto';
import { UpdateCategoryResponse } from './dto/action-dto/update-category-response.dto';

@Resolver(() => CategorySublevel1DTO)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => CategorySublevel1DTO)
  async createCategorySublevel1(
    @Args('input') data: CreateCategorySublevel1Input,
  ): Promise<CategorySublevel1DTO> {
    return this.categoryService.createCategoryWithSubcategories(data);
  }
  @Mutation(() => CategorySublevel1DTO)
  async updateCategory(
    @Args('id') id: number,
    @Args('input') data: UpdateCategorySublevel1Input,
  ): Promise<CategorySublevel1DTO> {
    return await this.categoryService.updateCategory(id, data);
  }

  @Mutation(() => CategorySublevel1DTO)
  async deleteCategory(@Args('id') id: number): Promise<CategorySublevel1DTO> {
    return await this.categoryService.deleteCategory(id);
  }

  @Query(() => [CategorySublevel1DTO])
  async getAllCategories(): Promise<CategorySublevel1DTO[]> {
    return this.categoryService.getAllCategories();
  }
  @Query(() => CategorySublevel1DTO)
  async getCategoryWithId(
    @Args('id') id: number,
  ): Promise<CategorySublevel1DTO> {
    return this.categoryService.getCategoryWithSubcategories(id);
  }
}
