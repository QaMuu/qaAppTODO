import React, { useState, useEffect } from 'react';

import {  Button, ButtonGroup, Input } from '@chakra-ui/react';

import { ProviderToDoList } from '../providers/ProviderToDoList'
import { RecordToDo, ResultCall } from "../types/PromiseViewToDo";

import ListItemToDO from '../molecules/ListItemToDdo';

const Home = () => {
  const listProvider:ProviderToDoList = new ProviderToDoList('uuid')
  const [currentAryToDoList, setCurrenArrayToDoList] = useState<RecordToDo[]>([])

  const [ isLoading, setIsLoading ] = useState(true);
  const [ isSuccessLoad, setIsSuccessLoad ] = useState(false);
  const [ addNewActionTitle, setAddNewActionTitle] = useState('');

  useEffect(() => { initMount() },[])

  const initMount = () => {
    const resultCallGet: ResultCall = listProvider.getToDoList()
    if(resultCallGet.isSuccess){
      successLoadToDoList(resultCallGet.aryToDoRecords)
    } else {
      failedLoadToDoList(resultCallGet.code)
    }
  }

  const successLoadToDoList = (_catchArray:Array<RecordToDo>) =>{
    setCurrenArrayToDoList(_catchArray)
    setIsSuccessLoad(true)
    setIsLoading(false)
  }

  const failedLoadToDoList = (_catchErrorCode:number) =>{
    console.log('failed \n' + _catchErrorCode)
    
    setIsSuccessLoad(false)
    setIsLoading(false)
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddNewActionTitle(e.target.value);
  };

  const handleOnSubmit = () => {
    if (!addNewActionTitle) return;

    console.log('addNewActionTitle')
    console.log(addNewActionTitle)

    const nextID = currentAryToDoList.length + 1

    const newActions: RecordToDo = {
      uuid: 'uuid',
      id: nextID.toString(),
      title: addNewActionTitle,
      deadline: new Date(),
      status: 0,
      description: ''
    }

    setCurrenArrayToDoList([newActions, ...currentAryToDoList])
    setAddNewActionTitle('');
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
            <input type="text" value={addNewActionTitle} onChange={(e) => handleOnChange(e)} />
            <input type="submit" value="追加" onSubmit={handleOnSubmit} />
          </form>
        </div>
      }

      {!isLoading && isSuccessLoad &&
        currentAryToDoList.map((element:RecordToDo, key) => 
          <ListItemToDO itemNumber={key} data={element} key={key} />
        )
      }

    </main>
  )
}

export default Home