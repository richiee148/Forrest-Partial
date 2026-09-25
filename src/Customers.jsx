import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "./components/Header.jsx";
import Sidebar from "./components/sidebar.jsx";

// Replace this with data from your database (e.g. via an API call in useEffect,
// a React Query hook, or props passed down from a server component).
// Each entry represents one customer's reservation history summary.
// status must be one of: "active" | "checked-out" | "upcoming"
const INITIAL_RESERVATIONS = [
  {
    id: 1,
    name: "Maria Santos",
    email: "maria.santos@example.com",
    totalStays: 12,
    lastVisit: "2026-09-18",
    status: "active",
  },
  {
    id: 2,
    name: "James Cooper",
    email: "james.cooper@example.com",
    totalStays: 3,
    lastVisit: "2026-09-10",
    status: "checked-out",
  },
  {
    id: 3,
    name: "Aiko Tanaka",
    email: "aiko.tanaka@example.com",
    totalStays: 7,
    lastVisit: "2026-09-22",
    status: "active",
  },
  {
    id: 4,
    name: "Liam O'Brien",
    email: "liam.obrien@example.com",
    totalStays: 1,
    lastVisit: "2026-09-25",
    status: "upcoming",
  },
  {
    id: 5,
    name: "Priya Nair",
    email: "priya.nair@example.com",
    totalStays: 5,
    lastVisit: "2026-08-30",
    status: "checked-out",
  },
];

const STATUS_CONFIG = {
  active: { label: "Active", dot: "bg-blue-500", text: "text-blue-700" },
  "checked-out": { label: "Checked out", dot: "bg-slate-400", text: "text-slate-600" },
  upcoming: { label: "Upcoming", dot: "bg-amber-500", text: "text-amber-700" },
};

function formatDate(dateStr) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function ReservationsTable({ reservations }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-semibold">Recent reservations</h2>
        <button type="button" className="text-xs font-medium text-slate-500 hover:text-slate-900">
          View all
        </button>
      </div>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-xs text-slate-500">
            <th className="px-4 py-2 font-medium">Name</th>
            <th className="px-4 py-2 font-medium">Email</th>
            <th className="px-4 py-2 font-medium">Total stays</th>
            <th className="px-4 py-2 font-medium">Last visit</th>
            <th className="px-4 py-2 text-right font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-400">
                No data yet
              </td>
            </tr>
          ) : (
            reservations.map((r) => {
              const cfg = STATUS_CONFIG[r.status] ?? STATUS_CONFIG["checked-out"];
              return (
                <tr key={r.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 font-medium text-slate-800">{r.name}</td>
                  <td className="px-4 py-3 text-slate-500">{r.email}</td>
                  <td className="px-4 py-3 text-slate-600">{r.totalStays}</td>
                  <td className="px-4 py-3 text-slate-600">{formatDate(r.lastVisit)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                      <span className={`text-xs font-medium ${cfg.text}`}>{cfg.label}</span>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function Customers() {
  const navigate = useNavigate();
  const location = useLocation();
  const [reservations] = useState(INITIAL_RESERVATIONS);

  const active = location.pathname === "/customers" ? "Customers" : "Dashboard";

  function handleNavigate(section) {
    navigate(section === "Customers" ? "/customers" : "/dashboard");
  }

  // To connect to a real database later, swap the static state above for
  // something like:
  //
  // const [reservations, setReservations] = useState([]);
  // useEffect(() => {
  //   fetch("/api/reservations")
  //     .then((res) => res.json())
  //     .then(setReservations);
  // }, []);

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900">
      <Sidebar active={active} onNavigate={handleNavigate} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header active={active} />

        <main className="flex-1 overflow-y-auto p-6">
          <ReservationsTable reservations={reservations} />
        </main>
      </div>
    </div>
  );
}