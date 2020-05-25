const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes= require("./controllers/routes")


mongoose
    .connect("mongodb+srv://celso:celso123@cluster0-aflzu.mongodb.net/3Secu?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to mongoDB");
    })
    .catch((e) => {
        console.log("Error while DB connecting");
       
    });

const app = express();
app.use(cors());

const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());
routes(app);



const port = 8800;
app.listen(port, () => console.log(`Listening on port ${port}`));