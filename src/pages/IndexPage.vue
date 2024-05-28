<template>
  <div class="q-mx-md">
    <q-form ref="formRef" @submit="submitForm" @reset="reset">
      <h4>{{ t('customer') }}</h4>
      <hr />
      <q-input
        ref="nameInputRef"
        :rules="[(val) => val.trim().length > 0 || t('enterName')]"
        :label="t('name')"
        outlined
        v-model="name"
      />
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
              :rules="[(val) => (val && val.length > 0) || t('enterItemName')]"
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
      <q-field
        v-model="startDate"
        borderless
        class="q-mb-lg"
        :rules="[(val) => !!val || t('pickDate')]"
      >
        <template #control>
          <q-date v-model="startDate" :options="dateOptions" />
        </template>
      </q-field>
      <div class="text-body1 q-mb-sm">{{ t('LOI') }}</div>
      <q-select
        class="q-mb-lg"
        :option-disable="(option) => option === LOIs[0]"
        v-model="selectedLOI"
        :options="LOIs"
        :rules="[(val) => val !== LOIs[0] || t('selectLOI')]"
      />
      <div class="text-body1 q-mb-sm">{{ t('excess') }}</div>
      <q-field
        v-model="selectedExcess"
        borderless
        class="q-mb-lg"
        :rules="[(val) => excesses.includes(val) || t('selectExcess')]"
      >
        <template #control>
          <q-radio
            class="q-mr-sm"
            v-for="excess in excesses"
            :key="excess"
            :val="excess"
            :label="excess"
            v-model="selectedExcess"
          />
        </template>
      </q-field>
      <hr />
      <div class="submit-wrapper">
        <q-btn size="lg" type="submit" color="primary">
          {{ t('submit') }}
        </q-btn>
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { date, QForm, useQuasar } from 'quasar';
import { ref, computed } from 'vue';
import { Item, Items } from 'components/models';
import { useI18n } from 'vue-i18n';

const { notify } = useQuasar();
const formRef = ref<QForm | null>(null);

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
    name: name.value.trim(),
    itemsToInsure: showItems.value ? items.value : '',
    selectedLOI: selectedLOI.value,
    selectedExcess: selectedExcess.value,
    startDate: startDate.value,
  };
  notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: t('submitted'),
  });
  console.log(JSON.stringify(data, null, 2));
  if (formRef.value) {
    formRef.value.reset();
  }
}

function reset() {
  name.value = '';
  items.value = [{ name: '', id: 1 }];
  showItems.value = true;
  selectedLOI.value = LOIs[0];
  selectedExcess.value = '';
  startDate.value = date.formatDate(Date.now(), 'YYYY/MM/DD');
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
