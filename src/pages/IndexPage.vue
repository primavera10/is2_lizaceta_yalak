<template>
<div class="q-mx-md">
  <q-form>
    <h4>
      Customer
    </h4>
    <hr/>
    <q-input label="Name" outlined v-model="name" />
    <h4>
      Items
    </h4>
    <hr/>
    <div>
      <div class="text-body1 q-mb-lg">
        Do you want to insure items?
      </div>
      <q-btn-toggle
        v-model="showItems"
        :options="[{label:'Yes', value: true}, {label:'No', value: false}]"
        toggle-color="primary"
      />
      <div v-if="showItems" class="q-pa-md">
        <div v-for="item in items" :key="item.id" class="row items-center">
          <q-input class="q-mb-lg" :key="item.id" v-model="item.name" :label="`Item ${item.id}`" />
          <q-btn dense flat icon="close" size="sm" @click="items = items.filter(el => el.id != item.id)" />
        </div>
        <q-btn @click="items.push({ name: '', id: items.length + 1 })" size="md" icon="add">
          <template #default>
            <div class="q-pa-sm">
              Add another
            </div>
          </template>
        </q-btn>
      </div>
    </div>
  </q-form>
</div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const name = ref('')
  const showItems = ref(true)

  const items = ref([{name: '', id: 1}])

</script>

<style lang="scss" scoped>

hr {
  height: 0.1rem;
  background-color: $dark;
  margin-bottom: 2rem;
}
h4 {
  margin-top: 1.5rem;
  margin-bottom: 0.9rem;
}
</style>
