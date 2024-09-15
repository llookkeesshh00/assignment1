import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Edit = () => {
 const navigate=new useNavigate();
    const [rno, setrno] = useState('')


   const handleEdit=()=>{
    const formData= new FormData();
   
    formData.append('rollno',rno)
    const fileInput= document.querySelector('input[type="file"]')
    formData.append('endingLetter', fileInput.files[0]);
    
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
   


    navigate('/submitted');
   } 


   const handleChange=(event)=>{
    setrno(event.target.value)
   }
    return (
        <div className='flex justify-center min-h-screen flex-col gap-11 bg-gradient-to-r  from-green-600 to-blue-700'>
            <div className=" m-3 w-full flex flex-col items-center">
                <span className='text-xl font-bold w-1/2'>want to upload your submission letter </span>'
                <input type="text" name="rollno" id="" className='w-1/2 outline-none p-2 m-2' onChange={handleChange} placeholder='Enter roll no to fetch details' />
                <input type="file" name="submsionLetter" id="" className='w-1/2 outline-none p-2 m-2' placeholder='Enter roll no to fetch details' />'
               <button onClick={handleEdit} className='focus:outline-none p-1 w-1/2 m-2 bg-blue-500 text-white' >     Submit </button>

            </div>
        </div>
    )
}

export default Edit
