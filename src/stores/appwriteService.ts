import { defineStore } from 'pinia'
import { Client, Account, ID } from "appwrite";
const client = new Client();
const account = new Account(client);
client
  .setEndpoint(import.meta.env.VITE_PROJECT_API_ENDPOINT) // Your API Endpoint
  .setProject(import.meta.env.VITE_PROJECT) // Your project ID
;

interface Boulder {
  name: string;
  description: string;
  distance: number;
}

export const useAppwriteStore = defineStore('appwrite', {
  state: () => {
    return {
      user: null,
    }
  },
  getters: {
    isLoggedIn: (state) => {
      return state.user !== null;
    },
  },
  actions: {
    async login(email, password) {
      const res = await account.createEmailSession(email, password);
      this.user = await account.get();
      this.authState = 'complete'
    },
    async createAccount(email, password, name) {
      const res = await account.create(ID.unique(), email, password, name);
      await this.login(email, password)
      this.authState = 'created'
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
})

const getUser = async () => {
  try {
    const res = await account.get();
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}