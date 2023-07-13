import React from "react";
import List from "./list";

function ListArea(props){
    return <div className="listArea">
        <List uname={props.uname}/>
    </div>
}

export default ListArea;