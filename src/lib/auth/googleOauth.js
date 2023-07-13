import GoogleStrategy from "passport-google-oauth20"
import UsersModel from "../../api/users/model.js"
import { createAccessToken } from "./tools.js"

// WATCH https://epicodeschool.webex.com/recordingservice/sites/epicodeschool/recording/6eac5684b677103bbfbddaa68df45d8d/playback
// saved as "D12 - Testing & CI/CD" - April 6th

const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: `${process.env.API_URL}/users/googleRedirect`,
    },
    async (_, __, profile, passportNext) => {
        try {
            const { email, given_name, family_name, sub } = profile._json
            //1. Check if user is already in db
            const user = await UsersModel.findOne({ email })
            if (user) {
                //2. If so, generate accessToken
                const accessToken = await createAccessToken({ _id: user._id, role: user.role })
                //2.1 Then, go to /googleRedirect route handler function
                passportNext(null, { accessToken })
            } else {
                //3. If user is not in db yet, create them
                const newUser = new UsersModel({
                    firstName: given_name,
                    lastName: family_name,
                    email,
                    googleId: sub, //sub is 'id' in Google
                })

                const createdUser = await newUser.save()

                //3.1 Generate accessToken
                const accessToken = await createAccessToken({ _id: createdUser._id, role: createdUser.role })
                //3.2 Go to /googleRedirect route handler function
                passportNext(null, { accessToken })
            }
        } catch (error) {
            passportNext(error)
        }
    }
)

export default googleStrategy