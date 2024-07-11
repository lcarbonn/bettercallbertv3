<template>
    <BContainer>
        <BCard>
            <BForm @submit="onSubmit">
                <BFormGroup
                    id="input-pwd"
                    label="Password:"
                    label-for="password"
                    >
                    <BFormInput
                        id="password"
                        v-model="form.password"
                        type="password"
                        placeholder="New password"
                    />
                </BFormGroup>
                <BButton class="m-1" type="submit" variant="primary">Confirm</BButton>
            </BForm>
        </BCard>
    </BContainer>
</template>

<script setup>

    // local ref
    const form = reactive({
        password: null,
    })

    // nuxt cycle hook
    const onSubmit = (event) => {
        event.preventDefault()
        const actionCode = useRoute().params.oobCode
        if(!form.password) {
            messageToSnack("Password should be given")
        } else {
            confirmNewPasswordReset(actionCode, form.password)
            .then(() => {
                console.log("new paswword confirmed")
                navigateTo('/login')
            })
        }
    }
</script>
