import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategorySublevel2Input {
    @Field()
    name: string;

    @Field({ nullable: true })
    desc?: string;

    @Field({ nullable: true })
    categorySublevel1Id?: number;  
}