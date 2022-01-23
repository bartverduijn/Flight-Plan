/* eslint-disable no-void */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line import/no-mutable-exports
let db: PrismaClient;

declare global {
	// eslint-disable-next-line vars-on-top, no-var
	var __db: PrismaClient | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === 'production') {
	db = new PrismaClient();
	void db.$connect();
} else {
	if (!global.__db) {
		global.__db = new PrismaClient();
		void global.__db.$connect();
	}
	db = global.__db;
}

export { db };
