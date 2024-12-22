<template>
  <nav class="main-menu">
    <ul>
      <MainMenuItem
        v-for="item in items"
        :hidden="!item.path || mounted && hideFolders.includes(item.path)"
        :to="item.link"
        :item="item"
        :linkComponent="linkComponent"
        :wrap="wrap"
        @update:item="
          $emit(
            'update:items',
            items.map((i, j) => (i === item ? ($event as MainMenuParentItem) : i)),
          )
        "
      />
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import type { Component, PropType } from 'vue'
import {onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import MainMenuItem, { type MainMenuParentItem } from './MainMenuItem.vue'
import { on } from 'events';

defineProps({
  /**
   * An array of menu items.
   */
  items: {
    type: Array as PropType<MainMenuParentItem[]>,
    required: true,
  },

  /**
   * Do not display these folders in the menu.
   */
  hideFolders: {
    type: Array as PropType<string[]>,
    default: () => [],
  },

  /**
   * Whether to wrap text in the menu items.
   *
   * @default false
   */
  wrap: {
    type: Boolean,
    default: false,
  },

  /**
   * The component to use for rendering links.
   * When using Nuxt, this should be `NuxtLink`.
   *
   * @default RouterLink
   */
  linkComponent: {
    type: Object as PropType<Component>,
    default: RouterLink,
  },
})

defineEmits<{
  'update:items': [items: MainMenuParentItem[]]
}>()

const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})

</script>

<style scoped>
.main-menu {
  line-height: 1em;
}

.main-menu > ul {
  font-size: 0.875em;
}

.main-menu li + li {
  margin-top: 1em;
}
</style>
