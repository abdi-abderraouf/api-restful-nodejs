const { users } = require("../config");
const db=require("../config");
const Users=db.users;
function validateName(name)
{
    var nameRegex = /^[a-zA-Z\-]+$/;
    var validfirstUsername  =name.match(nameRegex);
    if(validfirstUsername  == null){
        console.log("Your first name is not valid. Only characters A-Z, a-z and '-' are  acceptable.");
        return false;
}
else
{
    console.log("Your first name is  valid");

    return true;
}
}
function validateAge(age)
{
    const ag = parseInt(age);
    if(ag>20)
    {
    console.log("correcte");
    return true;
    }
    else {
    console.log("incorrecte");
    return false;
    }
}
function validatemail(email)
{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var mailvalid= email.match(mailformat)
    if(mailvalid == null)
    {
        console.log("mail malformated values missing @ or misplaced characters");
        return false;
    }
    else
    {
        console.log("valid email ");
        return true;
    }
}
function validateJob(job)
{
const jobList=['ingénieur','technicien', 'admin'];
if(jobList.includes(job))
{
    console.log("good job");
    return true;
}
else
{
    console.log("bad job not found");
    return false;
}
}
exports.create=(req,res)=>{
    if(!req.body.firstname || !req.body.lastname)
    {
        res.status(400).send({message:"nom et prénom obligatoire"});
        return;
    }
   else if( !validateName(req.body.firstname) || !validateName(req.body.lastname))
    {
        res.status(400).send({message:"nom et prénom doivent être uniquement des caractéres!"});
        return;
    }
   else if( !validateJob(req.body.job))
    {
        res.status(400).send({message:"le métier doit être correcte!"});
        return;
    }
   else if(!validatemail(req.body.email))
    {
        res.status(400).send({message:"le mail doit être valide!"});
        return;
    }
    else if(!validateAge(req.body.age))
    {
        res.status(400).send({message:"l'age doit etre convenable!"});
        return;
    }
const user=new Users({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    email:req.body.email,
    job:req.body.job,
    age:req.body.age,
    password:req.body.password,
});
user.save(user).then((data) => {
   res.send(data) 
}).catch((err) => res.status(500).send(
    { message:err.message||"error while adding"}
))};
exports.findAll = (req, res) => {
    if(req.query.firstname){
    const firstname = req.query.firstname; 
      var condition = firstname
          ? { firstname: { $regex: new RegExp(firstname), $options: "i" } }
          : {};
          Users.find(condition).then((data)=>{  
            res.send(data);
                 }).catch((err)=>{
                 res.status(500).send({message:err.message || "erreur lors de la recherche"})
                 })
     }
    else if (req.query.lastname) {
            const lastname = req.query.lastname; 
      var condition = lastname
          ? { lastname: { $regex: new RegExp(lastname), $options: "i" } }
          : {};
          Users.find(condition).then((data)=>{  
            res.send(data);
                 }).catch((err)=>{
                 res.status(500).send({message:err.message || "erreur lors de la recherche"})
                 })  
     }
     else if (req.query.job) {
        const job = req.query.job; 
  var condition = job
      ? { job: { $regex: new RegExp(job), $options: "i" } }
      : {};
      Users.find(condition).then((data)=>{  
        res.send(data);
             }).catch((err)=>{
             res.status(500).send({message:err.message || "erreur lors de la recherche"})
             })  
            }
            else{
                Users.find(condition).then((data)=>{  
                    res.send(data);
                         }).catch((err)=>{
                         res.status(500).send({message:err.message || "erreur lors de la recherche"})
                         }) 
            }
        
        }
       
exports.update = (req, res) => {
    if (!req.body) {
    return res.status(400).send({
    message: "Data to update can not be empty!"
    });
    }
    const id = req.params.id;
    users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
    if (!data) {
    res.status(404).send({
    message: `Cannot update  with id=${id}. Maybe user was not
   found!`
    });
    } else res.send({ message: "user was updated successfully." });
    })
    .catch(err => {
    res.status(500).send({
    message: "Error updating Tutorial with id=" + id
   });
   });
   };

   exports.delete = (req, res) => {
    const id = req.params.id;
    users.findByIdAndRemove(id)
    .then(data => {
    if (!data) {
    res.status(404).send({
    message: `Cannot delete user with id=${id}. Maybe user was not
   found!`
    });
    } else {
    res.send({
    message: "user was deleted successfully!"
    });
    }
    })
    .catch(err => {
    res.status(500).send({
    message: "Could not delete user with id=" + id
    });
    });
   };
   

