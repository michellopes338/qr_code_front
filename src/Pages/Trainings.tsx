import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';

interface Trainings {
    nome: string;
    validade: Date;
}
interface Person {
    matricula: string;
    funcionario: string;
    treinamentos: [
        Trainings
    ]
}

export default function Trainings() {
    const [data, setData] = useState<Person>();
    const { treinamentos } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchData() {
            const response = await api.get(`treinamentos/de/${treinamentos}`)
            setData(response.data);
        }
        fetchData();
    }, [treinamentos])

    function back_to_search_page() {
        navigate(-1);
    }

    return data ? (
        <>
            <div className="h-screen flex items-center justify-center">
                {/* <h1>{data.funcionario}</h1> */}
                {data.treinamentos.length === 0 ? (
                    <h1 className='text-xl'>O <span className='font-bold'>{data.funcionario}</span> não possui treinamentos </h1>
                ) : (
                    <table className="block table-auto bg-slate-100 cursor-default rounded border-orange-300 border-2">
                    <thead>
                        <tr className=''>
                            <th className='py-3 bg-orange-200'>Treinamento</th>
                            <th className='py-3 bg-orange-200'>Validade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.treinamentos.map((treinamento) => {
                            return (
                                <tr key={treinamento.nome}>
                                    <td className='px-4 py-2 hover:bg-slate-200'>{treinamento.nome}</td>
                                    <td className='px-4 py-2 hover:bg-slate-200'>{new Date(treinamento.validade).toLocaleDateString()}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                ) }
                <br />
                <div className='absolute bottom-0 left-0 m-5'>
                    <button onClick={back_to_search_page} className='bg-orange-300 font-bold text-gray-900 py-2 px-4 rounded hover:bg-orange-400'>&lt; Voltar</button>
                </div>
            </div>
        </>
    ) : <div>Carregando</div>
}