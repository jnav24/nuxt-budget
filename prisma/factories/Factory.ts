import { PrismaClient } from '@prisma/client';
import { BadRequestException } from '../../utils/exceptions';
import { error } from '../../utils/logger';

const db = new PrismaClient();

export interface FactoryContract<T> {
    readonly tableName: keyof PrismaClient;
    definition: () => T;
}

export default class Factory<T extends {}> {
    public tableName: keyof PrismaClient | null = null;
    protected iterate = 1;
    protected state = {} as T;

    private reset() {
        this.state = {} as T;
    }

    private validate(definition = {} as Partial<T>) {
        if (
            !this.tableName ||
            (!Object.keys(this.definition()).length &&
                !Object.keys(definition).length &&
                !Object.keys(this.state).length)
        ) {
            throw new BadRequestException('Ensure table name and/or definition are set');
        }
    }

    private setDefinitionData(definition = {} as Partial<T>) {
        const iterateList = Array.from(new Array(this.iterate).keys());

        return iterateList.map(async () => {
            const mergedData = {
                ...this.definition(),
                ...definition,
                ...this.state,
            };

            for (const [key, value] of Object.entries(mergedData)) {
                if (typeof value === 'function') {
                    mergedData[key as keyof Partial<T>] = await value();
                }
            }

            return mergedData;
        });
    }

    protected definition() {
        return this.state;
    }

    public count(iterate = 1) {
        this.iterate = iterate <= 0 ? 1 : iterate;
        return this;
    }

    public async create(definition = {} as Partial<T>) {
        this.validate(definition);
        const tableName = this.tableName as keyof PrismaClient;
        const data = await Promise.all(this.setDefinitionData(definition));
        this.reset();

        try {
            if (data.length === 1) {
                return (db[tableName] as any).create({ data: data[0] });
            }

            return (db[tableName] as any)?.createMany({ data });
        } catch (err) {
            error((err as any)?.message ?? err);
        }
    }
}
