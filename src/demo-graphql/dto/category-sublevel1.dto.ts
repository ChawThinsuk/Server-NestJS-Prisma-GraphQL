import { ObjectType, Field } from '@nestjs/graphql';
import { CategorySublevel2DTO } from './category-sublevel2.dto'; 
@ObjectType()
export class CategorySublevel1DTO {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  desc?: string;

  @Field(() => [CategorySublevel2DTO], { nullable: 'itemsAndList'  }) 
  categorySublevel2?: CategorySublevel2DTO[];
}