import { paginate } from '@/shared/lib/paginate'

describe('paginate', () => {
  const list = Array.from({ length: 23 }, (_, i) => i + 1)

  it('returns first page', () => {
    const res = paginate(list, 1, 10)
    expect(res.items).toEqual([1,2,3,4,5,6,7,8,9,10])
    expect(res.total).toBe(23)
    expect(res.page).toBe(1)
    expect(res.pageSize).toBe(10)
  })

  it('returns last partial page', () => {
    const res = paginate(list, 3, 10)
    expect(res.items).toEqual([21,22,23])
  })

  it('clamps negative/overflow pages', () => {
    expect(paginate(list, 0, 10).page).toBe(1)
    expect(paginate(list, 99, 10).items).toEqual([21,22,23])
  })
}) 