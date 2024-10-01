import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { GraphQLError } from 'graphql';

@Catch(GraphQLError)
export class GraphqlExceptionFilter implements ExceptionFilter {
  catch(exception: GraphQLError, host: ArgumentsHost) {
    // Prevent logging by returning the error without logging it on the server
    const gqlHost = host.getArgByIndex(3);

    // You can control the response here, for example, by sending just the error message to the client
    return {
      message: exception.message,
      extensions: exception.extensions,
    };
  }
}
