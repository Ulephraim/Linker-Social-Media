### Linker Social Media App

Constructed upon the MERN stack, which integrates MongoDB, Express.js, React, and Node.js, Linker is a safe and dynamic platform for networking connections and sharing.

### Overview

How I created it: 
- Redux for State Management: To efficiently manage the state of the application, I utilized the Redux library. It keeps our app responsive and well-organized.
- Cloudinary Integration: We've integrated our app with Cloudinary to create conveniently accessible links for the images and videos you post.
- MongoDB as the Foundation: MongoDB acts as the foundation of our application, organizing and storing all of the data and making it easily accessible when needed.
- Bcrypt for Password Hashing: I've used Bcrypt to hash and secure passwords, providing an additional degree of protection for user accounts.


## Installation

Before you start, make sure you have Node.js and npm installed on your system. To install the frontend, follow these steps:
- Clone the Repository: git clone https://github.com/Ulephraim/Linker-social-media-app.git
- Navigate to the Project Directory: cd Linker-social-media-app-frontend
- Add environment variable in .env file and add your backend server link to this
- Install Dependencies: Run npm install to install all the dependencies
- Start the Development Server: Run npm run dev to start the development server

### Starting the Server
To start the backend server, follow these steps:

Step 1: Install Dependencies
Run npm install to install the required dependencies for the backend.

Step 2: Start the Server

- Run npm start to launch the server using Nodemon, which automatically restarts the server when changes are made. If you don't have Nodemon installed, you can do so globally by running npm i -g nodemon. This will install Nodemon globally on your PC.

### Environment Variables
- MONGO_URI: <your MongoDB uri here> The URI to connect to your MongoDB database, for running locally you can set mongodb://localhost:27017 in production enter your MognoDB Altas uri.
- CLOUDINARY_API_KEY: Your Cloudinary API key for handling image and video uploads.
- CLOUDINARY_API_SECRET: Your Cloudinary API secret for secure access to the Cloudinary service.
- CLOUDINARY_CLOUD_NAME: Your Cloudinary cloud name, identifying your Cloudinary account.
- NODE_ENV: Set it to "Production" to indicate the production environment.
- JWT_SECRET: Your secret key for generating JSON Web Tokens (JWTs) for user authentication and authorization.
- PORT: The port on which the backend server will listen for incoming requests.

These environment variables are crucial for the proper functioning and security of the backend. You should set them according to your deployment environment and the services you're using.

### Deployment and Integration

Vercel and Netlify are two of the server platforms on which the backend can be deployed, Vercel also could be used to deploy the frontend. Once it's up and running, you can easily incorporate the backend into your front-end application to allow users to connect with you on social network, register, and upload content.

### Contributing

Contributions are welcomed from the community to improve and enhance the Social Media App Frontend. If you'd like to contribute, please follow these steps:
- Fork the repository to your GitHub account.
- Create a new branch for your feature or bug fix.
- Make your changes and commit them with clear and concise messages.
- Push your changes to your branch and create a pull request to the main repository.
I will review your changes, provide feedback, and merge them if they are good
