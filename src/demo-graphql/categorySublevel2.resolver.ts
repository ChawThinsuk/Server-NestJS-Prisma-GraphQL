import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategorySublevel2Service } from './categorySublevel2.service';
import { CategorySublevel2DTO } from './dto/category-sublevel2.dto';
import { CreateCategorySublevel2Input } from './dto/action-dto/create-category-sublevel2.input';
import { UpdateCategorySublevel2Input } from './dto/action-dto/update-category-sublevel2.dto';

@Resolver(() => CategorySublevel2DTO)
export class CategorySublevel2Resolver {
  constructor(private readonly categoryService: CategorySublevel2Service) {}

  @Query(() => [CategorySublevel2DTO])
  async getAllCategorySublevel2(): Promise<CategorySublevel2DTO[]> {
    return this.categoryService.getAllCategories();
  }

  @Query(() => CategorySublevel2DTO)
  async getCategorySublevel2ById(
    @Args('id') id: number,
  ): Promise<CategorySublevel2DTO> {
    return this.categoryService.getCategoryById(id);
  }

  @Mutation(() => CategorySublevel2DTO)
  async createCategorySublevel2(
    @Args('input') input: CreateCategorySublevel2Input,
  ): Promise<CategorySublevel2DTO> {
    return this.categoryService.createCategory(input);
  }

  @Mutation(() => CategorySublevel2DTO)
  async updateCategorySublevel2(
    @Args('id') id: number,
    @Args('data') data: UpdateCategorySublevel2Input,
  ): Promise<CategorySublevel2DTO> {
    return this.categoryService.updateCategory(id, data);
  }
  @Mutation(() => CategorySublevel2DTO)
  async deleteCategorySublevel2(
    @Args('id') id: number,
  ): Promise<CategorySublevel2DTO> {
    return this.categoryService.deleteCategory(id);
  }
}
