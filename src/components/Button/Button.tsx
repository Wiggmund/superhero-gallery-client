import './Button.css';
import { IButtonProps } from './button.interface';

export const Button = ({
	classNames,
	text,
	onClick,
	disabled = false,
	type = 'button'
}: IButtonProps) => {
	let classes = ['custom-button'];
	!disabled && classes.push('custom-button--hover');
	classes = classNames ? classes.concat(classNames) : classes;

	return (
		<>
			<button type={type} className={classes.join(' ')} onClick={onClick} disabled={disabled}>
				{text}
			</button>
		</>
	);
};
