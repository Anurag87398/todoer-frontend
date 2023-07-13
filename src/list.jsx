import React, { useEffect, useRef, useState } from "react";
import ListItem from "./listItem";
import { motion } from "framer-motion";
import { URL } from "./App";

function List(props){
    let retFlag = false;
    
    var [inputText, setInputText] = useState('');
    function handleTextChange(event){
        var newText = event.target.value;
        setInputText(newText);
    }

    // get all the tasks of the curr user
    async function getTasks(){
        try{
            let op= {
                uname: props.uname
            }
            const resp= await fetch(`${URL}/api/getTask`, {
                method: "POST",
                body: JSON.stringify(op),
                headers: {
                    'Content-Type': "application/json",
                }
            });
            // console.log("Resp: ", resp);
            const response= await resp.json();
            console.log("Tasks received from server: ", response);
            // let arr= useRef(response);
            // update the tasks list
            // setListItems(response);

            return response;
            // setUsers(data);
        }
        catch(error){
            console.log("Some error occured");
            // return [];
        }
    }
    
    let getArr= useRef(true);

    var [listItems, setListItems] = useState([]);

  
    useEffect(() => {
        // let prevTask2= await getTasks();
        if(getArr.current){
            let prevTask2= getTasks();
            prevTask2.then(value=>{
                // console.log("Value: ", value);
                setListItems(value);
                getArr.current= false;
            });
        }
        console.log("List was updated");
        
    }, [listItems, getTasks])

    async function handleSubmit(event){
        event.preventDefault();
        if (inputText.length != 0){
            let addFlag = true;
            for (let i=0; i < listItems.length; i++){
                if (listItems[i].task === inputText)
                    addFlag = false;
            }
            if (addFlag){
                setListItems((prevValue) => {
                    return [...prevValue, {
                        task : inputText,
                        stat : false
                    }]
                });
                let op = {
                    uname : props.uname,
                    task : inputText,
                    stat : false
                }
                console.log("Task details: ", op); 
                /*return to mongo*/
                const resp= await fetch(`${URL}/api/addTask`, {
                method: "POST",
                body: JSON.stringify(op),
                headers: {
                    'Content-Type': "application/json",
                }
                });

                /*get from mongo*/
                const response= await resp.text();
                console.log("Response from server: ", response);
                // setListItems(response);
                
                switch (response){
                    case "200-TA" :{
                        console.log("Task added!");
                        
                        // setLoginStatus(true);
                        break;
                    }                       
                case "500-TA" :
                    alert("An error occured, please try again later.");
                    break;
                default :
                    alert("An error occured");               
                }
                

            }
            else {
                alert("Duplicate Item not Allowed!");
            }
        }
        setInputText("");
        
    }

    /*v1.1*/
    async function delItem(item){
        console.log('delete ', item);  
        /*send to mongo for delete*/
        const resp= await fetch(`${URL}/api/deleteTask`, {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': "application/json",
                }
        });
        const response= await resp.text();
        console.log("Msg received from server: ", response);
        
        switch (response){
            case "200-TD" :{
                alert("Task Deleted!");
                console.log("Task deleted!");
                
                // setLoginStatus(true);
                break;
            }                       
            case "500-TD" :
                alert("An error occured, please try again later.");
                break;
            default :
                alert("An error occured");               
        }

        // let prevTask2= getTasks();
        // prevTask2.then(value=>{
        //     // console.log("Value: ", value);
        //     setListItems(value);
        //     // getArr.current= false;
        // });
        // window.location.reload();

        setListItems(listItems.filter((it) => it.task !== item.task));
    }

    function createListItem(it, index){
        return <ListItem
            key= {it.task} 
            text= {it.task}
            stat = {it.stat}
            uname = {props.uname}
            delFlag = {delItem} /*v1.1*/
        />
    }

    var btnStyle = {
        backgroundColor : "goldenrod",
    }
    var [mousedOver, setMousedOver] = useState(false);
    function handleMousedOver(){
        setMousedOver(true);
    }
    function handleMousedOut(){
        setMousedOver(false);
    }


    return <motion.div className="listWrapper" animate={{x:0}} initial={{x:-2000}} transition={{duration:1, delay:0.3}}>
        <h1>{props.uname}'s Tasks</h1>
        <form>
            <input 
                type="text"
                className="listItem"
                onChange={handleTextChange}
                name="listItem"
                value={inputText}
            />
            <button
                className="listBtn"
                type="submit"
                onClick={handleSubmit}
                style={mousedOver ? btnStyle : null}
                onMouseOver={handleMousedOver}
                onMouseOut={handleMousedOut}
            >+</button>
            <div className="listItemArea">
                <ul>
                    {listItems.map(createListItem)}
                </ul>
            </div>
        </form>
    </motion.div>
}

export default List;