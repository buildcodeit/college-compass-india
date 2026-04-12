import { useFilterOptions } from "@/hooks/useColleges";

interface FilterSidebarProps {
  state: string;
  type: string;
  course: string;
  sortBy: string;
  onStateChange: (v: string) => void;
  onTypeChange: (v: string) => void;
  onCourseChange: (v: string) => void;
  onSortChange: (v: string) => void;
}

const FilterSidebar = ({
  state, type, course, sortBy,
  onStateChange, onTypeChange, onCourseChange, onSortChange,
}: FilterSidebarProps) => {
  const { data: options } = useFilterOptions();
  const states = options?.states ?? [];
  const types = options?.types ?? [];
  const courses = options?.courses ?? [];

  const selectClass = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <aside className="space-y-5">
      <div className="bg-card rounded-lg border border-border p-5">
        <h2 className="text-base font-semibold text-foreground mb-4">Filters</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">State</label>
            <select value={state} onChange={e => onStateChange(e.target.value)} className={selectClass}>
              <option value="">All States</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Type</label>
            <select value={type} onChange={e => onTypeChange(e.target.value)} className={selectClass}>
              <option value="">All Types</option>
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Course</label>
            <select value={course} onChange={e => onCourseChange(e.target.value)} className={selectClass}>
              <option value="">All Courses</option>
              {courses.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Sort By</label>
            <select value={sortBy} onChange={e => onSortChange(e.target.value)} className={selectClass}>
              <option value="nirfRank">NIRF Rank</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
