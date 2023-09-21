import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@prisma/client';
// import { hashPassword } from '../../utils/server/encryption';
import Factory from './Factory';
// import { formatDate, unix } from '../../utils/timestamp';

export default class UserFactory extends Factory {
    protected state: Omit<User, 'id'> = {} as Omit<User, 'id'>;

    public definition(data?: Partial<User>) {
        this.state = {
            uuid: uuidv4(),
            email: faker.internet.email(),
            password: 'password',
            email_verified_at: null,
            two_factor_recovery_codes: null,
            two_factor_secret: null,
            remember_token: null,
            created_at: new Date(),
            updated_at: new Date(),
            ...data,
        };

        return this;
    }

    public verified() {
        this.state.email_verified_at = new Date();
    }
}
