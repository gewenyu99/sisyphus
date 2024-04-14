import { account, ID, type Models } from '@/lib/appwrite'
import type { register } from 'module';
import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null as null | Models.User<Models.Preferences>,
  }),
getters: {
    isLoggedIn(): boolean {
      return !!this.user;
    },
},
  actions: {
    async init() {
        try {
            this.user = await account.get();
        }
        catch (error) {
            this.user = null;
        }
    },
    async register(email: string, password: string, name: string | undefined) {
        await account.create(ID.unique(), email, password, name);
        await this.login(email, password);
    },
    async login(email: string, password: string) {
        await account.createEmailSession(email, password);
        this.user = await account.get();
    },
    async logout() {
        await account.deleteSession('current');
        this.user = null;
    },
  },
})