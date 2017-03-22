"use strict";

let PORT = 8080;

if(process.env.NODE_ENV=='dev'||process.env.NODE_ENV=='DEV')
{
    PORT = 3000;
}
else if(process.env.NODE_ENV==='test'||process.env.NODE_ENV=='TEST'){

    PORT = 3001;
}
else if(process.env.NODE_ENV=='live' || process.env.NODE_ENV=='LIVE')
{
    PORT = 3002;
}
else{
    PORT = 8080;
}

module.exports = {
    PORT : PORT
}