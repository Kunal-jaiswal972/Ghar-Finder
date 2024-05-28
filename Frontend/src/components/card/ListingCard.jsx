import { Link } from "react-router-dom";

import { Card } from "@/components/ui/card";
import {
  BathIcon,
  BedDouble,
  Bookmark,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ListingCard = ({ listing }) => {
  return (
    <Card className="flex gap-4 border-none shadow-none">
      <Link
        to={`/listings/${listing.id}`}
        className="hidden md:flex flex-2 h-[150px]"
      >
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover rounded-md"
          loading="lazy"
        />
      </Link>

      <div className="flex flex-3 flex-col justify-between gap-2">
        <h2 className="text-sm font-semibold">
          <Link to={`/listings/${listing.id}`} className="hover:underline">
            {listing.title}
          </Link>
        </h2>
        <p className="text-sm flex items-center gap-2">
          <MapPin />
          <span>{listing.address}</span>
        </p>
        <p className="text-sm font-semibold rounded-sm bg-[#d7cd84] w-max p-1">
          $ {listing.price}
        </p>

        <div className="flex justify-between gap-2">
          <div className="flex justify-between gap-2">
            <Badge variant="secondary">
              <span className="text-[15px] font-light mr-2">
                {listing.bedroom}
              </span>
              <BedDouble className="w-4 h-4" />
            </Badge>
            <Badge variant="secondary">
              <span className="text-[15px] font-light mr-2">
                {listing.bathroom}
              </span>
              <BathIcon className="w-4 h-4" />
            </Badge>
          </div>

          <div className="flex justify-between gap-2">
            <Badge variant="outline" className="p-2 cursor-pointer rounded-lg">
              <Bookmark className="w-4 h-4"/>
            </Badge>
            <Badge variant="" className="p-2 cursor-pointer rounded-lg">
              <MessageSquare className="w-4 h-4" />
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ListingCard;
