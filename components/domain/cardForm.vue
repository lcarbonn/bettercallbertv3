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
                        :state="linkState"
                        placeholder="Set the card url link, must start by 'http'"></BFormInput>
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
                <BFormGroup 
                    id="loda-group"
                    label="Image file"
                    label-for="imageFile">
                    <BInputGroup class="mb-0">
                        <BFormFile id="imageFile"
                                        v-model="imageFile"
                                        accept="image/*"></BFormFile>
                        <template #append>
                            <BButton id="uploadButton"
                                variant="primary"
                                :disabled="!Boolean(imageFile)"
                                @click="uploadImageFile">
                                <Upload/>
                            </BButton>
                            <BTooltip target="uploadButton"
                                triggers="hover">Upload file</BTooltip>
                        </template>
                    </BInputGroup>
                </BFormGroup>

            </BForm>
        </BCardBody>
        <BButton id="saveButton" 
            @click="saveCard"
            :disabled="!Boolean(srcState && titleState)"
            variant="primary">
            <Save/>
            <BTooltip target="saveButton"
                triggers="hover">Save</BTooltip>
        </BButton>
        <BButton 
            id="deleteButton"
            @click="modal = !modal"
            variant="primary">
            <Trash/>
            <BTooltip target="deleteButton"
                triggers="hover">Delete</BTooltip>
        </BButton>
        <BModal v-model="modal" title="Delete Card" @ok="deleteCard"> Really ? </BModal>
        <BButton 
            id="resetButton"
            @click="resetCard"
            variant="primary">
            <Reset/>
            <BTooltip target="resetButton"
                triggers="hover">Reset</BTooltip>
        </BButton>
    </BCard>
</template>

<script setup lang="ts">

    // icons
    import Upload from '~icons/bi/upload'
    import Save from '~icons/bi/save'
    import Trash from '~icons/bi/trash'
    import Reset from '~icons/bi/arrowCounterclockwise'

    //props
    const props = defineProps<{
        card?:Card
    }>()

    // emits declaration
    const emit = defineEmits(['saveCard', 'deleteCard', 'resetCard', 'uploadImageFile'])

    // states properties
    const themes = useThemes()

    // local ref props
    const imageFile = ref<null | File>(null)
    const modal = ref(false)

    //computed properties
    const titleState = computed(() => {
        if(props.card) return (props.card.title != null && props.card.title != "") ? true : false
    })
    const srcState = computed(() => {
        if(props.card) return (props.card.src != null && props.card.src != "") ? true : false
    })
    const linkState = computed(() => {
        if(props.card) {
            if(props.card.link==null || props.card.link=="") return true
            return (props.card.link.indexOf('http')>-1) ? true : false
        }
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
    const uploadImageFile = () => {
        emit('uploadImageFile', imageFile.value)
    }

</script>
