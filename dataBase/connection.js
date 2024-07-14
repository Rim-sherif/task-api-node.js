import  mongoose  from "mongoose";

export function connection(){
  mongoose.connect('mongodb://localhost:27017/routeTask').then(()=>{
    console.log('connectd to db')
  }).catch((err)=>{
    console.log("error")
  })
}