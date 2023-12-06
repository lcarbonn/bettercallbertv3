/**
 * Get themes form firebase and manage state
 */
export const getThemes = () => {
    getDbThemes().then((list) => {
        const themes = useThemes()
        themes.value = list
      })
}

/**
 * Get the theme color
 * @param idTheme - the theme id
 * @returns the found color
 */
export const getTheme = (idTheme:string) :string => {
    return getThemeColor(idTheme)
}
