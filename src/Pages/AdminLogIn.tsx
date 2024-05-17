import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { is_authenticated, login } from "../services/auth";

export default function AdminLogIn() {
    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        if (is_authenticated()) {
            navigate('main', { replace: true })
        }
    }, [navigate])

    async function loginForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const username = usernameInput.current!.value;
        const password = passwordInput.current!.value;

        try {
            await login(username, password)
        } catch(error) {
            setError(error.message);
            usernameInput.current!.value = '';
            passwordInput.current!.value = '';
            return;
        }

        navigate('/admin/main', { replace: true })
    }

    return (
        <>
            <div className="h-screen flex items-center justify-center">
                <form onSubmit={loginForm}>
                    <div className="text-red-400 text-center" hidden={!error}>
                        {error}
                    </div>
                    <br />
                    <div>
                        <label htmlFor="username" className="font-bold">Usuario</label>
                    </div>
                    <div>
                        <input
                            name="username"
                            placeholder="insira seu usuario"
                            required
                            ref={usernameInput}
                            type="text"
                            className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="password" className="font-bold">Senha</label>
                    </div>
                    <div>
                        <input
                            name="password"
                            required
                            placeholder="insira sua senha"
                            ref={passwordInput}
                            type="password"
                            className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
                        />
                    </div>
                    <br />
                    <div>
                        <button className='shadow bg-orange-300 w-full hover:bg-orange-400 focus:shadow-outline focus:outline-none text-gray-900 font-bold py-2 px-4 rounded'>Entrar</button>
                    </div>
                </form>
            </div>
        </>
    )
}