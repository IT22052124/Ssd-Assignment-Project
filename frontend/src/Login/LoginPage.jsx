import React, { useContext, useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from '../Shared/Components/context/authcontext';
import {
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import Toast from "../Shared/Components/UiElements/Toast/Toast"

export const LoginPage = () => {

    const auth = useContext(AuthContext)
    const [mail, setMail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
      console.log(mail, password)
        e.preventDefault()
        axios.post('http://localhost:5000/login/', {mail, password})
        .then(res => {
            console.log(res)
            if(res.data.message === "Success"){
                auth.login(res.data.user._id);
                console.log(res.data.user)
                Toast("Login Successfully !!", "success")
                navigate("/Products")
            }else{
                Toast("Invalid mail / Password", "error")
            }
        
        })
        .catch(err=> console.log(err))
    }

  return (
    <div className="h-screen" style={{
      backgroundImage: `url('/img/cuslogin.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
    <section className="m-8 pt-14 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form  onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" action="#" >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              type="email"
              placeholder="name@mail.com"
              onChange={(e) => setMail(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:text-gray-500 placeholder:opacity-100"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:text-gray-500 placeholder:opacity-100"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          
          <Button className="mt-6" fullWidth type='submit'>
            Sign In
          </Button>

          
          
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/Customer/create" className="text-gray-900 ml-1">Create account</Link>
          </Typography>
        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/items.jpg"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
    </div>
  )
}

export default LoginPage;