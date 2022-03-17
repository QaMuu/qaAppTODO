import { RecordToDo, ResultCall } from '../types/PromiseViewToDo';
import LocalData from '../../testData/testToDo.json'

export class ToDoListProvider {
  public CurrentToDoList: Array<RecordToDo> = [] 

  getCurrentToDoList = ():Array<RecordToDo> => {
    return this.CurrentToDoList
  }

  loadingToDoList = ():ResultCall => {
    let returnResult:ResultCall = {
      isSuccess: false,
      code: 401,
    }

    // TODO:サーバーを呼んでデータをセットする
    this.CurrentToDoList = LocalData.value as Array<RecordToDo>
    returnResult.isSuccess = true
    returnResult.code = 201

    return returnResult 
  }

  addNewToDo = (catchAddToDo:RecordToDo):ResultCall => {
    let returnResult:ResultCall = {
      isSuccess:false,
      code: 401,
    }

    // TODO:サーバにちゃんと書き込む
    this.CurrentToDoList.push(catchAddToDo)
    returnResult.isSuccess = true
    returnResult.code = 201

    return returnResult 
  }

  removeToDo = (catchTargetID:number):ResultCall => {
    let returnResult:ResultCall = {
      isSuccess:false,
      code: 401,
    }

    // TODO:サーバから消す
    this.CurrentToDoList = this.CurrentToDoList.filter((element, index) => (index !== catchTargetID))
    returnResult.isSuccess = true
    returnResult.code = 201

    return returnResult 
  }

  updateToDo = (catchTargetToDo:RecordToDo):ResultCall => {
    let returnResult:ResultCall = {
      isSuccess:false,
      code: 401,
    }

    // TODO:サーバを更新する
    const targetIndex = catchTargetToDo.id
    this.CurrentToDoList = this.CurrentToDoList.map((element, index) => (index === targetIndex ? catchTargetToDo : element))
    returnResult.isSuccess = true
    returnResult.code = 201

    return returnResult 
  }
}