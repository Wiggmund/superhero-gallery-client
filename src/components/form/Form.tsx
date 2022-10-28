import { faHouse, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { ISuperhero } from '../../api/models/superhero.model';
import {
	createSuperhero,
	selectSuperheroeById,
	updateSuperhero
} from '../../redux/features/superhero';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Button } from '../Button/Button';
import { ControllIcon } from '../controll-icon/ControllIcon';
import { Gallery } from '../gallery/Gallery';
import './Form.css';
import { IFormRouteState } from './form.interface';

const initialValues = {
	nickname: '',
	real_name: '',
	superpowers: '',
	origin_description: '',
	catch_phrase: ''
};

type fieldsType = keyof typeof initialValues;
const fields: fieldsType[] = Object.keys(initialValues) as fieldsType[];

const validate = (values: typeof initialValues) => {
	const errors: Partial<typeof initialValues> = {};
	const minChars = 3;

	if (!values.nickname) {
		errors.nickname = 'Required';
	} else if (values.nickname.length < minChars) {
		errors.nickname = `Must be 3 characters or more`;
	}

	if (!values.real_name) {
		errors.real_name = 'Required';
	} else if (values.real_name.length < minChars) {
		errors.real_name = `Must be 3 characters or more`;
	}
	if (!values.superpowers) {
		errors.superpowers = 'Required';
	} else if (values.superpowers.length < minChars) {
		errors.superpowers = `Must be 3 characters or more`;
	}
	if (!values.origin_description) {
		errors.origin_description = 'Required';
	} else if (values.origin_description.length < minChars) {
		errors.origin_description = `Must be 3 characters or more`;
	}
	if (!values.catch_phrase) {
		errors.catch_phrase = 'Required';
	} else if (values.catch_phrase.length < minChars) {
		errors.catch_phrase = `Must be 3 characters or more`;
	}

	return errors;
};

export const Form = () => {
	const { action, id } = useLocation().state as IFormRouteState;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const candidate = useAppSelector((state) => selectSuperheroeById(state, id));
	console.log('Form', id);
	const isUpdate = action === 'update';

	if (isUpdate && candidate) {
		fields.forEach((field) => (initialValues[field] = candidate[field]));
	}

	const formik = useFormik({
		initialValues,
		validate,
		onSubmit: async (dto) => {
			let routeState: IFormRouteState;
			let newSuperhero: ISuperhero;
			switch (action) {
				case 'create':
					newSuperhero = await dispatch(createSuperhero(dto)).unwrap();
					routeState = { id: newSuperhero.id, action: 'create' };
					navigate(`../upload/${id}`, { state: routeState });
					break;
				case 'update':
					newSuperhero = await dispatch(updateSuperhero({ ...dto, id })).unwrap();
					routeState = { id: newSuperhero.id, action: 'update' };
					navigate(`/`, { state: routeState });
					break;
			}
		}
	});

	const handleGoHomePage = () => navigate('/');
	const handleGoUploadPage = () => {
		const routeState = { id, action: 'update' };
		navigate(`/upload`, { state: routeState });
	};

	return (
		<>
			<div className="form__content">
				<ControllIcon icon={faHouse} size="3x" onClick={handleGoHomePage} />
				<form className="form__wrapper" onSubmit={formik.handleSubmit}>
					{fields.map((field) => (
						<div className="form__block" key={field}>
							<label className="form__label" htmlFor={field}>
								{field}
							</label>
							<input
								className="form__input"
								id={field}
								type="text"
								{...formik.getFieldProps(field)}
							/>
							{formik.touched[field] && formik.errors[field] ? (
								<div className="form__tip">{formik.errors[field]}</div>
							) : null}
						</div>
					))}
					<div className="form__buttons">
						<Button
							text={action === 'create' ? 'Create' : 'Update'}
							type="submit"
							classNames={['custom-button--form']}
						/>
						<Button
							text="Clear"
							classNames={['custom-button--form']}
							onClick={formik.resetForm}
						/>
					</div>
					{console.log(id)}
					{isUpdate && <Gallery id={id} />}
					{isUpdate && (
						<ControllIcon icon={faUpload} onClick={handleGoUploadPage} size="3x" />
					)}
				</form>
			</div>
		</>
	);
};
