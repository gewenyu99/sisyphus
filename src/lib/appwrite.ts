import { Client, Account, Databases, ID, Role, Permission, Query } from "appwrite";

import { type Models } from "appwrite";

const client = new Client();
const account = new Account(client);
const databases = new Databases(client);
client
  .setEndpoint(import.meta.env.VITE_PROJECT_API_ENDPOINT) // Your API Endpoint
  .setProject(import.meta.env.VITE_PROJECT) // Your project ID
  ;
export { client, account, databases, ID, Role, Permission, Query };
export type { Models };
