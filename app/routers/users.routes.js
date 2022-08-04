module.exports=app=>{
   const users =require("../controllers/users.controller")
   var router=require('express').Router()
   router.get("/",users.findAll)
   router.post("/",users.create)
   // Update a user  with id
 router.put("/:id",users.update);
 // Delete a user with id
 router.delete("/:id", users.delete);

   //app.use("/api/users",router)// si on veut differentier entre notreapi restfull et les autres api ajoutes
   app.use("/users",router)//si on a pas des autres api
}