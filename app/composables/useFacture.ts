import { includes } from "zod";

/**
 * Get all factures
 * @returns Factures
 */
export const getAllFactures = async (pagination:Pagination, filter?:Filter, fields?:string) :Promise<IBaserowListResponse>=> {
  const config = useRuntimeConfig();
  const FACTURE_TABLE_ID = config.public.tableFacture;
  const { $api } = useNuxtApp();
  
  const endpoint = `/api/database/rows/table/${FACTURE_TABLE_ID}/?user_field_names=true`;
  const queryBase = {
      page: pagination.pageIndex?pagination.pageIndex+1:1,
      size: pagination.pageSize,
      order_by: '-NumFac',
      include: fields?fields:"'NumFac', 'Date', '#Num', 'Client', 'Comment', 'Bon de Commande', 'Statut', 'Total HT', 'Total TTC', 'CA', 'Index', 'Délai Règlement', 'Année CA','Taux TVA', 'Date Paiement', 'ActiverFac', 'PennyLane'"
    }
    const queryFilters = new BaserowFilterBuilder()
    if(filter) {
      queryFilters.add("Année CA", "has_value_equal", filter.ca)
      queryFilters.add("Client", "link_row_has", filter.client)
      queryFilters.add("Statut", "contains", filter.statut)
      queryFilters.add("Index", "equal", filter.index)
    }
  
  const query = Object.assign({}, queryBase, queryFilters.toJSON())
  const responseData = await $api(endpoint, {
    method: "GET",
    query: query
  });
  const respList = responseData as IBaserowListResponse
  let i = 0
  respList.results.forEach(raw => {
    const fac = new FactureNew(raw)
    respList.results[i] = fac
    i++
  })
  return responseData as IBaserowListResponse
}

/**
 * get the facture with the given id
 */
export const getFacture = async (id:number) :Promise<IFactureNew> => {
  const config = useRuntimeConfig();
  const FACTURE_TABLE_ID = config.public.tableFacture;
  const { $api } = useNuxtApp();

  const endpoint = `/api/database/rows/table/${FACTURE_TABLE_ID}/${id}/?user_field_names=true`
  const raw = await $api(endpoint, {
        method:"GET",
      });
  const item = new FactureNew(raw)

  return item
}

/**
 * Create the facture with the given facture data
 */
export const createFacture = async (facture:IFactureNew) :Promise<IFactureNew> => {
  const config = useRuntimeConfig();
  const FACTURE_TABLE_ID = config.public.tableFacture;
  const { $api } = useNuxtApp();

  const endpoint = `/api/database/rows/table/${FACTURE_TABLE_ID}/?user_field_names=true`
  const raw = await $api(endpoint, {
        method:"POST",
        body:JSON.stringify(facture.toRaw()),
      });
  const item = new FactureNew(raw)
  return item
}

/**
 * Delete the facture
 */
export const deleteFacture = async (id:number) :Promise<void> => {
  const config = useRuntimeConfig();
  const FACTURE_TABLE_ID = config.public.tableFacture;
  const { $api } = useNuxtApp();

  const endpoint = `/api/database/rows/table/${FACTURE_TABLE_ID}/${id}/`
  const raw = await $api(endpoint, {
        method:"DELETE",
      });
  return
}

/**
 * Update the facture with the given facture data
 */
export const updateFacture = async (facture:IFactureNew) :Promise<IFactureNew> => {
  const config = useRuntimeConfig();
  const FACTURE_TABLE_ID = config.public.tableFacture;
  const { $api } = useNuxtApp();

  const endpoint = `/api/database/rows/table/${FACTURE_TABLE_ID}/${facture.id}/?user_field_names=true`
  const raw = await $api(endpoint, {
        method:"PATCH",
        body: JSON.stringify(facture.toRaw())
      });
  const item = new FactureNew(raw)

  return item
}

/**
 * Copy old facture to new facture and associated lignes and set state
 * @param newFacture - the new facture
 * @param oldFacture - the old facture
 */
export const createCopyFacture = async (newFacture:IFactureNew, oldFacture:IFactureNew) :Promise<IFactureNew> => {
  const createdFac = await createFacture(newFacture)
  if(createdFac.numFac && oldFacture.numFac) {
    await copyFactureLignes(createdFac.numFac, oldFacture.numFac)
  }
  return createdFac
}

export const getAllFacturesForIndex = async (index:string) :Promise<IBaserowListResponse> => {
  let count = 0
  const pagination:Pagination = {
    pageIndex : 0,
    pageSize : 100
  }
  const filter:Filter = {
    index: index
  }
  const response = await getAllFactures(pagination, filter)
  count = response.count

  return response
}

/**
 * Get all factures
 * @returns Factures
 */
export const getFilterTotals = async (filter:Filter) :Promise<Totaux|undefined>=> {
  if(!filter.ca && !filter.client && !filter.statut) return undefined
  const pagination:Pagination = ({
    pageIndex : 0,
    pageSize : 200
  })
  const fields = "'Total HT', 'Total TTC'"
  const respList = await getAllFactures(pagination, filter, fields)
  const facs = respList.results as FactureNew[]
  let totaux = new Totaux()
  if(respList.count <= pagination.pageSize) {
    facs.forEach(fac => {
      totaux.ht += Number(fac.totalHT)
      totaux.ttc += Number(fac.totalTTC)
    })
  }
  return totaux
}
