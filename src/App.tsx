import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cursos from './pages/Cursos'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/Cursos' element={<Cursos></Cursos>}></Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App