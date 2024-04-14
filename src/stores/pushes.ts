import { type Models } from '@/lib/appwrite'
import { defineStore } from 'pinia'
import { defineCollection } from './collection';

export type Pushes = Models.Document & {
  date: string;
  distance: number;
  boulderId: number;
}

const COLLECTION = 'pushes';

const collectionStore = defineCollection<Pushes>(COLLECTION, import.meta.env.VITE_DATABASES_ID, COLLECTION)

export const usePushes = defineStore({
  id: COLLECTION,
  state: () => ({
    pushes: [] as Pushes[],
  }),
  getters: {
    pushes: () => {
      const store = collectionStore();
      return store.documents;
    }
  },
  actions: {
    load() {
      const store = collectionStore();
      store.load();
    }
  },
})

