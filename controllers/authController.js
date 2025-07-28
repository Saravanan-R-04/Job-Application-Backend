import { userModel } from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

export const registerController = async(req,res) =>{
    try{
        const{name,email,password,role}=req.body;
        if(!name || !email || !password || !role)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const hashedPassword = await bcrypt.hash(password,12);
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword,
            role
        })
        await newUser.save();

        return res.status(200).json({
            success:true,
            message:"User Registered Successfully"
        })
    }
    catch(error)
    {
        return res.status(400).json({
            success:false,
            message:"Error In Registering"
        })
    }
}

export const loginController = async(req,res) =>{

    try{
        const {email,password}=req.body;
        const existingUser = await userModel.findOne({email}).select(+password);
        if(!existingUser)
        {
            return res.status(400).json({
                success:false,
                message:"You need to register"
            })
        }
        const token = jwt.sign({
            id:existingUser.id,role:existingUser.role
        },"secretkey",{expiresIn:"1d"})

        return res.status(200).json({
            success:true,
            message:"Logged In Successful",
            token
        })
    }
    catch(error)
    {
        return res.status(400).json({
            success:false,
            message:"Error In Logging"
        })
    }

}