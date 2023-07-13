import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { URL } from './App';

export default function Login() {
    const [user, setUser] = useState({
        uname: '',
        pass: ''
    });
    
    const [loginStatus, setLoginStatus] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        if (loginStatus){
            setLoginStatus(false);
            setUser({
                uname: '',
                pass: ''
            })
        }
        else {
            // console.log("Login Clicked!");
            if (user.uname == '' || user.pass == '')
                alert('Please Fill out the fields');
            else{
                // console.log("User:", user); 
                
                /*send to mongo*/
                const resp= await fetch(`${URL}/api/login`, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': "application/json",
                }
                });

                // let response = '200-L'; 
                /*get from mongo*/
                const response= await resp.text();
                // console.log("Response from server: ", response);
                
                switch (response){
                    case "200-L" :{
                        // console.log("Login Successful!");
                        setLoginStatus(true);
                        break;
                    }                       
                case "404-U" :
                    alert("Invalid Username");
                    break;
                case "404-P" :
                    alert("Incorrect Password");
                    break;
                case "500" :
                    alert("An error occured, please try again later.");
                    break;
                default :
                    alert("An error occured");               
                }
            }
        }
    }
  return (
    
    <motion.div className='loginWrapper' 
    animate={{scale: 1}}
    initial={{scale: 0}}
    transition={{duration:1.5}}>
        <h1>LOGIN</h1>
        <form method='post'>
            <input type='text' name='uname' value={user.uname} className='txtIP' onChange={e => {
                setUser({
                    ...user,
                    uname : e.target.value,
                });
            }} required placeholder='Username'></input>
            <input type='password' name='pass' value={user.pass} className='txtIP' onChange={e => {
                setUser({
                    ...user,
                    pass : e.target.value,
                });
            }} required placeholder='Password'></input>
            <input type='submit' value={loginStatus? 'Signout' : 'Login'} className='subButton' onClick={handleClick}></input>
            {loginStatus?<Link to='/todo' state={{uname : user.uname}} style={{ textDecoration: 'none' }}><button className='subButton'>Continue</button></Link>
            :<Link to='/signup' state={{uname : user.uname}} style={{ textDecoration: 'none' }}><button className='subButton'>SignUp</button></Link>}
        </form>
    </motion.div>
  )
}
/*inline styling to be used to make Link text look normal*/
