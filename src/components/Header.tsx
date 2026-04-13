import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Search, Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/hooks/useTheme";

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

const navItems = [
  { to: "/", label: "Explore" },
  { to: "/compare", label: "Compare" },
  { to: "/predictor", label: "Rank Predictor" },
  { to: "/bookmarks", label: "My List" },
  { to: "/deadlines/application", label: "Application Deadlines" },
  { to: "/deadlines/test", label: "Test Deadlines" },
];

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-primary tracking-tight">CollegeTracker</span>
        </Link>
        {onSearchChange && (
          <div className="relative w-64 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search colleges..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
        )}
      </div>
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-1 overflow-x-auto pb-0 -mb-px scrollbar-none">
          {navItems.map(item => {
            const isActive = location.pathname === item.to || 
              (item.to !== "/" && location.pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
