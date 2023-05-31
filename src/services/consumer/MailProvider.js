const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


module.exports = {
   
    sendGrid: async(data) =>{
        console.log(data);
        try{
            await sgMail.send(data);
            console.log('Email sent')
        }catch(error){
            console.log(error);
        }

    }

    

}
