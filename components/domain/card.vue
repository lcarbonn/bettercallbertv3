<template>
    <BCard :img-src="card.img"
            :img-alt="card.title"
            class="h-100"
            bg-variant="secondary"
            text-variant="white"
            :header-bg-variant="theme"
            header-tag="header"
            overlay
            img-bottom>
        <template #header>
            <small>{{ card.title }}</small>
        </template>
    </BCard>
</template>

<script setup lang="ts">
    const props = defineProps({
        card: {
            type:Card,
            default:null
        },
        theme: {
            type: String,
            default: "primary"
        },
    })
    const theme = computed(() => {
        const themes = useThemes()
        if(themes && props.card) {
            const theme = getThemeColor(props.card.idTheme, themes.value)
            return theme
        }
        return null
    })
</script>
