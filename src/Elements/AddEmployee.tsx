import { useRef } from "react";

export function AddEmployee() {
    const chapaInput = useRef<HTMLInputElement>(null);
    const nomeInput = useRef<HTMLInputElement>(null);

    function addEmployee(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();


    }

    return (
        <div className="h-full">
            <h1 className="text-4xl text-white font-bold">Adiciona Funcionario</h1>
            <br /><br /><br /><br />
            <form className="w-3/4 mx-auto my-3" onSubmit={addEmployee}>
                <div>
                    <label htmlFor="chapa" className="font-bold text-white">Usuario</label>
                </div>
                <div className="">
                    <input
                        name="chapa"
                        ref={chapaInput}
                        type="text"
                        pattern="[0-9]"
                        required
                        className="block w-full rounded-2xl border border-neutral-300 bg-gray-300 py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
                        placeholder="chapa..."
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="nome" className="font-bold">Usuario</label>
                </div>
                <div>
                    <input
                        name="nome"
                        ref={nomeInput}
                        type="text"
                        required
                        placeholder="nome"
                        className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
                    />
                </div>
            </form>
        </div>
    )
}