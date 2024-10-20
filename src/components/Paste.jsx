import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {

    const pastes= useSelector((state)=> 
        state.paste.pastes);

    const [searchTerm, setSearchTerm]= useState('');

    const dispatch= useDispatch();

    const filteredData= pastes.filter(
        (paste)=> paste.title.toLowerCase().includes
        (searchTerm.toLowerCase())
    );

    function handleDelete(pasteId){
        dispatch(removeFromPastes(pasteId))
    }

    function handleEdit(pasteId){
        dispatch(updateToPastes(pasteId))
    }

  return (
    <div>
      <input
      className='mt-4 bg-slate-200 w-[500px] p-2.5
      rounded-xl'
      type="search" 
      placeholder="search here"
      value={searchTerm}
      onChange={(e)=> setSearchTerm(e.target.value)}
      />

      <div>
        {
            filteredData.length> 0 &&
            filteredData.map(
                (paste) =>{
                    return (
                        <div key={paste?._id} //for uniqueness
                        className='border p-4 mt-6 bg-violet-300
                        rounded-xl'

                        >
                            <div>
                            {paste.title}
                            </div>
                            <div>
                                {paste.content}
                            </div>
                            <div
                            className='flex flex-row m-3
                            gap-4 place-content-evenly'
                            >
                                <button>
                                    <a href={`/?pasteId=${paste?._id}`}>
                                        Edit
                                    </a>
                                    
                                </button>
                                <button>
                                    <a href={`/pastes/${paste?._id}`}>
                                    View
                                    </a>
                                   
                                </button>
                                <button onClick={()=> handleDelete
                                    (paste?._id)
                                }>
                                    Delete
                                </button>
                                <button 
                                onClick={() => {navigator.clipboard.writeText(paste?.content)
                                    toast.success("Copied to clipboard")
                                }}
                                >
                                    Copy
                                </button>
                                <button>
                                    {/* Share button logic homework */}
                                    Share
                                </button>

                            </div>
                           <div>
                            {paste.createdAt}
                           </div>
                        </div>
                        
                        
                    )
                }
            )
        }
      </div>
    </div>
  )
}

export default Paste
