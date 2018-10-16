/*
    first homewwork assignment from pirple.
    A server to provide only one route hello and then return something.
*/

//declarations for things used in code below. 
let http = require('http');
let url = require('url');
let stringDecoder = require('string_decoder').StringDecoder;
let config = require('./config')
    ;
//Setting up the server
let httpServer = http.createServer((req, res) => {

    //paring the url
    let parsedUrl = url.parse(req.url,true);

    //getting the path name
    let pathname = parsedUrl.pathname;

    //trimming the path name
    let trimmedPath = pathname.replace(/^\/+|\/+$/g,'');
    console.log(trimmedPath);

    // extracting the query paramters
    let queryStringObject = parsedUrl.query;

    //extracting the method used
    let method = req.method.toLowerCase();

    //choosing the route which is called or giving control to notfound handler
    let choosenhandler = typeof(request[trimmedPath]) == 'undefined' ? handler.notFound : request[trimmedPath];

    //Choosen handler at work
    choosenhandler((status,message)=>{

        //setting the message which needed to be send
        message = typeof(message) == 'object' ? message : {};

        //setting up the status codde.
        status = typeof(status) == 'number' ? status : 200;

        //Converting message object to string
        let messageString = JSON.stringify(message);

        //settinf headers and sending the data.
        res.setHeader('Content-type','application/json');
        res.writeHead(status);
        res.end(messageString);
        console.log(status,messageString);
    })

});

// starting the server
httpServer.listen(config.port,()=>{
    console.log('Http server is running on',config.port);
})

//Handler to handle all request
let handler = {};

// /hello handler
handler.hello = (callback) => {

    callback(400,{'message':'Hello There'});

};

// notFound handler
handler.notFound = (callback) => {

    callback(404);

};



//setting up request routes
let request = {
    'hello': handler.hello
};