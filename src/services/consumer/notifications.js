const {sendGrid} = require("./MailProvider");
const {firebase} = require("./mobileNotifProvider");
module.exports = {
    email: async(obj)=>{
        //Get user from user service
        let body= "We were not able to charge you "+obj.amount+ " due to inssufucent balance in your account. Kindly fund your wallet";

        try{
            let data = {
                from: process.env.FROM_EMAIL,
                to: obj.email,
                subject: "Deposit Failure",
                html:`<strong>${body}</strong>`,
            }
            await sendGrid(data);
        }catch(err){
            console.error('Error at email function:', err);

            //handle error efficiently

        }
        
    },

    mobile: async(obj)=>{
        let body= "We were not able to charge you "+obj.amount+ " due to inssufucent balance in your account. Kindly fund your wallet";

        try{
            let data = {
                fcm_token : obj.fcm_token,
                title: "Deposit failure",
                body: body
             }
            await firebase(data);

        }catch(err){
            console.error('Error at email function:', err);
            //handle error efficiently

        }
        
    }
}