import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IControllIconProps } from './controll-icon.interface';
import './ControllIcon.css';

export const ControllIcon = ({ icon, size, onClick }: IControllIconProps) => {
	return (
		<FontAwesomeIcon
			icon={icon}
			size={Boolean(size) ? size : '1x'}
			className="controll_icons"
			onClick={onClick}
		/>
	);
};
