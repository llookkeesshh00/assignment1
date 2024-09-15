import React from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
const Student = () => {
    const navigate = useNavigate();

    const [studentDetails, setstudentDetails] = useState({})
    const handleChange = (event) => {
        setstudentDetails({
            ...studentDetails,
            [event.target.name]: event.target.value
        });

    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(studentDetails)
        const formData = new FormData();
        formData.append()


        Object.keys(studentDetails).forEach(key => {
            if (key !== 'offerLetter') { // We will handle the file separately
                formData.append(key, studentDetails[key]);
            }
        });


        // Append the file to FormData
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput && fileInput.files[0]) {
            formData.append('offerLetter', fileInput.files[0]);
        }

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        try {

            // Send the FormData to the server
            const response = await fetch('http://localhost:3000/student/upload', {
                method: 'POST',
                body: formData,
            });


            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Handle successful response
            console.log('Form submitted successfully');
            navigate('/submitted');
        } catch (error) {
            console.log('a')
            console.error('Error submitting form:', error);
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500'>

            <div className="container bg-green-200  rounded-lg w-[50vw] m-2 flex  flex-col gap-4  mt-7 mb-7 p-4 justify-center items-center">
                <div className='flex justify-between w-[50vw]  bg-blue-400 m-5 rounded-lg'>
                    <h1 className='text-l text-black font-semibold mt-4 ml-4 mb-4'>Already submiited ,click here to EDIT or SUBMIT completion letter </h1>
                    <button className='w-14 h-7 bg-red-400 font-bold m-3 rounded-md' onClick={() => { navigate('/edit') }}> EDIT</button>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-5 '>
                    <h1 className='text-2xl text-blue-500 font-bold mt-4 mb-4'>Please Provide Student Details</h1>
                    <div className='flex gap-3'>
                        <input type="text" required name="name" id="" placeholder='Name' className=' focus:outline-none p-1 w-full' onChange={handleChange} />
                    </div>
                    <div className='flex gap-3'>
                        <input type="text" required name="rollno" id="" placeholder='Roll no' className='focus:outline-none p-1 w-full' onChange={handleChange} />
                    </div>

                    <div className='flex gap-3'>
                        <input type="email" required name="email" id="" placeholder='Email' className=' focus:outline-none p-1 w-full' onChange={handleChange} />
                    </div>


                    <h1 className='text-2xl text-blue-500 font-bold mt-4 mb-4'>Please Provide Internship  Details</h1>

                    <div className='flex gap-3'>
                        <input type="text" required name="companyName" id="" placeholder='companyName' className=' focus:outline-none p-1 w-full' onChange={handleChange} />
                    </div>
                    <div className='flex gap-3'>
                        <input type="text" required name="projectTitle" id="" placeholder='projectTitle' className=' focus:outline-none p-1 w-full' onChange={handleChange} />
                    </div>

                    <div className='flex gap-3'>
                        <input type="text" required name="yearSem" id="" placeholder='yearSem' className=' focus:outline-none p-1 w-full' onChange={handleChange} />
                    </div>
                   
                    <div className='flex gap-3'>
                        <input type="number" required name="noOfDays" id="" placeholder='noOfDays' className=' focus:outline-none p-1 w-full' onChange={handleChange} />
                    </div>
            
                    <div className='flex gap-3 bg-white justify-between'>
                        <span className='text-gray-400'>startDate</span>
                        <input type="date" required name="startDate" id="" onChange={handleChange} />
                    </div>
                    <div className='flex gap-3 bg-white  justify-between'>
                        <span className='text-gray-400'>endDate</span>
                        <input type="date" required name="endDate" id="" onChange={handleChange} />
                    </div>
                    <div className='flex gap-3 bg-white justify-between'>
                        <span className='text-gray-400'>Submit offer letter</span>
                        <input type="file" required name="offerLetter" id="" onChange={handleChange} />
                    </div>
                    <div className='flex gap-3 ali'>
                        <button type="submit" className='focus:outline-none p-1 w-full bg-blue-500 text-white' >     Submit </button>
                    </div>





                </form>
            </div>
        </div>
    )
}

export default Student
