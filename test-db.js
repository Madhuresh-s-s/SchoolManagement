const db = require("./db");

async function testConnection() {
  try {
    const [rows] = await db.query("SHOW TABLES;");
    console.log("Database connection successful! Tables:", rows);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

testConnection();
