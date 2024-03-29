import { GraphQLError } from 'graphql';

export class ValidationException extends GraphQLError {
    code = 'Unprocessable Entity';
    status = 422;
    errors: Record<string, string> = {};

    constructor(message: string, errors: Record<string, string>) {
        super(message);
        this.name = 'ValidationException';
        this.extensions.errors = this.setErrors(errors);
    }

    // @todo I might not need this since I may bring in the errors in the appropriate type. think about it.
    setErrors(errors: Record<string, string>) {
        return errors;
    }
}
