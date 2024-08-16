import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import PassInput from "../../Components/Input/PassInput";
import { useState } from "react";
import { validateEmail } from "../../utils/emailValidation";


export default function LogIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin(e){
    e.preventDefault();
    if(!validateEmail(email)){
        setError("Please enter an valid email address");
        return;
    }
    if(!password){
        setError("Please Enter an Password");
        return;
    }

    setError("")

    // API logic
  }
  return (
    <>
        <Navbar/>
        <div className="flex items-center justify-center mt-28">
            <div className="w-96 border rounded bg-white px-7 py-10">
                <form onSubmit={handleLogin}>
                    <h4 className="text-2xl mb-7">Login</h4>
                    <input 
                    type="text" 
                    placeholder="Email" 
                    className="input-box" 
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                    <PassInput 
                    value={password}
                    onChangeHandler={(e)=> setPassword(e.target.value)}
                    />
                    {/* conditional rendering */}
                    {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
                    <button className="btn-primary" type="submit">
                        Login
                    </button>
                    <p className="text-sm text-center mt-4">
                        Not registered yet ?{""}
                        <Link to={"/signup"} className="font-medium text-primary underline mx-2" >
                        Create an Account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    </>
  )
}
