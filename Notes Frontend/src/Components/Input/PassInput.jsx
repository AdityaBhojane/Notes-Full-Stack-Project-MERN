import  { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

function PassInput({value,onChangeHandler,placeholder}) {

  // toggle functionality on show / hide password
  const [showPass,setShowPass] = useState(false);
  const togglePass = ()=>{
    setShowPass((pass)=> !pass)
  }

  return (
    <>
        <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
            <input
             value={value}
             onChange={onChangeHandler}
             type={showPass? "text":"password"}
             placeholder={placeholder || "Password"}
             className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
             />

            {showPass? <FaRegEye
                size={22}
                className='text-[#ccc] cursor-pointer'
                onClick={()=> togglePass()}
             />:<FaRegEyeSlash
             size={22}
             className='text-[#ccc] cursor-pointer'
             onClick={()=> togglePass()}
            />}
        </div>
    </>
  )
}

export default PassInput