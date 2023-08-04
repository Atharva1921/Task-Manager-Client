import axios from 'axios';
import React from 'react'
import { MdOutlineDeleteOutline,MdDoneOutline } from "react-icons/md";
import { toast } from 'react-toastify';

const url = import.meta.env.VITE_SERVER_URL

const Task = ({title,description,setReload,completeStatus}) => {


  const handleClickDelete = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.delete(`${url}/api/task/delete/${title}`)
      toast.success( res.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setReload(true)
    } catch (error) {
      toast.error( error.response.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setReload(true)
    }
  };

  const handleClickUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${url}/api/task/update`, {name : title , completed : !completeStatus })
      toast.success( res.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setReload(true)
      
    } catch (error) {
      toast.error( error.response.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setReload(true)
    }
  }

  return (
    <div className={ completeStatus === true ? ' group lg:hover:rounded-xl lg:hover:item-start lg:hover:h-40 rounded-xl  shadow-lg w-full h-fit flex flex-col px-10 p-4 gap-4 lg:gap-2 bg-green-600 lg:rounded-full lg:hover:scale-110 transition-all duration-500 ease-in-out' : 
      'group lg:hover:rounded-xl lg:hover:item-start lg:hover:h-40 rounded-xl  shadow-lg w-full h-fit flex flex-col px-10 p-4 gap-4 lg:gap-2 lg:rounded-full lg:hover:scale-110 transition-all duration-500 ease-in-out  bg-red-700'}> 
      <div className=' w-full flex justify-between items-center'>
        <h3 className='text-xl xs:text-2xl text-white flex gap-2'><span className='text-xl xs:text-2xl text-white group-hover:flex hidden'>Title:</span>{title}</h3>
          <div className=' w-fit flex justify-center items-center gap-2 xs:gap-4 h-full'>
              <button className=' shadow-lg h-fit w-fit rounded-full bg-white p-2'>
                  <MdDoneOutline onClick={handleClickUpdate} className='hover:scale-110 transition-all duration-300 ease-in-out' size={30} color={completeStatus === true ? '#16a34a'  : '#9ca3af'}/>
              </button>
              <button onClick={handleClickDelete} className=' shadow-lg h-fit w-fit rounded-full bg-white p-2'>
                  <MdOutlineDeleteOutline className='hover:scale-110 transition-all duration-300 ease-in-out' size={30} color='#b91c1c'/>
              </button>
          </div>
      </div>
      <div className=' lg:group-hover:flex lg:hidden flex w-full justify-start items-center'>
      <h3 className='text-xl xs:text-2xl text-white'><span className='text-xl xs:text-2xl text-white pr-2'>Description:</span>{description}</h3>
      </div>
    </div>
  )
}

export default Task