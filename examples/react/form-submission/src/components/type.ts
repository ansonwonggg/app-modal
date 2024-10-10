export type LoginCredential = {
	username?: string;
	password?: string;
};

export type SubmitModalContent = {
	data: LoginCredential;
	onComplete: () => void;
};
