import type { User } from "firebase/auth";
export const useFirebaseUser = () => useState<User>("firebaseUser");
export const useSnackBarMessage = () => useState<String>("snackBarMessage");
export const useCards = () => useState("cards");
