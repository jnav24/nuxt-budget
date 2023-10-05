import { UserProfile, UserVehicle } from '@prisma/client';
import UserFactory from '../factories/UserFactory';
import UserProfileFactory from '../factories/UserProfileFactory';
import UserVehicleFactory from '../factories/UserVehicleFactory';

export default async function UserSeeder() {
    const user = await new UserFactory().verified().create();
    await new UserProfileFactory().create<UserProfile>({ user_id: user.id });
    await new UserVehicleFactory().active().create<UserVehicle>({ user_id: user.id });
}
