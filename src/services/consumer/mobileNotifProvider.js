const admin = require('firebase-admin');
const serviceAccount = require("../../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports = {
    firebase: async(data) =>{
        const message = {
            notification: {
              title: data.title,
              body: data.body
            },
            token: data.fcm_token
          };
        try{
            await admin.messaging().send(message);

        }catch(error){
            console.log(error);
        }

    }

    

}
