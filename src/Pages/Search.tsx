import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useQueryClient } from "react-query";

interface Nomes {
  nome: string;
  matricula: string;
}

export default function Search() {
  const navigate = useNavigate();
  const [search_names, setSearch_nomes] = useState<Array<Nomes> | null>(null);
  const [is_autocomplete_hidden, setIs_autocomplete_hidden] =
    useState<boolean>(true);
  const search_input_ref = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  function to_show_page(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // axios.get(`${baseURL}/treinamentos/${e.target.value}`)
    const treinamentos_from = search_input_ref?.current?.value;
    navigate(`/${treinamentos_from}`);
  }

  async function autocomplete(event: React.ChangeEvent<HTMLInputElement>) {
    const regex = /^[a-zA-Z]+$/;
    const value = event.target.value;

    if (value.length < 3) {
      return;
    }

    const is_chapa = regex.test(value[0]); // test if first char of input value is numeric

    if (!is_chapa) {
      return;
    }

    setIs_autocomplete_hidden(false);

    const response = await api.get(`/autocomplete/${value}`);
    const names = response.data;
    setSearch_nomes(names);
  }

  async function prefetchTraining(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length === 8) {
      const matricula = event.target.value;

      const cached = queryClient.getQueryData(["treinamentos", matricula]);

      if (!cached) {
        await queryClient.prefetchQuery(
          ["treinamentos", matricula],
          async () => {
            const res = await api.get(`treinamentos/de/${matricula}`);
            return res.data;
          },
          { staleTime: 1000 * 60 * 60 * 24 },
        );
      }
    }
  }

  async function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    autocomplete(event);
    prefetchTraining(event);
  }

  function hide_autocomplete() {
    setIs_autocomplete_hidden(true);
  }

  function select_option(selected: string) {
    search_input_ref.current!.value = selected;
  }

  return (
    <>
      <div
        className="h-screen flex items-center justify-center"
        onClick={hide_autocomplete}
      >
        <form onSubmit={to_show_page}>
          <div>
            <label className="block text-gray-700 font-bold" htmlFor="search">
              Chapa
            </label>
          </div>
          <div className="relative">
            <input
              name="search"
              ref={search_input_ref}
              onChange={handleInput}
              id="search"
              autoComplete="off"
              placeholder="3024..."
              className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
              pattern="[0-9a-zA-Z ãÃ]{8}"
              required
              type="text"
            />
            <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
              Insira um valor valido
            </span>

            <div className="absolute inset-y-1 right-1 flex justify-end">
              <button
                type="submit"
                aria-label="Submit"
                className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
              >
                <svg viewBox="0 0 16 6" aria-hidden="true" className="w-4">
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 3 10 .5v2H0v1h10v2L16 3Z"
                  ></path>
                </svg>
              </button>
            </div>

            <div
              className="w-full h-60 border border-gray-300 rounded-md bg-white absolute overflow-y-auto"
              hidden={is_autocomplete_hidden}
            >
              {search_names?.map((obj) => {
                return (
                  <div
                    onClick={() => {
                      select_option(obj.nome);
                    }}
                    className="px-5 border-b border-gray-200 text-stone-900 cursor-pointer hover:bg-slate-100"
                    key={obj.matricula}
                  >
                    {obj.nome}
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
