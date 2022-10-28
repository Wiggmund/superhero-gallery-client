import './SearchPanel.css';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ControllIcon } from '../controll-icon/ControllIcon';

export const SearchPanel = () => {
	return (
		<>
			<div className="searchPanel">
				<label>
					<span>Find</span>
					<input type="text" className="searchPanel__input" />
				</label>
				<ControllIcon icon={faMagnifyingGlass} size={'2x'} />
			</div>
		</>
	);
};
