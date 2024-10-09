# React App Modal

<p align="center">
    <a href="https://bundlephobia.com/package/react-app-modal"><img
            src="https://img.shields.io/bundlephobia/minzip/react-app-modal?style=flat-square&color=%2345cc11"
            alt="Gzip Size"></a>
    <a href="https://www.npmjs.com/package/react-app-modal"><img src="https://img.shields.io/npm/v/react-app-modal.svg?style=flat-square&colorB=51C838"
                                                       alt="NPM Version"></a>
    <a href="https://github.com/ansonwonggg/react-app-modal/blob/master/LICENSE"><img
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

## Motivation

It is often we need to pop-up some important messages or dialogs to let user confirms for further actions. When you happen to have many pages and they both need the same dialog, you may need to embed the shared component in each page you needed. 

And it comes a issue, can we make it globally and so that we can trigger any place in your pages and at the same not re-render your entire applications?

Probably we all think about using state management library like Redux, or Immer. However, I do hate writing boilerplate. And that how `React App Modal` born. It try to get rid of boilerplate and let you easily trigger, update and change Modal content in just one function with React Hook.
