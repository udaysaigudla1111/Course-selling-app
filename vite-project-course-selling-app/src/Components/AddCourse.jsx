import React,{useState} from 'react'
import axios from 'axios'

const AddCourse = () => {

    let [title,setTitle] = useState("")
    let [description,setDescription] = useState("")
    let [price,setPrice] = useState("")
    let [imageUrl,setImageUrl] = useState("")

    console.log("In the addcourse component");
    

    const addCourse = async()=>{

        let price2 = parseInt(price)

        try {
            
            const response = await axios.post("http://localhost:3000/api/v1/admin/course",{
                title,
                description,
                price:price2,
                imageUrl
            },{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            console.log(response.data.course);
            alert("COURSE UPLOADED SUCCESSFULLY....")
            
        } catch (error) {
            console.log(error);            
        }

        setTitle("");
        setDescription("")
        setPrice("")
        setImageUrl("")

    }
    
  return (
    <>
        <div className='h-[90vh] w-full bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] flex flex-col items-center'>
            <h1 className='text-2xl font-medium mb-4 mt-24'>Add Course here...........</h1>
            <div className='bg-white w-[520px] rounded-xl shadow-lg flex  flex-col justify-center gap-3 p-8 h-[55vh] '>
            <div>
            <input type="text" id="title" name='title' value={title} onChange={(e)=>{setTitle(e.target.value)}} className='p-4 border-2 border-gray-100 bg-transparent rounded-xl w-full' placeholder='Enter title' />
            </div>
            <div>
               <input type="text" id="description" name='description' onChange={(e)=>{setDescription(e.target.value)}} value={description} className='p-4 border-2 border-gray-100 bg-transparent rounded-xl w-full' placeholder='Enter description' />    
            </div>
              <div>
               <input type="number" id="price" name='price' value={price} onChange={(e)=>{setPrice(e.target.value)}} className='p-4 border-2 border-gray-100 bg-transparent rounded-xl w-full' placeholder='Enter course price /-' />    
            </div>
             <div>
               <input type="text" id="imageUrl" name='imageUrl' value={imageUrl} onChange={(e)=>{setImageUrl(e.target.value)}} className='p-4 border-2 border-gray-100 bg-transparent rounded-xl w-full' placeholder='Paste imageURL ' />    
            </div>
            <div>
                <button className='mt-4 px-4 py-2 bg-blue-500 rounded-xl text-xl text-white active:scale-[0.98] hover:bg-blue-400 hover:scale-[1.01] transition-all ease-in-out duration-75' onClick={addCourse}>Add Course</button>
            </div>
            </div>
        </div>

    </>
    
  )
}

export default AddCourse