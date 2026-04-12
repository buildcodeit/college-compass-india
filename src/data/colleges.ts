import { College } from "@/types/college";

export const colleges: College[] = [
  { id: "iitm", name: "Indian Institute of Technology Madras", state: "Tamil Nadu", city: "Chennai", type: "IIT", nirfRank: 1, courses: ["Computer Science", "Electrical", "Mechanical", "Aerospace", "Chemical", "Civil"], fees: "₹2.2L/year", placementsAvg: "₹21.5 LPA", placementsHighest: "₹1.8 Cr", cutoff: "JEE Adv: 120", rating: 4.9, established: 1959, website: "https://www.iitm.ac.in" },
  { id: "iisc", name: "Indian Institute of Science Bangalore", state: "Karnataka", city: "Bengaluru", type: "Govt", nirfRank: 2, courses: ["Computer Science", "Physics", "Mathematics", "Aerospace", "Chemical"], fees: "₹35K/year", placementsAvg: "₹24 LPA", placementsHighest: "₹1.5 Cr", cutoff: "JEE Adv/KVPY", rating: 4.9, established: 1909, website: "https://www.iisc.ac.in" },
  { id: "iitb", name: "Indian Institute of Technology Bombay", state: "Maharashtra", city: "Mumbai", type: "IIT", nirfRank: 3, courses: ["Computer Science", "Electrical", "Mechanical", "Aerospace", "Chemical", "Civil", "Metallurgy"], fees: "₹2.2L/year", placementsAvg: "₹23 LPA", placementsHighest: "₹2.3 Cr", cutoff: "JEE Adv: 68", rating: 4.9, established: 1958, website: "https://www.iitb.ac.in" },
  { id: "iitd", name: "Indian Institute of Technology Delhi", state: "Delhi", city: "New Delhi", type: "IIT", nirfRank: 4, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Chemical", "Textile"], fees: "₹2.2L/year", placementsAvg: "₹22 LPA", placementsHighest: "₹2.1 Cr", cutoff: "JEE Adv: 95", rating: 4.8, established: 1961, website: "https://home.iitd.ac.in" },
  { id: "iitk", name: "Indian Institute of Technology Kanpur", state: "Uttar Pradesh", city: "Kanpur", type: "IIT", nirfRank: 5, courses: ["Computer Science", "Electrical", "Mechanical", "Aerospace", "Chemical", "Civil"], fees: "₹2.2L/year", placementsAvg: "₹20 LPA", placementsHighest: "₹1.5 Cr", cutoff: "JEE Adv: 250", rating: 4.8, established: 1959, website: "https://www.iitk.ac.in" },
  { id: "iitkgp", name: "Indian Institute of Technology Kharagpur", state: "West Bengal", city: "Kharagpur", type: "IIT", nirfRank: 6, courses: ["Computer Science", "Electrical", "Mechanical", "Aerospace", "Civil", "Architecture", "Mining"], fees: "₹2.2L/year", placementsAvg: "₹18 LPA", placementsHighest: "₹1.4 Cr", cutoff: "JEE Adv: 400", rating: 4.7, established: 1951, website: "https://www.iitkgp.ac.in" },
  { id: "iitr", name: "Indian Institute of Technology Roorkee", state: "Uttarakhand", city: "Roorkee", type: "IIT", nirfRank: 7, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Chemical", "Architecture"], fees: "₹2.2L/year", placementsAvg: "₹17.5 LPA", placementsHighest: "₹1.2 Cr", cutoff: "JEE Adv: 600", rating: 4.6, established: 1847, website: "https://www.iitr.ac.in" },
  { id: "iitg", name: "Indian Institute of Technology Guwahati", state: "Assam", city: "Guwahati", type: "IIT", nirfRank: 8, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Chemical", "Design"], fees: "₹2.2L/year", placementsAvg: "₹16 LPA", placementsHighest: "₹1 Cr", cutoff: "JEE Adv: 800", rating: 4.6, established: 1994, website: "https://www.iitg.ac.in" },
  { id: "iith", name: "Indian Institute of Technology Hyderabad", state: "Telangana", city: "Hyderabad", type: "IIT", nirfRank: 9, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Chemical", "Biomedical"], fees: "₹2.2L/year", placementsAvg: "₹16.5 LPA", placementsHighest: "₹85 LPA", cutoff: "JEE Adv: 1200", rating: 4.5, established: 2008, website: "https://www.iith.ac.in" },
  { id: "iitbhu", name: "IIT (BHU) Varanasi", state: "Uttar Pradesh", city: "Varanasi", type: "IIT", nirfRank: 10, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Ceramic", "Mining"], fees: "₹2.2L/year", placementsAvg: "₹15 LPA", placementsHighest: "₹1.2 Cr", cutoff: "JEE Adv: 1500", rating: 4.5, established: 1919, website: "https://www.iitbhu.ac.in" },
  { id: "nitw", name: "National Institute of Technology Warangal", state: "Telangana", city: "Warangal", type: "NIT", nirfRank: 11, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Electronics", "Chemical"], fees: "₹1.5L/year", placementsAvg: "₹12 LPA", placementsHighest: "₹60 LPA", cutoff: "JEE Main: 5000", rating: 4.3, established: 1959, website: "https://www.nitw.ac.in" },
  { id: "nitt", name: "National Institute of Technology Tiruchirappalli", state: "Tamil Nadu", city: "Tiruchirappalli", type: "NIT", nirfRank: 12, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Electronics", "Instrumentation"], fees: "₹1.5L/year", placementsAvg: "₹11 LPA", placementsHighest: "₹55 LPA", cutoff: "JEE Main: 6000", rating: 4.3, established: 1964, website: "https://www.nitt.edu" },
  { id: "nitk", name: "National Institute of Technology Karnataka (Surathkal)", state: "Karnataka", city: "Mangaluru", type: "NIT", nirfRank: 13, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Electronics", "Chemical"], fees: "₹1.5L/year", placementsAvg: "₹13 LPA", placementsHighest: "₹65 LPA", cutoff: "JEE Main: 4500", rating: 4.4, established: 1960, website: "https://www.nitk.ac.in" },
  { id: "nitr", name: "National Institute of Technology Rourkela", state: "Odisha", city: "Rourkela", type: "NIT", nirfRank: 15, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Mining", "Metallurgy"], fees: "₹1.3L/year", placementsAvg: "₹10.5 LPA", placementsHighest: "₹50 LPA", cutoff: "JEE Main: 8000", rating: 4.2, established: 1961, website: "https://www.nitrkl.ac.in" },
  { id: "nitn", name: "National Institute of Technology Nagpur (VNIT)", state: "Maharashtra", city: "Nagpur", type: "NIT", nirfRank: 18, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Electronics", "Mining"], fees: "₹1.4L/year", placementsAvg: "₹10 LPA", placementsHighest: "₹45 LPA", cutoff: "JEE Main: 10000", rating: 4.1, established: 1960, website: "https://vnit.ac.in" },
  { id: "nita", name: "National Institute of Technology Allahabad (MNNIT)", state: "Uttar Pradesh", city: "Prayagraj", type: "NIT", nirfRank: 20, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Electronics", "Biotechnology"], fees: "₹1.3L/year", placementsAvg: "₹9.5 LPA", placementsHighest: "₹42 LPA", cutoff: "JEE Main: 12000", rating: 4.0, established: 1961, website: "https://www.mnnit.ac.in" },
  { id: "iiitd", name: "IIIT Delhi", state: "Delhi", city: "New Delhi", type: "IIIT", nirfRank: 22, courses: ["Computer Science", "Electronics", "Computer Science & AI", "Computer Science & Design"], fees: "₹3.5L/year", placementsAvg: "₹16 LPA", placementsHighest: "₹1.2 Cr", cutoff: "JEE Main: 3000", rating: 4.5, established: 2008, website: "https://www.iiitd.ac.in" },
  { id: "iiith", name: "IIIT Hyderabad", state: "Telangana", city: "Hyderabad", type: "IIIT", nirfRank: 25, courses: ["Computer Science", "Electronics", "Computer Science & Design", "Computational Linguistics"], fees: "₹3L/year", placementsAvg: "₹18 LPA", placementsHighest: "₹1.5 Cr", cutoff: "UGEE", rating: 4.6, established: 1998, website: "https://www.iiit.ac.in" },
  { id: "iiitb", name: "IIIT Bangalore", state: "Karnataka", city: "Bengaluru", type: "IIIT", nirfRank: 30, courses: ["Computer Science", "Electronics", "Information Technology"], fees: "₹4L/year", placementsAvg: "₹14 LPA", placementsHighest: "₹80 LPA", cutoff: "JEE Main/Board %", rating: 4.3, established: 1999, website: "https://www.iiitb.ac.in" },
  { id: "iiita", name: "IIIT Allahabad", state: "Uttar Pradesh", city: "Prayagraj", type: "IIIT", nirfRank: 40, courses: ["Computer Science", "Electronics", "Information Technology", "Bioinformatics"], fees: "₹1.8L/year", placementsAvg: "₹11 LPA", placementsHighest: "₹50 LPA", cutoff: "JEE Main: 15000", rating: 4.1, established: 1999, website: "https://www.iiita.ac.in" },
  { id: "vit", name: "Vellore Institute of Technology", state: "Tamil Nadu", city: "Vellore", type: "Private", nirfRank: 14, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Biotechnology", "Electronics"], fees: "₹5L/year", placementsAvg: "₹8 LPA", placementsHighest: "₹50 LPA", cutoff: "VITEEE", rating: 4.2, established: 1984, website: "https://www.vit.ac.in" },
  { id: "bits-pilani", name: "BITS Pilani", state: "Rajasthan", city: "Pilani", type: "Private", nirfRank: 16, courses: ["Computer Science", "Electrical", "Mechanical", "Electronics", "Chemical", "Pharmacy"], fees: "₹5.5L/year", placementsAvg: "₹16 LPA", placementsHighest: "₹1 Cr", cutoff: "BITSAT: 320", rating: 4.6, established: 1964, website: "https://www.bits-pilani.ac.in" },
  { id: "manipal", name: "Manipal Institute of Technology", state: "Karnataka", city: "Manipal", type: "Private", nirfRank: 35, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Electronics", "Chemical", "Biomedical"], fees: "₹4.5L/year", placementsAvg: "₹7.5 LPA", placementsHighest: "₹45 LPA", cutoff: "MET", rating: 4.1, established: 1957, website: "https://www.manipal.edu" },
  { id: "srm", name: "SRM Institute of Science and Technology", state: "Tamil Nadu", city: "Chennai", type: "Private", nirfRank: 38, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Electronics", "Biotechnology"], fees: "₹4L/year", placementsAvg: "₹6 LPA", placementsHighest: "₹40 LPA", cutoff: "SRMJEE", rating: 3.9, established: 1985, website: "https://www.srmist.edu.in" },
  { id: "thapar", name: "Thapar Institute of Engineering and Technology", state: "Punjab", city: "Patiala", type: "Private", nirfRank: 32, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Electronics", "Biotechnology"], fees: "₹3.5L/year", placementsAvg: "₹9 LPA", placementsHighest: "₹50 LPA", cutoff: "JEE Main/Board %", rating: 4.0, established: 1956, website: "https://www.thapar.edu" },
  { id: "jadavpur", name: "Jadavpur University", state: "West Bengal", city: "Kolkata", type: "Govt", nirfRank: 17, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Electronics", "Chemical", "Architecture"], fees: "₹10K/year", placementsAvg: "₹10 LPA", placementsHighest: "₹55 LPA", cutoff: "WBJEE", rating: 4.3, established: 1955, website: "https://www.jaduniv.edu.in" },
  { id: "dtu", name: "Delhi Technological University", state: "Delhi", city: "New Delhi", type: "Govt", nirfRank: 28, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Electronics", "Software", "Environmental"], fees: "₹1.7L/year", placementsAvg: "₹13 LPA", placementsHighest: "₹1 Cr", cutoff: "JEE Main: 5000", rating: 4.2, established: 1941, website: "https://www.dtu.ac.in" },
  { id: "nsut", name: "Netaji Subhas University of Technology", state: "Delhi", city: "New Delhi", type: "Govt", nirfRank: 34, courses: ["Computer Science", "Electrical", "Mechanical", "Electronics", "Information Technology", "Instrumentation"], fees: "₹1.7L/year", placementsAvg: "₹12.5 LPA", placementsHighest: "₹90 LPA", cutoff: "JEE Main: 6000", rating: 4.1, established: 1983, website: "https://www.nsut.ac.in" },
  { id: "pec", name: "PEC Chandigarh", state: "Chandigarh", city: "Chandigarh", type: "Govt", nirfRank: 45, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Electronics"], fees: "₹1.5L/year", placementsAvg: "₹9 LPA", placementsHighest: "₹42 LPA", cutoff: "JEE Main: 15000", rating: 3.9, established: 1921, website: "https://pec.ac.in" },
  { id: "iitism", name: "Indian Institute of Technology (ISM) Dhanbad", state: "Jharkhand", city: "Dhanbad", type: "IIT", nirfRank: 19, courses: ["Computer Science", "Electrical", "Mechanical", "Mining", "Civil", "Chemical", "Petroleum"], fees: "₹2.2L/year", placementsAvg: "₹14 LPA", placementsHighest: "₹75 LPA", cutoff: "JEE Adv: 2500", rating: 4.3, established: 1926, website: "https://www.iitism.ac.in" },
  { id: "iitgn", name: "Indian Institute of Technology Gandhinagar", state: "Gujarat", city: "Gandhinagar", type: "IIT", nirfRank: 21, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Chemical", "Materials Science"], fees: "₹2.2L/year", placementsAvg: "₹15 LPA", placementsHighest: "₹80 LPA", cutoff: "JEE Adv: 2000", rating: 4.4, established: 2008, website: "https://www.iitgn.ac.in" },
  { id: "iitp", name: "Indian Institute of Technology Patna", state: "Bihar", city: "Patna", type: "IIT", nirfRank: 26, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Chemical"], fees: "₹2.2L/year", placementsAvg: "₹13 LPA", placementsHighest: "₹65 LPA", cutoff: "JEE Adv: 3500", rating: 4.2, established: 2008, website: "https://www.iitp.ac.in" },
  { id: "coep", name: "College of Engineering, Pune", state: "Maharashtra", city: "Pune", type: "Govt", nirfRank: 42, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Electronics", "Instrumentation"], fees: "₹1.2L/year", placementsAvg: "₹8.5 LPA", placementsHighest: "₹45 LPA", cutoff: "MHT CET", rating: 4.0, established: 1854, website: "https://www.coep.org.in" },
  { id: "amity", name: "Amity University Noida", state: "Uttar Pradesh", city: "Noida", type: "Private", nirfRank: 55, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Biotechnology", "Aerospace"], fees: "₹5L/year", placementsAvg: "₹5 LPA", placementsHighest: "₹25 LPA", cutoff: "Amity JEE", rating: 3.5, established: 2005, website: "https://www.amity.edu" },
  { id: "kiit", name: "KIIT University", state: "Odisha", city: "Bhubaneswar", type: "Private", nirfRank: 48, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Electronics", "Biotechnology"], fees: "₹3.5L/year", placementsAvg: "₹5.5 LPA", placementsHighest: "₹28 LPA", cutoff: "KIITEE", rating: 3.7, established: 1997, website: "https://kiit.ac.in" },
  { id: "lpu", name: "Lovely Professional University", state: "Punjab", city: "Phagwara", type: "Private", nirfRank: 60, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Electronics", "Agriculture"], fees: "₹3L/year", placementsAvg: "₹4.5 LPA", placementsHighest: "₹42 LPA", cutoff: "LPUNEST", rating: 3.4, established: 2005, website: "https://www.lpu.in" },
  { id: "rvce", name: "RV College of Engineering", state: "Karnataka", city: "Bengaluru", type: "Private", nirfRank: 50, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Electronics", "Information Science"], fees: "₹3L/year", placementsAvg: "₹8 LPA", placementsHighest: "₹45 LPA", cutoff: "COMEDK/KCET", rating: 4.0, established: 1963, website: "https://www.rvce.edu.in" },
  { id: "nitc", name: "National Institute of Technology Calicut", state: "Kerala", city: "Kozhikode", type: "NIT", nirfRank: 23, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Electronics", "Chemical", "Architecture"], fees: "₹1.5L/year", placementsAvg: "₹10.5 LPA", placementsHighest: "₹50 LPA", cutoff: "JEE Main: 7000", rating: 4.2, established: 1961, website: "https://www.nitc.ac.in" },
  { id: "nits", name: "National Institute of Technology Silchar", state: "Assam", city: "Silchar", type: "NIT", nirfRank: 44, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Electronics"], fees: "₹1.2L/year", placementsAvg: "₹7 LPA", placementsHighest: "₹30 LPA", cutoff: "JEE Main: 25000", rating: 3.8, established: 1967, website: "https://www.nits.ac.in" },
  { id: "nitj", name: "National Institute of Technology Jalandhar (Dr B R Ambedkar NIT)", state: "Punjab", city: "Jalandhar", type: "NIT", nirfRank: 39, courses: ["Computer Science", "Electrical", "Mechanical", "Civil", "Electronics", "Chemical", "Textile"], fees: "₹1.3L/year", placementsAvg: "₹7.5 LPA", placementsHighest: "₹35 LPA", cutoff: "JEE Main: 20000", rating: 3.9, established: 1987, website: "https://www.nitj.ac.in" },
];

export function getUniqueStates(): string[] {
  return [...new Set(colleges.map(c => c.state))].sort();
}

export function getUniqueCities(): string[] {
  return [...new Set(colleges.map(c => c.city))].sort();
}

export function getUniqueTypes(): string[] {
  return [...new Set(colleges.map(c => c.type))].sort();
}

export function getUniqueCourses(): string[] {
  const all = colleges.flatMap(c => c.courses);
  return [...new Set(all)].sort();
}

export function searchColleges(filters: {
  query?: string;
  state?: string;
  city?: string;
  type?: string;
  course?: string;
  sortBy?: "nirfRank" | "name" | "fees";
}): College[] {
  let result = [...colleges];

  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q)
    );
  }
  if (filters.state) result = result.filter(c => c.state === filters.state);
  if (filters.city) result = result.filter(c => c.city === filters.city);
  if (filters.type) result = result.filter(c => c.type === filters.type);
  if (filters.course) result = result.filter(c => c.courses.includes(filters.course));

  if (filters.sortBy === "nirfRank") {
    result.sort((a, b) => (a.nirfRank ?? 999) - (b.nirfRank ?? 999));
  } else if (filters.sortBy === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
}

export function getRecommendations(jeeRank: number) {
  const iitsNits = colleges.filter(c => c.type === "IIT" || c.type === "NIT" || c.type === "IIIT");

  const dream = iitsNits.filter(c => {
    const cutoffNum = extractCutoff(c.cutoff);
    return cutoffNum !== null && jeeRank > cutoffNum * 1.5;
  });

  const reach = iitsNits.filter(c => {
    const cutoffNum = extractCutoff(c.cutoff);
    return cutoffNum !== null && jeeRank > cutoffNum * 0.8 && jeeRank <= cutoffNum * 1.5;
  });

  const safe = iitsNits.filter(c => {
    const cutoffNum = extractCutoff(c.cutoff);
    return cutoffNum !== null && jeeRank <= cutoffNum * 0.8;
  });

  return { dream, reach, safe };
}

function extractCutoff(cutoff: string | null): number | null {
  if (!cutoff) return null;
  const match = cutoff.match(/(\d+)/);
  return match ? parseInt(match[1]) : null;
}
