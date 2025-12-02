'use server'

import { signIn } from '@/auth'
import { redirect } from 'next/navigation'

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const email = formData.get('email')
        const password = formData.get('password')

        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false,
            })
        } catch (err) {
            if (err instanceof Error && err.message.includes('CredentialsSignin')) {
                return 'Identifiants invalides.'
            }
            // If it's a redirect error, ignore it and return success
            if (isRedirectError(err)) {
                return 'success'
            }
            throw err;
        }

        return 'success'
    } catch (error) {
        // If it's a redirect error, ignore it and return success
        if (isRedirectError(error)) {
            return 'success'
        }

        console.error('Login error:', error);

        if (error instanceof Error) {
            if (error.message.includes('CredentialsSignin')) {
                return 'Identifiants invalides.'
            }
        }

        return "Erreur: " + (error instanceof Error ? error.message : String(error))
    }
}

function isRedirectError(error: any) {
    return error && typeof error === 'object' && (
        error.digest?.startsWith('NEXT_REDIRECT') ||
        error.message?.includes('NEXT_REDIRECT')
    );
}
