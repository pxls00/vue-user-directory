<template>
  <component :is="layoutAsync">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { layoutLoaders } from '@/app/layouts'

const route = useRoute()
const layoutName = computed(() => (route.meta?.layout as keyof typeof layoutLoaders) ?? 'default')
const layoutAsync = computed(() =>
  defineAsyncComponent(layoutLoaders[layoutName.value] ?? layoutLoaders.default)
)
</script>


