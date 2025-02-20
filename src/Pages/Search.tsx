import { useRef } from "react";
import { useNavigate } from "react-router-dom";


export default function Search() {
  const navigate = useNavigate();
  const search_input_ref = useRef<HTMLInputElement>(null);
  // const queryClient = useQueryClient();

  function to_show_page(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // axios.get(`${baseURL}/treinamentos/${e.target.value}`)
    const treinamentos_from = search_input_ref?.current?.value;
    navigate(`/${treinamentos_from}`);
  }

  return (
    <>
      <div className="h-screen flex items-center justify-center">
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
              id="search"
              autoComplete='off'
              placeholder='3024...'
              className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
              pattern="[0-9]"
              required
              min="0"
              type="number"/>
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
          </div>
        </form>
      </div>
    </>
  );
}
