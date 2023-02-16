export const ucFirst = (val: string): string => val.charAt(0).toUpperCase() + val.slice(1);

export const toTitleCase = (value: string, casing = '-'): string => {
    return value
        .split(casing)
        .map((word) => ucFirst(word))
        .join(' ');
};
