import { INewUser } from "@/types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      { ...user, balance: 0 }
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
}
export async function SignInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );
    return session;
  } catch (error) {
    console.log(error);
  }
}
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export async function SignOutAccount() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllDocuments() {
  try {
    const documents = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.packagesCollectionId
    );

    return documents.documents;
  } catch (error) {
    console.error("Error");
    return [];
  }
}

export async function updateUserInfo(user: {
  email: string;
  password?: string;
}) {
  try {
    const currentAccount = await account.get();
    console.log(currentAccount);

    if (!currentAccount) throw new Error("User not logged in");

    const updatedUserDocument = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      currentAccount.$id,
      {
        email: user.email,
        password: user.password, // Ensure this is securely handled
      }
    );

    const updatedUser = {
      id: currentAccount.$id,
      name: currentAccount.name,
      email: updatedUserDocument.email,
      imageUrl: updatedUserDocument.imageUrl || "",
      bio: updatedUserDocument.bio || "",
    };

    return updatedUser;
  } catch (error) {
    console.error("Error updating user info: ", error);
    return null;
  }
}
