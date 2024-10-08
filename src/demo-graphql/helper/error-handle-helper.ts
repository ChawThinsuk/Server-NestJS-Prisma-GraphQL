import {ApolloServer} from '@apollo/server'
import {startStandaloneServer} from '@apollo/server/standalone'
import { error } from 'console'
import { GraphQLError } from 'graphql'
import { ApolloServerErrorCode} from '@apollo/server/errors'

export const ErrorType = {
    BAD_USER_INPUT: {
        errorCode: ApolloServerErrorCode.BAD_USER_INPUT,
        errorStatus: 400,
    },
    BAD_REQUEST: {
        errorCode: ApolloServerErrorCode.BAD_REQUEST,
        errorStatus: 400
    },
    NOT_FOUND: {
        errorCode: 'NOT_FOUND',
        errorStatus: 404,
    },
    UNAUTHENTICATED: {
        errorCode: 'UNAUTHENTICATED',
        errorStatus: 401
    },
    ALREADY_EXISTS: {
        errorCode: 'ALREADY_EXISTS',
        errorStatus: 400
    },
    INTERNAL_SERVER_ERROR: {
        errorCode: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
        errorStatus: 500
    },
    CANNOT_DELETE: {
        errorCode: 'CANNOT_DELETE',
        errorStatus: 409, 
    }
}
export default (errorMessage,errorType) => {
    throw new GraphQLError(errorMessage, {
        extensions: {
            code: errorType.errorCode,
            http: {
                status: errorType.errorStatus
            }
        }
    })
}