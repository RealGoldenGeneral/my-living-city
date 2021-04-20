const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
	const defaultIdeaCategories = [
		{ title: 'policy', description: '' },
		{ title: 'event', description: '' },
		{ title: 'municipal infrastructure', description: '' },
		{ title: 'park infrastructure', description: '' },
		{ title: 'private infrastructure', description: '' },
		{ title: 'service', description: '' },
		{ title: 'product', description: '' },
		{ title: 'other', description: '' },
	];

	const defaultUserRoles = [
		'resident', 
		'guest', 
		'associate', 
		'worker' 
	];

	const resolvedCategories = await Promise.all(
		defaultIdeaCategories.map(({ title, description }) => (
			prisma.category.upsert({
				where: {
					title
				},
				update: {
					title,
					description,
				},
				create: {
					title,
					description,
				}
			})
		))
	);

	const resolvedUserRoles = await Promise.all(
		defaultUserRoles.map((role) => (
			prisma.userRole.upsert({
				where: {
					name: role
				},
				update: {
					name: role
				},
				create: {
					name: role
				}
			})
    ))
	)

	console.log('Resolved populated Categories', resolvedCategories);
	console.log('Resolved populated UserRoles', resolvedUserRoles);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
