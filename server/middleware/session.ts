import { createSession, getAuthSession } from '~/utils/server/session';

export default defineEventHandler(async (event) => {
    await createSession(event);

    const authSession = await getAuthSession(event);

    if (getRequestURL(event).pathname.startsWith('/auth')) {
        if (authSession) {
            return sendRedirect(event, '/dashboard', 302);
        }
    }

    if (getRequestURL(event).pathname.startsWith('/dashboard')) {
        if (!authSession) {
            return sendRedirect(event, '/auth/login', 302);
        }

        if (!authSession.emailVerified) {
            return sendRedirect(event, '/auth/activate', 302);
        }

        return sendRedirect(event, authSession.redirectTo, 302);
    }
});
