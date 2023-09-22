import { PrismaClient } from '@prisma/client';
import { BadRequestException } from '../../utils/exceptions';

const db = new PrismaClient();

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
        const factoryDefinition = this.definition();

        if (
            !this.tableName ||
            (!Object.keys(factoryDefinition).length &&
                !Object.keys(definition).length &&
                !Object.keys(this.state).length)
        ) {
            throw new BadRequestException('Ensure table name and/or definition are set');
        }

        const data = Array.from(new Array(this.count).keys()).map(() => ({
            ...factoryDefinition,
            ...definition,
            ...this.state,
        }));

        this.reset();

        if (data.length === 1) {
            return (db[this.tableName] as any).create(data[0]);
        }

        return (db[this.tableName] as any)?.createMany(data);
    }
}
