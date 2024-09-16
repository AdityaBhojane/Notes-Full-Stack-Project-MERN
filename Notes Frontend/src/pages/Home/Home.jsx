import { MdAdd } from "react-icons/md";
import Navbar from "../../Components/Navbar/Navbar";
import NoteCard from "../../Components/NoteCard/NoteCard";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import TostMsg from "../../Components/Tostmsg/TostMsg";
import notFound from "../../assets/NotFound.svg";

export default function Home() {
  const [openAddEditModal, setAddOpenEditModal] = useState({
    isShow: false,
    type: "add",
    data: null,
  });

  const [showTostMsg, setShowTostMsg] = useState({
    isShow: false,
    msg: "",
    type: "add",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const handleEdit = (noteDetails) => {
    setAddOpenEditModal({ isShow: true, type: "edit", data: noteDetails });
  };

  const handleShowToast = (msg, type) => {
    setShowTostMsg({
      isShow: true,
      msg,
      type,
    });
  };

  const handleCloseToast = useCallback(() => {
    // Close logic
    setShowTostMsg({
      isShow: false,
      msg: "",
    });
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An Unexpected error" + error);
    }
  };

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);

      if (response.data && !response.data.error) {
        handleShowToast("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        console.log("Unexpected error");
      }
    }
  };

  const searchRequest = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Search Error" + error);
    }
  };

  const handleClearSearch = () => {
    getAllNotes();
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(`/note-pinned/${noteId}`, {
        isPinned: !noteData.isPinned,
      });
      if (response.data && !response.data.error) {
        handleShowToast("Note Updated Successfully");
        getAllNotes();
      }
    } catch (error) {
      console.log("Unexpected Error" + error);
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        searchRequest={searchRequest}
        handleClearSearch={handleClearSearch}
      />

      {allNotes.length>0 ? (
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-4 mt-8">
            {allNotes?.map((items) => {
              return (
                <NoteCard
                  key={items._id}
                  title={items.title}
                  date={moment(items.createdON).format("Do MMM YYYY")}
                  content={items.content}
                  tags={items.tags}
                  isPinned={items.isPinned}
                  editHandler={() => handleEdit(items)}
                  DeleteHandler={() => deleteNote(items)}
                  updateIsPinned={() => updateIsPinned(items)}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="absolute left-[50%] top-[20%] -translate-x-[50%]">
          <h2 className="text-blue-500 text-xl">Search Not Found</h2>
          <img className="w-full" src={notFound} alt="svg" />
        </div>
      )}

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-700 absolute right-10 bottom-10"
        onClick={() => {
          setAddOpenEditModal({
            isShow: true,
            type: "add",
            data: null,
          });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
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
          onClose={() => {
            setAddOpenEditModal({
              isShow: false,
              type: "add",
              data: null,
            });
          }}
          getAllNotes={getAllNotes}
          handleShowToast={handleShowToast}
        />
      </Modal>
      <TostMsg
        isShow={showTostMsg.isShow}
        msg={showTostMsg.msg}
        type={showTostMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
}
