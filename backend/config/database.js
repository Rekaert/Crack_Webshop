/*
use webshop
db.createUser(
   {
     user: "pwd",
     pwd: "user",
     roles:
       [
         { role: "readWrite", db: "webshop" }
       ]
   }
)
*/

const host = 'localhost';
const port = 27017;
const user = 'pwd';
const password = 'user';
const database = 'webshop';

module.exports = {
  /*  uri: `mongodb://${user}:${password}@${host}:${port}/${database}`, */
  uri: 'mongodb://pwd:user@ds227740.mlab.com:27740/crack',
  options: {
    connectTimeoutMS: 5000,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    useMongoClient: true,
  },
};
