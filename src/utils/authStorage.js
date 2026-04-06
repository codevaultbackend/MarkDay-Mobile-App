import mmkvStorage from  './mmkvStorage'

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