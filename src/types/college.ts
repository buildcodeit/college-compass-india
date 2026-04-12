export type CollegeType = "IIT" | "NIT" | "IIIT" | "Private" | "Govt";

export interface College {
  id: string;
  name: string;
  state: string;
  city: string;
  type: CollegeType;
  nirfRank: number | null;
  courses: string[];
  fees: string | null;
  placementsAvg: string | null;
  placementsHighest: string | null;
  cutoff: string | null;
  rating: number | null;
  established: number | null;
  website: string | null;
}

export type RecommendationTier = "dream" | "reach" | "safe";

export interface Recommendation {
  college: College;
  tier: RecommendationTier;
}
