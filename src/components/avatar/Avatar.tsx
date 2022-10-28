import './Avatar.css';
import { IAvatarProps } from './avatar.interface';
import IMG from '../../assets/images/unknown.jpg';

export const Avatar = ({ url, hover }: IAvatarProps) => {
	return (
		<>
			<img
				src={url ? url : IMG}
				alt="Avatar"
				className={hover ? `avatar ${hover}` : 'avatar'}
			/>
		</>
	);
};
