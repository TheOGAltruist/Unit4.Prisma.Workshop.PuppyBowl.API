const prisma = require("../prisma");
const seed = async () => {
    const createPlayers = async () => {
        const players = [
          {
            name: "Logan",
            breed: "Italian Greyhound",
            status: "field",
          },
          {
            name: "Chase",
            breed: "Italian Greyhound",
            status: "field",
          },
          {
            name: "Lincoln",
            breed: "Mixed Rescue",
            status: "field",
          },
          {
            name: "Boots",
            breed: "Bulldog",
            status: "field",
          },
          {
            name: "Buddy",
            breed: "Labrador",
            status: "field",
          },
          {
            name: "Rusty",
            breed: "Golden Retriever",
            status: "bench",
          },
          {
            name: "Penny",
            breed: "Shih Tzu",
            status: "bench",
          },
          {
            name: "Chloe",
            breed: "Poodle",
            status: "bench",
          },
          {
            name: "Sasha",
            breed: "German Shepherd",
            status: "bench",
          },
          {
            name: "Daisy",
            breed: "Beagle",
            status: "bench",
          },
        ];
        
        await prisma.player.createMany({ data: players });
    };
    
    await createPlayers();
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });