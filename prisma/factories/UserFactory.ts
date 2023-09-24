import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';
import { PrismaClient, User } from '@prisma/client';
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
            password: hashSync('password', 10),
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
        return this;
    }
}
