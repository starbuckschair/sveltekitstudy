// mongo.ts

import { MongoClient } from 'mongodb';

// import { MONGO_URL } from '$env/static/private';
import { MONGO_URL } from '$lib/Env';

console.log('url >>> ' + MONGO_URL);

const client = new MongoClient(MONGO_URL);

export function start_mongo(): Promise<MongoClient> {
	console.log('Starting mongo...');
	return client.connect();
}

export default client.db('mydb');
