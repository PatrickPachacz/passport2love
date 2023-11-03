import { Link, useMatch, useResolvedPath } from "react-router-dom"
import React, { useState } from 'react';

export default function Contact() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        setSuccess(true);
    };
    
    return (

        <main>
            <img className="contactBackground" alt="contactimage" src="https://images.pexels.com/photos/292426/pexels-photo-292426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
            
                <div className="containerSign">
	    
		            <h1>Contact Us</h1>
		            <form action="#" method="post">
			            <label for="name">Name:</label>
			            <input type="text" id="name" name="name" required />
			            <label for="email">Email:</label>
			            <input type="email" id="email" name="email" required />
			            <label for="subject">Subject:</label>
			            <input type="text" id="subject" name="subject" required /> 
			            <label for="message">Message:</label>
			            <textarea id="message" name="message" rows="5" required></textarea>
			            <input type="submit" value="Send" />
		            </form>
	            </div>
        </main>

    );
}


function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end:true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}