/**
 * State for firebaseUser
 */
export const useAuthUser = () => useState<IAuthUser>("authUser");
/**
 * State for snackbar message
 */
export const useSnackBarMessage = () => useState<ISnackMessage>("snackBarMessage");
/**
 * State for list of current cards
 */
export const useCards = () => useState<ICard[]>("cards");
/**
 * State of current card
 */
export const useCard = () => useState<ICard>("card");
/**
 * State for list of all cards
 */
export const useFullCards = () => useState<ICard[]>("fullCards");
/**
 * State for list of themes
 */
export const useThemes = () => useState<ITheme[]>("themes");
/**
 * State for single page management
 */
export const useSinglePage = () => useState<boolean>("singlePage", () => false);
/**
 * State for current theme
 */
export const useCurrentTheme = () => useState<string|undefined>("currentTheme");