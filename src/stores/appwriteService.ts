import { defineStore } from 'pinia';
import { Client, Account, ID, Databases, type Models } from "appwrite";
const client = new Client();
const account = new Account(client);
const database = new Databases(client);

interface Boulder {
  name: string;
  description: string;
  distance: number;
}

export const useAppwriteStore = defineStore('appwrite', {
  state: () => {
    return {
      user: null as Models.Account<Models.Preferences> | null,
      tasks: [] as any[], // Replace 'any' with the appropriate type for tasks
    };
  },
  getters: {
    isLoggedIn: (state) => {
      return state.user !== null;
    },
  },
  actions: {
    async login(email: string, password: string) {
      const res = await account.createEmailSession(email, password);
      this.user = await account.get();
      // Assuming 'authState' is a property in the state object
      this.authState = 'complete';
    },
    async createAccount(email: string, password: string, name: string) {
      const res = await account.create(ID.unique(), email, password, name);
      await this.login(email, password);
      // Assuming 'authState' is a property in the state object
      this.authState = 'created';
    },
    async init() {
      this.user = await getUser();
    },
    async createBoulder(name: string, description: string, distance: number) {
      await database.createDocument(
        ID.unique(),
        import.meta.env.VITE_DATABASES_ID, // Replace with the appropriate value
        'boulders',
        {
          name,
          description,
          distance
        } as Boulder
      );
    },
  },
});

const getUser = async () => {
  try {
    const res = await account.get();
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
