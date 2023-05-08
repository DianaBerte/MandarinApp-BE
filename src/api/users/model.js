import mongoose from "mongoose";
import bcrypt from "bcrypt"

const { Schema, model } = mongoose

const UsersSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true, enum: ["Admin", "User"], default: "User" },
        quizAnswers: { type: [String] }
    },
    { timestamps: true }
)

UsersSchema.pre("save", async function () {
    const newUserData = this
    if (newUserData.isModified("password")) {
        const plainPW = newUserData.password
        const hash = await bcrypt.hash(plainPW, 11)
        newUserData.password = hash
    }
})

UsersSchema.methods.toJSON = function () {
    const currentUserDocument = this
    const currentUser = currentUserDocument.toObject()
    delete currentUser.password
    delete currentUser.createdAt
    delete currentUser.updatedAt
    delete currentUser.__v
    return currentUser
}

UsersSchema.static("checkCredentials", async function (email, plainPW) {
    // Given email and plainPW, this method checks in the db if the user exists (by email)
    // Then it compares the given pw with the hashed one coming from the db
    // Then it returns a useful response

    const user = await this.findOne({ email })
    if (user) {
        const passwordMatches = await bcrypt.compare(plainPW, user.password)
        if (passwordMatches) {
            return user
        } else {
            return null
        }
    } else {
        return null
    }
})

export default model("user", UsersSchema)