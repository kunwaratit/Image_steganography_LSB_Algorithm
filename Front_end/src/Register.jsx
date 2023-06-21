import React, {useState} from "react"

export const Register = (props) =>{
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email);
    }


    return (
        <div className="form-container">
            
        <form className="register-form" onSubmit={handleSubmit}>
        <h1> Sign up </h1>
            <input value={name} name="name" id="name" placeholder="Full name" type="text" />
            
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email" id="email"/>
            
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" id="password"/>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Confirm Password" id="confirm-password"/>
            <button type="submit">Sign up</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        
        </div>
    )
}

export default Register;