import axios from 'axios';
import React,{useState} from 'react'


const Modal = ({visible,onClose,courseId,setCourses}) => {
    
         console.log("In the modal component");
         
    console.log(courseId.current);
    
    if(!visible) return null

    let [title,setTitle] = useState("");
    let [description,setDescription] = useState("");
    let [imageUrl,setImageUrl] = useState("")
    let [price,setPrice] = useState("")

    const UpdateCourse = async()=>{
        let price2 = parseInt(price)

        try {

            const response = await axios.put("http://localhost:3000/api/v1/admin/course",{
                title,
                description,
                price:price2,
                imageUrl,
                courseId:courseId.current
            },{
                headers:{
                    token:localStorage.getItem("admin-token")
                }
            })

            console.log(response.data.message);
            
           console.log(typeof response.data.updatedCourse._id);
            setCourses((prevCourses)=>{
                let array=[]
              prevCourses.forEach((element) => {
                    if(element._id!==courseId.current)
                    {
                        array.push(element)
                    }else{
                        array.push(response.data.updatedCourse)
                    }
              });
              
                   return array;
            })

        } catch (error) {
            console.log(error);
        }

        setTitle("");
        setDescription("");
        setPrice("");
        setImageUrl("");


    }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center' onClick={onClose}>
        
           
            <div className='w-[520px] h-[55vh] rounded-xl shadow-lg flex flex-col justify-center gap-3  p-8 bg-white' onClick={(e)=>{e.stopPropagation()}}>
                <div>
                    <input type="text" id='title' name='title' value={title} onChange={(e)=>{setTitle(e.target.value)}} className='p-4 border-2 bg-transparent rounded-xl border-gray-100 w-full' placeholder='Enter title' />
                </div>
                  <div>
                    <input type="description" id='description' value={description} onChange={(e)=>{setDescription(e.target.value)}} name='description' className='p-4 border-2 bg-transparent rounded-xl border-gray-100 w-full' placeholder='Enter description' />
                </div>
                  <div>
                    <input type="number" id='price' value={price} name='price' onChange={(e)=>{setPrice(e.target.value)}} className='p-4 border-2 bg-transparent rounded-xl border-gray-100 w-full' placeholder='Enter Price' />
                </div>
                 <div>
                    <input type="text" id='imageUrl' value={imageUrl} name='imageUrl' onChange={(e)=>{setImageUrl(e.target.value)}} className='p-4 border-2 bg-transparent rounded-xl border-gray-100 w-full' placeholder='Enter imageUrl' />
                </div>
                <div>
                  <button className='mt-4 px-4 py-2 bg-yellow-500 rounded-xl text-xl text-white active:scale-[0.98] hover:bg-yellow-400 hover:scale-[1.01] transition-all ease-in-out duration-75' onClick={UpdateCourse} >Update Course</button>
                </div>
            </div>

    </div>
  )
}

export default Modal