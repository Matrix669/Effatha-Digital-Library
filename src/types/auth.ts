import type { User } from '@supabase/supabase-js'

export type UserRole = 'guest' | 'user' | 'admin'

export interface AuthContextType {
	user: User | null
	userRole: UserRole
	wasAdmin: boolean
	loading: boolean
	signInAsUser: (password: string) => Promise<boolean>
	signInAsAdmin: (password: string) => Promise<boolean>
	signOut: () => Promise<void>
}
