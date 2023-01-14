import { STATUS_CODES } from 'http';

export class BaseException extends Error {
    code = STATUS_CODES[503];
    status = 503;

    constructor(message: string) {
        super(message);
    }
}

export class ValidationException extends BaseException {
    errors: Record<string, string> = {};

    constructor(message: string, errors: Record<string, string>) {
        super(message);
        const status = 422;
        this.code = STATUS_CODES[status] ?? '';
        this.name = 'ValidationException';
        this.status = status;
        this.errors = this.setErrors(errors);
    }

    // @todo I might not need this since I may bring in the errors in the appropriate type. think about it.
    setErrors(errors: Record<string, string>) {
        return errors;
    }
}
