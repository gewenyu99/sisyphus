import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { Client, Account, ID } from "appwrite";
const client = new Client();
const account = new Account(client);
console.log(import.meta.env.VITE_PROJECT_API_ENDPOINT)
client
    .setEndpoint(import.meta.env.VITE_PROJECT_API_ENDPOINT) // Your API Endpoint
    .setProject(import.meta.env.VITE_PROJECT) // Your project ID
;

export const useAppwriteStore = defineStore('appwrite', {
    state: () => {
      return {
        authState: 'none',
        user: null,
      }
    },
    getters: {

    },
    actions: {
      async login(email, password) {
        const res = await account.createEmailSession(email, password);
        this.user = res
        this.authState = 'complete'
      },
      async createAccount(email, password, name) {
        const res = await account.create(ID.unique(), email, password, name);
        this.login(email, password)
        this.authState = 'created'
      },
      async init() {
        const res = await account.get();
        if (res.$id) {
          this.user = res;
          this.authState = 'complete';
        }
      },
    },
})