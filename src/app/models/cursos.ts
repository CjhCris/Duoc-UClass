export interface CursosResponse {
    message: string;
    cursos: Curso[];
}

export interface Curso {
sigla: any;
    id: number;
    nombre: string;
    descripcion: string;
    titulo: string;  
    subtitulo: string; 
    usuario: Usuario;
    imagen?: string; 
}

export interface Usuario {}
