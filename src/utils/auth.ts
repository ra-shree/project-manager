import { api } from './';

export async function onLogin(values: any) {
    await api.get('/sanctum/csrf-cookie');
    try {
        await api.post('/login', values);
    } catch (err) {
        console.log(err);
    }
}

export async function onLogout() {
    await api.post('/logout').then((res) => {
        console.log(res.data.message);
    });
}

export async function onRegister(values: any) {
    await api.get('/sanctum/csrf-cookie');
    try {
        await api.post('/register', values);
    } catch (err) {
        console.log(err);
    }
}

export async function getUser() {
    try {
        const result = await api.get('/api/user');
        return result.data;
    } catch (err) {
        console.log(err);
    }
    return null;
}
