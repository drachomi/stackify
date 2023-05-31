
# Automated Deposit Notification System

This project implements an Automated Deposit Notification System using Node.js. It sends mobile or email notifications to users when an automated deposit fails due to insufficient funds in their wallet.

## Project Structure

`A major architectural pattern is followed here was using a message broker (RabbitMq) to handle notification events. The reason for this being that i always like to decouple non thread events from the main thread. Notifications can be sent in the background using the message broker such that an error in the notification event doesn't lead to an error on the main thread. Normal user activity can happen without hitch.`

The project follows a microservices architecture with the following independent microservices:

- Authentication and Authorization
- User Management
- User Dashboard
- Payment Gateway
- User Wallet
- Notification Service

The main focus of this project is the Notification Service, which handles the notification process for failed automated deposits.

For ease, i have added a function of the main service to this code. EventConsumer folder is supposed to be in the main service. But for this implementation i have included it here.

- The publishInsufficientFundsEvent function of the eventConsumer class is called whenever there's a failure.

## Assumptions and Considerations

- The microservices (Authentication and Authorization, User Management, User Dashboard, Payment Gateway, and User Wallet) are assumed to be available and functioning.
- The communication between microservices is handled through appropriate APIs, but the actual implementation details are not provided in this project.
- The user information required for notifications (such as email address and mobile number) can be fetched from the User Management Service.
- The wallet balance can be checked using the User Wallet microservice.
- The implementation assumes that the Notification Service is connected to the main service via a message broker (RabbitMQ) to receive events related to insufficient funds.
- The RabbitMQ server is assumed to be running on a server. You can use `https://www.cloudamqp.com/` to create a free rabbitmq instance.
- The environment configurations for RabbitMQ and other services should be provided in a `.env` file. Rename the `.env.example` file to `.env` and update the values accordingly.
- Unit and integration testing was not taken into consideration in this implementation. Time constraint being the main reason.

## Setup

1. Microservices:
- The project assumes the presence of the following microservices: Authentication and Authorization, User Management, User Dashboard, Payment Gateway, and User Wallet. These microservices should be available and functioning independently.
- The communication with these microservices is not implemented in this project. You need to replace the placeholder code with the actual implementations specific to your microservices architecture.

2. RabbitMQ Setup:
- The project assumes RabbitMQ as the message broker for communication between services.
- RabbitMQ should be installed and running. Update the RabbitMQ configuration in the `.env` file to match your RabbitMQ server settings.

3. Firebase Cloud Messaging (FCM):
- The project assumes the use of FCM for mobile push notifications.
- Update the `serviceAccountKey.json` file with an accurate one to enable message being sent via FCM.

4. Sendgrid:
- The project assumes the use of sendgrid for sending emails.
- Update the env file with the sendgrid details in line with the example.env file

5. Notification Service:
- The project assumes a separate service called the Notification Service, which subscribes to the insufficient balance event and handles the notification process.
- The notification logic is implemented in the `notification-service.js` file. You can expand it to handle various notification types and integrate with the necessary services.


## Getting Started

1. Clone the repository:

    git clone <repository-url>


2. Install dependencies:

3. Set up the environment configurations:

    Rename the .env.example file to .env.
    Update the values in the .env file according to your environment and configurations.

4. npm start

5. In the app.js file, i called the  publish event function in the `GET` route. This is just for test purposes.



