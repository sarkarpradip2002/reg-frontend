const express=require('express');
const mongoose=require('mongoose');
const path=require('path')
const cors=require('cors');
const url='mongodb+srv://1234:1234@cluster0.6cq1m.mongodb.net/table?retryWrites=true&w=majority'
const port=5500;

const app= express();
app.use(cors());
app.use(express.static(path.resolve(__dirname, './client/build')));
mongoose.connect(url);
app.use(express.json());

const notedetails = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },

    email:{
        type:String,
        required: true,
    },
    secretCode:{
        type:String,
        required: true,
    },
    hobbies: {
        type: String,
        required: true,
    },
});

const form=mongoose.model('Notes',notedetails)

app.get('/',async (req,res)=>{
    try {
        const find=await form.find();
        res.status(200).json(find);
    } catch (error) {
        res.status(404).json({
            "message":"Not found!!",
        })
    }
})

app.post('/',async (req,res)=>{
    const {name,phone,email,hobbies,secret}=req.body;
    const find=await form.findOne({email:email});
    if(find){
        return res.status(406).json({
            "message":"Email already registered in the database",
        })
    }
    const savedetails=new form({name,phone,email,hobbies,secretCode:secret});
    savedetails.save().then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(400).json({
            "message":"Can't save to the database",
        })
    });
})

app.put('/',async (req,res)=>{
    const email=req.headers.email;
    let find=await form.findOne({email:email});
    if(!find){
        return res.status(400).json({
            "message":"no data present to delete"
        })
    }
    const {secret,name,phone,hobbies}=req.body;
    const newnote={};
    if(name){newnote.name=name};
    if(phone){newnote.phone=phone};
    if(hobbies){newnote.hobbies=hobbies};

    if(find.secretCode.toString()===secret){
    let updatedata=await form.findOneAndUpdate({email:email},newnote);
    return res.status(200).json({
        "message":"your data updated successfully",
    })}
    else{
        return res.status(401).json({
            "message":"Unauthorized to update the note",
            })
    }
})

app.delete('/',async (req,res)=>{
    const {secret,email}=req.body;
    let find=await form.findOne({email:email});
    if(!find){
        return res.status(400).json({
            "message":"no data present to delete"
        })
    }
    if(find.secretCode.toString()===secret){
        form.findOneAndDelete({email:email},()=>{
                return res.status(200).json({
                    "message":"Data deleted successfully",
            })
        })
    }
    else{return res.status(401).json({
        "message":"Unauthorized to delete the note",
        })}
})

app.listen(port,()=>{
    console.log("Server started successfully");
})