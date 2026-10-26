import axiosInstance from "./axiosInstance";
import type { Curso, CursoCreate } from "../types/curso";
import type { ResponseGenerico } from "../types/responseGenerico";

const URL = "api/Curso";

export const getCursos = async (): Promise<Curso[]> => {
    const { data } = await axiosInstance.get<ResponseGenerico<Curso[]>>(URL);
    return data.response;
};

export const getCursoById = async (id: number): Promise<Curso> => {
    const { data } = await axiosInstance.get<ResponseGenerico<Curso>>(`${URL}/${id}`);
    return data.response;
};

export const createCurso = async (curso: CursoCreate): Promise<Curso> => {
    const { data } = await axiosInstance.post<ResponseGenerico<Curso>>(URL, curso);
    return data.response;
};
