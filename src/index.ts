class OptionsProvider<T> {
  private readonly defaultValue: T
  private value: T
  constructor(value: T) {
    this.defaultValue = value
    this.value = value
  }
  provide<S>(callback: () => S, value: T | ((defaultValue: T) => T)): S {
    const prevValue = this.value
    if (typeof value === 'function') {
      this.value = (value as (defaultValue: T) => T)(this.defaultValue)
    } else {
      this.value = value
    }
    const returnValue = callback()
    this.value = prevValue
    return returnValue
  }
  getValue = () => this.value
}

export const createOptions = <T>(defaultOptions: T): OptionsProvider<T> => {
  return new OptionsProvider(defaultOptions)
}

export const useOptions = <T>(options: OptionsProvider<T>, value?: T): T => {
  if (value === undefined) {
    return options.getValue()
  }
  return value
}
