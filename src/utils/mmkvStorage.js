import { createMMKV } from "react-native-mmkv";

/**
 * MMKV Instance (V4)
 */
export const storage = createMMKV();


/**
 * MMKV Storage Wrapper
 * Production Ready Utility
 */
const mmkvStorage = {

  /* ---------------------------- */
  /* SET ITEM                      */
  /* ---------------------------- */
  setItem: (key, value) => {
    try {
      const json =
        typeof value === "string"
          ? value
          : JSON.stringify(value);

      storage.set(key, json);

      return true;
    } catch (e) {
      console.error("MMKV setItem error:", e);
      return false;
    }
  },


  /* ---------------------------- */
  /* GET ITEM                      */
  /* ---------------------------- */
  getItem: (key) => {
    try {

      const val = storage.getString(key);

      if (!val) return null;

      try {
        return JSON.parse(val);
      } catch {
        return val;
      }

    } catch (e) {
      console.error("MMKV getItem error:", e);
      return null;
    }
  },


  /* ---------------------------- */
  /* REMOVE ITEM                   */
  /* ---------------------------- */
  removeItem: (key) => {
    try {
      storage.remove(key);
      return true;
    } catch (e) {
      console.error("MMKV removeItem error:", e);
      return false;
    }
  },


  /* ---------------------------- */
  /* BOOLEAN VALUE                 */
  /* ---------------------------- */
  getBoolean: (key) => {
    try {
      return storage.getBoolean(key);
    } catch (e) {
      return null;
    }
  },


  /* ---------------------------- */
  /* NUMBER VALUE                  */
  /* ---------------------------- */
  getNumber: (key) => {
    try {
      return storage.getNumber(key);
    } catch (e) {
      return null;
    }
  },


  /* ---------------------------- */
  /* GET ALL KEYS                  */
  /* ---------------------------- */
  getAllKeys: () => {
    try {
      return storage.getAllKeys();
    } catch (e) {
      console.error("MMKV getAllKeys error:", e);
      return [];
    }
  },


  /* ---------------------------- */
  /* GET ALL DATA                  */
  /* ---------------------------- */
  getAllData: () => {
    try {

      const keys = storage.getAllKeys();

      const allData = keys.reduce((acc, key) => {

        const value =
          storage.getString(key) ??
          storage.getBoolean(key) ??
          storage.getNumber(key) ??
          null;

        try {
          acc[key] = JSON.parse(value);
        } catch {
          acc[key] = value;
        }

        return acc;

      }, {});

      return allData;

    } catch (e) {
      console.error("MMKV getAllData error:", e);
      return null;
    }
  },


  /* ---------------------------- */
  /* STORAGE SIZE                  */
  /* ---------------------------- */
  getSize: () => {
    try {
      return storage.size;
    } catch (e) {
      console.error("MMKV getSize error:", e);
      return 0;
    }
  },


  /* ---------------------------- */
  /* CLEAR ALL                     */
  /* ---------------------------- */
  clearAll: () => {
    try {
      storage.clearAll();
      return true;
    } catch (e) {
      console.error("MMKV clearAll error:", e);
      return false;
    }
  },

};


export default mmkvStorage;