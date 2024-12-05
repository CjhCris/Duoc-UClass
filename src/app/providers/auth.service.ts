import {Injectable} from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private TOKEN_KEY = 'auth-token';
    private PROFILE_KEY = 'perfil';
    private NAME_KEY = 'nombre';

    async setToken(token: string): Promise<void> {
        await Preferences.set({ key: this.TOKEN_KEY, value: token });
        console.log('token guardado en el local storage: ', token);
    }

    async getToken(): Promise<string | null> {
        const result = await Preferences.get({ key: this.TOKEN_KEY });
        return result.value || '';
    }

    async setPerfil(perfil: string): Promise<void> {
        await Preferences.set({ key: this.PROFILE_KEY, value: perfil });
        console.log('perfil guardado en el local storage: ', perfil);
    }

    async getPerfil(): Promise<string | null> {
        const result = await Preferences.get({ key: this.PROFILE_KEY });
        return result.value || '';
    }

    async setNombre(nombre: string): Promise<void> {
        await Preferences.set({ key: this.NAME_KEY, value: nombre });
        console.log('nombre guardado en el local storage: ', nombre);
    }

    async getNombre(): Promise<string | null> {
        const result = await Preferences.get({ key: this.NAME_KEY });
        return result.value || '';
    }

    async isAuthenticated(): Promise<boolean> {
        const token = await this.getToken();
        return !!token;
    }

    async logout(): Promise<void> {
        await Preferences.clear();
        console.log('Sesión cerrada');
    }
}