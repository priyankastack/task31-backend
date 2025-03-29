const mongoose=require('mongoose');


const connectdb=async(req,res)=>{
try {
    await mongoose.connect("mongodb+srv://priyankastack:zMzmE8YbTIy6VlH5@nk.v49wg.mongodb.net/?retryWrites=true&w=majority&appName=nk");
    console.log("Database connected successfully!")
} catch (error) {
    console.log(error);
    process.exit(1);
}
}


module.exports=connectdb;