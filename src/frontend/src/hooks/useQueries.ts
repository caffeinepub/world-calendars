import { useQuery } from "@tanstack/react-query";
import type { CalendarEntry } from "../backend.d.ts";
import { useActor } from "./useActor";

export function useGetAllCalendarEntries() {
  const { actor, isFetching } = useActor();
  return useQuery<CalendarEntry[]>({
    queryKey: ["calendarEntries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCalendarEntries();
    },
    enabled: !!actor && !isFetching,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
