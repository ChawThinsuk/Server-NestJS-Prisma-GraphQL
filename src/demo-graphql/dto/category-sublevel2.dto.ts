import { ObjectType, Field } from '@nestjs/graphql';
import { CategorySublevel1DTO } from './category-sublevel1.dto';

@ObjectType()
export class CategorySublevel2DTO {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field({ nullable: true })
    desc?: string;

    @Field({ nullable: true })
    categorySublevel1Id?: number;
    
    @Field(() => CategorySublevel1DTO, { nullable: true })
    categorySublevel1?: CategorySublevel1DTO;
}