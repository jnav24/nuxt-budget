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

const forgotPasswordMutation = gql`
    mutation forgotPasswordMutation($input: ForgotPasswordInput!) {
        forgotPassword(input: $input) {
            success
        }
    }
`;

export default function useGQLAuth() {
    const forgotPassword = useMutation(forgotPasswordMutation);

    const login = useMutation(loginMutation);

    const logout = useMutation(logoutMutation);

    return { forgotPassword, login, logout };
}
