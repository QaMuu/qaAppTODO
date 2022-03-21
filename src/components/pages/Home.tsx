import React, { useState, useEffect, useContext } from 'react';

import { 
  Button,
  ButtonGroup,
  Input
} from '@chakra-ui/react';

import { ToDoListContext } from '../providers/ToDoListProvider'
import { RecordToDo, ResultCall } from "../types/PromiseViewToDo";

import ListItemToDO from '../molecules/ListItemToDdo';

const Home = () => {
  const ToDoListProvider = useContext(ToDoListContext)
  const [currentDrawToDoList, setCurrenDrawToDoList] = useState<RecordToDo[]>([])

  const [ isLoading, setIsLoading ] = useState(true);
  const [ isSuccessLoad, setIsSuccessLoad ] = useState(false);
  const [ addNewToDoTitle, setAddNewToDoTitle] = useState('');

  // useEffect(() => { initMount() },[currentDrawToDoList])
  useEffect(() => { initMount() },[])

  const initMount = async() => {
    console.log('LifeCyCle-01 : run initMount')
    await ToDoListProvider.loadingToDoList()
      .then((response:ResultCall) => {
        console.log('LifeCycle-06 : Response Load Provider Data')
        console.log(response)
        if(response.isSuccess) {
          successLoadToDoList()
        }
      })
  }

  const successLoadToDoList = () => {
    console.log('LifeCycle-07 : success loading')
    console.log(ToDoListProvider.CurrentToDoList)
    setCurrenDrawToDoList(ToDoListProvider.CurrentToDoList)
    setIsSuccessLoad(true)
    setIsLoading(false)
    console.log('Cycle end')
    console.log('===========')
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddNewToDoTitle(e.target.value);
  };

  const handleOnSubmit = () => {
    if (!addNewToDoTitle) return;

    const nextID = ToDoListProvider.CurrentToDoList.length + 1;

    const newToDo: RecordToDo = {
      uuid: 'uuid',
      id: nextID,
      title: addNewToDoTitle,
      deadline: '',
      status: 0,
      description: ''
    }

    ToDoListProvider.addNewToDoRecord(newToDo)

    setAddNewToDoTitle('');
  };  

  return(
    <main>
      <h2>Hi! here the Home!</h2>
      
      {isLoading &&
        <p>Loading...</p>
      }

      {!isLoading && !isSuccessLoad &&
        <p>Sorry! I'm Loading Failed...</p>
      }

      {!isLoading && isSuccessLoad &&
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleOnSubmit();
            }}
          >
            <Input type="text" value={addNewToDoTitle} onChange={(e) => handleOnChange(e)} />
            <Button type="submit" onSubmit={handleOnSubmit}>追加</Button>
          </form>
        </div>
      }

      {!isLoading && isSuccessLoad &&
        currentDrawToDoList.map((element:RecordToDo, key) => 
          <ListItemToDO itemNumber={key} data={element} key={key} />
        )
      }

    </main>
  )
}

export default Home