import UserFactory from '../factories/UserFactory';

export default function UserSeeder() {
    new UserFactory().count(5).verified().create();
}
