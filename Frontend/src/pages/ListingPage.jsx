import ListingCard from "@/components/card/ListingCard";
import Loader from "@/components/Loader";
import Map from "@/components/map/Map";

import { useGetListingsQuery } from "@/services/queries";

const ListingPage = () => {
  const { listings, isListingsLoading } = useGetListingsQuery();

  if (isListingsLoading) return <Loader />;

  return (
    <div className="flex h-full">
      <div className="flex flex-grow md:flex-3 h-full">
        <div className="h-full w-full pr-3 flex flex-col gap-8 overflow-y-scroll no-scrollbar">
          {listings.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <img src="./noresults.png" className="w-[400px] h-[400px]" />
              <p className="font-bold text-slate-700">No Results Found</p>
            </div>
          ) : (
            listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))
          )}
        </div>
      </div>
      <div className="hidden md:flex md:flex-2 h-full pl-2">
        <Map data={listings} />
      </div>
    </div>
  );
};

export default ListingPage;
