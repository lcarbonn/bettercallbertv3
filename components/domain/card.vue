<template>
    <BCard :imgSrc="card?.img"
            :img-alt="card?.title"
            class="h-100"
            bg-variant="secondary"
            text-variant="white"
            :headerBgVariant="theme"
            header-tag="header"
            overlay
            img-bottom>
        <template #header>
            <small>{{ card?.title }}</small>
        </template>
    </BCard>
</template>

<script setup lang="ts">
    //props
    const props = defineProps({
        card: {
            type:Card,
            default:undefined
        }
    })

    // computed props
    const theme = computed(() => {
        if(props.card) return getThemeColor(props.card.idTheme)
    })
</script>
