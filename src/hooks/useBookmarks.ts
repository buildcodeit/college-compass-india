import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

function useCurrentUser() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return userId;
}

export function useBookmarks() {
  const userId = useCurrentUser();
  const queryClient = useQueryClient();

  const { data: bookmarkIds = new Set<string>(), ...rest } = useQuery({
    queryKey: ["bookmarks", userId],
    queryFn: async () => {
      if (!userId) return new Set<string>();
      const { data, error } = await supabase
        .from("bookmarks")
        .select("college_id")
        .eq("user_id", userId);
      if (error) throw error;
      return new Set((data || []).map(b => b.college_id));
    },
    enabled: !!userId,
  });

  const toggle = useMutation({
    mutationFn: async (collegeId: string) => {
      if (!userId) {
        // Fall back to localStorage for non-logged-in users
        const saved = localStorage.getItem("college-bookmarks");
        const set: Set<string> = saved ? new Set(JSON.parse(saved)) : new Set();
        if (set.has(collegeId)) set.delete(collegeId);
        else set.add(collegeId);
        localStorage.setItem("college-bookmarks", JSON.stringify([...set]));
        return;
      }

      const isBookmarked = bookmarkIds.has(collegeId);
      if (isBookmarked) {
        const { error } = await supabase
          .from("bookmarks")
          .delete()
          .eq("user_id", userId)
          .eq("college_id", collegeId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("bookmarks")
          .insert({ user_id: userId, college_id: collegeId });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });

  // For non-logged-in users, use localStorage
  const [localBookmarks, setLocalBookmarks] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("college-bookmarks");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    if (!userId) {
      const handleStorage = () => {
        const saved = localStorage.getItem("college-bookmarks");
        setLocalBookmarks(saved ? new Set(JSON.parse(saved)) : new Set());
      };
      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
    }
  }, [userId]);

  const effectiveBookmarks = userId ? bookmarkIds : localBookmarks;

  const toggleBookmark = (collegeId: string) => {
    if (!userId) {
      const next = new Set(localBookmarks);
      if (next.has(collegeId)) next.delete(collegeId);
      else next.add(collegeId);
      localStorage.setItem("college-bookmarks", JSON.stringify([...next]));
      setLocalBookmarks(next);
    } else {
      toggle.mutate(collegeId);
    }
  };

  return {
    bookmarks: effectiveBookmarks,
    toggleBookmark,
    isLoggedIn: !!userId,
    ...rest,
  };
}

export function useBookmarkedColleges() {
  const userId = useCurrentUser();

  return useQuery({
    queryKey: ["bookmarked-colleges", userId],
    queryFn: async () => {
      if (!userId) {
        // Return empty for non-logged-in users (they use localStorage)
        return [];
      }
      const { data, error } = await supabase
        .from("bookmarks")
        .select("college_id, colleges(*)")
        .eq("user_id", userId);
      if (error) throw error;
      return (data || []).map(b => {
        const c = b.colleges as any;
        return {
          id: c.id,
          name: c.name,
          state: c.state,
          city: c.city,
          type: c.type,
          nirfRank: c.nirf_rank,
          courses: c.courses,
          fees: c.fees,
          placementsAvg: c.placements_avg,
          placementsHighest: c.placements_highest,
          cutoff: c.cutoff,
          rating: c.rating ? Number(c.rating) : null,
          established: c.established,
          website: c.website,
        };
      });
    },
    enabled: !!userId,
  });
}
