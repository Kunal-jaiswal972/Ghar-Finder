import { useGetUserQuery } from "@/services/queries";
import { MailIcon, UserIcon } from "lucide-react";

const ProfilePage = () => {
  const { user } = useGetUserQuery();

  return (
    <div className="flex h-full flex-col md:flex-row p-4 md:p-0">
      <div className="flex flex-none md:flex-3 h-max md:h-full pb-10 flex-col overflow-y-scroll no-scrollbar space-y-10">
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">User Information</h2>
          <div className="flex items-center gap-10">
            <img
              src={user.profile_pic}
              alt="profile pic"
              className="w-20 h-20 rounded-sm object-cover"
            />
            <div className="flex flex-col gap-2">
              <span className="inline-flex gap-4">
                <UserIcon />: <b>{user.userName}</b>
              </span>
              <span className="inline-flex gap-4">
                <MailIcon />: <b>{user.email}</b>
              </span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold">My Posts</h2>
          {[].length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <img src="./noresults.png" className="w-[400px] h-[400px]" />
              <p className="font-bold text-slate-700">No Results Found</p>
            </div>
          ) : (
            [].map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))
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
