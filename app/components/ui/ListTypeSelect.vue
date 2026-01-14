<template>
    <USelectMenu :size="size" v-model="listStyle" :icon="listStyle?.icon" :items="styles" :search-input="false" class="w-min"/>
</template>
<script setup lang="ts">
  import type { SelectMenuItem } from '@nuxt/ui';

    // props
  const props = defineProps<{
      modelValue:"card" | "table" | null | undefined;
      size?: "sm" | "md" | "xs" | "lg" | "xl" | undefined
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void
  }>()

  const styles = ref([
    {
      label:'Select vue',
      icon:'streamline-color:cards',
      type:'label'
    },
    {
      label:'Vue Carte',
      icon:'streamline-color:cards',
      value: 'card'
    },
    {
      label:'Vue Table',
      icon:'streamline-color:bullet-list',
      value:'table'
    },
  ] satisfies SelectMenuItem[])

  let style = styles.value[0]
  styles.value.map( (st) => {
    if(st.value==props.modelValue) style = st
  })
  const listStyle = ref(style)

  watch(listStyle, value => {
      emit('update:modelValue', value?get(value as Record<string, any>, "value"):null)
  })

  const chooseStyle = () => {
    const width = window.innerWidth;
    if (width > 768) {
        listStyle.value=styles.value[2]
    } else {
        listStyle.value=styles.value[1]
    }    
  }

  onMounted(() => {
  })
  if(import.meta.client){
    chooseStyle()

    // force card view for sm
    window?.addEventListener('resize', () => {
      // Code to execute when window size changes
      chooseStyle()
    });
  }

function get(object: Record<string, any> | undefined, path: (string | number)[] | string, defaultValue?: any): any {
  if (typeof path === 'string') {
    path = path.split('.').map((key) => {
      const numKey = Number(key)
      return Number.isNaN(numKey) ? key : numKey
    })
  }

  let result: any = object

  for (const key of path) {
    if (result === undefined || result === null) {
      return defaultValue
    }

    result = result[key]
  }

  return result !== undefined ? result : defaultValue
}
</script>
