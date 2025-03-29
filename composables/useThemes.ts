/**
 * Get themes form firebase and manage state
 */
export const getThemes = () => {
    getThemesDb()
    .then((themeslist) => {
        const themes = useThemes()
        themes.value = themeslist
    })
    .catch((error) => {
        errorToSnack(error, "Error getting Themes")
    });
}
