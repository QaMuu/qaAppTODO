import { RecordToDo, ResultCall } from '../types/PromiseViewToDo';

export class ProviderToDoList {
  public UUID: string

  constructor(_targetUUID:string) {
    this.UUID = _targetUUID
  }

  getToDoList = ():ResultCall => {
    let tempAryToDoRecords: Array<RecordToDo> = new Array<RecordToDo>()

    // ToDo:サーバーを呼んでデータをセットする
    // set test data start
    const testRecord_00: RecordToDo = {
      uuid: this.UUID,
      id: '000',
      title: '企画資料を作る',
      deadline: new Date(2022,2,16,12,0,0),
      status: 0,
      description: '〇〇社用の企画書を作る'
    }

    tempAryToDoRecords.push(testRecord_00)

    const testRecord_01: RecordToDo = {
      uuid: this.UUID,
      id: '001',
      title: '電池を買ってくる',
      deadline: new Date(2022,2,16,21,0,0),
      status: 1,
      description: ''
    }

    tempAryToDoRecords.push(testRecord_01)

    const testRecord_02: RecordToDo = {
      uuid: this.UUID,
      id: '002',
      title: 'スーツを取りに行く',
      deadline: new Date(2022,2,17,21,0,0),
      status: 2,
      description: ''
    }

    tempAryToDoRecords.push(testRecord_02)

    const testRecord_03: RecordToDo = {
      uuid: this.UUID,
      id: '003',
      title: 'スーツをクリーニングに出す',
      deadline: new Date(2022,2,15,18,0,0),
      status: 3,
      description: ''
    }

    tempAryToDoRecords.push(testRecord_03)
    // end test data start

    const returnGetResult:ResultCall = {
      isSuccess: true,
      code: 201,
      aryToDoRecords: tempAryToDoRecords
    }

    return returnGetResult 
  }
}