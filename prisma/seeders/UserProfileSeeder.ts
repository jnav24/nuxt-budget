import UserProfileFactory from '../factories/UserProfileFactory';

export default async function UserProfileSeeder() {
    await new UserProfileFactory().create();
}
