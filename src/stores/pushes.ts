import { type Models } from '@/lib/appwrite'
import { defineStore } from 'pinia'
import { defineCollection } from './collection';
import { computed } from 'vue';
import { getToday } from '@/lib/date';
import type { Boulder } from './boulders';

export type Pushes = Models.Document & {
  date: string;
  distance: number;
  boulderId: string;
}

const COLLECTION = 'pushes';

const collectionStore = defineCollection<Pushes>(
  'collection-' + COLLECTION,
  import.meta.env.VITE_DATABASES_ID,
  COLLECTION
)

export const usePushes = defineStore(COLLECTION, () => {
  const parent = collectionStore();
  const pushes = computed(() => (id: string) => {
    return parent.documents.filter((push) => push.boulderId === id) ?? {
      date: '',
      distance: 0,
      boulderId: '',
    };
  });

  async function load() {
    await parent.load();
  }
  async function push(distance: number, boulderId: number) {
    await parent.create({
      date: getToday().toISOString(),
      distance: distance,
      boulderId: boulderId,
    } as unknown as Pushes);
    load();
  }

  return { pushes, load, push };
});


