export interface crearAsignatura {
    sigla: string;
    nombre: string;
    institucion: string;
    descripcion: string;
}

export interface Curso{
    id: number;
    nombre: string;
    sigla: string;
    institucion: string;
    descripcion: string;
}

export interface Cursos{
    mensaje: string;
    cursos: Curso;
}