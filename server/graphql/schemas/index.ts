import { builder } from '../builder';
// Mutations
import { default as AuthMutation } from './mutations/AuthMutation';

// Queries
import { default as UserQuery } from './queries/UserQuery';

// Types
import { default as AuthType } from './types/AuthType';
import { default as UserType } from './types/UserType';
import { default as UserProfileType } from './types/UserProfileType';

let pothos = builder;
const mutations = [AuthMutation];
const queries = [UserQuery];
const types = [AuthType, UserType, UserProfileType];
const schemas = [...types, ...queries, ...mutations];

for (const schema of schemas) {
    pothos = schema.setBuilder(pothos);
}

export default pothos;
