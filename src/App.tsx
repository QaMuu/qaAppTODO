import { Route, Routes } from 'react-router-dom'

import Home from './components/pages/Home'
import AddToDo from './components/pages/AddToDo'
import License from './components/pages/License'

function App() {
  return (
    <div className='App'>
      <h1>Here the Top?</h1>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/AddToDo' element={<AddToDo />} />
        <Route path='/License' element={<License />} />
      </Routes>
    </div>
  )
}

export default App
