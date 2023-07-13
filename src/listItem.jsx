import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { URL } from "./App";

function ListItem(props){
    /*let retFlag = 0; *//*using this to avoid triggering useEffect
                            when lis are created using the array retrieved from DB
                            on first entering the page*/
    /*above wont work because the flag will get reset everytime useState hook is updated*/

    let retFlag = useRef(false);
    /*We can use useRef hook to store values that must be protected from renderings*/

    var liStyle = {
        textDecoration : "line-through"
    }
    var [clicked, setClicked] = useState(props.stat);
    function handleClick(){
        setClicked(!clicked);
        // console.log("HEHE: ", itemUpdate.current);
        
    }

    let itemUpdate= useRef({});

    useEffect(() => {
        if (retFlag.current){       /*prevent triggering useEffect callback on initial render*/
            let op = {
                uname : props.uname,
                task : props.text,
                stat : clicked
            }
            // console.log('Returning : ', op);  
            /*return to mongo, task status update*/
            /*return to mongo*/
            try{
                const resp= async ()=>{
                    await fetch(`${URL}/api/updateTask`, {
                        method: "POST",
                        body: JSON.stringify(op),
                        headers: {
                            'Content-Type': "application/json",
                        }
                    });
                }
                resp();
                // console.log("Task Updated");
            }
            catch(error){
                alert("Some error occured (Skill Issue bro :/)");
                // console.log(error);
            }
            
            // const callingResp= resp();
            // console.log(resp());
            // resp().then(value=>{
            //     console.log("value: ", value);
            // });
            // console.log("reply: ", reply);
            // const response= async ()=>{
            //     await resp.text();
            // } 
            // response().then(value=> {
            //     switch (value){
            //         case "200-TU" :{
            //             console.log("Task updated!");
            //             break;
            //         }                       
            //     case "500-TU" :
            //         alert("An error occured, please try again later.");
            //         break;
            //     default :
            //         alert("An error occured");               
            //     }
            // });
            
            
            // itemUpdate.current= op;
            // console.log("HEHE: ", itemUpdate.current);
       }
       else {                       /*allow callbacks on rerendering*/
        retFlag.current = true;
       }
    }, [clicked]);

    /*v1.1*/
    function handleDel(event){
        event.cancelBubble = true;
        event.stopPropagation();
        let op = {
            uname : props.uname,
            task : props.text,
            stat : clicked
        }
        props.delFlag(op);
    }

    return <motion.li 
        onClick={handleClick}
        style={clicked ? liStyle : null}
        animate={{scale: clicked? 0.8 : 1}}
        initial={{scale: clicked? 1 : 0}}
        transition={{duration:0.5}}
    >
        {props.text}
        <button type="button" name="something" onClick={handleDel} id="delBtn"><i className="fa-solid fa-trash fa-xs"></i></button>
    </motion.li>

}

export default ListItem;