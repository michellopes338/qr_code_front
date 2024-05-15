import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

interface Nomes {
  nome: string;
  matricula: string;
}

export default function Search() {
  const navigate = useNavigate();
  const [search_names, setSearch_nomes] = useState<Array<Nomes> | null>(null);
  const [is_autocomplete_hidden, setIs_autocomplete_hidden] = useState<boolean>(true);
  const search_input_ref = useRef<HTMLInputElement>(null);

  function to_show_page(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    // axios.get(`${baseURL}/treinamentos/${e.target.value}`)
    const treinamentos_from = search_input_ref?.current?.value
    navigate(`/${treinamentos_from}`);
  }

  async function autocomplete(event: React.ChangeEvent<HTMLInputElement>) {
    const regex = /^[a-zA-Z]+$/;
    const value = event.target.value;
    const is_chapa = regex.test(value[0]); // test if first char of input value is numeric

    if (!is_chapa) {
      return;
    }

    setIs_autocomplete_hidden(false);

    const response = await api.get(`/autocomplete/${value}`);
    const names = response.data;
    setSearch_nomes(names);
  }

  function hide_autocomplete() {
    setIs_autocomplete_hidden(true);
  }

  function select_option(selected: string) {
    search_input_ref.current!.value = selected;
  }

  return (
    <>
      <div className="h-screen flex items-center justify-center" onClick={hide_autocomplete}>
        <form onSubmit={to_show_page}>
          <div>
            <label className="block text-gray-500 font-bold" htmlFor="search">
              Chapa / Nome
            </label>
          </div>
          <div className="relative">
            <input
              name='search'
              ref={search_input_ref}
              onChange={autocomplete}
              id="search"
              autoComplete='off'
              placeholder='3024... ou Jhon Doe'
              className="block w-full rounded-lg border border-gray-200 bg-gray-100 p-2.5 text-sm text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
              pattern="[0-9a-zA-Z ãÃ]{6,}"
              required
              type="text"/>
              <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Insira um valor valido
              </span>

              <div className="w-full h-60 border border-gray-300 rounded-md bg-white absolute overflow-y-auto" hidden={is_autocomplete_hidden}>
                {search_names?.map((obj) => {
                  return (
                    <div onClick={() => {select_option(obj.nome)}} className="px-5 border-b border-gray-200 text-stone-900 cursor-pointer hover:bg-slate-100" key={obj.matricula}>{obj.nome}</div>
                  )
                })}
              </div>
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
