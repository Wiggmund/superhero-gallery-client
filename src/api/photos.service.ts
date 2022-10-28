import { IPhotoModel } from './models/photo.model';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000';
const superheroes = `${SERVER_URL}/superheroes`;

export class PhotosService {
	static async uploadPhotos(id: number, files: FormData) {
		try {
			const { data } = await axios.post<IPhotoModel>(`${superheroes}/${id}/250/500`, files, {
				headers: { 'Content-Type': 'multipart/form-data' }
			});
			return data;
		} catch (err) {
			console.log(err);
			return null;
		}
	}
}
