import Map from "@/components/map/Map";
import Slider from "@/components/slider/Slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import DOMPurify from "dompurify";
import {
  MapPin,
  Ruler,
  BathIcon,
  BedDouble,
  School,
  Bus,
  TrainFront,
  Bookmark,
  MessageSquare,
} from "lucide-react";

const data = {
  id: 1,
  title: "A Great Apartment Next to the Beach!",
  images: [
    "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ],
  bedroom: 2,
  bathroom: 1,
  price: 1000,
  address: "456 Park Avenue, London",
  latitude: 51.5074,
  longitude: -0.1278,
  desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, iste? Cum non beatae, quidem doloribus nobis labore, nam ipsum quisquam consequatur illum sed. Consequatur quasi commodi maiores harum? Consectetur similique quis iure tempore laboriosam alias eum autem dolor eveniet veritatis neque voluptate ipsum ad ex, pariatur sed impedit. Ipsum sunt, temporibus sed quibusdam rerum voluptatibus laudantium veritatis velit dicta officia architecto maiores praesentium illo omnis? Quos dolorum, voluptas delectus voluptate inventore veritatis ducimus accusamus provident animi consequuntur in, rem obcaecati id ullam sapiente nemo. Impedit repudiandae beatae, vel, quam similique voluptas libero alias et accusamus voluptatum ipsam quisquam suscipit accusantium?",
};

const userdata = {
  id: 1,
  name: "John Doe",
  img: "https://avatars.githubusercontent.com/u/103945041?v=4",
};

const SingleListingPage = () => {
  return (
    <div className="flex h-full flex-col md:flex-row gap-4">
      <div className="flex flex-none md:flex-3 h-max md:h-full flex-col overflow-y-scroll">
        <Slider images={data.images} />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full md:w-[90%] gap-4">
          <div className="flex flex-col justify-between gap-4">
            <span className="text-md font-bold">{data.title}</span>
            <span className="flex gap-2">
              <MapPin />
              {data.address}
            </span>
            <div className="flex gap-4">
              <span className="text-sm font-semibold rounded-sm bg-[#d7cd84] w-max p-1">
                $ {data.price}
              </span>
              <span className="text-sm font-semibold rounded-sm bg-[#d7cd84] w-max p-1">
                Rent
              </span>
            </div>
          </div>
          <div className="h-full flex flex-row md:flex-col justify-between items-center bg-orange-100 p-3 rounded-md text-center gap-2">
            <Avatar>
              <AvatarImage src={userdata.img} />
              <AvatarFallback>
                <img src="/noavatar.jpg" alt="no avatar" />
              </AvatarFallback>
            </Avatar>
            <span className="text-base">{userdata.name}</span>
          </div>
        </div>
        <div
          className="text-sm mt-4 w-full md:w-[90%] text-justify"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data.desc),
          }}
        />
      </div>

      <div className="flex flex-none md:flex-2 h-max md:h-full flex-col gap-4 pb-2 overflow-y-scroll">
        <div className="flex flex-col bg-orange-100 gap-4 p-3 rounded-md">
          <div className="flex items-center justify-start gap-4 bg-white p-1 rounded-md">
            <img src="/utility.png" className="w-6 h-6" />
            <div className="leading-none">
              <p className="text-sm font-semibold">Utilities</p>
              <span className="text-xs">Owner is responsible</span>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 bg-white p-1 rounded-md">
            <img src="/pet.png" className="w-6 h-6" />
            <div className="leading-none">
              <p className="text-sm font-semibold">Pet Policy</p>
              <span className="text-xs">Pets are not allowed</span>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 bg-white p-1 rounded-md">
            <img src="/fee.png" className="w-6 h-6" />
            <div className="leading-none">
              <p className="text-sm font-semibold">Income Policy</p>
              <span className="text-xs">Must have 3x income in household</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between bg-orange-100 p-3 rounded-md">
          <div className="flex items-center gap-2 bg-white p-1 rounded-md">
            <Ruler />
            <p className="text-xs">80 sqm (83 sqft)</p>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-md">
            <BathIcon />
            <p className="text-xs">1 bath</p>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-md">
            <BedDouble />
            <p className="text-xs">2 beds</p>
          </div>
        </div>

        <div className="flex justify-between bg-orange-100 p-3 rounded-md">
          <div className="flex items-center gap-2 bg-white p-1 rounded-md">
            <School />
            <div className="leading-none">
              <p className="text-sm font-semibold">School</p>
              <span className="text-xs">250m away</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-md">
            <Bus />
            <div className="leading-none">
              <p className="text-sm font-semibold">Bus Stop</p>
              <span className="text-xs">350m away</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-md">
            <TrainFront />
            <div className="leading-none">
              <p className="text-sm font-semibold">Railway</p>
              <span className="text-xs">2km away</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-orange-100 p-2 rounded-md h-[250px] md:h-full">
          <Map data={[data]} />
        </div>

        <div className="flex items-center justify-between bg-orange-100 p-3 rounded-md gap-4">
          <Button variant="outline" size="sm" className="flex gap-2">
            <Bookmark />
            Save the place
          </Button>
          <Button variant="outline" size="sm" className="flex gap-2">
            <MessageSquare />
            Send a message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleListingPage;
