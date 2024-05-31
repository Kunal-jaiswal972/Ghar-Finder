import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/api";
import { useAuth } from "@clerk/clerk-react";

export const useGetUserQuery = () => {
  const { userId } = useAuth();

  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });
};
