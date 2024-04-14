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
  'collection-' + COLLECTION,
  import.meta.env.VITE_DATABASES_ID,
  COLLECTION
)

export const useBoulders = defineStore(COLLECTION, () => {
  const parent = collectionStore();

  const boulders = computed(() => {
    return parent.documents;
  })
  const boulder = computed(() => (id: string) => {
    return parent.documents.find((boulder) => boulder.$id === id);
  });

  async function load() {
    return await parent.load();
  }
  async function add(boulder: Boulder) {
    await parent.create(boulder);
  }

  return { boulders, boulder, load, add };
});
