import { useState, useMemo } from "react";
import Header from "@/components/Header";
import CollegeCard from "@/components/CollegeCard";
import FilterSidebar from "@/components/FilterSidebar";
import { searchColleges } from "@/data/colleges";

const Index = () => {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const [course, setCourse] = useState("");
  const [sortBy, setSortBy] = useState("nirfRank");
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("college-bookmarks");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const results = useMemo(() =>
    searchColleges({ query, state, type, course, sortBy: sortBy as "nirfRank" | "name" }),
    [query, state, type, course, sortBy]
  );

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem("college-bookmarks", JSON.stringify([...next]));
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={query} onSearchChange={setQuery} />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary">Discover Indian Colleges</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Explore {results.length} colleges across India — IITs, NITs, IIITs, and more
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 flex-shrink-0">
            <FilterSidebar
              state={state} type={type} course={course} sortBy={sortBy}
              onStateChange={setState} onTypeChange={setType}
              onCourseChange={setCourse} onSortChange={setSortBy}
            />
          </div>

          <div className="flex-1">
            {results.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                No colleges found matching your filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {results.map(college => (
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
      </div>
    </div>
  );
};

export default Index;
