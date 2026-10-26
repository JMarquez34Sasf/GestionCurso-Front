
export interface Curso {
    idCurso: number;
    titulo: string;
    descripcion: string;
    duracionHoras: number;
    fechaInicio: string; 
    fechaFin: string;
    usuario: string; 
}


export interface CursoCreate {
    titulo: string;
    descripcion: string;
    duracionHoras: number;
    fechaInicio: string;
    fechaFin: string;
    usuario: number; 
}
