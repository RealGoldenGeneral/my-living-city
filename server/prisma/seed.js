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

	const defaultSuperSegment = {
		name:"CRD",
		country: "Canada",
		province: "BC"
	}

	const defaultSegments = [
		{superSegId:0,country: 'canada', province: 'british columbia', name: 'victoria', superSegName: 'crd'},
		{superSegId:0,country: 'canada', province: 'british columbia', name: 'saanich', superSegName: 'crd'},
		{superSegId:0,country: 'canada', province: 'british columbia', name: 'esquimalt', superSegName: 'crd'},
	];

	const defaultSubSegments = [
		//victoria
		{segId: 0, name:'fairfield', lat: 0, lon: 0},
		//saanich
		{segId: 1, name:'rutledge park', lat: 0, lon: 0},
		//esquimalt
		{segId: 2, name:'saxe point', lat: 0, lon: 0},
		
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
	);

	const createSuperSegment = await Promise.all(
		prisma.superSegment.upsert({
			where:{
				name:defaultSuperSegment.name
			},
			update:{
				name:defaultSuperSegment.name,
				country:defaultSuperSegment.country,
				province:defaultSuperSegment.province
			},
			create:{
				name:defaultSuperSegment.name,
				country:defaultSuperSegment.country,
				province:defaultSuperSegment.province
			}
		})
	);

	const createSegments = await Promise.all(
		defaultSegments.map((segment) => {
			await prisma.segments.upsert({
				where:{name:segment.name},
				update:{
					superSegId:segment.superSegId,
					country:segment.country,
					province:segment.province,
					name:segment.name,
					superSegName:segment.superSegName
				},
				create:{
					superSegId:segment.superSegId,
					country:segment.country,
					province:segment.province,
					name:segment.name,
					superSegName:segment.superSegName
				}
			})
		})
	);

	const createSubSegments = await Promise.all(
		defaultSubSegments.map((subSegment) => {
			prisma.subSegments.upsert({
				where:{name:subSegment.name},
				update:{
					segId:subSegment.segId,
					name:subSegment.name,
					lat:subSegment.lat,
					lon:subSegment.lon
				},
				create:{
					segId:subSegment.segId,
					name:subSegment.name,
					lat:subSegment.lat,
					lon:subSegment.lon
				}
			})
		})
	);

	console.log('Resolved populated Categories', resolvedCategories);
	console.log('Resolved populated UserRoles', resolvedUserRoles);
	console.log('Resolved populated Super Segment', createSuperSegment);
	console.log('Resolved populated segments', createSegments);
	console.log('Resolved populated sub segments', createSubSegments);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
