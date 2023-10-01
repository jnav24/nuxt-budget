import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';
import { PrismaClient, UserVehicles } from '@prisma/client';
import Factory, { FactoryContract } from './Factory';
import UserFactory from './UserFactory';

export default class UserVehicleFactory
    extends Factory<Partial<UserVehicles>>
    implements FactoryContract<Partial<UserVehicles>>
{
    readonly tableName: keyof PrismaClient = 'userVehicles';

    public definition(): Partial<UserVehicles> {
        return {
            uuid: uuid(),
            user_id: (async () => (await new UserFactory().create()).id) as any,
            make: faker.vehicle.manufacturer(),
            model: faker.vehicle.model(),
            color: faker.color.human(),
            year: faker.date
                .birthdate({ min: 1970, max: 2023, mode: 'year' })
                .getFullYear()
                .toString(),
            license: faker.string.alphanumeric(6),
            active: false,
        };
    }

    public active() {
        this.state.active = true;
        return this;
    }
}
