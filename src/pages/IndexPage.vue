<template>
  <div class="q-mx-md">
    <q-form @submit="submitForm">
      <h4>{{ t('customer') }}</h4>
      <hr />
      <q-input :label="t('name')" outlined v-model="name" />
      <h4>{{ t('items') }}</h4>
      <hr />
      <div>
        <div class="text-body1 q-mb-lg">{{ t('doYouWantToInsureItems') }}</div>
        <q-btn-toggle
          v-model="showItems"
          :options="[
            { label: t('yes'), value: true },
            { label: t('no'), value: false },
          ]"
          toggle-color="primary"
        />
        <div v-if="showItems" class="q-pa-md">
          <div v-for="item in items" :key="item.id" class="row items-center">
            <q-input
              class="q-mb-lg"
              :key="item.id"
              v-model="item.name"
              :label="t('item', item.id)"
            />
            <q-btn
              dense
              flat
              icon="close"
              size="sm"
              @click="deleteItem(item)"
            />
          </div>
          <q-btn
            @click="items.push({ name: '', id: items.length + 1 })"
            size="md"
            icon="add"
            class="q-mt-sm"
          >
            <template #default>
              <div class="q-pa-sm">{{ t('addAnother') }}</div>
            </template>
          </q-btn>
        </div>
      </div>
      <h4>{{ t('policy') }}</h4>
      <hr />
      <div class="text-body1 q-mb-md">{{ t('startDate') }}</div>
      <q-date class="q-mb-lg" v-model="startDate" :options="dateOptions" />
      <div class="text-body1 q-mb-sm">{{ t('LOI') }}</div>
      <q-select
        class="q-mb-lg"
        :option-disable="(option) => option === LOIs[0]"
        v-model="selectedLOI"
        :options="LOIs"
      />
      <div class="text-body1 q-mb-sm">{{ t('excess') }}</div>
      <div class="q-gutter-sm q-mb-lg">
        <q-radio
          v-for="excess in excesses"
          :key="excess"
          :val="excess"
          :label="excess"
          v-model="selectedExcess"
        />
      </div>
      <hr />
      <div class="submit-wrapper">
        <q-btn size="lg" type="submit" color="primary"> {{ t('submit') }} </q-btn>
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { date } from 'quasar';
import { ref, computed } from 'vue';
import { Item, Items } from 'components/models';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const name = ref('');

const showItems = ref(true);
const items = ref<Items>([{ name: '', id: 1 }]);

const startDate = ref(date.formatDate(Date.now(), 'YYYY/MM/DD'));

const LOIs = [t('pleaseSelect'), '£1,000,000', '£2,000,000', '£5,000,000'];
const selectedLOI = ref(LOIs[0]);

const excesses = ['£250', '£500', '£1000'];
const selectedExcess = ref('');

const dateOptions = computed(() => {
  const rangeDates = [];
  for (let i = 0; i <= 15; i++) {
    const thisDate = new Date();
    thisDate.setDate(thisDate.getDate() + i);
    rangeDates.push(date.formatDate(thisDate, 'YYYY/MM/DD'));
  }
  return rangeDates;
});

function deleteItem(item: Item) {
  items.value = items.value
    .filter((el) => el.id != item.id)
    .map((el, i) => {
      return {
        ...el,
        id: i + 1,
      };
    });
}

function submitForm() {
  const data = {
    name: name.value,
    itemsToInsure: showItems.value ? items.value : '',
    selectedLOI: selectedLOI.value,
    selectedExcess: selectedExcess.value,
    startDate: startDate.value,
  };
  alert(JSON.stringify(data, null, 2));
}
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

.submit-wrapper {
  width: 100%;
  display: flex;
  justify-content: end;
  margin-bottom: 24px;
}
</style>
