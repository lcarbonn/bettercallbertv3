/**
 * get all Clients
 * @returns Clients
 */
export const getAllClients = async () :Promise<IClientNew[]>=> {
  const config = useRuntimeConfig();
  const CLIENT_TABLE_ID = config.public.tableClient;
  const { $api } = useNuxtApp();

  let list:IClientNew[] = []
  const allClientsApi = `/api/database/rows/table/${CLIENT_TABLE_ID}/?user_field_names=true`;
  const clientsdata = await $api(allClientsApi, {
        method:"GET",
        query : {
          page:1,
          size:50,
          order_by:'+Name',
        }
      });
  if(clientsdata) {
      const resLit = clientsdata as IBaserowListResponse
      resLit.results.forEach(raw => {
        const item = new ClientNew(raw)
        list.push(item)
      });
  }
  return list
}
