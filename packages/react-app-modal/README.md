# React App Modal

<p align="center">
    <a href="https://bundlephobia.com/package/react-app-modal"><img
            src="https://img.shields.io/bundlephobia/minzip/react-app-modal?style=flat-square&color=%2345cc11"
            alt="Gzip Size"></a>
    <a href="https://www.npmjs.com/package/react-app-modal"><img src="https://img.shields.io/npm/v/react-app-modal.svg?style=flat-square&colorB=51C838"
                                                       alt="NPM Version"></a>
    <a href="https://github.com/ansonwonggg/app-modal/blob/main/LICENSE"><img
            src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square" alt="License"></a>
    <br>
</p>

A library let you easily handle Modal / Dialog state with React Hooks in your lovely React Web Applications.

## Get Started 

To install:
```shell
npm i react-app-modal
```

## Usage

`React App Modal` provides 2 core hooks for you to implement in to your component:
- `useModal`
- `useModalDispatcher`

In your **Modal Component**, you can use `useModal` like this:

```jsx
const Modal = () => {
    const { open, content, trigger } = useModal('my-modal');

    return (
        <MyDialog open={open}>
            <p>Hello, {content}</p>
            <button onClick={() => trigger()}>OK</button>
        </MyDialog>
    )
}
```

In your **Pages**, you can use `useModalDispatcher` to trigger or update content of your modal:

```jsx
const Page = () => {
    const { updateAndTrigger } = useModalDispatch('my-modal');

    const ref = useRef(null);

    const showModal = () => {
        updateAndTrigger(ref.current?.value)
    }

    return (
        <>
            <input ref={ref} type='text' />
            <button onClick={() => showModal()}>Show Modal</button>
        </>
    )
}
```

More examples can find in [here](https://github.com/ansonwonggg/app-modal/tree/main/examples/react).

## Motivation

It's common to need pop-up messages or dialogs for user confirmations before proceeding with actions. When you have multiple pages that require the same dialog, you might find yourself embedding the same component in each one.

This raises a challenge: can we implement a global solution that allows us to trigger the dialog from anywhere on the pages without re-rendering the entire application?

Many of us might consider using state management libraries like Redux or Immer, but I find writing boilerplate code tedious. This is where `React App Modal` comes in. It eliminates boilerplate and allows you to easily trigger, update, and modify modal content with a single function using React Hooks.
