const mongoose =require('mongoose');

/**Conect to a MongoBD database using the connection String provided in th .env
 * @async
 * @function ConectDB
 */
const ConectDB =async()=>{

try {
    await mongoose.connect(process.env.MONGO_ATLAS,{

    });
    console.log('Database Connected Correctly');
} catch (error) {
    throw new Error('Failed to start database Verify connection string or Connectivity');
};

};
module.exports={
    ConectDB
};