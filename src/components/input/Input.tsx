import './Input.css';
import { IInputProps } from './input.interface';

export const Input = ({ label, type, placeHolder = '' }: IInputProps) => {
	return (
		<label className="custom-input__wrapper">
			<div className="custom-input">
				<h2 className="custom-input__header">{label}</h2>
				<input
					type={type ? type : 'text'}
					className="custom-input__input"
					placeholder={placeHolder}
				/>
			</div>
		</label>
	);
};
