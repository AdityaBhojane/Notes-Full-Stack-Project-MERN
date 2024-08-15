
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';


function SearchBar({value, inputHandler, searchHandler, clearSearch}) {
  return (
    <div className='w-80 flex items-center px-4 bg-slate-100 rounded-md '>
        <input
             value={value}
             onChange={inputHandler}
             type='text'
             placeholder='Search Notes'
             className='w-full text-sm bg-transparent py-[11px] mr-3 rounded outline-none'
        />
        {value && <IoMdClose 
        className='text-xl text-slate-500 cursor-pointer hover:text-black mr-3' 
        onClick={clearSearch}
        />}
        <FaMagnifyingGlass
         className='text-slate-400 cursor-pointer hover:text-black'
         onClick={searchHandler}
         />
    </div>
  )
}

export default SearchBar;