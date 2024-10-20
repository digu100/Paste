import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Home = () => {

    const[title, setTitle]= useState('');
    const[value, setValue]= useState('');

    const[searchParams, setSearchparams]= useSearchParams();

    const pasteId= searchParams.get("pasteId");
    const dispatch= useDispatch()
    const allPastes= useSelector((state)=> state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title || '');  // Safely access title
                setValue(paste.content || '');  // Safely access content
            }
        }
    }, [pasteId]);  // Include allPastes in the dependency array to avoid stale data

    

    function createPaste(){
        // iska kam hai paste ko create karke
        // slice mei bhej de

        if(title==''){
            toast("Please enter value to create paste");
        }

        else{

        const paste={
            title: title,
            content: value,
            _id: pasteId ||
                Date.now().toString(36),
            createdAt: new Date().toISOString(),

        }

       

        if(pasteId){
            //id present means we need to update
            dispatch(updateToPastes(paste))
        }
        else{
            //id not present means we need to create
            dispatch(addToPastes(paste))
        }

        //after creation or updation
        setTitle('');
        setValue('');
        setSearchparams({});
        
        }
    }





  return (
    <div>
        <div className='flex flex-row gap-7
        place-content-around'>
        
        <input 
      className='rounded-lg mt-2 bg-slate-200 p-4 w-[310px]'
      type="text" 
      placeholder='Enter name here'
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
      />
       
      

    <button className='rounded-lg mt-2'
        onClick={createPaste}
    >
       {
        pasteId ? "Update this paste" : "Create new Paste"
        }
    </button>
  
    </div>
    <div className='mt-4'>
        <textarea 
        className='mt-6 w-[500px] bg-teal-100 p-4 rounded-xl'
      
        value={value}
        placeholder='Enter text here'
        onChange={(e)=> setValue(e.target.value)}
        rows={20}
        />
    </div>
    </div>
  )
}

export default Home
