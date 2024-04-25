# how to start a basic pug app which prints hello world? 

To start a basic Pug (formerly known as Jade) app that prints "Hello, World," you'll need to set up a simple Node.js application. Here are the steps to get you started:

### 1. Set Up a Node.js Project:

Make sure you have Node.js installed on your computer. If it's not installed, you can download it from the official website. [https://nodejs.org/en](https://nodejs.org/en)
Create a new folder for your project and open a terminal or command prompt in that directory.

### 2. Initialize Your Node.js Project:
Run the following command to create a `package.json` file, which is required to manage your project's dependencies:
```bash
npm init 
```
This command will generate a package.json file with user defined values.
OR
```bash
npm init -y 
```
This command will generate a `package.json` file with default values.

### 3. Install Pug:
You need to install the Pug template engine as a dependency for your project. Run the following command:
```bash
npm install pug
```

### 4. Create a Pug Template:

Inside your project folder, create folder named `views`. 
After that create a Pug template file inside views. You can name it something like `index.pug`. Open this file in a text editor and add the following code:

```pug
html
  head
    title Hello Pug
  body
    h1 Hello, World
```

### 5. Create an Express.js Server:
Create a JavaScript file (e.g., `app.js`) for your server. You'll also need to install Express, a Node.js web framework. Run this command to install Express:

```bash
npm install express
```
Then, in your `app.js` file, set up a basic Express server to serve your Pug template:

```js
const express = require('express');
const pug = require('pug');
const app = express();
const port = 3000; // You can choose any available port

// Set the view engine to Pug
app.set('view engine', 'pug');

// Define a route that renders your Pug template you can add more routes as well
app.get('/', (req, res) => {
  res.render('index'); // remember write only the file name without extension .pug 
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

```
### 6. Run Your App:
To start your app, run:
```bash
node app.js
```

Your server should start, and you can access your "Hello, World" page by opening a web browser and going to `http://localhost:3000` (or the port you specified).

Congratulations! You've created a basic Pug app that prints "Hello, World." This example uses Express.js as the server framework, but you can adapt it for other Node.js frameworks as well.

# I Personally Did This And It Worked
Also if you want to add css file link in pug 

1. first make another folder named like `css`
2. keep your file in it
3. add this code in your `index.pug` file
```js
head
    title SHAPES
    link(rel='stylesheet', href='/style.css')  // path 
```

remember this if you use this you need to serve the file as static files

4. to serve static files write this in your `app.js`

```js
app.use(express.static('css')); // you can Replace 'css' with any directory where your CSS file is located but better to make a public folder and keep files inside it
```

## Note
You Will Need To Run Your App Everytime After You Make Any Changes

###### Author: UMAIR ALI BHUTTO  :)






