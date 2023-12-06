
/**
 * Go to card detail page
 * @param id - id of the card 
 */
export const goToCardPage = async (id:string|undefined) => {
    if(id) await navigateTo('/cards/' + id)
}
