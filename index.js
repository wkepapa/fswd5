const express=require("express");
const app=express();
const PORT=5000;
app.use(express.json());
const validatetodo=(req,res,next)=>{
   if(!req.body.task){
     return  res.status(400).json({message:"provide task field"})
   }
   next();
}
app.get("/",(req,res)=>{
    res.send('home page of to-do')
})
 let todos=[
    {id:1,task:"fswd-work",completed:"true"
    },
    {id:2,task:"cn-nptel",completed:"false"
    },
    {id:3,task:"ai-assignment",completed:"true"
    },
 ]
 app.get("/todos",(req,res)=>{
    res.json(todos);
 })
 app.get("/todos/:id",(req,res)=>{
    const todo=todos.find(t=>t.id===parseInt(req.params.id));
    if(!todo){
       return  res.json({message:"todo not found"}).status(404)
    }
    res.json(todo);
 })
 app.post("/todos",validatetodo,(req,res)=>{
     const {id,task,completed}=req.body;
     if(!id||!task||completed===undefined){
       return res.status(400).json({error:"bad request enter missing fields"});
     }
     const todo={id,task,completed};
     todos.push(todo);
     res.status(201).json({message:"task added successfully",todo:todo});
 })
 app.put("/todos/:id",(req,res)=>{
    const todoid=parseInt(req.params.id);
    const todo=todos.find(t=>t.id===todoid)
    if(!todo){
        return  res.json({message:"todo not found"}).status(404)
     }
     const {task,completed}=req.body;
     if(task){
        todo.task=task;
     }
     if(completed!==undefined){
        todo.completed=completed;
     }
     res.json(todo);
 })
 app.delete("/todos/:id",(req,res)=>{

        const todoid = parseInt(req.params.id);
        const index = todos.findIndex(t => t.id === todoid);
        if (index===-1) {
            return res.status(404).json({ message: "To-Do not found" });
        }
        todos.splice(index, 1);
        res.json({ message: "To-Do deleted successfully" });
    });
    app.use((err,req,res,next)=>{
      console.log(err.stack);
      res.status(500).json({message:"internal server error"});
   
   });

app.listen(PORT,()=>{
    console.log(`server listening on port:${PORT}`);
})