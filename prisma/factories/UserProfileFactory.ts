import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';
import { PrismaClient, UserProfile } from '@prisma/client';
import Factory, { FactoryContract } from './Factory';
import UserFactory from './UserFactory';

export default class UserProfileFactory
    extends Factory<Partial<UserProfile>>
    implements FactoryContract<Partial<UserProfile>>
{
    readonly tableName: keyof PrismaClient = 'userProfile';

    public definition(): Partial<UserProfile> {
        return {
            uuid: uuid(),
            user_id: (async () => (await new UserFactory().create()).id) as any,
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            image: '',
            created_at: new Date(),
            updated_at: new Date(),
        };
    }
}
