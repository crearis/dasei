<template>
  <form @submit.prevent="$emit('on-save', checksAndSummary)" data-testid="checks-and-summary-form">
    <div  v-if="mailheading" v-html = "mailheading" class="text-lg text-neutral-900 mb-4">
    </div>
    <div v-if = "kosten" v-html = "kosten" class="text-lg text-neutral-900 mb-4">
    </div>    
    <div class="flex items-center">
      <SfCheckbox v-model="checksAndSummary.agb" name="agb" required class="peer w-4" />
      <label class="ml-3 text-base cursor-pointer font-body peer-disabled:text-neutral-500" for="agb">
        Allgemeine Geschäftsbedingungen
      </label>
    </div>
    <div class="flex justify-between ml-8">
      <p class="typography-hint-xs mt-0.5 text-neutral-500" v-html="alabel"></p>
    </div>

    <div class="flex items-center mt-4">
      <SfCheckbox v-model="checksAndSummary.datenschutz" name="datenschutz" required class="peer w-4" />
      <label class="ml-3 text-base cursor-pointer font-body peer-disabled:text-neutral-500" for="datenschutz">
        Datenschutz
      </label>
    </div>
    <div class="flex justify-between ml-8">
      <p class="typography-hint-xs mt-0.5 text-neutral-500" v-html="dlabel"></p>
    </div>

    <div class="flex items-center  mt-4">
      <SfCheckbox v-model="checksAndSummary.ruecktritt" name="ruecktritt" required class="peer w-4" />
      <label class="ml-3 text-base cursor-pointer font-body peer-disabled:text-neutral-500" for="ruecktritt">
        Rücktritts-Kondition
      </label>
    </div>
    <div class="flex justify-between ml-8">
      <p class="typography-hint-xs mt-0.5 text-neutral-500" v-html="rlabel"></p>
    </div>
    <label>
      <UiFormLabel class="mt-4">ich mache folgende Anmerkungen</UiFormLabel>
      <SfInput v-model="checksAndSummary.anmerkungen" name="anmerkungen" type="text" />
    </label>  
    <div class="mt-8 flex flex-col-reverse md:flex-row md:justify-end">
      <SfButton @click="$emit('on-cancel')" type="reset" variant="secondary" class="md:mr-4">
        Abbrechen
      </SfButton>
      <SfButton type="submit" style="background-color:var(--color-primary-bg); color:var(--color-primary-contrast)" class="mb-4 min-w-[120px] md:mb-0">Buchen</SfButton>
    </div>
  </form>
</template>
<script lang="ts" setup>

import type { FormChecksAndSummaryProps } from '../../../utils/checkout'

const props = defineProps<FormChecksAndSummaryProps>()
const { agb, datenschutz, ruecktritt, anmerkungen, alabel, dlabel, rlabel, mailheading, kosten } = toRefs(props)
defineEmits(['on-save', 'on-cancel'])
const checksAndSummary = ref({
  agb: agb?.value === undefined ? false : agb?.value,
  datenschutz: datenschutz?.value === undefined ? false : datenschutz?.value,
  ruecktritt: ruecktritt?.value === undefined ? false : ruecktritt?.value,
  anmerkungen: anmerkungen?.value?.includes('newVorname') ? '' : (anmerkungen?.value ?? '')
})
</script>
