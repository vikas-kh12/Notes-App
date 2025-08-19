
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
        return res.status(200).json({
            success:true,
            message:"data is added"
        });
        

    } catch (error) {
        console.log(error);

    }

}