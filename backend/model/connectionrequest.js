import mongoose from "mongoose";

const connectionrequestschema=new mongoose.Schema({
    fromuserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    touserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["accepted","rejected","ignore","intrested"],
            message:`not valid status`
        }
    }
},{
    timestamps:true
})

connectionrequestschema.index({fromuserId:1,touserId:1})  //compound index

const connectionrequestmodel=new mongoose.model("connectionrequest",connectionrequestschema);

export default connectionrequestmodel;