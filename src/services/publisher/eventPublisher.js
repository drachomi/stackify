const amqp = require('amqplib');

//The idea is that this function is called from the main service

module.exports = {
   publishInsufficientFundsEvent: async(userId, amount, notificationType)=> {
    try {
      console.log("gotten here");
      const connection = await amqp.connect(process.env.RABBITMQ_URL);
      console.log("created connection");
      const channel = await connection.createChannel();
      console.log("created channel");
  
      const exchange = 'eventsExchange';
      const routingKey = 'insufficient_funds';
  
      // Declare the exchange
      await channel.assertExchange(exchange, 'direct', { durable: true });
  
      // Create the event payload
      const event = {
        userId: userId,
        amount: amount,
        notificationType: notificationType
      };
  
      // Publish the event to the exchange with the specified routing key
      channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(event)));
  
      // Close the connection and channel
      await channel.close();
      await connection.close();
    } catch (error) {
      console.log("ddddddd errot");
      console.log(error);
      console.error('Error publishing insufficient funds event:', error);
    }
  }
}






