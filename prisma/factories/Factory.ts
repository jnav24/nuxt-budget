import type { PrismaClient } from '@prisma/client';

export default class Factory {
    protected tableName: keyof PrismaClient | null = null;
    protected state: any;

    public definition() {
        return this;
    }

    public create(data?: typeof this.state) {
        this.definition();
        console.log(amount);
        console.log(this.state);
        // amount = amount === 0 ? 1 : amount;
        // const iterate = Math.abs(amount);
        //
        // if (iterate > 1) {
        //     return db[Factory.tableName].create();
        // }
        //
        // const data = Factory.setMultipleRecords(iterate);
        // return db.[Factory.tableName].createMany(data);
    }

    protected static setMultipleRecords() {}
}
