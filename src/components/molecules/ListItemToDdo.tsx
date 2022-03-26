import { useState, useEffect } from "react"

import { 
  Box,
} from "@chakra-ui/react"

import { RecordToDo } from "../types/PromiseViewToDo"

interface props {
  itemNumber:number,
  data:RecordToDo
}

const ListItemToDO = (props:props) => {

  const [currentStatus, setCurrentStatus] = useState('')

  useEffect(() => { changeStatus() },[props.data.status])

  const changeStatus = () => {
    let setStatusString = '';
    switch (props.data.status) {
      case 0:
        setStatusString = '未着手';
        break;
    
      case 1:
        setStatusString = '着手中';
        break;
    
      case 2:
        setStatusString = '結果待ち';
        break;
    
      case 3:
        setStatusString = '完了';
        break;
    
      default:
        break;
    }

    setCurrentStatus(setStatusString)
  }

  return (
    <Box bg='tomato' w='100%' p='4' color='white' m='2' rounded='12'>
      <h3>{ (props.itemNumber + 1) + ' : ' + props.data.title }</h3>
      <h4>{ currentStatus }</h4>
      <b>{ props.data.deadline }</b>
      <p>{ props.data.description }</p>
      <p>{ props.data.id }</p>
    </Box>
  )
}

export default ListItemToDO