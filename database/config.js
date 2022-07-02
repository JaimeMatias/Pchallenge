const mongoose =require('mongoose');
const ConectarDB =async()=>{
try {
    await mongoose.connect(process.env.MONGO_ATLAS,{
        // useNewUrlParser:true,
        // useUnifiedTopology:true,
        // useCreateIndex:true,
        // useFindAndModify:false,
    });
    console.log('Base de Datos Conectada Correctamente');
} catch (error) {
    throw new Error('Error a la hora de iniciar la base de datos');
}
};
module.exports={
    ConectarDB
}