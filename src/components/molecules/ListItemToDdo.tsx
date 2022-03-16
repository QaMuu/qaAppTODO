import { useState, useEffect } from "react"
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
    <section>
      <h3>{ (props.itemNumber + 1) + ' : ' + props.data.title }</h3>
      <h4>{ currentStatus }</h4>
      <b>{ props.data.deadline.toDateString() }</b>
      <p>{ props.data.description }</p>
      <p>{ props.data.id }</p>
      <hr />
    </section>
  )
}

export default ListItemToDO