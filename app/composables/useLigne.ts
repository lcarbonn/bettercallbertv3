/**
 * get all Lignes for the numFac Facture
 */
export const getLignes = async (numFac:string) :Promise<ILigneNew[]> => {
  const config = useRuntimeConfig();
  const LIGNE_FACTURE_TABLE_ID = config.public.tableLigneFacture;
  const { $api } = useNuxtApp();
  
  let list:ILigneNew[] = []

  const endpoint = `/api/database/rows/table/${LIGNE_FACTURE_TABLE_ID}/?user_field_names=true`
  const params = 
    {
      page:1,
      size:20,
      order_by:'+#Ligne',
      include: "'NumFacLigne', 'NumFac', '#Ligne', 'Libellé', 'PU HT', 'PU/H', 'Quantité', 'Total HT'",
      filters: {
        filter_type:"AND",
        filters: [
          {
            type:"link_row_contains",
            field:"NumFac",
            value: numFac
          }
        ]
      }
    }

  const data = await $api(endpoint, {
        method:"GET",
        query : params
      });
  if(data) {
      const resLit = data as IBaserowListResponse
      resLit.results.forEach(raw => {
        const item = new LigneNew(raw)
        list.push(item)
      });
  }
  return list

}

/**
 * Create the ligne with the given ligne data
 */
export const createLigne = async (ligne:ILigneNew) :Promise<ILigneNew> => {
  const config = useRuntimeConfig();
  const LIGNE_FACTURE_TABLE_ID = config.public.tableLigneFacture;
  const { $api } = useNuxtApp();

  const endpoint = `/api/database/rows/table/${LIGNE_FACTURE_TABLE_ID}/?user_field_names=true`
  const raw = await $api(endpoint, {
        method:"POST",
        body:JSON.stringify(ligne.toRaw()),
      });
  const item = new LigneNew(raw)
  return item
}

/**
 * Delete the ligne
 */
export const deleteLigne = async (id:number) :Promise<void> => {
  const config = useRuntimeConfig();
  const LIGNE_FACTURE_TABLE_ID = config.public.tableLigneFacture;
  const { $api } = useNuxtApp();

  const endpoint = `/api/database/rows/table/${LIGNE_FACTURE_TABLE_ID}/${id}/`
  const raw = await $api(endpoint, {
        method:"DELETE",
      });
  return
}

/**
 * Delete all lignes of a facture
 * @param numFac - the numFac of teh facture
 */
export const deleteFactureLignes = async (numFac:string) :Promise<void> => {
  // await for all delete
  const list = await getLignes(numFac)
    await Promise.all(list.map( async (ligne) => {
      if(ligne.id) deleteLigne(ligne.id)
    }))
    return
}

/**
 * Update the ligne with the given ligne data
 */
export const updateLigne = async (ligne:ILigneNew) :Promise<ILigneNew> => {
  const config = useRuntimeConfig();
  const LIGNE_FACTURE_TABLE_ID = config.public.tableLigneFacture;
  const { $api } = useNuxtApp();

  const endpoint = `/api/database/rows/table/${LIGNE_FACTURE_TABLE_ID}/${ligne.id}/?user_field_names=true`
  const raw = await $api(endpoint, {
        method:"PATCH",
        body: JSON.stringify(ligne.toRaw())
      });
  const item = new LigneNew(raw)

  return item
}

/**
 * Copy lignes of the facture
 */
export const copyFactureLignes = async (newFactureId:string, oldNumFac:string) :Promise<ILigneNew[]> => {
    const list = await getLignes(oldNumFac)
    const newList:ILigneNew[] = []
    // waiting for all creating lignes in //
    await Promise.all(list.map( async (ligne) => {
        // copy ligne the create
        const ligneCopy = new LigneNew() 
        ligneCopy.numFac = newFactureId
        // ligneCopy.numFac.push(newFactureId)
        ligneCopy.ligne = ligne.ligne
        ligneCopy.libelle = "DUPLICATE " + ligne.libelle
        ligneCopy.puHT = ligne.puHT
        ligneCopy.typePU = ligne.typePU
        const newLigne = await createLigne(ligneCopy)
        newList.push(newLigne)
    }))
    return newList
}
