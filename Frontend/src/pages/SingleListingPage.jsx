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
import Loader from "@/components/Loader";
import Error from "@/components/Error";

const SingleListingPage = () => {
  const { id } = useParams();
  const { auth, isLoading } = useGetUserQuery();
  const { listing, isListingLoading, isError } = useGetListingQuery(id);

  if (isListingLoading || isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div className="flex h-full flex-col md:flex-row gap-4">
      <div className="flex flex-none md:flex-3 h-max md:h-full pb-10 flex-col overflow-y-scroll no-scrollbar">
        <Slider
          images={
            listing.images.length === 5
              ? listing.images
              : [
                  ...listing.images,
                  ...Array(5 - listing.images.length).fill("/noimage.png"),
                ]
          }
        />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full md:w-[90%] gap-4">
          <div className="flex flex-col justify-between gap-4">
            <span className="text-md font-bold">{listing.placeName}</span>
            <span className="text-sm">{listing.address}</span>
            <div className="flex gap-4">
              <span className="text-sm font-semibold rounded-sm bg-[#d7cd84] w-max p-2">
                $ {listing.price}
              </span>
              <span className="text-sm font-semibold rounded-sm bg-[#d7cd84] w-max p-2">
                {listing.type}
              </span>
              <span className="text-sm font-semibold rounded-sm bg-[#d7cd84] w-max p-2">
                {listing.property}
              </span>
            </div>
          </div>

          <div className="h-24 w-24 flex flex-row md:flex-col justify-between items-center bg-orange-100 p-3 rounded-md text-center gap-2">
            <Avatar>
              <AvatarImage src={listing.user.profile_pic} />
              <AvatarFallback>
                <img src="/noavatar.jpg" alt="no avatar" />
              </AvatarFallback>
            </Avatar>
            <span className="text-base">{listing.user.userName}</span>
          </div>
        </div>

        <div
          className="text-sm mt-4 w-full md:w-[90%] text-justify"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(listing.description),
          }}
        />
      </div>

      <div className="flex flex-none md:flex-2 h-max md:h-full flex-col gap-4 pb-6 pr-2 overflow-y-scroll no-scrollbar">
        <div className="flex flex-col bg-orange-100 gap-4 p-3 rounded-md">
          <div className="flex items-center justify-start gap-4 bg-white p-1 rounded-md">
            <img src="/utility.png" className="w-6 h-6" />
            <div className="leading-none">
              <p className="text-sm font-semibold">Utilities</p>
              <span className="text-xs">{listing.listingDetail.utilities}</span>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 bg-white p-1 rounded-md">
            <img src="/pet.png" className="w-6 h-6" />
            <div className="leading-none">
              <p className="text-sm font-semibold">Pet Policy</p>
              <span className="text-xs">
                Pets are {listing.listingDetail.pet}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 bg-white p-1 rounded-md">
            <img src="/fee.png" className="w-6 h-6" />
            <div className="leading-none">
              <p className="text-sm font-semibold">Income Policy</p>
              <span className="text-xs">
                {listing.listingDetail.income || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between bg-orange-100 p-2 rounded-md font-bold">
          <div className="flex items-center gap-2 bg-white p-2 rounded-md ">
            <Ruler />
            <p className="text-xs">
              {listing.listingDetail.size || "N/A"} sqft
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white p-2 rounded-md">
            <BathIcon />
            <p className="text-xs">
              {listing.bathroom + " "}
              {listing.bathroom === 1 ? "bath" : "baths"}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white p-2 rounded-md">
            <BedDouble />
            <p className="text-xs">
              {listing.bedroom + " "}
              {listing.bedroom === 1 ? "bed" : "beds"}
            </p>
          </div>
        </div>

        <div className="flex justify-between bg-orange-100 p-3 rounded-md">
          <div className="flex items-center gap-2 bg-white p-1 rounded-md">
            <School />
            <div className="leading-none">
              <p className="text-sm font-semibold">School</p>
              <span className="text-xs">
                {listing.listingDetail.school + " km" || "N/A"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-md">
            <Bus />
            <div className="leading-none">
              <p className="text-sm font-semibold">Bus Stop</p>
              <span className="text-xs">
                {listing.listingDetail.bus + " km" || "N/A"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-md">
            <TrainFront />
            <div className="leading-none">
              <p className="text-sm font-semibold">Railway</p>
              <span className="text-xs">
                {listing.listingDetail.railway + " km" || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-orange-100 p-2 rounded-md h-[250px] md:h-full">
          <Map data={[listing]} height="h-[250px]" />
        </div>

        {auth.user && (
          <div className="grid grid-cols-1 md:grid-cols-2 bg-orange-100 p-3 rounded-md gap-4">
            <SaveBtn user={auth.user} listingId={id} />
            <Button
              variant="outline"
              size="sm"
              className="flex gap-2"
              disabled={!auth.user}
            >
              <MessageSquare />
              <span className="block md:hidden">Send a message</span>
              <span className="hidden md:block">Message</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleListingPage;
