const lcFirst = (val: string): string => val.charAt(0).toLowerCase() + val.slice(1);

const ucFirst = (val: string): string => val.charAt(0).toUpperCase() + val.slice(1);

const trimSpaces = (val: string) => val.replace(/\s+/g, ' ').trim();

const arrayColumn = <
    S extends keyof R,
    R extends Record<string, string | number | boolean | bigint>,
>(
    val: S,
    arr: Array<R>,
): Array<R[S]> => {
    return arr.map((obj: R) => obj[val] ?? null).filter((value: R[S]) => value);
};

const toCamelCase = (value: string): string => {
    const delimList: string[] = ['_', '-', ' '];
    let result = value.replace(/\s+/g, ' ').trim();

    delimList.forEach((delim: string) => {
        if (result.includes(delim)) {
            const list: string[] = value.split(delim);

            const camel = list.map((word: string, index: number) => {
                if (index) {
                    word = ucFirst(word);
                }

                return word;
            });

            result = camel.join('');
        }
    });

    return result;
};

const convertToCase = (value: string, subKey: string) => {
    return lcFirst(trimSpaces(value))
        .replace(/[-_\s]/g, subKey)
        .replace(/[A-Z]/g, (str) => `${subKey}${str.toLowerCase()}`);
};

const toKebabCase = (value: string) => convertToCase(value, '-');

const toSnakeCase = (value: string) => convertToCase(value, '_');

const toPascalCase = (value: string) => ucFirst(toCamelCase(value));

const toTitleCase = (value: string): any => {
    return value
        .replace(/[A-Z]/g, (str) => ` ${str}`)
        .split(/[_\s-]/g)
        .map((word) => ucFirst(word))
        .join(' ');
};

const sortObject = <T extends Record<string, any>>(obj: T) => {
    const result = {} as T;
    const keys: Array<keyof T> = Object.keys(obj);
    keys.sort().forEach((key) => (result[key] = obj[key]));
    return result;
};

const randomString = (num: number) =>
    [...Array(num)].map(() => Math.random().toString(36)[2]).join('');

// @todo fix this
// const removeDuplicatesByUniqueKey = <K extends keyof T, T extends Record<string, any>>(
//     objArray: Array<T>,
//     uniqueId: K,
// ): Array<T> => {
//     return [...new Map(objArray.map((item) => [item[uniqueId], item])).values()];
// };

const getErrorMessage = (err: string | Error | unknown) => {
    if (err instanceof Error) {
        return err.message;
    }

    return err;
};

interface MatchType<T> {
    default: T;
    [key: string]: T;
}

const match = <T>(value: boolean | string | number, obj: MatchType<T>): T => {
    for (const [index, val] of Object.entries(obj)) {
        if (index === 'default') {
            return val;
        }

        for (const key of Object.values(index.split(','))) {
            if (value.toString() === key) {
                return val;
            }
        }
    }

    return obj.default;
};

export {
    arrayColumn,
    toCamelCase,
    toKebabCase,
    toPascalCase,
    toSnakeCase,
    toTitleCase,
    sortObject,
    ucFirst,
    randomString,
    getErrorMessage,
    match,
};
