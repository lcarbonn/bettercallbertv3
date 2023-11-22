import type { UserCredential } from "firebase/auth";
export const useFirebaseUser = () => useState<UserCredential>("firebaseUser");
export const useSnackBarMessage = () => useState<String>("snackBarMessage");