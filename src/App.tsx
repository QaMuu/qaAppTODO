import { Route, Routes } from 'react-router-dom'

import { 
  ChakraProvider,
  Flex
} from '@chakra-ui/react'

import { ToDoListContext, useToDoListProvider } from './components/providers/ToDoListProvider'
import Home from './components/pages/Home'
import AddToDo from './components/pages/AddToDo'
import License from './components/pages/License'

function App() {

  const ToDoListProvider = useToDoListProvider();

  return (
    <ChakraProvider>
      <ToDoListContext.Provider value={ToDoListProvider}>
        <div className='App'>
          <h1>Here the Top?</h1>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/AddToDo' element={<AddToDo />} />
            <Route path='/License' element={<License />} />
          </Routes>
        </div>
      </ToDoListContext.Provider>
    </ChakraProvider>
  )
}

export default App
