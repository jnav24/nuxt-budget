const ucFirst = (val: string): string => val.charAt(0).toUpperCase() + val.slice(1);

const arrayColumn = <
    S extends keyof R,
    R extends Record<string, string | number | boolean | bigint>,
>(
    val: S,
    arr: Array<R>,
): Array<R[S]> => {
    return arr.map((obj: R) => obj[val] ?? null).filter((value: R[S]) => value);
};

const camelCase = (value: string): string => {
    const delimList: string[] = ['_', '-'];
    let result = value;

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

const toTitleCase = (value: string, casing = '-'): string => {
    return value
        .split(casing)
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

export { arrayColumn, camelCase, toTitleCase, sortObject, ucFirst, randomString, getErrorMessage };