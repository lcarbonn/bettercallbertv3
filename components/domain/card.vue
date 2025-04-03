<template>
    <BCard 
            class="h-100"
            text-variant="white"
            :class="theme"
            header-tag="header"
            >
        <BCardBody v-if="!card?.img"><BSpinner label="Loading..."></BSpinner></BCardBody>
        <BCardImg v-else bottom :src="card?.img" :alt="card?.title" overlay></BCardImg>
        <template #header>
            <small>{{ card?.title }}</small>
        </template>
    </BCard>
</template>

<script setup lang="ts">
    //props
    const props = defineProps<{
        card?:Card
    }>()

    // computed props
    const theme = computed(() => {
        if(props.card) return getBgTheme(props.card.idTheme)
    })
</script>
