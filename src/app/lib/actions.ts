'use server'

import { signIn } from '@/auth'


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        console.log('Authenticate action called with formData:', Object.fromEntries(formData));
        const result = await signIn('credentials', formData)
        console.log('SignIn result:', result);
    } catch (error) {
        if (error instanceof Error) {
            // NextAuth throws a redirect error on success, which we must rethrow
            if (error.message.includes('NEXT_REDIRECT')) {
                throw error;
            }

            if (error.message.includes('CredentialsSignin')) {
                return 'Identifiants invalides.'
            }
        }

        // If it's a redirect error (which might not be an instance of Error in some cases/versions), rethrow it
        if (isRedirectError(error)) {
            throw error;
        }

        return "Une erreur s'est produite."
    }
}

function isRedirectError(error: any) {
    return error && typeof error === 'object' && (
        error.digest?.startsWith('NEXT_REDIRECT') ||
        error.message?.includes('NEXT_REDIRECT')
    );
}
