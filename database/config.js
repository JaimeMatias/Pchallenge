const mongoose =require('mongoose');
const db_connection =async()=>{
try {
    await mongoose.connect(process.env.MONGO_ATLAS,{
        // useNewUrlParser:true,
        // useUnifiedTopology:true,
        // useCreateIndex:true,
        // useFindAndModify:false,
    });
    console.log('Base de Datos Conectada Correctamente');
} catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la base de datos');
}
};
module.exports={
    db_connection
}