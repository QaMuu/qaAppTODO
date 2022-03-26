import { createContext, useState, useCallback } from 'react';

import { RecordToDo, ResultCall } from '../types/PromiseViewToDo';
import LocalData from '../../testData/testToDo.json'

const defaultFunctionReturnResultCall = ():Promise<ResultCall> => {
  return new Promise((resolve) => {
      
    let callResult:ResultCall = {
      isSuccess:false,
      code:401
    }

    resolve(callResult)
  })
}

type typeToDoListContext = {
  CurrentToDoList: Array<RecordToDo>
  loadingToDoList: () => Promise<ResultCall>
  addNewToDoRecord: (catchAddToDo:RecordToDo) => Promise<ResultCall>
  removeToDoRecord: (catchTargetID:RecordToDo) => Promise<ResultCall>
  updateToDoRecord: (catchTargetToDo:RecordToDo) => Promise<ResultCall>
}

const defaultToDoListContext: typeToDoListContext = {
  CurrentToDoList: [],
  loadingToDoList: ():Promise<ResultCall> => defaultFunctionReturnResultCall(),
  addNewToDoRecord: ():Promise<ResultCall> => defaultFunctionReturnResultCall(),
  removeToDoRecord: ():Promise<ResultCall> => defaultFunctionReturnResultCall(),
  updateToDoRecord: ():Promise<ResultCall> => defaultFunctionReturnResultCall()
}

const virtualTestServer = ():Promise<object> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('LifeCyCle-03 : CallBack Local Data')
      resolve(LocalData.value);
    }, 1000);
  })
}

export const ToDoListContext = createContext(defaultToDoListContext)

export const useToDoListProvider = (): typeToDoListContext => {

  const [ CurrentToDoList, setCurrentToDoList] = useState<RecordToDo[]>([])

  const callBackLoadingToDoList = ():Promise<ResultCall> => {
    return new Promise(async(resolve) => {
      
      let callResult:ResultCall = {
        isSuccess:false,
        code:401
      }

      console.log("LifeCyCle-02 : run Loading Provider's ToDo List")
      
      // TODO:サーバーからデータを読み込む
      await virtualTestServer()
        .then((response: any) =>{

          const tempArray: Array<RecordToDo> = response as Array<RecordToDo>
          console.log('LifeCyCle-04 : Catch Local Data')
          console.log(tempArray)

          setCurrentToDoList(tempArray)
          console.log('LifeCyCle-05 : setCurrentToDoList')
          console.log(CurrentToDoList)
          callResult.isSuccess = true
          callResult.code = 200
          resolve(callResult)
        })
    })
  }

  const callBackAddNewToDoRecord = (catchAddToDo:RecordToDo):Promise<ResultCall> => {
    return new Promise((resolve) => {
      
      let callResult:ResultCall = {
        isSuccess:false,
        code:401
      }

      console.log('run callBack Add')
      // TODO:サーバーを呼んで書き込む
      setCurrentToDoList([...CurrentToDoList, catchAddToDo])
      callResult.isSuccess = true
      callResult.code = 200

      resolve(callResult)
    })
  }

  const callBackRemoveToDoRecord = (catchTargetID:RecordToDo):Promise<ResultCall> => {
    return new Promise((resolve) => {
      
      let callResult:ResultCall = {
        isSuccess:false,
        code:401
      }

      console.log('run callBack Remove')
      // TODO:サーバから消す
      setCurrentToDoList(
        CurrentToDoList.filter((element) => (element !== catchTargetID))
      )
      callResult.isSuccess = true
      callResult.code = 200

      resolve(callResult)
    })
  }

  const callBackUpdateToDoRecord = (catchTargetToDo:RecordToDo):Promise<ResultCall> => {
    return new Promise((resolve) => {
      
      let callResult:ResultCall = {
        isSuccess:false,
        code:401
      }

      console.log('run callBack Update')
      // TODO:サーバを更新する
      const targetIndex = catchTargetToDo.id

      setCurrentToDoList(
        CurrentToDoList.map((element, index) => (index === targetIndex ? catchTargetToDo : element))
      )
      callResult.isSuccess = true
      callResult.code = 200

      resolve(callResult)
    })

  }

  const loadingToDoList = useCallback(callBackLoadingToDoList, [])
  const addNewToDoRecord = useCallback(callBackAddNewToDoRecord, [])
  const removeToDoRecord = useCallback(callBackRemoveToDoRecord, [])
  const updateToDoRecord = useCallback(callBackUpdateToDoRecord, [])

  return {
    CurrentToDoList,
    loadingToDoList,
    addNewToDoRecord,
    removeToDoRecord,
    updateToDoRecord
  }
}