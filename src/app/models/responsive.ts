export interface Auth{
    token:string;
    type:string;
}

export interface User{
    id: number,
    run: string,
    nombre: string,
    apellido: string,
    nombre_completo: string,
    correo: string,
    perfil: string,
    img: string,
    
}

export interface Responsive{
    mensaje: string;
    perfil: string;
    autenticacion: Auth;
    data: User;
}

