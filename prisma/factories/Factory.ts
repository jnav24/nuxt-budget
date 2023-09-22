import type { PrismaClient } from '@prisma/client';

export interface FactoryContract<T> {
    readonly tableName: keyof PrismaClient;
    definition: () => T;
}

export default class Factory<T> {
    public tableName: keyof PrismaClient | null = null;
    protected iterate = 1;
    protected state = {} as T;

    private reset() {
        this.state = {} as T;
    }

    protected definition() {
        return this.state;
    }

    public count(iterate = 1) {
        this.iterate = iterate <= 0 ? 1 : iterate;
        return this;
    }

    public create<T>(definition = {} as T) {
        const data = Array.from(new Array(this.count).keys()).map(() => ({
            ...this.definition(),
            ...definition,
            ...this.state,
        }));
        this.reset();

        if (data.length === 1) {
            return {};
        }

        return {};
    }
}
