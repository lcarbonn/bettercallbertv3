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
        card: Card,
        theme: {
            type: String,
            default: "primary"
        },
    })
</script>
