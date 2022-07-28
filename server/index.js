const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const path = require("path");
const api = require("./routes/api");
const passport = require("passport");

//----------------------------------------------------------------------------------------------------Create App
const app = express();

//----------------------------------------------------------------------------------------------------Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

//----------------------------------------------------------------------------------------------------Using Passport
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

//----------------------------------------------------------------------------------------------------Using Routes
app.use("", api);

//----------------------------------------------------------------------------------------------------Connecting Database
mongoose.set('useFindAndModify', false);

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

const database = require("./config/dev").mongoURI;

mongoose.connect(database, connectionParams).then(()=>{
    console.log("Connected to mongoDB successfully");
}).catch(()=>{
    console.log("Connection failed");
});

//----------------------------------------------------------------------------------------------------Build Production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("../client/build"));
    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../client", "build", "index.html")));
} else {
    app.get("/", (req, res) => res.send("Welcome to malouka's App"));
}

//----------------------------------------------------------------------------------------------------Handling 404
app.use((req, res) => {
    res.status(404).send({ error: "We can not find what you are looking for" });
});

//----------------------------------------------------------------------------------------------------Define Port, Use from Production or use 5000
const PORT =  process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Started listening to port ${PORT}`);

});