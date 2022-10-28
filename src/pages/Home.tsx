import { SearchPanel } from '../components/searchPanel/SearchPanel';
import { SuperheroesList } from '../components/superheroesList/SuperheroesList';
import './Home.css';

export const Home = () => {
	return (
		<>
			<div className="content">
				<SearchPanel />
				<SuperheroesList />
			</div>
		</>
	);
};
