import ListingCard from "@/components/card/ListingCard";
import Map from "@/components/map/Map";

const data = [
  {
    id: 1,
    title: "A Great Apartment Next to the Beach!",
    images: [
      "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    bedroom: 2,
    bathroom: 1,
    price: 1000,
    address: "456 Park Avenue, London",
    latitude: 51.5074,
    longitude: -0.1278,
  },
  {
    id: 2,
    title: "An Awesome Apartment Near the Park! Almost too good to be true!",
    images: [
      "https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    bedroom: 3,
    bathroom: 2,
    price: 1500,
    address: "789 Oxford Street, London",
    latitude: 52.4862,
    longitude: -1.8904,
  },
  {
    id: 3,
    title: "A New Apartment in the City!",
    images: [
      "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    bedroom: 1,
    bathroom: 1,
    price: 800,
    address: "101 Baker Street, London",
    latitude: 53.4808,
    longitude: -2.2426,
  },
  {
    id: 4,
    title: "Great Location! Great Price! Great Apartment!",
    images: [
      "https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    bedroom: 2,
    bathroom: 1,
    price: 1000,
    address: "234 Kingsway, London,",
    latitude: 53.8008,
    longitude: -1.5491,
  },
  {
    id: 5,
    title: "Apartment 5",
    images: [
      "https://images.pexels.com/photos/276625/pexels-photo-276625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    bedroom: 3,
    bathroom: 2,
    price: 1500,
    address: "567 Victoria Road, London",
    latitude: 53.4084,
    longitude: -2.9916,
  },
  {
    id: 6,
    title: "Apartment 6",
    images: [
      "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    bedroom: 1,
    bathroom: 1,
    price: 800,
    address: "890 Regent Street, London",
    latitude: 54.9783,
    longitude: -1.6174,
  },
];

const ListingPage = () => {
  return (
    <div className="flex h-full">
      <div className="flex flex-3 h-full">
        <div className="h-full pr-3 flex flex-col gap-8 overflow-y-scroll no-scrollbar">
          {data.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
      <div className="hidden md:flex flex-2 h-full pl-2">
        <Map data={data}/>
      </div>
    </div>
  );
};

export default ListingPage;
