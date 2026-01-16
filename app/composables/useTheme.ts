/**
 * Get all themes
 * @returns Themes
 */
export const getThemes = async () :Promise<ITheme[]>=> {
  const config = useRuntimeConfig();
  const THEME_TABLE_ID = config.public.tableTheme;
  const { $api } = useNuxtApp();
  
  const endpoint = `/api/database/rows/table/${THEME_TABLE_ID}/?user_field_names=true`;
  const query = {
      page: 1,
      size: 20,
      order_by: '+Order',
    }
  const responseData = await $api(endpoint, {
    method: "GET",
    query: query
  });
  const respList = responseData as IBaserowListResponse
  const themes:ITheme[] = []
  respList.results.forEach(raw => {
    const theme = new Theme(raw)
    themes.push(theme)
  })
  return themes
}
