/**
 * get all CA and set state
 * @returns CAs
 */
export const getAllCas = async () :Promise<ICaNew[]> => {
  const config = useRuntimeConfig();
  const CA_TABLE_ID = config.public.tableCa;
  const { $api } = useNuxtApp();

  let list:ICaNew[] = []
  const allCAsApi = `/api/database/rows/table/${CA_TABLE_ID}/?user_field_names=true`;
  const casdata = await $api(allCAsApi, {
        method:"GET",
        query : {
          page:1,
          size:200,
          order_by:'-Date',
        }
      });
  if(casdata) {
      const resLit = casdata as IBaserowListResponse
      resLit.results.forEach(raw => {
        const item = new CaNew(raw)
        list.push(item)
      });
  }
  return list
}
