import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateItemInput {
  @Field({ nullable: true }) 
  name?: string;

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

  @Field({ nullable: true })
  categoryId?: number;
}
