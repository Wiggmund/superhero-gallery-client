import { FileUpload } from '../../components/file-upload/FileUpload';
import './UploadPage.css';

export const Change = () => {
	const { id } = useParams();

	return <FileUpload />;
};
