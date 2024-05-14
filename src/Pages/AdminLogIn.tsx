import { useEffect, useRef } from "react"
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminLogIn() {
    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (document.cookie.includes('authorization')) {
            navigate('main', { replace: true })
        }
    }, [navigate])

    async function login(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const username = usernameInput.current?.value;
        const password = passwordInput.current?.value;

        const res = await api.post('/auth/login', {
            username,
            password
        })

        document.cookie = `authorization=${res.data.access_token};`;
        document.cookie = `refresh=${res.data.refresh_token};`;

        navigate('/admin/main', { replace: true })
    }
    
    return (
        <>
            <div className="h-screen flex items-center justify-center">
                <form onSubmit={login}>
                    <div>
                        <label htmlFor="username">Usuario</label>
                    </div>
                    <div>
                        <input name="username" ref={usernameInput} type="text" className="block w-full rounded-lg border border-gray-200 bg-gray-100 p-2.5 text-sm text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500" />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="password">Senha</label>
                    </div>
                    <div>
                        <input name="password" ref={passwordInput} type="password" className="block w-full rounded-lg border border-gray-200 bg-gray-100 p-2.5 text-sm text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500" />
                    </div>
                    <br />
                    <div>
                        <button className='shadow bg-orange-300 w-full hover:bg-orange-400 focus:shadow-outline focus:outline-none text-gray-900 font-bold py-2 px-4 rounded'>Pesquisar</button>
                    </div>
                </form>
            </div>
        </>
    )
}