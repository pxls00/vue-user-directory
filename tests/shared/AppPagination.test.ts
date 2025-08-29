import { mount } from '@vue/test-utils'
import { AppPagination } from '@/shared/ui'

const mountPg = (over: Partial<{page:number; pageSize:number; total:number}> = {}) =>
  mount(AppPagination, { props: { page: 1, pageSize: 10, total: 100, ...over } })

it('disables First/Prev on first page', async () => {
  const w = mountPg({ page: 1 })
  const btns = w.findAll('button')
  expect(btns[0].attributes('disabled')).toBeDefined()
  expect(btns[1].attributes('disabled')).toBeDefined()
})

it('emits update:page on Next', async () => {
  const w = mountPg({ page: 1 })
  const next = w.findAll('button')[2]
  await next.trigger('click')
  expect(w.emitted('update:page')?.[0]).toEqual([2])
}) 