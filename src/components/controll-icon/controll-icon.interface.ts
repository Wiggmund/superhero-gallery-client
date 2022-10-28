import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

export interface IControllIconProps {
	icon: IconProp;
	size?: SizeProp;
	// eslint-disable-next-line no-unused-vars
	onClick?(x: unknown): void;
}
