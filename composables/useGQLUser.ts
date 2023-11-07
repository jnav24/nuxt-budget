import { User } from '~/server/graphql/generated/types';

const USER_QUERY = gql`
    query UserQuery {
        getUser {
            id
            email
            isVerified
            profile {
                firstName
                lastName
                fullName
                image
                id
            }
            vehicles {
                id
                make
                model
                year
                color
                active
                isDeleted
            }
        }
    }
`;

export default function useGQLUser() {
    const user = useQuery<{ getUser: User }>(USER_QUERY);

    const userData = computed(() => user.result?.value?.getUser);

    return { user, userData };
}
