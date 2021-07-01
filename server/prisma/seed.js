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
		'resident', //Basic user account
		'guest', //Here for later implementation
		'associate', //Here for later implementation
		'worker', //Work location
		'business', //For business accounts
		'municipal' //For city/municipal accounts
	];
	

	const defaultSuperSegment = [{
		superSegId:1,
		name:"CRD",
		country: "Canada",
		province: "BC"
	}];

	const defaultSegments = [
		{segId:1,superSegId:1,country: 'canada', province: 'british columbia', name: 'victoria', superSegName: 'crd'},
		{segId:2,superSegId:1,country: 'canada', province: 'british columbia', name: 'saanich', superSegName: 'crd'},
		{segId:3,superSegId:1,country: 'canada', province: 'british columbia', name: 'esquimalt', superSegName: 'crd'},
	];

	const defaultSubSegments = [
		//victoria
		{id:1,segId:1,name:'fairfield', lat: 0, lon: 0},
		//saanich
		{id:2,segId:2,name:'rutledge park', lat: 0, lon: 0},
		//esquimalt
		{id:3,segId:3,name:'saxe point', lat: 0, lon: 0},
		
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
		defaultSuperSegment.map(({superSegId,name,country,province}) => (
			prisma.superSegment.upsert({
				where:{
					superSegId:superSegId
				},
				update:{
					superSegId:superSegId,
					name:name,
					country:country,
					province:province
				},
				create:{
					superSegId:superSegId,
					name:name,
					country:country,
					province:province
				}
			})
		))
	);
	
	const createSegments = await Promise.all(
		defaultSegments.map(({segId,superSegId,country,province,name,superSegName}) => (
			prisma.segments.upsert({
				where:{segId:segId},
				update:{
					superSegId:superSegId,
					country:country,
					province:province,
					name:name,
					superSegName:superSegName
				},
				create:{
					segId:segId,
					superSegId:superSegId,
					country:country,
					province:province,
					name:name,
					superSegName:superSegName
				}
			})
		))
	);
	
	const createSubSegments = await Promise.all(
		defaultSubSegments.map(({id,segId,name,lat,lon}) => (
			prisma.subSegments.upsert({
				where:{id:id},
				update:{
					id:id,
					segId:segId,
					name:name,
					lat:lat,
					lon:lon
				},
				create:{
					id:id,
					segId:segId,
					name:name,
					lat:lat,
					lon:lon
				}
			})
		))
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
