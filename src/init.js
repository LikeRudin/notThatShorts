import "regenerator-runtime";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";

import app from "./server";

const PORT = 8000;

const handleListening = () => console.log(`Server is listening from http://localhost:${PORT}👻`);

app.listen(PORT, handleListening);