import './Card.css';
import { faTrash, faGear } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '../avatar/Avatar';
import { ControllIcon } from '../controll-icon/ControllIcon';
import { ICardProps } from './card.interface';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { removeSuperhero, selectSuperheroeById } from '../../redux/features/superhero';
import { ISuperhero } from '../../api/models/superhero.model';
import SuperheroService from '../../api/superhero.service';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IFormRouteState } from '../form/form.interface';

export const Card = ({ id }: ICardProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [url_min, setUrl_min] = useState('');

	const { nickname } = useAppSelector((state) => selectSuperheroeById(state, id)) as ISuperhero;

	useEffect(() => {
		SuperheroService.getSuperheroAvatar(id).then((avatar) => {
			avatar && setUrl_min(avatar.url_min);
		});
	}, [id]);

	const handleRemove = () => {
		dispatch(removeSuperhero(id));
	};

	const handleEditingHero = () => {
		const routeState: IFormRouteState = { id, action: 'update' };
		navigate('/form', { state: routeState });
	};

	return (
		<>
			<div className="card">
				<div className="card__body">
					<Avatar url={url_min} />
					<div className="card__info">
						<h2>{nickname}</h2>
						<div className="card__buttons">
							<ControllIcon icon={faGear} onClick={handleEditingHero} />
							<ControllIcon icon={faTrash} onClick={handleRemove} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
