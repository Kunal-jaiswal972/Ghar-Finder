import { Bookmark } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

import { useSaveListing } from "@/services/mutations";
import { useIsListingSaved } from "@/services/queries";

const SaveBtn = ({ user, listingId }) => {
  const { saveInfo, isLoading } = useIsListingSaved({
    userId: user?.id,
    listingId,
  });

  const { save, saving } = useSaveListing();

  const handleSave = async () => {
    if (user === undefined || !user || !user.id || !user.clerkId) {
      toast.error("You need to sign in to save listing!!");
      return;
    }
    save({ userId: user.id, listingId });
  };

  if (isLoading) return "Loading";

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex gap-2"
      onClick={handleSave}
      loading={saving}
    >
      <Bookmark fill={saveInfo.isSaved ? "#fece51" : "white"} />
      {saveInfo.isSaved ? (
        <span>Saved</span>
      ) : (
        <p>
          Save <span className="md:hidden">the place</span>
        </p>
      )}
    </Button>
  );
};

export default SaveBtn;
