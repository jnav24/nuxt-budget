const loginMutation = gql`
    mutation loginMutation($input: LoginInput!) {
        login(input: $input) {
            mfa
            success
        }
    }
`;

const logoutMutation = gql`
    mutation logoutMutation {
        logout {
            success
        }
    }
`;

export default function useGQLAuth() {
    const login = useMutation(loginMutation);

    const logout = useMutation(logoutMutation);

    return { login, logout };
}
