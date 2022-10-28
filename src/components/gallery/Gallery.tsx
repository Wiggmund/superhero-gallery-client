import { useEffect } from 'react';
import { Status } from '../../common/constants';
import { fetchSuperheroPhotos, selectSuperheroPhotos } from '../../redux/features/superhero';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import './Gallery.css';
import { IGalleryProps } from './gallery.interface';
import { Avatar } from '../avatar/Avatar';
import { Spinner } from '../spinner/Spinner';

export const Gallery = ({ id }: IGalleryProps) => {
	const dispatch = useAppDispatch();
	const status = useAppSelector((state) => state.superheroes.status);
	const error = useAppSelector((state) => state.superheroes.error);
	const photos = useAppSelector(selectSuperheroPhotos);

	useEffect(() => {
		dispatch(fetchSuperheroPhotos(id));
	}, [dispatch, id]);

	let content;
	if (status === Status.Loading) {
		content = <Spinner />;
	} else if (status === Status.Succeeded) {
		content = photos.map(({ url_min }) => (
			<Avatar url={url_min} key={url_min} hover={'avatar--hover'} />
		));
	} else if (status === Status.Failed) {
		content = <h2>{error}</h2>;
	}

	return <div className="gallery">{content}</div>;
};
