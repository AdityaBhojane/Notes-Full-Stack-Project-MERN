import { useNavigate } from "react-router-dom"
import Profile from "../Profile/Profile"
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";


function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const LogoutHandler =()=>{
    navigate("/login");
  }

  const searchHandler =()=>{

  }
  
  const clearSearch =()=>{
    setSearchQuery('');
  }
  
  return (
    <>
        <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
            <h2 className="text-xl font-medium text-black py-2"> Notes </h2>
            <SearchBar  
            value={searchQuery} 
            inputHandler={({target})=>{
              setSearchQuery(target.value)
            }}
            searchHandler={searchHandler}
            clearSearch={clearSearch}
            />
            <Profile 
            LogoutHandler={LogoutHandler}
            />
        </div>
    </>
  )
}

export default Navbar