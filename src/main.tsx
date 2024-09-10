import React from 'react'
import ReactDOM from 'react-dom/client'
import Search from './Pages/Search.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Trainings from './Pages/Trainings.tsx';
import AdminLogIn from './Pages/AdminLogIn.tsx';
import AdminMain from './Pages/Admin/Main.tsx';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Search />} ></Route>
        <Route path='/admin' element={<AdminLogIn />}></Route>
        <Route path='/admin/main' element={<AdminMain />}></Route>
        <Route id='treinamentos' path='/:treinamentos' element={<Trainings />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <CookiesProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CookiesProvider>
  </QueryClientProvider>
)
