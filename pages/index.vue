  <template>
    <div>
      <DomainListCards :cards="cards"/>
    </div>
</template>

<script setup lang="ts">
  const cards = useCards()

  onMounted(() => {
    getCards()
    getThemes()
  })
</script>