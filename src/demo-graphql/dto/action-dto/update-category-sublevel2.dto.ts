import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCategorySublevel2Input {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    desc?: string;

    @Field({ nullable: true })
    categorySublevel1Id?: number;
}
