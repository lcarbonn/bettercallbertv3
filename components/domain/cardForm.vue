<template>
    <BCard v-if="card"
            bg-variant="secondary"
            header-bg-variant="primary">
        <BCardBody>
            <BForm>
                <BFormGroup
                    id="title-group"
                    label="Title"
                    label-for="title">
                    <BFormInput id="title"
                        v-model="card.title"
                        trim
                        :state="titleState"
                        placeholder="Set the card title"></BFormInput>
                </BFormGroup>
                <BFormGroup 
                    id="link-group"
                    label="Link"
                    label-for="link">
                    <BFormInput id="link"
                        v-model="card.link"
                        trim
                        placeholder="Set the card url link"></BFormInput>
                </BFormGroup>
                <BFormGroup 
                    id="theme-group"
                    label="Theme"
                    label-for="idTheme">
                    <BFormSelect id="idTheme"
                                    v-model="card.idTheme"
                                    :options="themeOptions">
                        <template #first>
                            <BFormSelectOption :value="null"
                                                    disabled>-- Select a theme --</BFormSelectOption>
                        </template>
                    </BFormSelect>
                </BFormGroup>
                <BFormGroup 
                    id="source-group"
                    label="Image Source"
                    label-for="src">
                    <BFormInput id="src"
                        v-model="card.src"
                        trim
                        :state="srcState"
                        placeholder="Set the card image src"></BFormInput>
                </BFormGroup>
            </BForm>
        </BCardBody>
        <BButton @click="saveCard"
                    :disabled="!Boolean(srcState && titleState)"
                    title="Save" variant="primary"><Save/></BButton>
        <BButton @click="deleteCard"
                    title="Delete" variant="primary"><Trash/></BButton>
        <BButton @click="resetCard"
                    title="Reset" variant="primary"><Reset/></BButton>
    </BCard>
</template>

<script setup lang="ts">

    // icons
    import Upload from '~icons/bi/upload'
    import Save from '~icons/bi/save'
    import Trash from '~icons/bi/trash'
    import Reset from '~icons/bi/arrowCounterclockwise'

    //props
    const props = defineProps({
        card: {
            type: Card,
            default: null
        }
    })

    // emits declaration
    const emit = defineEmits(['saveCard', 'deleteCard', 'resetCard'])

    // states properties
    const themes = useThemes()
    

    //computed properties
    const titleState = computed(() => {
        return (props.card.title != null && props.card.title != "") ? true : false
    })
    const srcState = computed(() => {
        return (props.card.src != null && props.card.src != "") ? true : false
    })
    const themeOptions = computed(() => {
        return genThemeOptions(themes.value)
    })

    // methods
    const saveCard = () => {
        emit('saveCard')
    }
    const deleteCard = () => {
        emit('deleteCard')
    }
    const resetCard = () => {
        emit('resetCard')
    }

</script>
