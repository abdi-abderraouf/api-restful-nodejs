const express = require('express')
const cors = require('cors')
const { urlencoded } = require('express')
const app = express()
var corsOption = {
    origin:"http://localhost:8080"
    //origin:"www.myfront.com"
    //origin:["s1","s2","s3"]
}

app.use(cors(corsOption))
app.use(express.json())
app.use(urlencoded({extended:true}))
const db = require('./app/config/index.js')
const { url } = require('./app/config/db.config')
db.mongoose.connect(db.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('connected to data base')
}).catch(err=>{
    console.log('probleme de connection',err)
    process.exit()
})

app.get('/',(req,res)=>{
    res.send({message:'welcome to the app'})
});
require('./app/routers/users.routes')(app)
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>
{
    console.log('server run in port:'+PORT)
}
)

