import React, { useState, useEffect } from 'react';

import { 
  Button,
  ButtonGroup,
  Input
} from '@chakra-ui/react';

import {ToDoListProvider } from '../providers/ToDoListProvider'
import { RecordToDo, ResultCall } from "../types/PromiseViewToDo";

import ListItemToDO from '../molecules/ListItemToDdo';

const Home = () => {
  const ToDoList:ToDoListProvider = new ToDoListProvider()
  const [currentDrawToDoList, setCurrenDrawToDoList] = useState<RecordToDo[]>([])

  const [ isLoading, setIsLoading ] = useState(true);
  const [ isSuccessLoad, setIsSuccessLoad ] = useState(false);
  const [ addNewToDoTitle, setAddNewToDoTitle] = useState('');

  useEffect(() => { initMount() },[])

  const initMount = () => {
    const resultCallGet: ResultCall = ToDoList.loadingToDoList()
    if(resultCallGet.isSuccess){
      successLoadToDoList()
    } else {
      failedLoadToDoList(resultCallGet.code)
    }
  }

  const successLoadToDoList = () => {
    setCurrenDrawToDoList(ToDoList.CurrentToDoList)
    setIsSuccessLoad(true)
    setIsLoading(false)
  }

  const failedLoadToDoList = (_catchErrorCode:number) =>{
    console.log('failed \n' + _catchErrorCode)
    
    setIsSuccessLoad(false)
    setIsLoading(false)
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddNewToDoTitle(e.target.value);
  };

  const handleOnSubmit = () => {
    if (!addNewToDoTitle) return;

    console.log('addNewToDoTitle')
    console.log(addNewToDoTitle)

    const nextID = ToDoList.CurrentToDoList.length + 1;

    const newActions: RecordToDo = {
      uuid: 'uuid',
      id: nextID,
      title: addNewToDoTitle,
      deadline: '',
      status: 0,
      description: ''
    }

    setCurrenDrawToDoList([...currentDrawToDoList, newActions])
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