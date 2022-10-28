import { faHouse, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PhotosService } from '../../api/photos.service';
import { Button } from '../Button/Button';
import { ControllIcon } from '../controll-icon/ControllIcon';
import { IFormRouteState } from '../form/form.interface';
import { Gallery } from '../gallery/Gallery';
import './FileUpload.css';

export const FileUpload = () => {
	const navigate = useNavigate();
	const { id, action } = useLocation().state as IFormRouteState;
	const [selectedFiles, setSelectedFiles] = useState<FileList>();
	const [isFilesPicked, setIsFilesPicked] = useState(false);
	const [isFilesUploaded, setIsFilesUploaded] = useState(false);
	const [filesQuantity, setFilesQuantity] = useState(0);

	const handleFilesSelect = (event: any) => {
		setFilesQuantity(event.target.files.length);
		setSelectedFiles(event.target.files);
		setIsFilesPicked(true);
	};

	const handleFilesSubmit = (event: any) => {
		event.preventDefault();

		if (isFilesPicked && selectedFiles) {
			const formData = new FormData();
			for (const file of selectedFiles) {
				formData.append('files', file);
			}
			PhotosService.uploadPhotos(id, formData).then(() => {
				setIsFilesUploaded(true);
			});
		}
	};

	const handleGoHomePage = () => navigate('/');

	return (
		<>
			<div className="upload__wrapper">
				{isFilesUploaded && (
					<ControllIcon icon={faHouse} size="3x" onClick={handleGoHomePage} />
				)}

				<form className="upload" onSubmit={handleFilesSubmit}>
					<button type="button" className="btn-warning">
						<ControllIcon icon={faUpload} /> Upload File
						<input
							type="file"
							name="files"
							multiple
							accept=".jpg, .jpeg, .png"
							onChange={handleFilesSelect}
						/>
					</button>
					<Button
						text="Save"
						classNames={['custom-button--upload']}
						disabled={!isFilesPicked}
						type={'submit'}
					/>
					{!isFilesPicked && <span className="upload__hint">Choose some files</span>}
					{isFilesPicked && (
						<span className="upload__hint">You selected {filesQuantity}</span>
					)}
				</form>

				{(isFilesUploaded || action === 'update') && <Gallery id={id} />}
			</div>
		</>
	);
};
