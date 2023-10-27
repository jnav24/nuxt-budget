import { builder } from '../builder';

// Mutations
import AuthMutation from './mutations/AuthMutation';

// Queries
import UserQuery from './queries/UserQuery';

// Types
import AuthType from './types/AuthType';
import UserType from './types/UserType';
import UserProfileType from './types/UserProfileType';
import UserVehicleType from './types/UserVehicleType';

let pothos = builder;
const mutations = [AuthMutation];
const queries = [UserQuery];
const types = [AuthType, UserType, UserProfileType, UserVehicleType];
const schemas = [...types, ...queries, ...mutations];

for (const schema of schemas) {
    pothos = schema.setBuilder(pothos);
}

export default pothos;
