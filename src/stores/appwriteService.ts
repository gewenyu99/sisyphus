import { defineStore } from 'pinia'
import { Client, Account, Databases, ID, Role, Permission, Query } from "appwrite";

import { type Models } from "appwrite";

const client = new Client();
const account = new Account(client);
client
  .setEndpoint(import.meta.env.VITE_PROJECT_API_ENDPOINT) // Your API Endpoint
  .setProject(import.meta.env.VITE_PROJECT) // Your project ID
  ;
const databases = new Databases(client);

export interface Boulder {
  id: string
  name: string;
  description: string;
  distance: number;
  pushes: Push[];
}

export interface Push extends Models.Document {
  boulderId: string;
  date: string;
  distance: number;
}

export const useAppwriteStore = defineStore('appwrite', {
  state: () => {
    return {
      user: null as Models.User<Models.Preferences> | null,
      boulders: {} as Record<string, Boulder>,
      lastUpdated: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
      load: false,
    }
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
    },
    async createAccount(email: string, password: string, name: string) {
      const res = await account.create(ID.unique(), email, password, name);
      await this.login(email, password)
    },
    async init() {
      this.user = await this.getUser();
      await this.loadBoulders();
      this.load = true;
    },
    async loadBoulders() {
      if (!this.user) {
        return;
      }
      const boulders = await databases.listDocuments(
        import.meta.env.VITE_DATABASES_ID, // Replace with the appropriate value
        'boulders',
        [
          Query.orderAsc('$createdAt'),
          Query.limit(30)
        ],
      );

      const requests = boulders.documents.map((boulder: any) => {
        return paginateAll(databases, import.meta.env.VITE_DATABASES_ID, 'pushes', 100, [
          Query.orderAsc('$createdAt'),
          Query.equal('boulderId', boulder.$id),
          Query.greaterThan('date', new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString()),
        ]);
      });
      const pushes = await Promise.all(requests)
      this.$patch((state) => {
        state.boulders = boulders.documents.reduce((acc: Record<string, Boulder>, boulder: any, index: number) => {
          acc[boulder.$id] = {
            id: boulder.$id,
            name: boulder.name,
            description: boulder.description,
            distance: boulder.distance,
            pushes: padPushes(pushes[index]),
          };
          return acc;
        }, {} as Record<string, Boulder>);
        state.lastUpdated = new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })
      })
    },
    async getUser() {
      try {
        const res = await account.get();
        return res;
      } catch (error) {
        return null;
      }
    },
    async pushBoulder(boulderId: string, distance: number) {
      if (!this.user) {
        return;
      }
      await databases.createDocument(
        import.meta.env.VITE_DATABASES_ID, // Replace with the appropriate value
        'pushes',
        ID.unique(),
        {
          boulderId,
          date: new Date().toISOString(),
          distance,
        } as Push
      );
      await this.loadBoulders();
    },
    async createBoulder(name: string, description: string, distance: number) {
      if (!this.user) {
        return;
      }
      await databases.createDocument(
        import.meta.env.VITE_DATABASES_ID, // Replace with the appropriate value
        'boulders',
        ID.unique(),
        {
          name,
          description,
          distance,
        } as Boulder
      );
      await this.loadBoulders();
    },

    async seedData() {
      const currentDate = new Date();
      for (let i = 0; i < 366; i++) {
        const pastDate = incrementDate(currentDate, (0 - i));
        const data = {
          date: pastDate.toISOString(),
          distance: Math.floor(Math.random() * 5) + 1,
          boulderId: '6608df3feca8584efa1e',
        }
        if (data.distance > 3) {
          await databases.createDocument(
            import.meta.env.VITE_DATABASES_ID, // Replace with the appropriate value
            'pushes',
            ID.unique(),
            data
          );
        }
      }
    }
  },
});

async function paginateAll(
  databases: Databases,
  databaseId: string,
  collectionId: string,
  batchSize: number = 100,
  queries: string[] = [
    Query.orderAsc('$createdAt'),
  ]
): Promise<Push[]> {
  let documents: Push[] = [];
  let after = null;

  let response: any = await databases.listDocuments(
    databaseId,
    collectionId,
    [
      ...queries,
      Query.limit(batchSize),
    ]
  );

  while (response.documents.length > 0) {
    documents = [...documents, ...response.documents];
    after = response.documents[response.documents.length - 1].$id;
    response = await databases.listDocuments(
      databaseId,
      collectionId,
      [
        ...queries,
        Query.limit(batchSize),
        ...(after ? [Query.cursorAfter(after)] : [])
      ]
    );
  }

  return documents;
}

const padPushes = (pushes: Push[]) => {
  const pushArray = [] as Push[];
  const currentDate = new Date();
  for (let i = 0; i < 366; i++) {
    const pastDate = incrementDate(currentDate, (0 - i));
    pushArray.push({
      date: pastDate.toISOString(),
      distance: 0,
      boulderId: '',
    } as Push);
  }
  pushes.forEach((push) => {
    const pushDate = new Date(push.date);
    const foundPush = pushArray.find((push) => {
      return new Date(push.date).toDateString() === pushDate.toDateString();
    });
    if (foundPush) {
      foundPush.distance += push.distance;
    }
  });
  return pushArray;
};
const incrementDate = (date: string | number | Date, increment: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + increment);
  return newDate;
};