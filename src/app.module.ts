import { Module } from '@nestjs/common';
// import { BookModule } from './book/book.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { PostModule } from './demo-graphql/demo.module';
import { join } from 'path';


@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      typePaths: ["./**/*.graphql"], 
      definitions: {
        path: join(process.cwd(), "src/generated/graphql.ts"),
      },
      sortSchema: true, 
      formatError: (error) => {
        const originalError = error.extensions?.originalError;
        if (!originalError) {
          return {
            message: error.message,
            code: error.extensions?.code,
          };
        }
        return {
          message: originalError.message,
          code: error.extensions?.code,
        };
      },
    }),
    PostModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
