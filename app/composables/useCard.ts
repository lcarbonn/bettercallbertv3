/**
 * Get all cards
 * @returns Cards
 */
export const getAllCards = async (filter?:Filter) :Promise<ICard[]>=> {
  const config = useRuntimeConfig();
  const CARD_TABLE_ID = config.public.tableCard;
  const { $api } = useNuxtApp();
  
  const endpoint = `/api/database/rows/table/${CARD_TABLE_ID}/?user_field_names=true`;
  const queryBase = {
      page: 1,
      size: 200,
      order_by: 'Theme',
    }
    const queryFilters = new BaserowFilterBuilder()
    if(filter) {
      // queryFilters.add("Année CA", "has_value_equal", filter.ca)
      // queryFilters.add("Client", "link_row_has", filter.client)
      // queryFilters.add("Statut", "contains", filter.statut)
      // queryFilters.add("Index", "equal", filter.index)
    }
  
  const query = Object.assign({}, queryBase, queryFilters.toJSON())
  const responseData = await $api(endpoint, {
    method: "GET",
    query: query
  });
  const respList = responseData as IBaserowListResponse
  const cards:ICard[] = []
  respList.results.forEach(raw => {
    const card = new Card(raw)
    cards.push(card)
  })
  return cards
}
