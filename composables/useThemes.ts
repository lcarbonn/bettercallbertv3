// get themes form firebase and manage state
export const getThemes = () => {
    getDbThemes().then((list) => {
        const themes = useThemes()
        themes.value = list
      })
}

// get theme color
export const getTheme = (idTheme:string) => {
    return getThemeColor(idTheme)
}
