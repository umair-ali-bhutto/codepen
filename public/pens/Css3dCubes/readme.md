
# Guide to Installing TypeScript and Using it in Visual Studio Code

This guide will walk you through the process of installing TypeScript and configuring it for use within Visual Studio Code. TypeScript is a powerful superset of JavaScript that adds static typing to your code, making it more reliable and maintainable.


## Prerequisites


Before we begin, make sure you have the following prerequisites installed on your system:

-  [Node.js](https://nodejs.org/): TypeScript is installed via npm, which comes with Node.js.

-  [Visual Studio Code](https://code.visualstudio.com/): A lightweight but powerful code editor.


## Step 1: Installing TypeScript


Open your command-line interface (CLI) and run the following command to install TypeScript globally on your system:


```shell 
npm  install  -g  typescript
```

This  command  will  install  TypeScript  and  make  the  tsc (TypeScript Compiler) command globally available.
  

## Step 2: Verifying the Installation

You  can  verify  that  TypeScript  is  correctly  installed  by  checking  its  version:

```shell
tsc -v
```
  

This command should print the installed `TypeScript` version to your console.


## Step 3: Setting up a TypeScript Project

1. Create a new directory for your TypeScript project:

  

```shell
mkdir  my-ts-project
cd  my-ts-project
```
  
2.  Initialize  your  project  by  running:

  
```shell
npm init -y
```
  
3. This command will create a package.json file.

4. Create a TypeScript source file (e.g., `app.ts`) in your project directory.

5. Open your project folder in Visual Studio Code:

  
```shell
code  .
```
  

This  will  open  your  project  in  Visual  Studio  Code.


6.  Create  a  `tsconfig.json`  file  in  your  project  directory  to  specify  TypeScript  compilation  options.  
7. Use  the  following  tsconfig.json  as  a  starting  point:

  

```json
{
"compilerOptions": {
"target":  "es6",
"module":  "commonjs",
"sourceMap":  true
},
//"include": ["**/*.ts"],
//"exclude": ["node_modules"]
}
```


This `tsconfig.json` specifies that TypeScript should target ES6, use the CommonJS module system, and generate source maps for debugging.

  

## Step 4: Writing TypeScript Code

  

Write your TypeScript code in the app.ts file you created earlier. Here's an example:

  

```typescript
function greet(name: string): string {
return `Hello, ${name}!`;
}

const user = "John";
console.log(greet(user));
```
  

## Step 5: Compiling TypeScript to JavaScript

  

1. To compile your TypeScript code to JavaScript, open your terminal and navigate to your project folder.

  

2. Run the following command to compile your TypeScript code:

  

```shell
tsc
```
  
This command will generate a JavaScript file (e.g., app.js) in your project folder. eg: `tsc app.ts`

  
  

## Step 6: Running Your TypeScript Application

  

To run your TypeScript application, execute the generated JavaScript file using Node.js. For example:

  

```shell
node app.js
```
  
  

Your TypeScript application should now be up and running in Node.js!

  

That's it! You've successfully installed TypeScript and set up a TypeScript project in Visual Studio Code. You can now write and compile TypeScript code with confidence. Enjoy coding with TypeScript!