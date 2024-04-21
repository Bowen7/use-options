import { describe, expect, it } from 'vitest'
import { createOptions, useOptions } from '../src/'

describe('Non-nested options', () => {
  it('Should use the default value when not within the `Options.provide` scope.', () => {
    const Options = createOptions({
      value: 0
    })
    expect(useOptions(Options)).toEqual({ value: 0 })
  })

  it('Should use the correct value when within the `Options.provide` scope.', () => {
    const Options = createOptions({
      value: 0
    })
    Options.provide(
      () => {
        expect(useOptions(Options)).toEqual({ value: 1 })
      },
      { value: 1 }
    )
  })

  it('Should use the value passed to `useOptions`.', () => {
    const Options = createOptions({
      value: 0
    })
    Options.provide(
      () => {
        expect(useOptions(Options, { value: 2 })).toEqual({ value: 2 })
      },
      { value: 1 }
    )
  })

  it('Should use the correct value when within the `Options.provide` scope and the value is a function.', () => {
    const Options = createOptions({
      value: 0
    })
    Options.provide(
      () => {
        expect(useOptions(Options)).toEqual({ value: 2 })
      },
      ({ value }) => ({ value: value + 2 })
    )
  })

  it('Should return the value returned by provide function', () => {
    const Options = createOptions({
      value: 0
    })
    const returnValue = Options.provide(
      () => {
        expect(useOptions(Options)).toEqual({ value: 2 })
        return { a: 'b' }
      },
      ({ value }) => ({ value: value + 2 })
    )
    expect(returnValue).toEqual({ a: 'b' })
  })
})

describe('Nested options', () => {
  it('Should use the closest value when within the nested `Options.provide` scope.', () => {
    const Options = createOptions({
      value: 0
    })
    Options.provide(
      () => {
        expect(useOptions(Options)).toEqual({ value: 1 })

        Options.provide(
          () => {
            expect(useOptions(Options)).toEqual({ value: 2 })
          },
          { value: 2 }
        )

        expect(useOptions(Options)).toEqual({ value: 1 })
      },
      { value: 1 }
    )
  })
})
