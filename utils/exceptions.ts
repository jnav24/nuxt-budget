import { STATUS_CODES } from 'http';

export class BaseException extends Error {
    code = STATUS_CODES[503];
    status = 503;
}

export class BadRequestException extends BaseException {
    constructor(message: string) {
        super(message);
        const status = 400;
        this.code = STATUS_CODES[status] ?? '';
        this.name = 'BadRequestException';
        this.status = status;
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

export class UnauthorizedException extends BaseException {
    constructor(message: string) {
        super(message);
        const status = 401;
        this.code = STATUS_CODES[status] ?? '';
        this.name = 'UnauthorizedException';
        this.status = status;
    }
}

export class TooManyRequestsException extends BaseException {
    constructor(message: string) {
        super(message);
        const status = 429;
        this.code = STATUS_CODES[status] ?? '';
        this.name = 'TooManyRequestsException';
        this.status = status;
    }
}
