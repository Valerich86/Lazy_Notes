import {
  Client,
  Account,
  ID,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.hedgehog.testapp",
  projectId: "6793b51a0005db5e8db6",
  databaseId: "6793bd4b0004436103d4",
  userCollectionId: "6793bd8d0021dcab7c8a",
  notesCollectionId: "67a8693100058c88c878",
  imagesCollectionId: "67add5ff003e24d45654",
  listsCollectionId: "67ab7a6400339a1beb24",
  todosCollectionId: '67b875cb001b61745165',
  storageId: "6793c286002c25f316b7",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  notesCollectionId,
  imagesCollectionId,
  listsCollectionId,
  todosCollectionId,
  storageId,
} = config;

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        email: email,
        username: username,
        accountId: newAccount.$id,
      }
    );
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getNotes = async (userId, sortedBy) => {
  try {
    let result;
    if (sortedBy === "title") {
      result = await databases.listDocuments(databaseId, notesCollectionId, [
        Query.equal("creator", userId),
        Query.orderAsc(sortedBy),
      ]);
    } else {
      result = await databases.listDocuments(databaseId, notesCollectionId, [
        Query.equal("creator", userId),
        Query.orderDesc(sortedBy),
      ]);
    }
    return result.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchNotes = async (userId, query) => {
  try {
    const result = await databases.listDocuments(
      databaseId,
      notesCollectionId,
      [Query.equal("creator", userId), Query.search("title", query)]
    );
    return result.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getNote = async (noteId) => {
  try {
    const result = await databases.listDocuments(
      databaseId,
      notesCollectionId,
      [Query.equal("$id", noteId)]
    );
    return result.documents[0];
  } catch (error) {
    throw new Error(error);
  }
};

export const createNote = async (form) => {
  try {
    await databases.createDocument(databaseId, notesCollectionId, ID.unique(), {
      title: form.title,
      text: form.text,
      color: form.color,
      creator: form.userId,
    });
  } catch (error) {
    throw new Error();
  }
};

export const updateNote = async (form, noteId) => {
  try {
    await databases.updateDocument(databaseId, notesCollectionId, noteId, {
      title: form.title,
      text: form.text,
      color: form.color,
    });
  } catch (error) {
    throw new Error();
  }
};

export const deleteNote = async (noteId) => {
  try {
    await databases.deleteDocument(databaseId, notesCollectionId, noteId);
  } catch (error) {
    throw new Error();
  }
};

export const getLists = async (userId, sortedBy) => {
  try {
    let result;
    if (sortedBy === "title") {
      result = await databases.listDocuments(databaseId, listsCollectionId, [
        Query.equal("creator", userId),
        Query.orderAsc(sortedBy),
      ]);
    } else {
      result = await databases.listDocuments(databaseId, listsCollectionId, [
        Query.equal("creator", userId),
        Query.orderDesc(sortedBy),
      ]);
    }
    return result.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchLists = async (userId, query) => {
  try {
    const result = await databases.listDocuments(
      databaseId,
      listsCollectionId,
      [Query.equal("creator", userId), Query.search("title", query)]
    );
    return result.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getList = async (listId) => {
  try {
    const result = await databases.listDocuments(
      databaseId,
      listsCollectionId,
      [Query.equal("$id", listId)]
    );
    return result.documents[0];
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCrossedOut = async (listId, crossedOutList) => {
  try {
    await databases.updateDocument(databaseId, listsCollectionId, listId, {
      crossedOut: crossedOutList,
    });
  } catch (error) {
    throw new Error();
  }
};

export const createList = async (form) => {
  try {
    await databases.createDocument(databaseId, listsCollectionId, ID.unique(), {
      title: form.title,
      list: form.list,
      color: form.color,
      creator: form.userId,
    });
  } catch (error) {
    throw new Error();
  }
};

export const updateList = async (listId, newList) => {
  try {
    await databases.updateDocument(databaseId, listsCollectionId, listId, {
      list: newList,
    });
  } catch (error) {
    throw new Error();
  }
};

export const deleteList = async (listId) => {
  try {
    await databases.deleteDocument(databaseId, listsCollectionId, listId);
  } catch (error) {
    throw new Error();
  }
};

export const uploadFile = async (file) => {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };
  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );
    const fileUrl = storage.getFilePreview(
      storageId,
      uploadedFile.$id,
      2000,
      2000,
      "top",
      100
    );
    return fileUrl;
  } catch (error) {
    throw new Error();
  }
};

export const setImage = async (form) => {
  try {
    const [url] = await Promise.all([uploadFile(form.image)]);

    const newImage = await databases.createDocument(
      databaseId,
      imagesCollectionId,
      ID.unique(),
      {
        title: form.title,
        image: url,
        creator: form.userId,
        color: form.color,
      }
    );
    return newImage;
  } catch (error) {
    throw new Error();
  }
};

export const getImages = async (userId, sortedBy) => {
  try {
    let result;
    if (sortedBy === "title") {
      result = await databases.listDocuments(databaseId, imagesCollectionId, [
        Query.equal("creator", userId),
        Query.orderAsc(sortedBy),
      ]);
    } else {
      result = await databases.listDocuments(databaseId, imagesCollectionId, [
        Query.equal("creator", userId),
        Query.orderDesc(sortedBy),
      ]);
    }
    return result.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchImages = async (userId, query) => {
  try {
    const result = await databases.listDocuments(
      databaseId,
      imagesCollectionId,
      [Query.equal("creator", userId), Query.search("title", query)]
    );
    return result.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getImage = async (imageId) => {
  try {
    const result = await databases.listDocuments(
      databaseId,
      imagesCollectionId,
      [Query.equal("$id", imageId)]
    );
    return result.documents[0];
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteImage = async (imageId) => {
  try {
    await databases.deleteDocument(databaseId, imagesCollectionId, imageId);
  } catch (error) {
    throw new Error();
  }
};

export const getTodos = async (userId, atr, val) => {
  try {
    let result = await databases.listDocuments(databaseId, todosCollectionId, [
      Query.equal("creator", userId),
      Query.orderAsc("completeBefore"),
      Query.orderAsc("priority"),
      atr ?
      Query.equal(atr, val) :
      Query.limit(7)
    ]);
    return result.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllTodos = async (userId) => {
  try {
    let result = await databases.listDocuments(databaseId, todosCollectionId, [
      Query.equal("creator", userId),
    ]);
    return result.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTodo = async (todoId) => {
  try {
    await databases.deleteDocument(databaseId, todosCollectionId, todoId);
  } catch (error) {
    throw new Error();
  }
};

export const getDatesWithHighPriorityTodos = async (userId) => {
  let highPriority = []
  try {
    let result = await databases.listDocuments(databaseId, todosCollectionId, [
      Query.equal("creator", userId),
      Query.equal('priority', 'Высокий') 
    ]);
    result.documents.forEach(element => {
      for (key in element) {
        if (key === 'completeBefore')
          highPriority.push(element[key])
      }
    });
    return highPriority;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllDatesWithTodos = async (userId) => {
  let allDates = []
  try {
    let result = await databases.listDocuments(databaseId, todosCollectionId, [
      Query.equal("creator", userId),
    ]);
    result.documents.forEach(element => {
      for (key in element) {
        if (key === 'completeBefore')
          allDates.push(element[key])
      }
    });
    return allDates;
  } catch (error) {
    throw new Error(error);
  }
};

export const createTodo = async (userId, priority, category, text, completeBefore) => {
  try {
    await databases.createDocument(databaseId, todosCollectionId, ID.unique(), {
      category: category,
      text: text,
      priority: priority,
      completeBefore: completeBefore,
      creator: userId,
    });
  } catch (error) {
    throw new Error();
  }
};


