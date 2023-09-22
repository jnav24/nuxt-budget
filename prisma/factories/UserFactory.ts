import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';
import { PrismaClient, User } from '@prisma/client';
// import { hashPassword } from '../../utils/server/encryption';
import Factory, { FactoryContract } from './Factory';

export default class UserFactory
    extends Factory<Partial<User>>
    implements FactoryContract<Partial<User>>
{
    readonly tableName: keyof PrismaClient = 'user';

    public definition(): Partial<User> {
        return {
            uuid: uuid(),
            email: faker.internet.email(),
            password: 'password',
            email_verified_at: null,
            two_factor_recovery_codes: null,
            two_factor_secret: null,
            remember_token: null,
            created_at: new Date(),
            updated_at: new Date(),
        };
    }

    public verified() {
        this.state.email_verified_at = new Date();
    }
}

// const userFactory = new UserFactory();
// userFactory.create<User>();
// userFactory.count(3).create<User>();
