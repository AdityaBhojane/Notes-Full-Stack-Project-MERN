import Navbar from "../../Components/Navbar/Navbar";
import NoteCard from "../../Components/NoteCard/NoteCard";


export default function Home() {
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
    </>
  )
}
