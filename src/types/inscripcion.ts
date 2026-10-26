
export interface Inscripcion {
    idInscripcion: number;
    idCurso: number;
    curso: string; 
    idEstudiante: number;
    estudiante: string; 
    fechaInscripcion: string;
    estado: string; 
}


export interface InscripcionCreate {
    idCurso: number;
    idEstudiante: number;
}
