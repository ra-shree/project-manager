import { api } from './';

export async function onLogout() {
    await api.post('/logout').then((res) => {
        console.log(res.data.message);
    });
}

export async function getUser() {
    await api.get('/api/user');
}
