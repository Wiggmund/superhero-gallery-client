import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FileUpload } from '../../components/file-upload/FileUpload';
import { Form } from '../../components/form/Form';
import './Change.css';

const test = {
	id: 4,
	nickname: 'test',
	real_name: 'test',
	origin_description: 'test',
	superpowers: 'test',
	catch_phrase: 'test'
};

export const Change = () => {
	const { action } = useParams();
	const [created, setCreated] = useState(false);
	const handleNextStage = () => {
		setCreated(true);
	};

	return (
		<>
			{!created ? (
				<Form nextStage={handleNextStage} action={action?.slice(1)} superhero={test} />
			) : (
				<FileUpload id={4} />
			)}
		</>
	);
};
