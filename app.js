const express = require("express");
const app = express();

const dotenv = require('dotenv');

dotenv.config();

require("./src/services/consumer/eventConsumer");

const{publishInsufficientFundsEvent} = require("./src/services/publisher/eventPublisher");

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.get("/", async (req, res) => {

  
 await publishInsufficientFundsEvent(1, 5000, "mobile");

  res.status(200).send({
    message: "Welcome",
  });
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


module.exports = app;
