import axios from "axios";
import { redirect } from 'react-router-dom';

function decodeCookies() {
    const cookies = document.cookie.split('; ')
    const entries = cookies.map(cookie => {
        return cookie.split('=')
    })

    return Object.fromEntries(entries);
}

const cookies = decodeCookies()

export const api = axios.create({
    baseURL: 'https://qrcode-production-7224.up.railway.app',
    // baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers: {
        patch: {
          "Content-Type": "application/json",
        },
        post: {
          "Content-Type": "application/json",
        },
        "Accept": 'application/json'
    },
})

api.interceptors.response.use(
    (res) => {
        return res;
    }, async (error) => {
        if (error.response.status === 401 && cookies.authotization) {
            const headers = {
                refresh: cookies.refresh
            }
            await api.post('auth/refresh', {}, { headers })
                .then(res => {
                    if (res.status === 200) {
                        document.cookie = `authorization=${res.data.new_access_token};`;
                        document.cookie = `refresh=${res.data.new_refresh_token};`;
                    }

                    if (res.status === 403) {
                        redirect('/admin/login')
                    }
                })
        }

        if (error.response.status === 401 && !cookies.authorization) {
            document.cookie = '';
            redirect('/admin')
        }

        return error;
    }
)
