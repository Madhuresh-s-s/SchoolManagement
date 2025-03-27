const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "switchyard.proxy.rlwy.net",  
  user: "root",                       
  password: "sxQwgyDvHbhbtGKNdiEfaNPKzWbhFKjh", 
  database: "railway",                
  port: 51942,                         
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
