import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

import {
  Ruler,
  BathIcon,
  BedDouble,
  School,
  Bus,
  TrainFront,
  MessageSquare,
} from "lucide-react";
import Map from "@/components/map/Map";
import Slider from "@/components/slider/Slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { useGetListingQuery, useGetUserQuery } from "@/services/queries";
import SaveBtn from "@/components/listingComponents/SaveBtn";

const SingleListingPage = () => {
  const { id } = useParams();
  const { data: user, isLoading: isLoadingUser } = useGetUserQuery();
  const { data, isLoading: isLoadingListing, isError } = useGetListingQuery(id);

  if (isLoadingListing || isLoadingUser) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return (
    <div className="flex h-full flex-col md:flex-row gap-4">
      <div className="flex flex-none md:flex-3 h-max md:h-full pb-10 flex-col overflow-y-scroll no-scrollbar">
        <Slider
          images={
            data.images.length === 5
              ? data.images
              : [
                  ...data.images,
                  ...Array(5 - data.images.length).fill("/noimage.png"),
                ]
          }
        />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full md:w-[90%] gap-4">
          <div className="flex flex-col justify-between gap-4">
            <span className="text-md font-bold">{data.placeName}</span>
            <span className="text-sm">{data.address}</span>
            <div className="flex gap-4">
              <span className="text-sm font-semibold rounded-sm bg-[#d7cd84] w-max p-2">
                $ {data.price}
              </span>
              <span className="text-sm font-semibold rounded-sm bg-[#d7cd84] w-max p-2">
                {data.type}
              </span>
              <span className="text-sm font-semibold rounded-sm bg-[#d7cd84] w-max p-2">
                {data.property}
              </span>
            </div>
          </div>

          <div className="h-24 w-24 flex flex-row md:flex-col justify-between items-center bg-orange-100 p-3 rounded-md text-center gap-2">
            <Avatar>
              <AvatarImage src={data.user.profile_pic} />
              <AvatarFallback>
                <img src="/noavatar.jpg" alt="no avatar" />
              </AvatarFallback>
            </Avatar>
            <span className="text-base">{data.user.userName}</span>
          </div>
        </div>

        <div
          className="text-sm mt-4 w-full md:w-[90%] text-justify"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data.description),
          }}
        />
      </div>

      <div className="flex flex-none md:flex-2 h-max md:h-full flex-col gap-4 pb-6 pr-2 overflow-y-scroll no-scrollbar">
        <div className="flex flex-col bg-orange-100 gap-4 p-3 rounded-md">
          <div className="flex items-center justify-start gap-4 bg-white p-1 rounded-md">
            <img src="/utility.png" className="w-6 h-6" />
            <div className="leading-none">
              <p className="text-sm font-semibold">Utilities</p>
              <span className="text-xs">{data.listingDetail.utilities}</span>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 bg-white p-1 rounded-md">
            <img src="/pet.png" className="w-6 h-6" />
            <div className="leading-none">
              <p className="text-sm font-semibold">Pet Policy</p>
              <span className="text-xs">Pets are {data.listingDetail.pet}</span>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 bg-white p-1 rounded-md">
            <img src="/fee.png" className="w-6 h-6" />
            <div className="leading-none">
              <p className="text-sm font-semibold">Income Policy</p>
              <span className="text-xs">
                {data.listingDetail.income || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between bg-orange-100 p-3 rounded-md">
          <div className="flex items-center gap-2 bg-white p-1 rounded-md">
            <Ruler />
            <p className="text-xs">{data.listingDetail.size || "N/A"} sqft</p>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-md">
            <BathIcon />
            <p className="text-xs">
              {data.bathroom + " "}
              {data.bathroom === 1 ? "bath" : "baths"}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-md">
            <BedDouble />
            <p className="text-xs">
              {data.bedroom + " "}
              {data.bedroom === 1 ? "bed" : "beds"}
            </p>
          </div>
        </div>

        <div className="flex justify-between bg-orange-100 p-3 rounded-md">
          <div className="flex items-center gap-2 bg-white p-1 rounded-md">
            <School />
            <div className="leading-none">
              <p className="text-sm font-semibold">School</p>
              <span className="text-xs">
                {data.listingDetail.school || "N/A"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-md">
            <Bus />
            <div className="leading-none">
              <p className="text-sm font-semibold">Bus Stop</p>
              <span className="text-xs">{data.listingDetail.bus || "N/A"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-md">
            <TrainFront />
            <div className="leading-none">
              <p className="text-sm font-semibold">Railway</p>
              <span className="text-xs">
                {data.listingDetail.railway || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-orange-100 p-2 rounded-md h-[250px] md:h-full">
          <Map data={[data]} height="h-[250px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 bg-orange-100 p-3 rounded-md gap-4">
          <SaveBtn user={user} listingId={id}/>
          <Button
            variant="outline"
            size="sm"
            className="flex gap-2"
            disabled={!user || !user.id}
          >
            <MessageSquare />
            <span className="block md:hidden">Send a message</span>
            <span className="hidden md:block">Message</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleListingPage;
