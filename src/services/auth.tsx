import { Cookies } from "react-cookie";
import { api } from "./api";

export const AUTHOTIZATION_TOKEN_KEY = "authorization";
export const REFRESH_TOKEN_KEY = "refresh";
// const [cookies, setCookie, removeCookie] = useCookies([AUTHOTIZATION_TOKEN_KEY, REFRESH_TOKEN_KEY]);
const cookies = new Cookies([AUTHOTIZATION_TOKEN_KEY, REFRESH_TOKEN_KEY])

export function is_authenticated() {
    const auth_token = cookies.get(AUTHOTIZATION_TOKEN_KEY);
    return auth_token !== undefined;
}

export function get_tokens() {
    return {
        authorization: cookies.get(AUTHOTIZATION_TOKEN_KEY),
        refresh: cookies.get(REFRESH_TOKEN_KEY)
    };
}
// export const getToken = () => localStorage.getItem(TOKEN_KEY);

export async function login(
    username: string,
    password: string,
) {
    const response = await api.post('/auth/login', {
        username,
        password
    });

    if (response.status !== 200) {
        console.log('teste');
        throw new Error(response.response.data.message);
    }

    const authorization_token = response.data.access_token;
    const refresh_token = response.data.refresh_token;

    cookies.set(AUTHOTIZATION_TOKEN_KEY, authorization_token, { path: '/', sameSite: true });
    cookies.set(REFRESH_TOKEN_KEY, refresh_token, { path: '/', sameSite: true });
}

export function logout() {
    cookies.remove(AUTHOTIZATION_TOKEN_KEY);
    cookies.remove(REFRESH_TOKEN_KEY);
}