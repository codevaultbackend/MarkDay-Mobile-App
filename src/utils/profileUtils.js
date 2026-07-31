import mmkvStorage from "./mmkvStorage";

export const updateUserStorage = (newUser = {}) => {
  try {
    const oldUser = mmkvStorage.getItem("user") || {};

    const mergedUser = {
      ...oldUser,
      ...newUser,
    };

    mmkvStorage.setItem("user", mergedUser);

    mmkvStorage.setItem("profile_last_sync", Date.now());
    mmkvStorage.setItem("profile_fetched", true);

    return mergedUser;
  } catch (e) {
    console.log("updateUserStorage error:", e);
    return null;
  }
};

export const shouldRefreshProfile = () => {
  try {
    const fetched = mmkvStorage.getBoolean("profile_fetched");
       const lastSync = mmkvStorage.getItem("profile_last_sync"); 
console.log(fetched ,"fetch")
console.log(lastSync ,"lastSync")
    if (!fetched) return true;

    // const lastSync = mmkvStorage.getItem("profile_last_sync");
console.log(lastSync ,"lastSync==")
    if (!lastSync) return true;

    return Date.now() - lastSync > 1000 * 60 * 15;
  } catch {
    return true;
  }
};