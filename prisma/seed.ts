import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

function getProjects() {
	return [{ name: 'Work' }, { name: 'Home' }, { name: 'Someday_Maybe' }];
}

async function seed() {
	await Promise.all(
		getProjects().map((project) => {
			return db.project.create({ data: project });
		})
	);
}

seed().catch((err) => console.error(err));
