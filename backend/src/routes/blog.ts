import { verify } from "hono/jwt";
import { Hono } from "hono";
import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlog, updateBlog } from "@kshitiz-2002/medium-common";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_PASSWORD:string
    } , 
      Variables:{
        userId : string
      }
}>()

blogRouter.use('/*' , async(c ,next)=>{
  const authHeader = c.req.header("Authorization") || ""
  const token = authHeader.split(" ")[1]
  const user = await verify(token , c.env.JWT_PASSWORD) as User
  console.log(user)
  if(user){
    c.set("userId" , user.id)
    await next()
  }
  else{
    return c.json({
      message:"You are not authenticated"
    })
  }
})

blogRouter.post('/', async (c) => {
  const body = await c.req.json();
  const { success } = createBlog.safeParse(body);
  if (!success) {
      c.status(411);
      return c.json({
          message: "Inputs not correct"
      })
  }

  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.post.create({
      data: {
          title: body.title,
          content: body.content,
          authorId: (authorId)
      }
  })

  return c.json({
      id: blog.id
  })
})
  

  blogRouter.put('/', async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  try{
    const body =  await  c.req.json()
    const {success} = updateBlog.safeParse(body)

    if(!success){
      return c.json({
        message:"wrong inputs"
      })
    }

    else{

      const blog = await prisma.post.update({
        where:{id : body.id},
        data:{
          title: body.title,
          content  : body.content,
        }
      })
      return c.json({
        blog
      })
    }
  }catch(e){
    c.status(400);
    return c.json({
      message:"Something is up on your side"
    })
  }
  })

  blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
    const blog = await prisma.post.findMany({
      select:{
        content:true,
        title:true,
        id:true,
        published:true,
        author:{
          select:{
            name:true
          }
        }
      }
    })
      return c.json({
        blog:blog
      })
  })
  
  blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
    const id =  await  c.req.param("id")
    const blog = await prisma.post.findFirst({
      where:{
        id : Number(id)
      } , select:{
        id: true,
        title:true,
        content:true,
        author:{
          select:{
            name:true
          }
        }

      }
    })
      return c.json({
        blog
      })
  })

  