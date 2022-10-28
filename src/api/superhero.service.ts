import { IPhotoModel } from './models/photo.model';
import { ISuperhero } from './models/superhero.model';
import axios from 'axios';
import { ICreateSuperheroDto } from './dto/create-superhero.dto';

const SERVER_URL = 'http://localhost:3000';
const superheroes = `${SERVER_URL}/superheroes`;

export default class SuperheroService {
	static async getSuperheroById(id: number): Promise<ISuperhero | null> {
		try {
			const { data } = await axios.get<ISuperhero>(`${superheroes}/${id}`);
			return data;
		} catch (err) {
			console.log(err);
			return null;
		}
	}
	static async getAllSuperheroes(): Promise<ISuperhero[] | null> {
		try {
			const { data } = await axios.get<ISuperhero[]>(`${superheroes}`);
			return data;
		} catch (err) {
			console.log(err);
			return null;
		}
	}
	static async createSuperhero(dto: ICreateSuperheroDto): Promise<ISuperhero | null> {
		try {
			const { data } = await axios.post<ISuperhero>(`${superheroes}`, dto);
			return data;
		} catch (err) {
			console.log(err);
			return null;
		}
	}
	static async updateSuperhero(id: number, dto: ICreateSuperheroDto): Promise<ISuperhero | null> {
		try {
			const { data } = await axios.put<ISuperhero>(`${superheroes}/${id}`, dto);
			return data;
		} catch (err) {
			console.log(err);
			return null;
		}
	}
	static async removeSuperhero(id: number): Promise<ISuperhero | null> {
		try {
			const { data } = await axios.delete<ISuperhero>(`${superheroes}/${id}`);
			return data;
		} catch (err) {
			console.log(err);
			return null;
		}
	}
	static async getSuperheroPhotos(id: number): Promise<IPhotoModel[] | null> {
		try {
			const { data } = await axios.get<IPhotoModel[]>(`${superheroes}/${id}/photos`);
			return data;
		} catch (err) {
			console.log(err);
			return null;
		}
	}
	static async getSuperheroAvatar(id: number): Promise<IPhotoModel | null> {
		try {
			const { data } = await axios.get<IPhotoModel>(`${superheroes}/${id}/avatar`);
			return data;
		} catch (err) {
			console.log(err);
			return null;
		}
	}
}
