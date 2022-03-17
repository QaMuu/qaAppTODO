export type RecordToDo = {
  uuid: string,
  id: number,
  title: string,
  deadline: string,
  status: number,
  description: string
}

export type ResultCall = {
  isSuccess: boolean
  code: number
}