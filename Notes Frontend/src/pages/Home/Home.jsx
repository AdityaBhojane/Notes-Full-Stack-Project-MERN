import { MdAdd } from "react-icons/md";
import Navbar from "../../Components/Navbar/Navbar";
import NoteCard from "../../Components/NoteCard/NoteCard";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useState } from "react";


export default function Home() {

  const [openAddEditModal, setAddOpenEditModal] = useState({
    isShow:false,
    type:"add",
    data:null
  })

  return (
    <>
      <Navbar/>

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
              title="Backend Project"
              date="22 jan 2242"
              content = "Web dev"
              tags = "#react"
              isPinned = {()=>{}}
              editHandler= {()=>{}}
              DeleteHandler= {()=>{}}
          />
        </div>
      </div>

      <button 
      className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-700 absolute right-10 bottom-10"
      onClick={()=>{
        setAddOpenEditModal({
          isShow:true,
          type:"add",
          data:null
        })
      }}
      >
        <MdAdd 
        className="text-[32px] text-white"
        />
      </button>

      <Modal
      isOpen={openAddEditModal.isShow}
      onRequestClose={() => {}}
      style={{
          overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
      }}
      contentLabel=""
      className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
      >
        <AddEditNotes 
        type={openAddEditModal.type}
        noteData={openAddEditModal.data}
        onClose={()=>{
          setAddOpenEditModal({
            isShow:false,
            type:"add",
            data:null
          })
        }}
        />
      </Modal>
    </>
  )
}
