import ListingCard from "@/components/card/ListingCard";
import Map from "@/components/map/Map";

import { useGetListingsQuery } from "@/services/queries";

const ListingPage = () => {
  const { data, isLoading } = useGetListingsQuery();

  if (isLoading) return "Loading";

  return (
    <div className="flex h-full">
      <div className="flex flex-grow md:flex-3 h-full">
        <div className="h-full w-full pr-3 flex flex-col gap-8 overflow-y-scroll no-scrollbar">
          {data.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
      <div className="hidden md:flex md:flex-2 h-full pl-2">
        <Map data={data} />
      </div>
    </div>
  );
};

export default ListingPage;
