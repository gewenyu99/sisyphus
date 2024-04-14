import { type Models } from '@/lib/appwrite'
import { defineStore } from 'pinia'
import { defineCollection } from './collection';
import { ref } from 'vue';
import { computed } from 'vue';

export type Boulder = Models.Document & {
  name: string;
  description: string;
  distance: number;
}

const COLLECTION = 'boulders';

const collectionStore = defineCollection<Boulder>(
  COLLECTION,
  import.meta.env.VITE_DATABASES_ID,
  COLLECTION
)

export const useBoulders = defineStore(COLLECTION, () => {
  const parent = collectionStore();
  const boulders = computed(() => {
    return parent.documents;
  })

  async function load() {
    await parent.load();
  }
  async function add(boulder: Boulder) {
    await parent.create(boulder);
  }

  return { boulders, load, add };
});
