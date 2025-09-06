import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "users_cache";

export async function fetchUsers() {
  let users = [];
  let fromCache = false;

  try {
    // Try fetching fresh data
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error("Network response was not ok");

    users = await response.json();
    fromCache = false;
    console.log("response.......",JSON.stringify(users))
    console.log("response.......",JSON.stringify(users).length)

    // Save to AsyncStorage safely
    try {
      if (AsyncStorage && AsyncStorage.setItem) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      }
    } catch (storageError) {
      console.warn("Could not save users to AsyncStorage:", storageError.message);
    }
  } catch (networkError) {
    console.warn("Fetch failed, trying cache:", networkError.message);

    // Load from cache safely
    try {
      if (AsyncStorage && AsyncStorage.getItem) {
        const cached = await AsyncStorage.getItem(STORAGE_KEY);
        if (cached) {
          users = JSON.parse(cached);
          fromCache = true;
        }
      }
    } catch (storageError) {
      console.warn("Could not load users from AsyncStorage:", storageError.message);
    }
  }

  return { data: users, fromCache };
}
