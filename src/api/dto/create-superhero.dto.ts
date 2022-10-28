export interface ICreateSuperheroDto {
	nickname: string;
	real_name: string;
	origin_description: string;
	superpowers: string;
	catch_phrase: string;
}

export interface IUpdateSuperheroDto extends ICreateSuperheroDto {
	id: number;
}
