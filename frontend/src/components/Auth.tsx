import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@kshitiz-2002/medium-common";
import axios from "axios"
import { BACKEND_URL } from "../config";

export const Auth = ({ type } : { type : "signup" | "signin" }) => {
    const navigate = useNavigate()
    const [signupInputs , SetSignupInputs] = useState<SignupInput>({
        name:"",
        email:"",
        password:""
    })

    async function sendRequest() {
        try{
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}` , signupInputs)
            const token = res.data.token
            localStorage.setItem("token" , token)
            navigate("/blog")
        } catch(e){
            alert("E R R O R   W H I L E   S I G N I N G   U P")
        }
    }
    return <div className=" h-screen flex justify-center ">
            
            <div className="flex justify-center flex-col">
                <div className="px-10">

          <div className="text-center text-4xl font-extrabold">
            Create an Account 
          </div>
          <div className="text-center text-slate-400">
               {type ==="signup" ? "Already have an account? " : "Don't have an account? "}
            <Link className="underline" to={type === "signup" ? "/signin" : "/signup"}>{type ==="signup" ? "SignIn" : "SignUp"}</Link>
          </div>
            </div>
           
          {type === "signup" ? <LabelledInputs label="Name" placeholder="Kshitiz" onChange={(e)=>{
            SetSignupInputs({
                ...signupInputs,
                name: e.target.value
            })
          }} /> : null}
          
          <LabelledInputs label="Email"  placeholder="Kshitiz@example.com" onChange={(e)=>{
            SetSignupInputs({
                ...signupInputs,
                email: e.target.value
          })
        }} />
          <LabelledInputs label="Password" type={"password"} placeholder="Kshitiz123" onChange={(e)=>{
              SetSignupInputs({
                  ...signupInputs,
                  password: e.target.value
                })
            }} />
            <button type="button" onClick={sendRequest} className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "SignUp" : "SignIn"}</button>

            </div>
    </div>
}

interface inputBoxTypes{
    label:string,
    placeholder: string
    onChange : (e : ChangeEvent<HTMLInputElement>)=> void
    type?: string
}
function LabelledInputs ({label , placeholder , onChange , type} : inputBoxTypes){
    return <div>
        <div>
            <label  className="block mb-2 text-sm font-medium text-black">{label}</label>
            <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>
    </div>
}