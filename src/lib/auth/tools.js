import jwt from "jsonwebtoken"

export const createAccessToken = payload =>
    new Promise((resolve, reject) =>
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1 week" }, (err, token) => {
            if (err) reject(err)
            else resolve(token)
        })
    ) // input: payload; output: Promise resolving into token

export const verifyAccessToken = token =>
    new Promise((resolve, reject) =>
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) reject(err)
            else resolve(payload)
            console.log("payload in verifyAccessToken: ", payload)
            console.log("error: ", error)
        })
    ) // input: token; output: Promise resolving into original payload