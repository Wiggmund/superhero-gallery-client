import { Gallery } from '../gallery/Gallery';
import './SuperheroDetails.css';
import { Avatar } from '../avatar/Avatar';

export const SuperheroDetails = () => {
	return (
		<>
			<h1>Superhero details</h1>
			<Gallery>
				<Avatar url={''} hover={'avatar--hover'} />
			</Gallery>
		</>
	);
};
