import { ModalContext, useModalClient } from './context';
import ModalProvider from './provider';
import { useModal } from './useModal';
import { useModalDispatch } from './useModalDispatch';

export {
	ModalContext,
	useModalClient,
	ModalProvider,
	useModal,
	useModalDispatch,
};
export type { UseModalDispatchReturn, UseModalReturn } from './type';
export type { InitModal } from 'modal-core';
