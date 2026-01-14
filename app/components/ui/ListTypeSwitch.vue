<template>
  <UButton class="w-min"
    :icon="selectedStyle?.icon"
    :size="size"
    variant='soft'
    aria-label="Changer Type Liste"
    @click="switchStyle()"
  />
</template>
<script setup lang="ts">
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
      label:'Vue Carte',
      icon:'streamline-color:cards',
      value: 'card',
      id:0
    },
    {
      label:'Vue Table',
      icon:'streamline-color:bullet-list',
      value:'table',
      id:1
    },
  ])

  // const for localstorage
  const STORAGE_KEY = "noco-listtype"

  // for the button
  const selectedStyle = ref()

  // called by click on button  
  const switchStyle = () => {
    const id = selectedStyle.value?.id == 0?1:0
    selectedStyle.value = styles.value[id]
  }

  // watching changes to emit to parent
  watch(selectedStyle, value => {
        if(value?.value) window.localStorage.setItem(STORAGE_KEY, ""+value.id)
        else window.localStorage.removeItem(STORAGE_KEY)
        emit('update:modelValue', value?value.value:null)
  })

  // for forcing type depending on screen size
  const resized =() => {
    const width = window.innerWidth;
    if (width > 768) {
        selectedStyle.value=styles.value[1]
    } else {
        selectedStyle.value=styles.value[0]
    }    
  }
  // set initial state if stored
  const setInitialType = () => {
    const sid = window.localStorage.getItem(STORAGE_KEY)
    if(sid) {
      selectedStyle.value = styles.value[Number(sid).valueOf()]
      return
    }
    resized()
  }

  // on start and listener
  onMounted(() => {
    // at mounted
    setInitialType()
    // and listining to changes
    window?.addEventListener('resize', () => {
      // Code to execute when window size changes
      resized()
    });
  })
</script>