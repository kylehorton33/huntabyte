import { error } from '@sveltejs/kit'

export const actions = {
    updateEmail: async({ request, locals }) => {
        const data = Object.fromEntries(await request.formData())

        try {
            await locals.pb.collection('users').requestEmailChange(data.email)
        } catch (err) {
            throw error(err.status, err.message)
        }

        return {
            success: true
        }
    }
}