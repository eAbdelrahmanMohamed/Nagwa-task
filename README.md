# Nagwa-task

this is Nagwa Task iT is a MERN stack project used to Create Exam Experiences .

## Installation

You May need To install some packgetsTo Make project Runs Without problem
We Will need (CORS , Express , NPM )
Check If You don't Have (some / any ) of them You can  install it by:

```bash
npm install cors
npm install express
sudo apt install npm

 ```
 This is important because we gonna build React App (Client-Side) , Node-Express App (Server-Side)

## How To Start
1: You need to clone this repo / pull by :
open your IDE terminal and type ->
```bash
git clone  https://github.com/eAbdelrahmanMohamed/Nagwa-task.git
 ```
2:once you clone the repo open it and split the terminal by pressing 
```
Ctrl + Shift + 5
```
once the is splited 
go to one of them and type
**this is for running the server side**
```
cd server-side-app
node server.js
```
you should see like the "API server listening on port 3001"
and the other terminal will do same with some changes
**this is for running client side**
```
cd client-side-app
npm start
```
after running both you should now see the app runnig om port 3000
________________________________________________________________________________________________________________________________
# Scenarios
### How to use ...??

### for best one :
* You should complete answering 10 questions and submit your answer after every question
* after every question you should see if your answer is ( correct / wrong )
* if wrong you should see the correct answer highlighted with green 
* and you will not to be able to resubmit your answer
* after finishing your exam the app calculates your grades and show you your rank

### for worst one :
* if you didn't answer any / some questions you be back to the top of page gaving a chance to anser missed ones
* if you didn't answer again and submit question without selecting an answer the app will block options and calclate it as wrong answer

### the score will not be counted until you finsh your exam then wil display your rank
after finishing the exam you will have a chance to ***try again***
