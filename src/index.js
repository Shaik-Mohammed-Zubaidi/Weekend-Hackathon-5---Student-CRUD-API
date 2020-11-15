const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
const studentArray= require('./InitialData');
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

let currid= studentArray.length+1;
app.get('/api/student',(req,res)=>{
    res.send(studentArray);
})

app.get('/api/student/:id',(req,res)=>{
    const id= req.params.id;
    const student= studentArray.find(student => student.id=== parseInt(id));

    if(!student){
        res.sendStatus(404);
        return;
    }
    res.send(student);
})

app.post('/api/student',(req,res)=>{
    const receivedStudent= req.body;
    if(!receivedStudent.name || !receivedStudent.currentClass || !receivedStudent.division){
        res.sendStatus(400);
        return;
    }
    studentArray.push({
        id: currid,
        name: receivedStudent.name,
        currentClass: Number(receivedStudent.currentClass),
        division: receivedStudent.division
    });
    res.send({id:currid});
    currid++;
})

app.put('/api/student/:id',(req,res)=>{
    const id= req.params.id;
    const receivedStudent= req.body;

    const studentIndex= studentArray.findIndex(student=>student.id===parseInt(id));
    if(studentIndex===-1){
        res.sendStatus(400);
        return;
    }
    if(Object.keys(receivedStudent).length===0){
        res.sendStatus(400);
        return ;
    }
    if(receivedStudent.name) {
        studentArray[studentIndex].name = receivedStudent.name;
    }
    if(receivedStudent.currentClass) {
        studentArray[studentIndex].currentClass = Number(receivedStudent.currentClass);
    }
    if(receivedStudent.division) {
        studentArray[studentIndex].division = receivedStudent.division;
    }

    res.send({name: `${receivedStudent.name}`});
})

app.delete('/api/student/:id',(req,res)=>{
    const id= req.params.id;
    const studentIndex= studentArray.findIndex(student=>student.id===parseInt(id));
    if(studentIndex===-1){
        res.sendStatus(404);
        return ;
    }
    studentArray.splice(studentIndex,1);
    res.sendStatus(200);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   