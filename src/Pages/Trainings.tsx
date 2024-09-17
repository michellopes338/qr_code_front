import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import logo from "../assets/mip-logo.png";
import { useQuery } from "react-query";

interface Trainings {
  nome: string;
  validade: Date;
}
interface Person {
  matricula: string;
  funcionario: string;
  treinamentos: [Trainings];
}

export default function Trainings() {
  const { treinamentos } = useParams();
  const navigate = useNavigate();

  const { data, isError, isLoading } = useQuery(
    ["treinamentos", treinamentos],
    async (): Promise<Person | undefined> => {
      const res = await api.get(`treinamentos/de/${treinamentos}`);
      if (res.status === 200) {
        return res.data;
      } else {
        throw Error("Algo deu errado")
      }
    },
    { staleTime: 1000 * 60 * 60 * 24, keepPreviousData: true },
  );

  if (isError) {
    return (
      <h1 className="mt-4 mb-6 text-4xl font-extrabold leading-none tracking-tight text-center">
        Algo deu errado!
      </h1>
    );
  }

  if (isLoading) {
    return (
      <h1 className="mt-4 mb-6 text-4xl font-extrabold leading-none tracking-tight text-center">
        ta carregando chefe
      </h1>
    );
  }

  function back_to_search_page() {
    navigate(-1);
  }

  return (
    <>
      <div className="h-screen block margin-auto mx-2">
        <div className="flex justify-center items-center mt-2 mb-3">
          <img
            className="object-cover w-4/5 max-w-56"
            src={logo}
            alt="logo-mip"
          />
        </div>
        <h1 className="mt-4 mb-6 text-4xl font-extrabold leading-none tracking-tight text-center">
          {data!.funcionario}
        </h1>
        {data!.treinamentos.length < 1 ? (
          <h1 className="text-xl text-center">
            O <span className="font-bold">{data!.funcionario}</span> não possui
            treinamentos{" "}
          </h1>
        ) : (
          <table className="block table-auto bg-slate-100 cursor-default rounded border-orange-300 border-2">
            <thead>
              <tr className="">
                <th className="py-3 bg-orange-200">Treinamento</th>
                <th className="py-3 bg-orange-200">Validade</th>
              </tr>
            </thead>
            <tbody>
              {data!.treinamentos.map((treinamento) => {
                return (
                  <tr key={treinamento.nome}>
                    <td className="px-4 py-2 hover:bg-slate-200">
                      {treinamento.nome}
                    </td>
                    <td className="px-4 py-2 hover:bg-slate-200">
                      {new Date(treinamento.validade).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <br />
        <div>
          <button
            onClick={back_to_search_page}
            className="bg-orange-300 mb-4 font-bold text-gray-900 py-2 px-4 rounded hover:bg-orange-400"
          >
            &lt; Voltar
          </button>
        </div>
      </div>
    </>
  );
}
