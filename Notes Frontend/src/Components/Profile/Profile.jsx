
import { getInitials } from '../../utils/ProfileIconHandler'

function Profile() {
  return (
    <div className='flex items-center gap-3'>
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
            {getInitials('Aditya Bhojane')}
        </div>
        <div>
            <p className="text-sm font-medium">Aditya Bhojane</p>
            <button className='text-sm text-slate-700 underline'>
                Logout
            </button>
        </div>
    </div>
  )
}

export default Profile