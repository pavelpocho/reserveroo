import { Company, CompanyIdentity, OpeningTime, Place, PrismaClient, Reservation, ReservationGroup } from "@prisma/client";
import { checkPassword, generateHashAndSalt } from "~/utils/pwd_helper.server";

const prisma = new PrismaClient();

const seed = async () => {

  await cleanUp();

  const companyIdentities = await generateCompanyIdentities();

  const users = await generateUsers();

  const createdCompanies = await Promise.all(
    companies.map(c => {
      return prisma.company.create({ data: c });
    })
  );

  const createdCompanyIdentities = await Promise.all(
    companyIdentities.map((cI, i) => {
      return prisma.companyIdentity.create({ data: {
        companyId: createdCompanies[i].id,
        ...cI
      }})
    })
  )

  const createdUsers = await Promise.all(
    users.map(u => {
      return prisma.user.create({ data: u })
    })
  );

  const createdPlaces = await Promise.all(
    places.map((p, i) => {
      return prisma.place.create({ data: {
        companyId: createdCompanies[i].id,
        ...p
      } })
    })
  )

  let openingTimePromises: Promise<OpeningTime>[] = [];

  createdPlaces.forEach(p => {
    openingTimePromises.push(...[...Array(7).keys()].map(d => {
      const open = new Date();
      open.setHours(8, 30);
      const close = new Date();
      close.setHours(17);
      return prisma.openingTime.create({
        data: {
          day: d,
          open: open,
          close: close,
          placeId: p.id
        }
      })
    }))
  })

  await Promise.all(openingTimePromises);

  const createdReservables = await Promise.all(
    reservables.map((r, i) => {
      return prisma.reservable.create({ data: {
        placeId: createdPlaces[i].id,
        ...r
      } })
    })
  )

  const createdReservationGroups = await Promise.all(
    reservationGroups.map((r, i) => {
      return prisma.reservationGroup.create({ data: {
        userId: createdUsers[i].id,
        ...r
      }})
    })
  )

  const createdReservations = await Promise.all(
    Array(3).fill(0).map((p, i) => {
      return prisma.reservation.create({ data: {
        reservableId: createdReservables[i].id,
        reservationGroupId: createdReservationGroups[i].id
      } })
    })
  )

  console.log('Companies:');
  console.log(createdCompanies);
  console.log('Company identities:');
  console.log(createdCompanyIdentities);
  console.log('Users:');
  console.log(createdUsers);
  console.log('Places:');
  console.log(createdPlaces);
  console.log('Reservations:');
  console.log(createdReservations);

  console.log(`Database has been seeded. 🌱`);

}

const generateCompanyIdentities = async () => {
  return [{
    email: 'main@courts.com',
    username: 'maincourts',
    passwordHash: await generateHashAndSalt('johnspwd'),
  }, {
    email: 'main@bowling.com',
    username: 'mainbowling',
    passwordHash: await generateHashAndSalt('peterspwd'),
  }, {
    email: 'main@sports.com',
    username: 'mainsports',
    passwordHash: await generateHashAndSalt('louisspwd')
  }]
}

const generateUsers = async () => {
  return [{
    email: 'admin@admin.com',
    username: 'admin',
    admin: true,
    passwordHash: await generateHashAndSalt('reserveroo')
  }, {
    email: 'john@person.com',
    username: 'john123',
    admin: false,
    passwordHash: await generateHashAndSalt('johnspwd')
  }, {
    email: 'peter@person.com',
    username: 'peter123',
    admin: false,
    passwordHash: await generateHashAndSalt('peterspwd')
  }, {
    email: 'louis@person.com',
    username: 'louis123',
    admin: false,
    passwordHash: await generateHashAndSalt('louisspwd')
  }]
}

const companies: Pick<Company, 'name'>[] = [{
  name: 'Tennis courts ltd.'
}, {
  name: 'Bars and bowlings LLC'
}, {
  name: 'Sports venues inc.'
}]

const places: Pick<Place, 'name'>[] = [{
  name: 'Tennis'
}, {
  name: 'Biliard bar'
}, {
  name: 'Badminton'
}]

const reservables: Pick<Place, 'name'>[] = [{
  name: 'Tennis court'
}, {
  name: 'Biliard table'
}, {
  name: 'Badminton court'
}]

const reservationGroups: Pick<ReservationGroup, 'note'>[] = [{
  note: 'pls i want'
}, {
  note: 'yeeeeeeet'
}, {
  note: 'reserveroo is the best yo'
}]

const cleanUp = async () => {
  // cleanup the existing database
  await prisma.reservation.deleteMany().catch(() => {
    // no worries if it doesn't exist yet
  });
  await prisma.place.deleteMany().catch(() => {
    // no worries if it doesn't exist yet
  });
  await prisma.user.deleteMany().catch(() => {
    // no worries if it doesn't exist yet
  });
  await prisma.companyIdentity.deleteMany().catch(() => {
    // no worries if it doesn't exist yet
  });
  await prisma.company.deleteMany().catch(() => {
    // no worries if it doesn't exist yet
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
