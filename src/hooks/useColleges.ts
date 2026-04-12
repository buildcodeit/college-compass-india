import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { College } from "@/types/college";
import type { Tables } from "@/integrations/supabase/types";

type DbCollege = Tables<"colleges">;

function mapDbCollege(row: DbCollege): College {
  return {
    id: row.id,
    name: row.name,
    state: row.state,
    city: row.city,
    type: row.type,
    nirfRank: row.nirf_rank,
    courses: row.courses,
    fees: row.fees,
    placementsAvg: row.placements_avg,
    placementsHighest: row.placements_highest,
    cutoff: row.cutoff,
    rating: row.rating ? Number(row.rating) : null,
    established: row.established,
    website: row.website,
  };
}

export function useColleges(filters?: {
  query?: string;
  state?: string;
  type?: string;
  course?: string;
  sortBy?: string;
}) {
  return useQuery({
    queryKey: ["colleges", filters],
    queryFn: async () => {
      let q = supabase.from("colleges").select("*");

      if (filters?.state) q = q.eq("state", filters.state);
      if (filters?.type) q = q.eq("type", filters.type as any);
      if (filters?.query) {
        const search = `%${filters.query}%`;
        q = q.or(`name.ilike.${search},city.ilike.${search},state.ilike.${search}`);
      }
      if (filters?.course) {
        q = q.contains("courses", [filters.course]);
      }

      if (filters?.sortBy === "name") {
        q = q.order("name", { ascending: true });
      } else {
        q = q.order("nirf_rank", { ascending: true, nullsFirst: false });
      }

      const { data, error } = await q;
      if (error) throw error;
      return (data || []).map(mapDbCollege);
    },
  });
}

export function useCollege(id: string | undefined) {
  return useQuery({
    queryKey: ["college", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("colleges")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return mapDbCollege(data);
    },
    enabled: !!id,
  });
}

export function useAllColleges() {
  return useQuery({
    queryKey: ["all-colleges"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("colleges")
        .select("*")
        .order("nirf_rank", { ascending: true, nullsFirst: false });
      if (error) throw error;
      return (data || []).map(mapDbCollege);
    },
  });
}

export function useFilterOptions() {
  return useQuery({
    queryKey: ["filter-options"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("colleges")
        .select("state, type, courses");
      if (error) throw error;
      const states = [...new Set((data || []).map(c => c.state))].sort();
      const types = [...new Set((data || []).map(c => c.type))].sort();
      const courses = [...new Set((data || []).flatMap(c => c.courses))].sort();
      return { states, types, courses };
    },
  });
}
