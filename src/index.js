import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import { expressServer } from "./server.js";

const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => {
    console.log("✅ MongoDB is connected")
    expressServer.listen(port, () => {
        console.table(listEndpoints(expressServer));
        console.log(`✅ Server is running on port ${port}`);
    });
});