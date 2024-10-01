import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateItemInput {
  @Field()
  name: string;

  @Field()
  categoryId: number; 

  @Field({ nullable: true })
  itemImg?: string;

  @Field({ nullable: true })
  desc?: string;

  @Field({ nullable: true })
  amount?: number;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  costPrice?: number;
}