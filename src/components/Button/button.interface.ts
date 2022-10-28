/* eslint-disable no-unused-vars */
export interface IButtonProps {
	text: string;
	classNames?: string[];
	type?: 'submit' | 'button';
	disabled?: boolean;
	onClick?(event: any): void;
}
