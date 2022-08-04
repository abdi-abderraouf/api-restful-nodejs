const { mongoose } = require("../config");

module.exports= mongoose => {
    var schema=mongoose.Schema(
        {
            firstname:String,
            lastname:String,
            email:String,
            job:String,
            age:Number,
            password:String,
        },
           {timestamp:true}
    );
    schema.method("tojson",function()
    {
        const{__v,_id,...Object}=this.toObject();
        Object.id=_id;
        return Object;
      //pour detruire les objets apres leur creation
    });

    const User = mongoose.model('user',schema);
        return User;
}

