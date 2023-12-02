<template>
    <BContainer>
        <BCard>
            <BForm @submit="onSubmit">
                <BFormGroup
                    id="input-email"
                    label="Email address:"
                    label-for="email"
                    description="We'll never share your email with anyone else."
                    >
                    <BFormInput
                        id="email"
                        v-model="form.email"
                        type="email"
                        placeholder="Enter email"
                    />
                </BFormGroup>
                <BFormGroup
                    id="input-pwd"
                    label="Password:"
                    label-for="password"
                    >
                    <BFormInput
                        id="password"
                        v-model="form.password"
                        type="password"
                        placeholder="Enter password"
                    />
                </BFormGroup>
                <BButton type="submit" variant="primary">Connexion</BButton>
            </BForm>
        </BCard>
    </BContainer>
</template>

<script setup>

const form = reactive({
    email: null,
    password: null,
})

const onSubmit = async (event) => {
    event.preventDefault()
    const credentials = await signInUser(form.email, form.password)
    console.log("signIn user=", credentials)
    if(credentials) navigateTo('/')
}

const onReset = (event) => {
    event.preventDefault()
    form.email = null
    form.password = null
}
</script>
