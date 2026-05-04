import Author from "../models/Author.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export async function login(req, res) {
    try {
        const { email, password } = req.body;
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
                        token: jwtToken
                    });
                }

            }
        );




    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function register(req, res) {
    try {
        const { name, surname, birthDate, avatar, email, password } = req.body;


        const newUser = new Author({
            name,
            surname,
            birthDate,
            avatar,
            email,
            password
        });

        await newUser.save()

        res.status(201).send({ message: "User created" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}







export async function googleCallback(req, res) {
    const user = req.user;
    return res.status(200).json(user);

}