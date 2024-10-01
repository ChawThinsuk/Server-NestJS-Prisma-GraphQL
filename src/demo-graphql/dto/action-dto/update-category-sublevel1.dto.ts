import { InputType, Field } from '@nestjs/graphql';
import { CreateCategorySublevel2Input } from './create-category-sublevel2.input';

@InputType()
export class UpdateCategorySublevel1Input {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    desc?: string;

    @Field(() => [CreateCategorySublevel2Input], { nullable: true }) 
    categorySublevel2?: CreateCategorySublevel2Input[]; 
}