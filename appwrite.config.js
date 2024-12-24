import { Client, Databases } from "appwrite";//I struggled to see the initial file that had appwrite configuration so I created this one 

// Initialize Appwrite Client
const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) 
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); 

// Initialize Appwrite Database
const databases = new Databases(client);

// Export Database ID and Collection IDs
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const cafeteriasCollectionId = import.meta.env.VITE_APPWRITE_CAFETERIAS_COLLECTION_ID;

export { client, databases, databaseId, cafeteriasCollectionId };
