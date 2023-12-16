import UserFactory from '../factories/UserFactory';
import UserProfileFactory from '../factories/UserProfileFactory';
import UserVehicleFactory from '../factories/UserVehicleFactory';

export default async function UserSeeder() {
    const user = await new UserFactory().verified().create();
    await new UserProfileFactory().create({ user_id: user.id });
    await new UserVehicleFactory().active().create({ user_id: user.id });
}
