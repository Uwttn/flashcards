const db = require("../config/connection");
const { User, Deck, Card } = require("../models");
const userSeeds = require("./userSeeds.json");
const deckSeeds = require("./deckSeeds.json");
const cardSeeds = require("./cardSeeds.json");
const seedDatabase = async () => {
  try {
    // Clean the collections before inserting new data
    await User.deleteMany({});
    await Deck.deleteMany({});
    await Card.deleteMany({});
    console.log("Seeding Users...");
    // Create users and store the result (with _id) in an array
    const users = await User.create(userSeeds);
    console.log("Seeding Decks...");
    // Loop through deckSeeds and assign user IDs dynamically
    for (let i = 0; i < deckSeeds.length; i++) {
      // Assign a user ID from the newly created users array
      deckSeeds[i].user = users[i % users.length]._id;
    }
    // Create decks and store the result (with _id) in an array
    const decks = await Deck.create(deckSeeds);
    console.log("Seeding Cards...");
    // Loop through cardSeeds and assign deck IDs dynamically
    for (let i = 0; i < cardSeeds.length; i++) {
      // Assign a deck ID from the newly created decks array
      cardSeeds[i].deck = decks[i % decks.length]._id;
    }
    // Create cards and store the result (with _id) in an array
    const cards = await Card.create(cardSeeds);
    console.log("Updating Decks with Cards...");
    // Add cards to the corresponding deck after cards are created
    for (let i = 0; i < cards.length; i++) {
      const deckId = cards[i].deck; // The deck linked to this card
      await Deck.findByIdAndUpdate(deckId, { $push: { cards: cards[i]._id } });
    }
    console.log("Updating Users with Decks...");
    // Add decks to the corresponding user after decks are created
    for (let i = 0; i < decks.length; i++) {
      const userId = decks[i].user; // The user linked to this deck
      await User.findByIdAndUpdate(userId, { $push: { decks: decks[i]._id } });
    }
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
// Open the connection and seed the database
db.once("open", seedDatabase);
