import { GraphQLError } from 'graphql'

export class Error extends GraphQLError {
    constructor(message: string, code: string) {
        super(message, {
            extensions: { code }
        })
    }
}

export class InputError extends GraphQLError {
    constructor(errors: any) {
        super('Validation error', {
            extensions: {
                code: 'BAD_USER_INPUT',
                validationErrors: errors,
            },
        });
    }
}

export class InternalServerError extends GraphQLError {
    constructor(errors: any, code: string) {
        super('Internal Server Error', {
            extensions: {
                code,
                validationErrors: errors,
            },
        });
    }
}


export class NotFound extends GraphQLError {
    constructor(message: string) {
        super(message, {
            extensions: { code: 'NOT_FOUND' }
        })
    }
}
