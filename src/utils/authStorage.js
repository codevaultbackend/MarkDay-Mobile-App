import mmkvStorage from  './mmkvStorage'
import {store} from '../redux/store'
import { Alert } from 'react-native';
import { baseApi } from '../redux/api/baseApi';
const USER_KEY = "user";

export const authChangeListeners = [];

export const triggerAuthChanged = () => {
  authChangeListeners.forEach(cb => cb());
};

export const onAuthChanged = (cb) => {
  authChangeListeners.push(cb);

  return () => {
    const index = authChangeListeners.indexOf(cb);
    if (index > -1) {
      authChangeListeners.splice(index, 1);
    }
  };
};


/* SAVE AUTH */
export async function saveAuth({ user }) {
  try {

    mmkvStorage.setItem(USER_KEY, user);

    triggerAuthChanged();

    return true;

  } catch (e) {
    console.log("saveAuth error:", e);
    return false;
  }
}


/* GET AUTH */
export async function getAuth() {
  try {

    const user = mmkvStorage.getItem(USER_KEY);

    return {
      user
    };

  } catch (e) {

    return {
      user: null
    };

  }
}


export async function removeAuth() {
  try {

    // 🧹 Clear full MMKV
    mmkvStorage.clearAll();

    // 🔥 RTK Query cache reset
    store.dispatch(baseApi.util.resetApiState());

    // 🔥 Redux reset
    store.dispatch({ type: "LOGOUT" });
   

    // 🔁 Auth listeners
    triggerAuthChanged();

    return true;

  } catch (e) {
    console.log("removeAuth error:", e);
    return false;
  }
}