import { useState } from "react";
import Header from "@/components/Header";
import CollegeCard from "@/components/CollegeCard";
import FilterSidebar from "@/components/FilterSidebar";
import { useColleges } from "@/hooks/useColleges";
import { useBookmarks } from "@/hooks/useBookmarks";

const Index = () => {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const [course, setCourse] = useState("");
  const [sortBy, setSortBy] = useState("nirfRank");

  const { data: results = [], isLoading } = useColleges({ query, state, type, course, sortBy });
  const { bookmarks, toggleBookmark } = useBookmarks();

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={query} onSearchChange={setQuery} />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary">Discover Indian Colleges</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isLoading ? "Loading..." : `Explore ${results.length} colleges across India — IITs, NITs, IIITs, and more`}
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
            {isLoading ? (
              <div className="text-center py-16 text-muted-foreground">Loading colleges...</div>
            ) : results.length === 0 ? (
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
