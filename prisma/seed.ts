import { Place, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  const places: Place[] = [{
    id: 1,
    name: 'Tennis'
  }, {
    id: 2,
    name: 'Biliard bar'
  }, {
    id: 3,
    name: 'Badminton'
  }]

  // cleanup the existing database
  await prisma.place.deleteMany().catch(() => {
    // no worries if it doesn't exist yet
  });

  // const createdPlace = await prisma.place.create({
  //   data: places[0]
  // })

  const createdPlaces = await prisma.place.createMany({
    data: places
  })

  // console.log(createdPlace);
  console.log(createdPlaces);

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
