import { InputType, Field } from '@nestjs/graphql';
import { CreateCategorySublevel2Input } from './create-category-sublevel2.input';
import { IsString } from 'class-validator';

@InputType() 
export class CreateCategorySublevel1Input {
  @Field()
  @IsString({ message: 'Name must be a string value.' })
  name: string;

  @Field({ nullable: true })
  desc?: string;

  @Field(() => [CreateCategorySublevel2Input]) 
  categorySublevel2?: CreateCategorySublevel2Input[];
}