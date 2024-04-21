# use-options

## Notice

This is not a `React` or `Vue` hook, just use it in JS

## Install

```
npm install use-options
or
yarn add use-options
or
pnpm install use-options
```

## API

``` ts
createOptions: <T>(defaultOptions: T): OptionsProvider<T>;

class OptionsProvider {
  provide<S>(callback: () => S, value: T | ((defaultValue: T) => T)): S
}

useOptions = <T>(Options: OptionsProvider<T>, value?: T): T
```

## Usage

```js
import { createOptions, useOptions } from 'use-options'
const Options = createOptions({
  value: 0
})

const bar = () => {
  const options = useOptions(Options); // {value: 1}
}

const foo = (options) => {
  Options.provide(
    bar,
    { value: 1 }
  )
}

foo();
```

By default, the values we receive will be the default values
```js
import { createOptions, useOptions } from 'use-options'
const Options = createOptions({
  value: 0
})

const bar = () => {
  const options = useOptions(Options); // {value: 0}
}

bar();
```

When within the nested `Options.provide` scope, the values we receive will be the closest values
```js
import { createOptions, useOptions } from 'use-options'
const Options = createOptions({
  value: 0
})

const bar = () => {
  const options = useOptions(Options); // {value: 2}
}

const foo = (options) => {
  Options.provide(
    () => {
      Options.provide(bar, {value: 2})

      const options = useOptions(Options); // {value: 1}
    },
    { value: 1 }
  )
}

foo();
```