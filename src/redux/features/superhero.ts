import { ICreateSuperheroDto, IUpdateSuperheroDto } from './../../api/dto/create-superhero.dto';
import { IPhotoModel } from './../../api/models/photo.model';
import { networkDelay, Status } from './../../common/constants';
import { RootState } from './../store';
import { ISuperhero } from './../../api/models/superhero.model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SuperheroService from '../../api/superhero.service';

async function networkPayload() {
	await new Promise((resolve) => {
		setTimeout(() => resolve(false), networkDelay);
	});
}

export const fetchSuperheroes = createAsyncThunk('superheroes/fetchSuperheroes', async () => {
	const response = await SuperheroService.getAllSuperheroes();

	await new Promise((resolve) => {
		setTimeout(() => resolve(false), 2000);
	});

	if (!response) {
		throw new Error('Get null from querry fetchSuperheroes');
	}

	return response;
});

export const fetchSuperheroPhotos = createAsyncThunk(
	'superheroes/fetchSuperheroPhotos',
	async (superheroId: number) => {
		const response = await SuperheroService.getSuperheroPhotos(superheroId);

		await networkPayload();

		if (!response) {
			throw new Error('Get null from querry fetchSuperheroPhotos');
		}

		return response;
	}
);

export const createSuperhero = createAsyncThunk(
	'superheroes/createSuperhero',
	async (dto: ICreateSuperheroDto) => {
		const response = await SuperheroService.createSuperhero(dto);

		await networkPayload();

		if (!response) {
			throw new Error('Get null from querry createSuperhero');
		}

		return response;
	}
);

export const updateSuperhero = createAsyncThunk(
	'superheroes/updateSuperhero',
	async (dto: IUpdateSuperheroDto) => {
		const { id, ...rest } = dto;
		const response = await SuperheroService.updateSuperhero(id, rest);

		await networkPayload();

		if (!response) {
			throw new Error('Get null from querry updateSuperhero');
		}

		return response;
	}
);

export const removeSuperhero = createAsyncThunk(
	'superheroes/removeSuperhero',
	async (id: number) => {
		console.log(id);
		const response = await SuperheroService.removeSuperhero(id);

		await networkPayload();

		if (!response) {
			throw new Error('Get null from querry removeSuperhero');
		}

		return response;
	}
);

interface IInitialState {
	items: {
		[key: number]: ISuperhero;
	};
	photos: {
		[key: string]: IPhotoModel;
	};
	lastCreated: ISuperhero | null;
	status: Status;
	error: string | null;
}

const initialState: IInitialState = {
	items: {},
	photos: {},
	lastCreated: null,
	status: Status.Idle,
	error: null
};

export const superheroSlice = createSlice({
	name: 'superheroes',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchSuperheroes.pending, (state) => {
				state.status = Status.Loading;
			})
			.addCase(fetchSuperheroes.fulfilled, (state, action) => {
				state.status = Status.Succeeded;
				action.payload.forEach((hero) => (state.items[hero.id] = hero));
			})
			.addCase(fetchSuperheroes.rejected, (state, action) => {
				state.status = Status.Succeeded;
				state.error = action.error.message || 'Smth wrong';
			})

			.addCase(fetchSuperheroPhotos.pending, (state) => {
				state.status = Status.Loading;
			})
			.addCase(fetchSuperheroPhotos.fulfilled, (state, action) => {
				state.status = Status.Succeeded;
				action.payload.forEach((photo) => (state.photos[photo.filename] = photo));
			})
			.addCase(fetchSuperheroPhotos.rejected, (state, action) => {
				state.status = Status.Succeeded;
				state.error = action.error.message || 'Smth wrong';
			})

			.addCase(createSuperhero.pending, (state) => {
				state.status = Status.Loading;
			})
			.addCase(createSuperhero.fulfilled, (state, action) => {
				state.status = Status.Succeeded;
				state.items[action.payload.id] = action.payload;
				state.lastCreated = action.payload;
			})
			.addCase(createSuperhero.rejected, (state, action) => {
				state.status = Status.Succeeded;
				state.error = action.error.message || 'Smth wrong';
			})

			.addCase(updateSuperhero.pending, (state) => {
				state.status = Status.Loading;
			})
			.addCase(updateSuperhero.fulfilled, (state, action) => {
				state.status = Status.Succeeded;
				state.items[action.payload.id] = action.payload;
			})
			.addCase(updateSuperhero.rejected, (state, action) => {
				state.status = Status.Succeeded;
				state.error = action.error.message || 'Smth wrong';
			})

			.addCase(removeSuperhero.pending, (state) => {
				state.status = Status.Loading;
			})
			.addCase(removeSuperhero.fulfilled, (state, action) => {
				state.status = Status.Succeeded;
				delete state.items[action.payload.id];
			})
			.addCase(removeSuperhero.rejected, (state, action) => {
				state.status = Status.Succeeded;
				state.error = action.error.message || 'Smth wrong';
			});
	}
});

export default superheroSlice.reducer;

export const selectAllSuperheroes = (state: RootState) => Object.values(state.superheroes.items);
export const selectSuperheroPhotos = (state: RootState) => Object.values(state.superheroes.photos);
export const selectLastCreated = (state: RootState) => state.superheroes.lastCreated;
export const selectSuperheroeById = (state: RootState, id: number) => state.superheroes.items[id];
