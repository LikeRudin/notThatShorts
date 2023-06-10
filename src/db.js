import mongoose from "mongoose";


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const db = mongoose.connection;

const handleOpen = () => console.log("✔ DB is connected");
const handleError = (error) => console.log(`✖failed to connect DB, Error: ${error}`);

db.on("error", handleError);
db.once("open", handleOpen);