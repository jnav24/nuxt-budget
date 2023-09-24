import UserFactory from '../factories/UserFactory';

export default async function UserSeeder() {
    await new UserFactory().count(5).verified().create();
}
