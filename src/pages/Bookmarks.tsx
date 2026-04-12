import Header from "@/components/Header";
import CollegeCard from "@/components/CollegeCard";
import { useBookmarks, useBookmarkedColleges } from "@/hooks/useBookmarks";
import { useColleges } from "@/hooks/useColleges";
import { Bookmark, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { College } from "@/types/college";
import { useMemo } from "react";

const Bookmarks = () => {
  const { bookmarks, toggleBookmark, isLoggedIn } = useBookmarks();
  const { data: dbBookmarked } = useBookmarkedColleges();
  const { data: allColleges } = useColleges();

  // For non-logged-in users, filter from allColleges using localStorage bookmarks
  const colleges: College[] = useMemo(() => {
    if (isLoggedIn) return dbBookmarked || [];
    if (!allColleges) return [];
    return allColleges.filter(c => bookmarks.has(c.id));
  }, [isLoggedIn, dbBookmarked, allColleges, bookmarks]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-2">
          <Bookmark className="h-7 w-7 text-accent fill-accent" />
          <h1 className="text-3xl font-bold text-primary">Saved Colleges</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          {colleges.length} college{colleges.length !== 1 ? "s" : ""} bookmarked
          {!isLoggedIn && (
            <span className="ml-2 text-xs text-accent">
              (Sign in to sync bookmarks across devices)
            </span>
          )}
        </p>

        {colleges.length === 0 ? (
          <div className="text-center py-16">
            <Bookmark className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">No saved colleges yet.</p>
            <Link to="/" className="text-primary text-sm hover:underline">
              Browse colleges and save your favorites
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {colleges.map(college => (
              <CollegeCard
                key={college.id}
                college={college}
                onBookmark={toggleBookmark}
                isBookmarked={bookmarks.has(college.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
