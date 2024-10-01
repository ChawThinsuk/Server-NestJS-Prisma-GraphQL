import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { CategorySublevel1DTO } from './category-sublevel1.dto';

@ObjectType()
export class Item {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  categoryId: number;

  @Field({ nullable: true })
  itemImg?: string;

  @Field({ nullable: true })
  desc?: string;

  @Field(() => Int)
  amount: number;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  costPrice: number;

  @Field(() => CategorySublevel1DTO, { nullable: true }) 
  categorySubLevel1?: CategorySublevel1DTO;
}