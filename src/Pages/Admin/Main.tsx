import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { is_authenticated } from "../../services/auth";
import { AddEmployee } from "../../Elements/AddEmployee";


export default function AdminMain() {
    const navigate = useNavigate();
    const [menus, setMenus] = useState(1);

    useEffect(() => {
        if (!is_authenticated()) {
            navigate('/admin', { replace: true })
        }
    }, [navigate])

    function changeMenu(index: number) {
        setMenus(index);
    }

    return (
        <>
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a onMouseDown={() => changeMenu(1)} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="ms-3">Adicionar Funcionario</span>
                            </a>
                        </li>
                        <li>
                            <a onMouseDown={() => changeMenu(2)}  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="flex-1 ms-3 whitespace-nowrap">Remover Funcionario</span>
                            </a>
                        </li>
                    </ul>
                    <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                        <li>
                            <a onMouseDown={() => changeMenu(3)}  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="flex-1 ms-3 whitespace-nowrap">Adicionar Treinamento</span>
                            </a>
                        </li>
                        <li>
                            <a onMouseDown={() => changeMenu(4)}  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="flex-1 ms-3 whitespace-nowrap">Remover Treinamento</span>
                            </a>
                        </li>
                    </ul>
                    <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                        <li>
                            <a onMouseDown={() => changeMenu(5)}  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="flex-1 ms-3 whitespace-nowrap">Editar treinamento<br />de funcionarios</span>
                            </a>
                        </li>
                        <li>
                            <a onMouseDown={() => changeMenu(6)}  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="flex-1 ms-3 whitespace-nowrap">Remover treinamento<br />de funcionarios</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="h-screen border-l border-gray-700 sm:ml-64 bg-gray-800">
                <div className="p-4" hidden={!(menus === 1)}>
                    <AddEmployee />
                </div>
                <div hidden={!(menus === 2)}>
                    <h1>Remove funcionario</h1>
                </div>
                <div hidden={!(menus === 3)}>
                    <h1>Adiciona treinamento</h1>
                </div>
                <div hidden={!(menus === 4)}>
                    <h1>Remove treinamento</h1>
                </div>
                <div hidden={!(menus === 5)}>
                    <h1>Editar treinamento de funcionarios</h1>
                </div>
                <div hidden={!(menus === 6)}>
                    <h1>Remover treinamento de funcionarios</h1>
                </div>
            </div>
        </>
    )
}