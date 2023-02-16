import { MongoClient } from 'mongodb';

const defaultURI = '';

const { MONGO_URI = defaultURI } = process.env;

export const client = new MongoClient(MONGO_URI);
export const db = client.db();
