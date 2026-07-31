import { store } from "../redux/store";
import { authApi } from "../redux/features/auth/authApi";
import { updateUserStorage } from "./profileUtils";
import { getAuth } from "./authStorage";

export const syncProfile = async () => {
  try {
    const { user } = await getAuth();

    if (!user?.empId) {
      console.log("No empId found");
      return null;
    }

    const result = await store.dispatch(
      authApi.endpoints.getProfile.initiate(user.empId, {
        subscribe: false,
        forceRefetch: true,
      })
    );

    const profile = result?.data;

    if (!profile) return null;

    updateUserStorage(profile);

    return profile;
  } catch (error) {
    console.log("Profile Sync Error:", error);
    return null;
  }
};