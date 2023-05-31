const amqp = require('amqplib');
const{email, mobile} = require("./notifications")

async function startNotificationService() {
  try {
    console.log("entered consumer");
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();

    const exchange = 'eventsExchange';
    const routingKey = 'insufficient_funds';
    const queueName = 'notificationQueue';

    // Declare the exchange and queue
    await channel.assertExchange(exchange, 'direct', { durable: true });
    await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queueName, exchange, routingKey);

    // Start consuming messages
    channel.consume(queueName, (message) => {
      const event = JSON.parse(message.content.toString());
      // Process the event and trigger the notification process
      handleInsufficientFundsEvent(event);

      // Acknowledge the message to remove it from the queue
      channel.ack(message);
    });
  } catch (error) {
    console.error('Error in the notification service:', error);
  }
}

function handleInsufficientFundsEvent(event) {
  // Extract the necessary information from the event
  const { amount,userId, notificationType } = event;

  // Fetch user information from User Management Service
  let user = fetchUserInformation(userId);
  user.amount = amount;

  console.log("entered insufficient funds")
  console.log(user);

  // Send the appropriate notification based on notificationType (e.g., mobile or email)
  notificationType == "email"? email(user) : mobile(user);
}

// Function to fetch user information from User Management Service
function fetchUserInformation(userId) {
  //In real world implementation, an API call would be made to the user service to fetch the user
  //But in this instance, we dont have a user service, so we would be returning a dummy user detail

  return {
    id: 1,
    email: "imohchard@gmail.com",
    phone: "09034310695",
    fcm_token: "stack-9034310695"
  }
}



// Start the notification service
startNotificationService();
