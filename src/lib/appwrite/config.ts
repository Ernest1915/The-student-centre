import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_URL,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
  cafeteriaCollectionId: import.meta.env.VITE_APPWRITE_CAFETERIAS_COLLECTION_ID,
  hostelsCollectionId: import.meta.env.VITE_APPWRITE_HOSTELS_COLLECTION_ID,
  universityCollectionId: import.meta.env.VITE_APPWRITE_UNIVERSITIES_COLLECTION_ID,
  locationCollectionId: import.meta.env.VITE_APPRIWTE_LOCATION_COLLECTION_ID
};

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
