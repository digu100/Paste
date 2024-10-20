import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';


const ViewPaste = () => {

    const {id}=useParams();

    const allPastes= useSelector((state)=>
    state.paste.pastes);

    const paste=allPastes.filter((p)=> p._id=== id)[0];


  return (
    <div>
        <div className='flex flex-row gap-7
        place-content-around'>
        
        <input 
      className='rounded-lg mt-2 bg-slate-200 p-4 w-[500px]'
      disabled
      type="text" 
      placeholder='Enter name here'
        value={paste.title}
        onChange={(e)=> setTitle(e.target.value)}
      />
       
      

    {/* <button className='rounded-lg mt-2'
        onClick={createPaste}
    >
       {
        pasteId ? "Update this paste" : "Create new Paste"
        }
    </button> */}
  
    </div>
    <div className='mt-4'>
        <textarea 
        className='mt-6 bg-teal-100 p-4 
        rounded-xl w-[500px]'
        disabled
        value={paste.content}
        placeholder='Enter text here'
        onChange={(e)=> setValue(e.target.value)}
        rows={20}
        />
    </div>
    </div>
  )
}

export default ViewPaste
