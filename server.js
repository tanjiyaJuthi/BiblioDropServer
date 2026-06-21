import app from "./src/app.js";

const port = process.env.SERVER_PORT || 8001;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});