import { useEffect } from 'react';
import { Status } from '../../common/constants';
import { fetchSuperheroes, selectAllSuperheroes } from '../../redux/features/superhero';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Card } from '../card/Card';
import './SuperheroesList.css';
import { Spinner } from '../spinner/Spinner';
import { ControllIcon } from '../controll-icon/ControllIcon';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { IFormRouteState } from '../form/form.interface';

export const SuperheroesList = () => {
	const dispatch = useAppDispatch();
	const superheroes = useAppSelector(selectAllSuperheroes);
	const status = useAppSelector((state) => state.superheroes.status);
	const error = useAppSelector((state) => state.superheroes.error);
	const navigate = useNavigate();

	useEffect(() => {
		if (status === Status.Idle) {
			dispatch(fetchSuperheroes());
		}
	}, [dispatch, status, superheroes]);

	const handleAddingHero = () => {
		const routeState: IFormRouteState = { id: -1, action: 'create' };
		navigate('/form', { state: routeState });
	};

	let content;
	if (status === Status.Loading) {
		content = <Spinner />;
	} else if (status === Status.Succeeded) {
		content = superheroes.map(({ id }) => <Card id={id} key={id} />);
	} else if (status === Status.Failed) {
		content = <h2>{error}</h2>;
	}

	return (
		<>
			<div className="list-container">{content}</div>
			<ControllIcon icon={faPlus} size="5x" onClick={handleAddingHero} />
		</>
	);
};
