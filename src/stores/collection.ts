import { databases, ID, Query, type Models } from '@/lib/appwrite'
import { defineStore } from 'pinia'


export function defineCollection<Type>(
  name: string,
  database: string,
  collection: string,
) {
  type State = {
    documents: Type[]
  }
  return defineStore({
    id: name,
    state: (): State => {
      return {
        documents: [] as Type[],
      }
    },
    getters: {

    },
    actions: {
      async load() {
        try {
          const response = await this.list()
          this.documents = response.documents as Type[]
        }
        catch (error) {
          this.documents = []
        }
      },
      async get(id: string) {
        return databases.getDocument(
          database,
          collection,
          id
        )
      },
      async list(queries = [] as string[]) {
        return databases.listDocuments(
          database,
          collection,
          queries
        )
      },
      async create(data: any) {
        return databases.createDocument(
          database,
          collection,
          ID.unique(),
          data
        )
      },
      async update(id: string, data: any) {
        return databases.updateDocument(
          database,
          collection,
          id,
          data
        )
      },
      async all(queries = [] as string[], batchSize = 50): Promise<Type[]> {
        let documents = [] as Type[];
        let after = null;

        let response: any = await this.list(
          [
            ...queries,
            Query.limit(batchSize),
          ]
        );

        while (response.documents.length > 0) {
          documents = [...documents, ...response.documents];
          after = response.documents[response.documents.length - 1].$id;
          response = await this.list(
            [
              ...queries,
              Query.limit(batchSize),
              ...(after ? [Query.cursorAfter(after)] : [])
            ]);
        }

        return documents;
      }
    },
  })
}