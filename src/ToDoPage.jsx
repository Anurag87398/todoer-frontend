import React from 'react'
import ListArea from './listArea'
import { useLocation } from 'react-router-dom';

export default function ToDoPage() {
  let loc = useLocation();
  let uname = loc.state.uname;
  console.log('Hello ' + uname)
  return (
    <div className='toDoPage'>
        <ListArea uname={uname}/>
    </div>
  )
}
