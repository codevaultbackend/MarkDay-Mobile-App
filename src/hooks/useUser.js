import { useEffect, useState } from "react";

import {
  getUser,
  onAuthChanged,
} from "../utils/authStorage";

export default function useUser() {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const unsubscribe = onAuthChanged(() => {
      setUser(getUser());
    });

    return unsubscribe;
  }, []);

  return user;
}