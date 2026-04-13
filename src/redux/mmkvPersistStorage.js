import { storage } from "../utils/mmkvStorage";

export const reduxPersistStorage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },

  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },

  removeItem: (key) => {
    storage.delete(key);
    return Promise.resolve();
  },
};