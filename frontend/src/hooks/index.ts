import axios from "axios"
import { useEffect, useState } from "react"
import {BACKEND_URL} from "../config"


interface Blogs{
    
        "content": string,
        "title": string,
        "id": string,
        "published": false,
        "author": {
            "name": string 
        }
}
export interface Blog {
    "content": string;
    "title": string;
    "id": number
    "author": {
        "name": string
    }
}

export const useBlog = ({id} : {id:string}) =>{
    const [loading , setLoading] = useState(true)
    const [blog , setBlog] = useState<Blog>()

    useEffect(() =>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}` , {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response=>{
                setBlog(response.data.blog)
                setLoading(false)
             }).catch(error => {
                console.error("Error fetching blog:", error.response?.data || error.message);
                setLoading(false);
            })
    },[id])

    return {loading , blog}
}

export const useBlogs = () =>{
    const [loading , setLoading] = useState(true)
    const [blogs , setBlogs] = useState<Blogs[]>([])

    useEffect(() =>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk` , {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response=>{
                setBlogs(response.data.blog)
                setLoading(false)
             })
    },[])

    return {loading , blogs}
}