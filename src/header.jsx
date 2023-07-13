import React from "react";
import { motion } from "framer-motion";

function Header(){
    return <motion.div className="header" animate={{y:0}} initial={{y:-100}} transition={{duration:1}}>
        <h1>ToDoer</h1>
    </motion.div>
}

export default Header;