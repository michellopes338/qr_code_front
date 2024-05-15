import { Cookies } from "react-cookie";

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

export function login(
    authorization_token: string,
    refresh_token: string,
) {
    cookies.set(AUTHOTIZATION_TOKEN_KEY, authorization_token, { path: '/' });
    cookies.set(REFRESH_TOKEN_KEY, refresh_token, { path: '/' });
}

export function logout() {
    cookies.remove(AUTHOTIZATION_TOKEN_KEY);
    cookies.remove(REFRESH_TOKEN_KEY);
}