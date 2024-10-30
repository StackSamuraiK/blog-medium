import { Link } from "react-router-dom"

interface BlogCardInputs
{
    id:string,
    authorName:string,
    title : string,
    content : string,
    publishedDate : string
}

export const BlogCard = ({
    id,
    authorName ,
    title,
    content,
    publishedDate
} : BlogCardInputs) => {
    return <Link to={`/blog/${id}`}> 
    <div className="border-b cursor-pointer p-4 w-screen max-w-screen-md">
        <div className="flex ">
            <div className="flex justify-center flex-col">
               <Avatar  name={authorName}/> 
            </div>
            <div className="font-extralight text-sm pl-2 flex justify-center flex-col">
            { authorName }
            </div>

            <div className="flex justify-center flex-col pl-2">
                <Circle/>
            </div>
            <div className="pl-2 flex justify-center flex-col text-sm font-thin text-slate-500">
            {publishedDate}
            </div>
        </div>

        <div className="text-2xl pt-2 font-bold">
            {title}
        </div>

        <div className="text-md font-light">
            {content.slice(0,495) + "..."}
        </div>

        <div className="text-sm pt-4 text-slate-400 font-thin">
            {`${Math.ceil(content.length/1000)} min(s) read`}
        </div>
    </div>
    </Link>
}

export const Circle =  () => {
    return <div className="h-1 w-1 bg-slate-400 rounded-full">
        
    </div>
}

export function Avatar ({ name , size = "small"} : {name : string , size?:"big" | "small"}){
   return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}
  >
        <span className="text-xs text-gray-600 dark:text-gray-300">{name ? name[0] : "U"}</span>
    </div>
}