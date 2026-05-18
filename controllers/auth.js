import Author from "../models/Author.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export async function login(req, res) {
    try {
        const { username, email, password } = req.body;
        let userLog = await Author.findOne({ email: email });
        console.log("USER TROVATO", userLog)
        if (!userLog) {
            res.status(401).json({
                message: 'Credenziali errate'
            });
            return

        }
        const result = await bcrypt.compare(password, userLog.password);
        console.log("PASSWORD INSERITA", password)
        if (!result) {
            res.status(401).json({
                message: 'Credenziali errate'
            });
            return
        }
        jwt.sign({
            id: userLog.id,
            role: userLog.role,


        },
            process.env.JWT_SECRET,
            {
                expiresIn: '12h'
            },
            function (error, jwtToken) {
                if (error) {
                    res.status(500).json({
                        message: error.message
                    });
                } else {
                    res.json({
                        token: jwtToken,

                        user: {
                            id: userLog._id,
                            username: userLog.username,
                            email: userLog.email,
                            role: userLog.role,
                        }
                    });
                }

            }
        );




    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
const existingUser = await Author.findOne({email});

if (existingUser) {
    return res.status(400).json({
        message: "Utente già esistente",
    });
}

        const newUser = new Author({
            username,
            email,
            password
        });

        await newUser.save()

        res.status(201).json({
            message: "User created",
        user: {
            email: newUser.email,
            username: newUser.username,
            id: newUser._id,
        },
     });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}







export async function googleCallback(req, res) {
    const user = req.user;
    return res.status(200).json(user);

}