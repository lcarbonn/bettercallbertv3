import type { User } from "firebase/auth";
export const useFirebaseUser = () => useState<User>("firebaseUser");
export const useSnackBarMessage = () => useState<String>("snackBarMessage", () => "");
export const useCards = () => useState<CardType[]>("cards");
export const useCard = () => useState<CardType>("card");
export const useFullCards = () => useState<CardType[]>("fullCards");
export const useThemes = () => useState<ThemeType[]>("themes");
export const useSinglePage = () => useState<boolean>("singlePage", () => false);
export const useCurrentTheme = () => useState<string>("currentTheme");