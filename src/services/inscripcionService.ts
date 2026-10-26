import axiosInstance from "./axiosInstance";
import type { Inscripcion, InscripcionCreate } from "../types/inscripcion";
import type { ResponseGenerico } from "../types/responseGenerico";

const URL = "api/Inscripcion";

export const inscribir = async (inscripcion: InscripcionCreate): Promise<ResponseGenerico<Inscripcion>> => {
    const { data } = await axiosInstance.post<ResponseGenerico<Inscripcion>>(URL, inscripcion);
    return data;
};

export const getInscripcion = async (id: number): Promise<Inscripcion> => {
    const { data } = await axiosInstance.get<ResponseGenerico<Inscripcion>>(`${URL}/${id}`);
    return data.response;
};

export const getInscripcionesByEstudiante = async (idEstudiante: number): Promise<Inscripcion[]> => {
    const { data } = await axiosInstance.get<ResponseGenerico<Inscripcion[]>>(`${URL}/estudiante/${idEstudiante}`);
    return data.response;
};

export const getInscripcionesByCurso = async (idCurso: number): Promise<Inscripcion[]> => {
    const { data } = await axiosInstance.get<ResponseGenerico<Inscripcion[]>>(`${URL}/curso/${idCurso}`);
    return data.response;
};

export const cancelarInscripcion = async (id: number): Promise<Inscripcion> => {
    const { data } = await axiosInstance.put<ResponseGenerico<Inscripcion>>(`${URL}/${id}/cancelar`);
    return data.response;
};
