
import {User} from "../models/user.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async(req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            res.status(400).json({
                success: false,
                message: "Enter all the fields"
            });
            
        } else {
            const hashedPassword =  await bcrypt.hash(password,10);
            User.create({
                fullName,
                email,
                password: hashedPassword
            });
        }
        const users = await User.find({});
        return res.status(200).json({
            success:true,
            message:"data is added",
            data:users
        });
        

    } catch (error) {
        console.log(error);

    }

}
export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"fill the all fields"
        })
    }
        const user=await User.findOne({email})
        if(!user){
            res.status(400).json({
                success:false,
                message:"emial doesent exists"
            });
        }
         const isPasswordMatch =await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            res.status(400).json({
                success:true,
                message:"password incorrect",
            })
            
        }
        
        return res.status(200).json({
                success:true,
                message:`login success ${user.fullName}`,
        })
    
    } catch (error) {
        console.log(error);
        
    }
}


















