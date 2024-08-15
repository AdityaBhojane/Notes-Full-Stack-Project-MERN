import { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar"
import PassInput from "../../Components/Input/PassInput";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/emailValidation";


function SignUp() {
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  function handleSignUp(e){
    e.preventDefault();
    if(!name){
      setError("Please enter your name");
      return;
    }

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
                <form onSubmit={handleSignUp}>
                    <h4 className="text-2xl mb-7">Sign Up</h4>
                    <input 
                    type="text" 
                    placeholder="name" 
                    className="input-box" 
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    />
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
                        Create an Account
                    </button>
                    <p className="text-sm text-center mt-4">
                        Already have an Account ?{""}
                        <Link to={"/login"} className="font-medium text-primary underline mx-2" >
                          login 
                        </Link>
                    </p>
                </form>
            </div>            
        </div>
    </>
  )
}

export default SignUp