# Canal query scheduler

## Requirements

The project needs node.js LTS and npm to be installed on your computer.
## Installing

After cloning the repository you simply need to install the dependencies (for transpiling and running the server)

```bash
npm i
```

## Content of the project

Here is the main three files of this project (config files are note described)
```
project
│   README.md
│   index.html   
│
└───src
│   │   index.ts
│   │   scheduler.ts
```

- **README.md** - *this file*
- **index.html**  - *the entry point*
- **index.ts** - *the main TS file. Used only to run the demo. This file use the scheduler.ts described below*
- **scheduler.ts** - *This is the API I build for this project. It is mean to be used as a "service" and consist in a class with a main public method called **addRequest***

## Running the project

To run this project you need to use the npm start command :
```bash
npm start
```

It will start the server and show you the index.html page. You will need to open your console and set the message level to *all* in order to see the demo execution. The request for this demo are using the https://reqres.in/ API that allows for a custom delay to be set.

## Documentation of the API

The scheduler is a class. Once instanciated you can call the **addRequest** method that takes a custom type **PriorizedRequest** in parameter. The type is simplified for this demo. 

Here is the unfolding of the api call

1. You instanciate the scheduler class
2. You call **addRequest** with your **PriorizedRequest**
3. **addRequest** add the request to the pending array then call the private **run** method
4. The **run** method contains the bussiness logic that decide the execution or not of a request. At the end it logs the status in the console. If the request should be executed, the method will call **executeRequest**
5. The **executeRequest** call the fetch method and, then, execute the **PriorizedRequest**'s callback, log the status and call for **run** again.

*As you can see the **run** method is run twice by request, when it's added and when it's done.*