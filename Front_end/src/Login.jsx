import React, {useState} from "react"

export const Login = (props) =>{
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) =>{
       e.preventDefault();
        console.log(email);

    }


    return (
        <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit}>
            <h1>Log in</h1>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email" id="email"/>
            
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" id="password"/>
            <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('register')} > Don't have an account? Register here</button>
        </div>
    )
}

export default Login;