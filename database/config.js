const mongoose =require('mongoose');
const ConectarDB =async()=>{
    // Funcion que me permite conectarme a la base de Datos

try {
    await mongoose.connect(process.env.MONGO_ATLAS,{

    });
    console.log('Base de Datos Conectada Correctamente');
} catch (error) {
    throw new Error('Error a la hora de iniciar la base de datos Verificar cadena de conexion o Conectividad');
};
};
module.exports={
    ConectarDB
};