const LOGIN_MUTATION = gql`
    mutation loginMutation($input: LoginInput!) {
        login(input: $input) {
            mfa
            success
        }
    }
`;

const LOGOUT_MUTATION = gql`
    mutation logoutMutation {
        logout {
            success
        }
    }
`;

const FORGOT_PASSWORD_MUTATION = gql`
    mutation forgotPasswordMutation($input: ForgotPasswordInput!) {
        forgotPassword(input: $input) {
            success
        }
    }
`;

export default function useGQLAuth() {
    const forgotPassword = useMutation(FORGOT_PASSWORD_MUTATION);

    const login = useMutation(LOGIN_MUTATION);

    const logout = useMutation(LOGOUT_MUTATION);

    return { forgotPassword, login, logout };
}
