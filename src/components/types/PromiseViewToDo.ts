export type RecordToDo = {
  uuid: string,
  id: string,
  title: string,
  deadline: Date,
  status: number,
  description: string
}

export type ResultCall = {
  isSuccess: boolean
  code: number
  aryToDoRecords: Array<RecordToDo>
}