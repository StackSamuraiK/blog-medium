import { ChangeEvent, useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title , setTitle] = useState("")
    const [description , setDescription] = useState("")
    const navigate = useNavigate();
    return <div>
        <div>
            <Appbar/>
        </div>
        <div className="p-10 ml-20 mr-20 mb-20 flex justify-center flex-col">
        <div className="pt-4 ">
             <TitleInput onChange={(e)=>{
                setTitle(e.target.value)
             }}/>
        </div>
        <div className="pt-6">
            <TemplateDemo onChange={(e)=>{
                setDescription(e.target.value)
            }}/>
        </div>
            <button onClick={async ()=>{
               const response = await axios.post(`${BACKEND_URL}/api/v1/blog` , {
                    title,
                    content : description
                } , {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                navigate(`/blog/${response.data.id}`)
            }}type="button" className="px-6 py-3.5 mt-4 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Publish</button>
        </div>
    </div>
}


 function TemplateDemo({onChange} : {onChange : (e:ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div>
             <textarea onChange={onChange} id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 " placeholder="Write your thoughts here..."></textarea>
        </div>
}


function TitleInput ({onChange} : {onChange : (event :ChangeEvent<HTMLInputElement>) => void}){
    return <div>
        <input onChange={onChange} type="email" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title"/>
    </div>
}