export const layoutLoaders = {
  default: () => import('@/layouts/DefaultLayout.vue'),
} as const

export type LayoutName = keyof typeof layoutLoaders 