const { Client } = require("pg");

(async () => {
  const client = new Client({
    host: "aws-0-eu-west-1.pooler.supabase.com",
    port: 5432,
    user: "postgres.tsucckupdfmuorgmpytv",
    password: "WogahLeather26",
    database: "postgres",
    ssl: false,
  });

  try {
    await client.connect();
    console.log("Connected!");
    const result = await client.query("SELECT NOW()");
    console.log(result.rows);
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
})();