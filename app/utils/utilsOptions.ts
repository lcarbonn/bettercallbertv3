import type { SelectItem } from "@nuxt/ui"

/**
 * Status select options constants
 */
export const getStatusOptions  = () :SelectItem[] => {
  const opts:SelectItem[] = []
  // opts.push({label: "Non défini", value: null})
  opts.push({label: "A Vérifier", value: 'A Vérifier'})
  opts.push({label: "A Envoyer", value: 'A Envoyer'})
  opts.push({label: "Envoyée", value: 'Envoyée'})
  opts.push({label: "Payée", value: 'Payée'})
  opts.push({label: "Offert", value: 'Offert'})
  opts.push({label: "Avoir", value: 'Avoir'})
  return opts
}

/**
 * TVA select options constants
 */
export const getTvaOptions = () :SelectItem[] =>  {
  const opts:SelectItem[] = []
  opts.push({label: "20%", value: 20})
  opts.push({label: "0%", value: 0})
  return opts
}

/**
 * Type de prix
 */
export const getTypePUs = () :SelectItem[] =>  {
  const opts:SelectItem[] = []
  opts.push({label: "Heure", value: 'heure'})
  opts.push({label: "Forfait", value: 'forfait'})
  opts.push({label: "Jour", value: 'jour'})
  return opts
}