/**
 * Get themes form firebase and manage state
 */
export const getThemes = () => {
    Theme.getThemes()
    .then((themeslist) => {
        const themes = useThemes()
        themes.value = themeslist
    })
    .catch((error) => {
        errorToSnack(error, "Error getting Themes")
    });
}

/**
 * Get the color of the theme
 * @param idTheme - the theme id
 * @return color if found or primary color
 */
export const getThemeColor = (idTheme:string) : string => {
    const themes = useThemes()
    let color = "primary"
    if (!idTheme || !themes?.value) return color
    themes.value.forEach(theme => {
        if (theme.id == idTheme) {
            color = theme.color
        }
    });
    return color
}

/**
 * 
 * @param idTheme Get he bg theme color for the theme
 * @returns bg theme color
 */
export const getBgTheme = (idTheme:string) => {
    return "bg-"+getThemeColor(idTheme)
}
/**
 * Build options for input select based on themes list
 * @param themes - the themes list
 * @return options as {value:string, text:string}[]
 */
export const genThemeOptions = () :{value:string, text:string}[] => {
    const themes = useThemes()
    const opts:{value:string, text:string}[] = []
    if (themes?.value) themes.value.forEach(theme => {
        opts.push(
            { value: theme.id, text: theme.title }
        )
    })
    return opts
}
