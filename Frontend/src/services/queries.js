import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/api";

export const useGetUserQuery = (userId) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });
};
