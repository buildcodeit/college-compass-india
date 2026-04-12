import { Link } from "react-router-dom";
import { MapPin, Star, BookOpen, Bookmark } from "lucide-react";
import { College, CollegeType } from "@/types/college";
import { Badge } from "@/components/ui/badge";

const typeClasses: Record<CollegeType, string> = {
  IIT: "college-badge-iit",
  NIT: "college-badge-nit",
  IIIT: "college-badge-iiit",
  Private: "college-badge-private",
  Govt: "college-badge-govt",
};

interface CollegeCardProps {
  college: College;
  onBookmark?: (id: string) => void;
  isBookmarked?: boolean;
}

const CollegeCard = ({ college, onBookmark, isBookmarked }: CollegeCardProps) => {
  return (
    <div className="group bg-card rounded-lg border border-border p-5 hover:shadow-lg transition-all duration-300 animate-fade-in flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <Link to={`/college/${college.id}`} className="flex-1">
          <h3 className="text-lg font-bold text-primary group-hover:underline leading-tight">
            {college.name}
          </h3>
        </Link>
        {onBookmark && (
          <button
            onClick={() => onBookmark(college.id)}
            className="ml-2 p-1 rounded hover:bg-muted transition-colors"
          >
            <Bookmark
              className={`h-4 w-4 ${isBookmarked ? "fill-accent text-accent" : "text-muted-foreground"}`}
            />
          </button>
        )}
      </div>

      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
        <MapPin className="h-3.5 w-3.5" />
        <span>{college.city}, {college.state}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${typeClasses[college.type]}`}>
          {college.type}
        </span>
        {college.nirfRank && (
          <Badge variant="secondary" className="text-xs">
            NIRF #{college.nirfRank}
          </Badge>
        )}
        {college.rating && (
          <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-accent text-accent" />
            {college.rating}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
        <BookOpen className="h-3.5 w-3.5" />
        <span className="truncate">{college.courses.slice(0, 3).join(", ")}{college.courses.length > 3 ? "..." : ""}</span>
      </div>

      <div className="mt-auto pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        {college.fees && <span>Fees: {college.fees}</span>}
        {college.placementsAvg && <span>Avg Pkg: {college.placementsAvg}</span>}
      </div>
    </div>
  );
};

export default CollegeCard;
