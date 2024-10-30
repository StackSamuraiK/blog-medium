import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign } from "hono/jwt"
import { signupInput , signinInput } from "@kshitiz-2002/medium-common";



export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
      JWT_PASSWORD:string
    }
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body)

    if(!success){
      return c.status(403), 
      c.json({
        message:"wrong inputs"
      })
    } else{
      const user = await prisma.user.create({
        data:{
          email: body.email,
          password: body.password,
          name : body.name
          
        }
      })

      const token = await sign({id : user.id} , c.env.JWT_PASSWORD)
      return c.json({
        token: token
      }) 
    }
  })
  
  
  userRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
    
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body)

    if(!success){
      return c.json({
        message:"wrong inputs"
      })
    } else{
      const user : any= await prisma.user.findUnique({
        where: {
          email: body.email
        }
      })
      
      if (user){ 
        const token = await sign({id : user.id} , c.env.JWT_PASSWORD)
        return c.json({
          token: token
        }) 
      } else {
        return c.json({msg:"user does not exist"})
      }
    }
  })