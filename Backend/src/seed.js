import axios from "axios";

const generateRandomData = (userIds) => {
  const getRandomString = (length) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  };

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getRandomBoolean = () => {
    return Math.random() < 0.5;
  };

  const latitude = getRandomNumber(-90, 90);
  const longitude = getRandomNumber(-180, 180);
  const userId = userIds[Math.floor(Math.random() * userIds.length)]; // Randomly select a user ID from the array
  const placeName = getRandomString(10);
  const description = getRandomString(100);
  const address = getRandomString(20);
  const price = getRandomNumber(1000, 5000);
  const images = [getRandomString(8) + ".jpg", getRandomString(8) + ".jpg"];
  const type = getRandomBoolean() ? "buy" : "rent";

  return {
    latitude,
    longitude,
    userId,
    placeName,
    description,
    address,
    price,
    images,
    type
  };
};

const createListing = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:7000/api/v1/listings",
      data
    );
    console.log("Listing created:", response.data);
  } catch (error) {
    console.error("Error creating listing:", error.message);
  }
};

const seedDatabase = async () => {
  try {
    // Fetch all users
    const response = await axios.get("http://localhost:7000/api/v1/users/");
    const userIds = response.data.map((user) => user.id);

    // Generate random data and create listings
    for (let i = 0; i < 10; i++) {
      const randomData = generateRandomData(userIds);
      await createListing(randomData);
    }
    console.log("Seed completed");
  } catch (error) {
    console.error("Seed error:", error.message);
  }
};

seedDatabase();
