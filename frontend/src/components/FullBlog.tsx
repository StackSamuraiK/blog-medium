import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"



export const FullBlog = ({ blog }: { blog: Blog}) => {
    return <div>
        <div>
            <Appbar />
        </div>
        <div className="grid grid-cols-12 w-full px-40 pt-12">
            <div className="w-full col-span-8">
                <div className="text-5xl font-extrabold">
                    {blog.title}
                </div>

                <div className="text-slate-500 pt-2">
                    Posted on Oct 29 ,2024
                </div>
                <div className="pt-4">
                    {blog.content}
                </div>
            </div>

            <div className="col-span-4">
                <div className="text-slate-600 text-lg">
                    Author
                </div>
                <div className="flex">
                    <div className="pr-4 flex justify-center flex-col">
                        <Avatar name={blog.author.name} size="big" />
                    </div>
                    <div>
                        <div className="text-xl font-bold pb-2" >
                            {blog.author.name ? blog.author.name : "Anonymous"}
                        </div>
                        <div className="text-slate-500">
                            This is a random catch-phrase to catch the user's attention it can be of one line or maybe two lines
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}