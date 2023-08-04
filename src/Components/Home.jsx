import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import Task from './Task'
import { BsClipboard2Plus } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import Loading from './Loading';

const url = import.meta.env.VITE_SERVER_URL

const Home = () => {

  const [tasks, setTasks] = useState()
  const [reload, setReload] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [task, setTask] = useState({
    title: "",
    description: "",
  })

  const taskTitle = useRef('')
  const taskDescription = useRef('')

  const inputEvent = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setTask( (prev) => {
      return {...prev, [name] : value}
    })
  };

  const handleClickCreateTask = async (e) => {

    //CREATE TASK
    taskTitle.current.value = '';
    taskDescription.current.value = '';
    const name = e.target.name;

    setTask( (prev) => {
      return {...prev, title : "",description : "" }
    })

    e.preventDefault();
    if ( task.title === "" || task.description === "" ) {
      return toast.error(' Title/Description field cannot be empty ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    };

    try {
      const {title,description} = task
      const res = await axios.post(`${url}/api/task/create`,{ name : title , description})
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
        setIsOpen(false)
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

  const getTasks = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(`${url}/api/task/`)
      setTasks(res.data)
      setIsLoading(false)
      setReload(false)
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
      setIsLoading(false)
      setReload(false)
    };
  };

  useEffect(() => {
    getTasks();
  }, [reload])
  

  return (
    <div className=' h-full w-full'>
      <Navbar/>
      <div className=' w-full h-[90%] bg-gray-200 flex justify-center items-center p-4 xs:p-10'> 
        <div className=' relative w-full xs:w-[90%] sm:w-[80%] md:w-[70%] h-full bg-white rounded-2xl'>

          <div className=' bg-blue-400 w-full h-[15%] px-8 flex justify-between items-center'>
            <h1 className=' text-white font-bold text-4xl hover:scale-110 transition-all duration-300 ease-in-out '>All Tasks</h1>
            <div className=' bg-white rounded-full h-fit w-fit p-4 flex justify-center items-center shadow-lg'> 
              <button onClick={() => setIsOpen(true)} className='hover:scale-110 transition-all duration-300 ease-in-out w-full h-full'>
                <BsClipboard2Plus size={30} fill='#000000'/>
              </button>
            </div>
          </div>
        
          <div className='w-full h-[85%] flex flex-col gap-4 justify-start items-center px-3 xs:px-6 sm:px-10 md:px-14 lg:px-20 p-10 overflow-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100'>
            {
              isLoading === true ? <Loading/> : tasks?.map( (item,i) => <Task key={i} title={item.name} description={item.description} setReload={setReload} completeStatus={item.completed}/>)
            }
          </div>

          <div className={ isOpen === true ? ' p-6 h-full w-full bg-white absolute left-0 top-0 transition-all duration-300 ease-in-out opacity-100 z-10'
          : 'h-full w-full bg-white absolute left-0 top-0 transition-all duration-300 ease-in-out opacity-0 -z-10'}>
            <div className=' w-full h-[10%]'><button onClick={() => setIsOpen(false)} className='hover:scale-110 transition-all duration-300 ease-in-out flex justify-start items-center bg-black rounded-full p-2 h-fit w-fit'><MdOutlineClose size={25} color='#FFFFFF'/></button></div>

            <div className=' w-full h-[85%] bg-blue-400'>
              <form className=' w-full h-full flex justify-center items-center flex-col gap-4 p-3 xs:p-8'>
                <div className=' flex flex-col gap-2 w-full h-fit justify-center'>
                  <label className=' text-2xl font-semibold'> Title</label>
                  <input ref={taskTitle} onChange={inputEvent} type='text' placeholder=' Enter Title' name='title' value={task.title} className=' rounded-lg h-10 p-4'/>
                </div>
                <div className=' flex flex-col gap-2 w-full h-fit justify-center'>
                  <label className=' text-2xl font-semibold'> Description</label>
                  <input ref={taskDescription} onChange={inputEvent} type='text' placeholder=' Enter Description' name='description' value={task.description} className=' rounded-lg h-40 p-4 flex items-start'/>
                </div>
                <button onClick={handleClickCreateTask} className=' p-2 bg-white rounded-full text-lg w-[50%] transition-all duration-300 ease-in-out hover:scale-110'>Create Task</button>
              </form>
            </div>
            </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home