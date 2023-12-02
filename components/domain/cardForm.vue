<template>
    <BCard v-if="card"
            bg-variant="secondary"
            header-bg-variant="primary">
        <BCardBody>
            <p hidden>{{ card.id }}</p>
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
                    <!-- <b-col lg="12"
                           class="my-1">
                        <BFormGroup label="Image file"
                                      label-for="imageFile"
                                      label-cols-sm="3"
                                      label-size="sm"
                                      label-align-sm="left"
                                      class="mb-0">
                            <BInputGroup class="mb-0">
                                <b-form-file id="imageFile"
                                             v-model="imageFile"
                                             accept="image/png, image/jpeg"
                                             placeholder="Choose a file or drop it here..."
                                             drop-placeholder="Drop file here..."></b-form-file>
                                <BInputGroup-append>
                                    <b-button id="uploadButton"
                                              variant="primary"
                                              :disabled="!Boolean(imageFile)"
                                              @click="uploadImageFile()">
                                        <b-icon icon="upload"></b-icon>
                                    </b-button>
                                    <b-tooltip target="uploadButton"
                                               triggers="hover">Upload file</b-tooltip>

                                </BInputGroup-append>
                            </BInputGroup>
                        </BFormGroup>
                    </b-col> -->
                    <!-- <b-col lg="12"
                           class="my-1">
                        <BFormGroup label="Theme"
                                      label-for="idTheme"
                                      label-cols-sm="3"
                                      label-size="sm"
                                      label-align-sm="left"
                                      class="mb-0">
                            <BInputGroup size="sm">
                                <b-form-select id="idTheme"
                                               v-model="card.idTheme"
                                               :options="themeOptions">
                                    <template #first>
                                        <b-form-select-option :value="null"
                                                              disabled>-- Select a theme --</b-form-select-option>
                                    </template>
                                </b-form-select>
                            </BInputGroup>
                        </BFormGroup>
                    </b-col> -->
                    <!-- <b-col lg="12"
                           class="my-1">
                        <b-button @click="saveCard"
                                  :disabled="!Boolean(srcState && titleState)"
                                  size="sm"
                                  v-b-tooltip.hover
                                  title="Save"><b-icon icon="save" /></b-button>
                        <b-button @click="deleteCard"
                                  size="sm"
                                  v-b-tooltip.hover
                                  title="Delete"><b-icon icon="trash" /></b-button>
                        <b-button @click="resetCard"
                                  size="sm"
                                  v-b-tooltip.hover
                                  title="Reset"><b-icon icon="arrow-counterclockwise" /></b-button>
                    </b-col> -->
                <!-- <b-row>
                    <b-col lg="12"
                           class="my-1">
                        <b-card v-if="card"
                                bg-variant="secondary"
                                text-variant="white"
                                :header-bg-variant="getVariantTheme(card.idTheme)"
                                img-bottom
                                align="center">
                            <template #header>
                                <small>{{ card.title }}</small>
                            </template>
                            <b-card-body>
                                <b-button v-if="card.link"
                                          :href="card.link"
                                          target="_blank"
                                          variant="primary">Jump to source</b-button>
                            </b-card-body>
                            <b-card-img v-if="imageUrl"
                                        :src="imageUrl"
                                        :alt="card.title"
                                        class="b-card-img"></b-card-img>
                        </b-card>
                    </b-col>
                </b-row> -->
            </BForm>
        </BCardBody>
    </BCard>
</template>

<script setup lang="ts">

    // icons
    import Upload from '~icons/bi/upload'
    import Save from '~icons/bi/save'
    import Trash from '~icons/bi/trash'

    //props
    const props = defineProps({
        card: {
            type: Card,
            default: null
        }
    })

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
</script>

<style scoped>
.b-card-img {
    width: unset;
    max-height: 100vh;
    max-width: 100%;
}

@media (max-width: 400px) {
    .b-card-img {
        width: unset;
        max-height: 60vh;
        max-width: 100%;
    }
}
</style>
