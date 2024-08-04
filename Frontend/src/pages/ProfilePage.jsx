import ListingCard from "@/components/card/ListingCard";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useGetUserQuery, useProfileLisitngs } from "@/services/queries";
import { MailIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { auth } = useGetUserQuery();
  const { profileListings, isProfileLoading } = useProfileLisitngs(
    auth.user.id,
    auth.isSignedIn
  );

  if (isProfileLoading) return <Loader />;

  return (
    <div className="flex h-full flex-col md:flex-row p-4 md:p-0">
      <div className="flex flex-none md:flex-3 h-max md:h-full pb-10 pr-10 flex-col overflow-y-scroll no-scrollbar space-y-10">
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">User Information</h2>
          <div className="flex items-center gap-10">
            <img
              src={auth.user.profile_pic}
              alt="profile pic"
              className="w-20 h-20 rounded-sm object-cover"
            />
            <div className="flex flex-col gap-2">
              <span className="inline-flex gap-4">
                <UserIcon />: <b>{auth.user.userName}</b>
              </span>
              <span className="inline-flex gap-4">
                <MailIcon />: <b>{auth.user.email}</b>
              </span>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold mb-4">My Posts</h2>
            <Button>
              <Link to="/create">New Listing</Link>
            </Button>
          </div>
          {profileListings.userListings.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <img src="./noresults.png" className="w-[400px] h-[400px]" />
              <p className="font-bold text-slate-700">No Results Found</p>
            </div>
          ) : (
            <div className="h-full w-full pr-3 flex flex-col gap-8 overflow-y-scroll no-scrollbar">
              {profileListings.userListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Saved Posts</h2>
          {profileListings.savedListings.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <img src="./noresults.png" className="w-[400px] h-[400px]" />
              <p className="font-bold text-slate-700">No Results Found</p>
            </div>
          ) : (
            <div className="h-full w-full pr-3 flex flex-col gap-8 overflow-y-scroll no-scrollbar">
              {profileListings.savedListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="flex flex-none md:flex-2 h-max md:h-full flex-col gap-4 pb-6 pr-2 overflow-y-scroll no-scrollbar">
        <h2 className="text-xl font-bold">My Messages</h2>
        {[].length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <img src="./noresults.png" className="w-[400px] h-[400px]" />
            <p className="font-bold text-slate-700">No Chats</p>
          </div>
        ) : (
          [].map((listing) => {
            "chat";
          })
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
