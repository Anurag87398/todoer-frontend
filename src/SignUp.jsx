import React from 'react'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { URL } from './App';

export default function SignUp() {
    const [user, setUser] = useState({
        uname: '',
        pass: ''
    });
    
    const [loginStatus, setLoginStatus] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        console.log("Sign Up Clicked!");
        if (user.uname == '' || user.pass == '')
            alert('Please Fill out the fields');
        else{
            console.log("User: ", user); 
            /*send to mongo*/
            const resp= await fetch(`${URL}/api/signUp`, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {    
                'Content-Type': 'application/json'
                }
            });

            // let response = '200-L'; 
            /*get from mongo*/
            const response= await resp.text();
            console.log("Resonse from server:", response);

            switch (response){
                case "200" :{
                        console.log("SignUp Successfull!");
                        alert("Account Successfully Created!");
                        setLoginStatus(true);
                        break;
                    }
                case "404" :
                    alert("Username already taken :'))");
                    break;
                // case "404-P" :
                //     alert("Incorrect Password");
                //     break;
                case "500" :
                    alert("An error occured, please try again later.");
                    break;
                default :
                    alert("An error occured. It's all in God's hands now :'))");                
            }
        }
    }
  return (
    <motion.div className='signUpWrapper' 
    animate={{scale: 1}}
    initial={{scale: 0}}
    transition={{duration:1.5}}>
        <h1>SIGNUP</h1>
        <form method='post'>
            <input placeholder="Username" type='text' name='uname' value={user.uname} className='txtIP' required onChange={e => {
                    setUser({
                        ...user,
                        uname : e.target.value,
                    });
                }}></input>
                <input placeholder="Password" type='password' name='pass' value={user.pass} className='txtIP' required onChange={e => {
                    setUser({
                        ...user,
                        pass : e.target.value,
                    });
                }}></input>
            <input type='submit' value={loginStatus? 'Signout' : 'Sign Up'} className='subButton' onClick={handleClick}></input>
            {loginStatus?<Link to='/todo' state={{uname : user.uname}} style={{ textDecoration: 'none' }}><button className='subButton'>Continue</button></Link>
            :<Link to='/' state={{uname : user.uname}} style={{ textDecoration: 'none' }}><button className='subButton'>Login</button></Link>}
        </form>
    </motion.div>
  )
}