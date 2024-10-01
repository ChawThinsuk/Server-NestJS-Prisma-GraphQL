import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';
import { PrismaService } from 'src/prisma.service';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { CategorySublevel2Service } from './categorySublevel2.service';
import { CategorySublevel2Resolver } from './categorySublevel2.resolver';

@Module({
  providers: [
    ItemService,
    ItemResolver,
    CategoryResolver,
    CategoryService,
    CategorySublevel2Service,
    CategorySublevel2Resolver,
    PrismaService,
  ],
})
export class PostModule {}
