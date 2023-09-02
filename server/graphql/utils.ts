import { IncomingHttpHeaders } from 'http';

export type GraphQLRequest = Request & {
    body?: any;
    headers: IncomingHttpHeaders;
    method: string;
    query: any;
};

export const isDevelopment = process.env.APP_ENV === 'development';

const isOnSameDomain = (req: GraphQLRequest) =>
    req.headers.get('host') === (process.env.APP_URL ?? '').replace(/^https?:\/\//, '');

export const isHttpMethod = (target: 'GET' | 'POST', subject: string): boolean => {
    return subject.toUpperCase() === target;
};

export const shouldRenderGraphiQL = (req: GraphQLRequest): boolean => {
    const { headers, method } = req;

    const accept =
        typeof headers.get === 'function' ? headers.get('accept') : (headers as any).accept;

    return (
        isHttpMethod('GET', method) &&
        accept?.includes('text/html') &&
        isDevelopment &&
        isOnSameDomain(req)
    );
};
