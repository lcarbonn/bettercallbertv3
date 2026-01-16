/**
 * State for snackbar message
 */
export const useSnackBarMessage = () => useState<ISnackMessage>("snackBarMessage");

/**
 * State for search
 */
export const useSearchText = () => useState<string|undefined>("searchText");
