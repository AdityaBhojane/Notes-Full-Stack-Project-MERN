import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md"

function NoteCard({
    title,
    date,
    content,
    tags,
    isPinned,
    editHandler,
    DeleteHandler,
    updateIsPinned
}){

  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
        <div className="flex items-center justify-between">
            <div>
                <h6 className="text-sm font-medium">{title}</h6>
                <span className="text-xs text-slate-500">{date}</span>
            </div>
            <MdOutlinePushPin 
            className={`icon-btn ${isPinned? "text-primary":"text-slate-300"}`} 
            onClick={updateIsPinned} />
        </div>
            <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>
        <div className="flex items-center justify-between mt-2">
            <div className="text-xs text-slate-500">{tags.map((item,index)=>{
                return <span key={index}>{`#${item} `}</span>
            })}</div>
            <div className="flex items-center gap-2">
                <MdCreate 
                className="icon-btn hover:text-green-600" 
                onClick={editHandler} 
                />
                <MdDelete 
                className="icon-btn hover:text-red-500" 
                onClick={DeleteHandler} 
                />
            </div>
        </div>
    </div>
  )
}

export default NoteCard