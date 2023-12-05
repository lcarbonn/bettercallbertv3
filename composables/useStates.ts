import type { User } from "firebase/auth";
/**
 * State for firebaseUser
 */
export const useFirebaseUser = () => useState<User>("firebaseUser");
/**
 * State for snackbar message
 */
export const useSnackBarMessage = () => useState<String>("snackBarMessage", () => "");
/**
 * State for list of current cards
 */
export const useCards = () => useState<CardType[]>("cards");
/**
 * State of current card
 */
export const useCard = () => useState<CardType>("card");
/**
 * State for list of all cards
 */
export const useFullCards = () => useState<CardType[]>("fullCards");
/**
 * State for list of themes
 */
export const useThemes = () => useState<ThemeType[]>("themes");
/**
 * State for single page management
 */
export const useSinglePage = () => useState<boolean>("singlePage", () => false);
/**
 * State for current theme
 */
export const useCurrentTheme = () => useState<string>("currentTheme");