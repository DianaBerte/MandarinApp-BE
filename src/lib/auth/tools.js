import jwt from "jsonwebtoken"

// ATTENTION: check https://github.com/nclBaz/epicode-u5-d9-4/blob/main/src/lib/auth/tools.js

export const createAccessToken = payload =>
    new Promise((resolve, reject) =>
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1 week" }, (err, token) => {
            console.log("secret key1: ", process.env.JWT_SECRET)
            if (err) reject(err)
            else resolve(token)
            console.log("access token in createAccessToken: ", token)
        })
    ) // input: payload; output: Promise resolving into token

export const verifyAccessToken = token =>
    new Promise((resolve, reject) =>
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            console.log("secret key2: ", process.env.JWT_SECRET)
            if (err) reject(err)
            else resolve(payload)
            console.log("payload in verifyAccessToken: ", payload)
            console.log("token in verifyAccessToken: ", token)
        })
    ) // input: token; output: Promise resolving into original payload