import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { Skeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks"

export const Blogs = ()=>{
  const {loading,blogs }= useBlogs();

  if(loading || !blogs){
    return <div className="flex justify-center max-w-screen-xl  w-full">
      <div className="flex justify-center flex-col">
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
      </div>
    </div>
  }
    return <div>
      <div >
        <Appbar/>
      </div>
    <div className="flex justify-center ">

     <div className="flex justify-center flex-col">
            <div>
              {blogs.map(blog => <BlogCard
            id={blog.id} 
            authorName={blog.author.name || "U"}
            title={blog.title}
            content={blog.content}
            publishedDate="Oct 29 ,2024" />)}
          </div>
        </div>
    </div>
</div> 
        
    
}