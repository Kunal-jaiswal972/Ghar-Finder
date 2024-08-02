import axios from "axios";

const propertyImages = [
  "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/358636/pexels-photo-358636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/783745/pexels-photo-783745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/4450337/pexels-photo-4450337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/545012/pexels-photo-545012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/4045031/pexels-photo-4045031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3457292/pexels-photo-3457292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/5825527/pexels-photo-5825527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const addresses = [
  {
    address: "1600 Amphitheatre Parkway, Mountain View, CA",
    city: "Mountain View",
    latitude: 37.422,
    longitude: -122.084,
  },
  {
    address: "1 Infinite Loop, Cupertino, CA",
    city: "Cupertino",
    latitude: 37.331,
    longitude: -122.031,
  },
  {
    address: "350 5th Ave, New York, NY",
    city: "New York",
    latitude: 40.748,
    longitude: -73.985,
  },
  {
    address: "221B Baker Street, London",
    city: "London",
    latitude: 51.523,
    longitude: -0.158,
  },
  {
    address: "4 Pennsylvania Plaza, New York, NY",
    city: "New York",
    latitude: 40.75,
    longitude: -73.993,
  },
  {
    address: "1600 Pennsylvania Avenue NW, Washington, DC",
    city: "Washington",
    latitude: 38.897,
    longitude: -77.036,
  },
  {
    address: "Eiffel Tower, Paris",
    city: "Paris",
    latitude: 48.858,
    longitude: 2.294,
  },
  {
    address: "Colosseum, Rome",
    city: "Rome",
    latitude: 41.89,
    longitude: 12.492,
  },
  {
    address: "Burj Khalifa, Dubai",
    city: "Dubai",
    latitude: 25.197,
    longitude: 55.274,
  },
  {
    address: "Sydney Opera House, Sydney",
    city: "Sydney",
    latitude: -33.856,
    longitude: 151.215,
  },
  {
    address: "10 Downing Street, London",
    city: "London",
    latitude: 51.503,
    longitude: -0.127,
  },
  {
    address: "Empire State Building, New York, NY",
    city: "New York",
    latitude: 40.748,
    longitude: -73.985,
  },
  {
    address: "Statue of Liberty, New York, NY",
    city: "New York",
    latitude: 40.689,
    longitude: -74.044,
  },
  {
    address: "Times Square, New York, NY",
    city: "New York",
    latitude: 40.758,
    longitude: -73.985,
  },
  {
    address: "Buckingham Palace, London",
    city: "London",
    latitude: 51.501,
    longitude: -0.141,
  },
  {
    address: "Brandenburg Gate, Berlin",
    city: "Berlin",
    latitude: 52.516,
    longitude: 13.377,
  },
  {
    address: "Louvre Museum, Paris",
    city: "Paris",
    latitude: 48.861,
    longitude: 2.336,
  },
  {
    address: "Notre Dame Cathedral, Paris",
    city: "Paris",
    latitude: 48.853,
    longitude: 2.349,
  },
  {
    address: "Tokyo Tower, Tokyo",
    city: "Tokyo",
    latitude: 35.658,
    longitude: 139.745,
  },
  {
    address: "Great Wall of China, Huairou District, China",
    city: "Beijing",
    latitude: 40.431,
    longitude: 116.57,
  },
  {
    address: "Christ the Redeemer, Rio de Janeiro",
    city: "Rio de Janeiro",
    latitude: -22.951,
    longitude: -43.211,
  },
  {
    address: "Machu Picchu, Peru",
    city: "Machu Picchu",
    latitude: -13.163,
    longitude: -72.545,
  },
  {
    address: "Petra, Jordan",
    city: "Petra",
    latitude: 30.328,
    longitude: 35.444,
  },
  {
    address: "Taj Mahal, Agra",
    city: "Agra",
    latitude: 27.175,
    longitude: 78.042,
  },
  {
    address: "Golden Gate Bridge, San Francisco, CA",
    city: "San Francisco",
    latitude: 37.819,
    longitude: -122.478,
  },
  {
    address: "Hollywood Sign, Los Angeles, CA",
    city: "Los Angeles",
    latitude: 34.134,
    longitude: -118.321,
  },
  {
    address: "Niagara Falls, Ontario",
    city: "Niagara Falls",
    latitude: 43.089,
    longitude: -79.084,
  },
  {
    address: "Table Mountain, Cape Town",
    city: "Cape Town",
    latitude: -33.963,
    longitude: 18.409,
  },
  {
    address: "Mount Fuji, Japan",
    city: "Fujinomiya",
    latitude: 35.362,
    longitude: 138.731,
  },
  {
    address: "Red Square, Moscow",
    city: "Moscow",
    latitude: 55.754,
    longitude: 37.621,
  },
  {
    address: "Saint Basil's Cathedral, Moscow",
    city: "Moscow",
    latitude: 55.752,
    longitude: 37.623,
  },
];

const descriptions = [
  {
    content: `
      <h1>Beautiful Family Home</h1>
      <p>This stunning 4-bedroom, 3-bathroom home in <strong>Mountain View</strong> features a spacious living area, modern kitchen, and a large backyard perfect for family gatherings.</p>
      <ul>
        <li>4 Bedrooms</li>
        <li>3 Bathrooms</li>
        <li>Modern Kitchen</li>
        <li>Spacious Living Area</li>
        <li>Large Backyard</li>
      </ul>
    `,
  },
  {
    content: `
      <h1>Luxurious Condo</h1>
      <p>Experience luxury living in this 3-bedroom, 2-bathroom condo located in the heart of <strong>Cupertino</strong>. Enjoy amenities such as a swimming pool, gym, and 24-hour security.</p>
      <ul>
        <li>3 Bedrooms</li>
        <li>2 Bathrooms</li>
        <li>Swimming Pool</li>
        <li>Gym</li>
        <li>24-Hour Security</li>
      </ul>
    `,
  },
  {
    content: `
      <h1>Charming Apartment</h1>
      <p>This charming 2-bedroom, 1-bathroom apartment in <strong>New York</strong> offers a cozy living space with a renovated kitchen and stunning city views.</p>
      <ul>
        <li>2 Bedrooms</li>
        <li>1 Bathroom</li>
        <li>Renovated Kitchen</li>
        <li>City Views</li>
        <li>Cozy Living Space</li>
      </ul>
    `,
  },
  {
    content: `
      <h1>Modern Studio</h1>
      <p>A sleek and modern studio apartment located in the bustling area of <strong>London</strong>, featuring an open floor plan, updated appliances, and a convenient location.</p>
      <ul>
        <li>Studio</li>
        <li>1 Bathroom</li>
        <li>Open Floor Plan</li>
        <li>Updated Appliances</li>
        <li>Convenient Location</li>
      </ul>
    `,
  },
  {
    content: `
      <h1>Spacious Villa</h1>
      <p>This expansive 5-bedroom, 4-bathroom villa in <strong>New York</strong> includes a private pool, gourmet kitchen, and beautifully landscaped gardens.</p>
      <ul>
        <li>5 Bedrooms</li>
        <li>4 Bathrooms</li>
        <li>Private Pool</li>
        <li>Gourmet Kitchen</li>
        <li>Landscaped Gardens</li>
      </ul>
    `,
  },
  {
    content: `
      <h1>Elegant Townhouse</h1>
      <p>Located in the prestigious area of <strong>Washington</strong>, this 3-bedroom, 2-bathroom townhouse offers elegant interiors, a spacious living room, and a private patio.</p>
      <ul>
        <li>3 Bedrooms</li>
        <li>2 Bathrooms</li>
        <li>Elegant Interiors</li>
        <li>Spacious Living Room</li>
        <li>Private Patio</li>
      </ul>
    `,
  },
  {
    content: `
      <h1>Historic Mansion</h1>
      <p>This historic 6-bedroom, 5-bathroom mansion in <strong>Paris</strong> boasts timeless architecture, a grand foyer, and extensive grounds perfect for entertaining.</p>
      <ul>
        <li>6 Bedrooms</li>
        <li>5 Bathrooms</li>
        <li>Historic Architecture</li>
        <li>Grand Foyer</li>
        <li>Extensive Grounds</li>
      </ul>
    `,
  },
  {
    content: `
      <h1>Chic Loft</h1>
      <p>A chic 1-bedroom, 1-bathroom loft in <strong>Rome</strong>, offering an open-concept design, exposed brick walls, and modern finishes.</p>
      <ul>
        <li>1 Bedroom</li>
        <li>1 Bathroom</li>
        <li>Open-Concept Design</li>
        <li>Exposed Brick Walls</li>
        <li>Modern Finishes</li>
      </ul>
    `,
  },
  {
    content: `
      <h1>Exquisite Penthouse</h1>
      <p>Experience the height of luxury in this 4-bedroom, 3-bathroom penthouse in <strong>Dubai</strong>, featuring floor-to-ceiling windows, a rooftop terrace, and stunning city views.</p>
      <ul>
        <li>4 Bedrooms</li>
        <li>3 Bathrooms</li>
        <li>Floor-to-Ceiling Windows</li>
        <li>Rooftop Terrace</li>
        <li>Stunning City Views</li>
      </ul>
    `,
  },
  {
    content: `
      <h1>Cozy Cottage</h1>
      <p>This 2-bedroom, 1-bathroom cottage in <strong>Sydney</strong> is perfect for those seeking a quiet retreat. It features a quaint kitchen, cozy living room, and a beautiful garden.</p>
      <ul>
        <li>2 Bedrooms</li>
        <li>1 Bathroom</li>
        <li>Quaint Kitchen</li>
        <li>Cozy Living Room</li>
        <li>Beautiful Garden</li>
      </ul>
    `,
  },
];

const placeNames = [
  "Sunrise Villa",
  "Grandview Manor",
  "Willow Creek Cottage",
  "Maplewood Residence",
  "Pinehurst Estate",
  "Seaside Retreat",
  "Sunset Boulevard Home",
  "Harmony Haven",
  "Meadowbrook Lodge",
  "Crestwood Heights",
  "Evergreen Terrace",
  "Bluebell House",
  "Tranquil Meadows",
  "Whispering Pines",
  "Silver Lake Lodge",
  "Golden Gate Getaway",
  "Riverview Residence",
  "Mountain Peak Chalet",
  "Lakeside Living",
  "Urban Oasis",
];

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

const getRandomBoolean = () => Math.random() < 0.5;

const getRandomItem = (array) =>
  array[Math.floor(Math.random() * array.length)];

const generateRandomData = (userIds) => {
  const addressData = getRandomItem(addresses);
  const userId = getRandomItem(userIds);

  return {
    userId,
    listingData: {
      latitude: addressData.latitude + getRandomNumber(-0.01, 0.01),
      longitude: addressData.longitude + getRandomNumber(-0.01, 0.01),
      placeName: getRandomItem(placeNames),
      description: getRandomItem(descriptions).content,
      address: addressData.address,
      city: addressData.city,
      price: Math.floor(getRandomNumber(20000, 5000000)),
      images: Array.from({ length: 5 }, () => getRandomItem(propertyImages)),
      type: getRandomBoolean() ? "buy" : "rent",
      property: getRandomItem(["apartment", "house", "condo", "land"]),
      bedroom: getRandomNumber(1, 3),
      bathroom: getRandomNumber(1, 3),
    },
    listingDetail: {
      utilities: getRandomItem([
        "Tenant is responsible",
        "Owner is responsible",
        "Shared",
      ]),
      pet: getRandomItem(["allowed", "not allowed"]),
      income: getRandomItem(["required", "not required"]),
      size: getRandomNumber(500, 5000),
      school: getRandomNumber(1, 5),
      bus: getRandomNumber(1, 5),
      railway: getRandomNumber(1, 5),
    },
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
    const response = await axios.get("http://localhost:7000/api/v1/users/");
    const userIds = response.data.map((user) => user.id);

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
