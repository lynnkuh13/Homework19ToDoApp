const express = require('express');
const app = express();

const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


mongoose.connect("mongodb+srv://happydays111:dummy123@cluster0.2as0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
, {useNewUrlParser: true}) // connect to the database

mongoose.connection.once('open', function() {
    console.log("CONNECTED TO DB");
})

const ToDoSchema = new Schema({
    toDo: String
})

const ToDoModel = mongoose.model("ToDos", ToDoSchema);

app.get('/', async function(req, res) {
    const todos = await ToDoModel.find();
    console.log("ToDos: ", todos)
    res.json(todos);  
  /*  res.send({todos}); */
})

app.post('/post', function(req, res) {
    console.log("Req: ", req.body);

    let toDoObj = {
        toDo: req.body.toDo
    }

    const toDo = ToDoModel.create(toDoObj);
    console.log("TODo OBJ: ", toDo)
    res.send({post: "Info posted"});

})

app.listen("3402", () => {
    console.log("App listening on port 3402");
})
