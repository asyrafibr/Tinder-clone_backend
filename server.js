import express from "express";
import mongoose from "mongoose";
import Card from "./dbCards.js";
import cors from 'cors';

//App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://admin:EmvnIQOq2KMn8as5@cluster0.8j567.mongodb.net/tinderdb?retryWrites=true&w=majority`;
//Middlewares

app.use(express.json())
app.use(cors())
//DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
//API endpoints
app.get("/", (req, res) => {
  res.status(200).send("JELLO");

});

   
    app.post("/tinder/cards", (req, res) => {
      const dbCard = req.body;
      Card.create(dbCard, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).send(data);
        }
      });
    });
 
  
    app.get("/tinder/cards", (req, res) => {
      Card.find( (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
    });

//Listen
//Listener-=0_

app.listen(port, () => console.log(`Listening to localhost: ${port}`));
