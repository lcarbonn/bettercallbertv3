<template>

  <UTabs :content="false" :items="tabs" variant="pill" @update:model-value="filter" class="mt-2 w-full "/>

</template>

<script setup lang="ts">
  import type { TabsItem } from '@nuxt/ui';

  // props
  const props = defineProps<{
      themes:ITheme[]|undefined;
  }>()

  const tabs = computed (() => {
    const tabs:TabsItem[] = []

    const tab:TabsItem = {
      label: 'All',
    }
    tabs.push(tab)

    props.themes?.forEach(theme => {
      const item:TabsItem = {
        label: theme.title,
      }
      tabs.push(item)
    });
    return tabs
  })

  // emits declaration
  const emit = defineEmits<{
    selectTheme: [number];
  }>()

  const filter = (themeId:string|number) => {

    console.log("themeId:", themeId)
    emit('selectTheme', Number(themeId).valueOf())

  }

</script>
