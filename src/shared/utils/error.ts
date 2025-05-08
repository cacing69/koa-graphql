import { GraphQLError } from 'graphql'

export class InputError extends GraphQLError {
    constructor(message: string) {
        super(message, {
            extensions: { code: 'ERROR_INPUT_USER' }
        })
    }
}


export class NotFound extends GraphQLError {
    constructor(message: string) {
        super(message, {
            extensions: { code: 'NOT_FOUND' }
        })
    }
}
