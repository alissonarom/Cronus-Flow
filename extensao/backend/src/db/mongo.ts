import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGO_URI!;
console.log('🔑 MONGO_URI', uri ? '****' : 'não definido');
const dbName = process.env.MONGO_DB || 'cronusFlow';

let client: MongoClient;
let db: Db;

export async function connectMongo() {
  if (db) return db;

  client = new MongoClient(uri);
  await client.connect();

  db = client.db(dbName);

  console.log(`🍃 Mongo conectado no DB: ${db.databaseName}`);

  return db;
}
