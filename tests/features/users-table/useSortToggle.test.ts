import { useSortToggle, type SortState } from '@/features/users-table/useSortToggle'

describe('useSortToggle', () => {
  const current = () => state
  let state: SortState

  beforeEach(() => {
    state = { key: 'lastVisitedAt', dir: 'desc' } as const
  })

  it('switches to asc when changing column', () => {
    const { nextFor } = useSortToggle(current)
    expect(nextFor('firstName')).toEqual({ key: 'firstName', dir: 'asc' })
  })

  it('toggles asc/desc on same column', () => {
    const { nextFor } = useSortToggle(current)
    state = { key: 'firstName', dir: 'asc' }
    expect(nextFor('firstName')).toEqual({ key: 'firstName', dir: 'desc' })
  })
}) 