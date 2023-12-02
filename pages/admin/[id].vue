<template>
    <BContainer>
        <!-- <b-button v-if="!disableButton"
                  id="backButton"
                  variant="secondary"
                  :to='"/cards/" + id'>
            <b-icon icon="arrow-up-left-square"></b-icon>
        </b-button>
        <b-tooltip target="backButton"
                   triggers="hover">Back</b-tooltip> -->

        <DomainCardForm :card="card"
            >
                        <!-- :imageUrl="imageUrl"
                        :themes="themes"
                        :imagePath="imagePath"
                        :theme="getVariantTheme(card)"
                        @saveCard="saveCard"
                        @deleteCard="deleteCard"
                        @uploadImageFile="uploadImageFile"
                        @resetImagePath="resetImagePath" /> -->
        </DomainCardForm>
    </BContainer>
</template>

<script setup lang="ts">
// import { BIcon, BIconArrowUpLeftSquare } from 'bootstrap-vue'
// import { getThemeColor } from '/commons/commons.js';

    // const
    const id:string = useRoute().params.id as string
    
    // nuxt cycle hooks
    onMounted(() => {
        getCard(id)
        const isSinglePage = useSinglePage()
        isSinglePage.value = true
    })

    // use states
    const card = useCard()

</script>