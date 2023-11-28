  <template>
    <BRow cols="1"
         cols-lg="2"
         cols-xl="5">
      <BCol v-for="card in cards"
            :key="card.id"
            class="py-3">
            <p>{{ card.title }}</p>
      </BCol>
      <BCol><button @click="addLocale">Add</button></BCol>
      <BCol><button @click="changeLocale">Change</button></BCol>
    </BRow>
</template>

<script setup lang="ts">

const listCard = [
    {id:"1", title:'en-US'},
    {id:"1", title:'en-GB'},
    {id:"1", title:'fr-FR'},
  ]

const cards = useCardTest()

onMounted(() => {
  cards.value = listCard
})

const addLocale = () => {
  const list = useCardTest()
  list.value.push({id:"3", title:"it-IT"})
}

const changeLocale = () => {
  const list = useCardTest()
  list.value[0].title = 'fr-FR bis'
}

</script>