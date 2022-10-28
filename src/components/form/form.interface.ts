import { ISuperhero } from '../../api/models/superhero.model';

export interface IFormProps {
	superhero?: ISuperhero;
	action?: string;
	nextStage?(): void;
}

export interface IFormRouteState {
	id: number;
	action: 'create' | 'update';
}
