import { ShieldCheck, User, Users, ChevronRight } from "lucide-react";
import pageBackground from "./assets/page_background.jpeg";
import logo from "./assets/logo.jpg";



const ROLES = [
  {
    id: "admin",
    label: "Admin",
    description: "Full access to manage the system",
    Icon: ShieldCheck,
    color: "bg-blue-500",
  },
  {
    id: "customer",
    label: "Customer",
    description: "Browse, purchase, and manage your account",
    Icon: User,
    color: "bg-emerald-500",
  },
  {
    id: "staff",
    label: "Staff",
    description: "Access daily operations and internal tools",
    Icon: Users,
    color: "bg-amber-500",
  },
];

export default function LoginRoleSelector() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-white bg-cover bg-center bg-no-repeat p-6"
      style={{ backgroundImage: `url(${pageBackground})` }}
    >
      <div className="flex border-2 border-black w-full  max-w-5xl h-[600px] rounded-2xl shadow-lg overflow-hidden">
        {/* Left panel: role options */}
        <div className="w-3/5  p-6  bg-white/80 "> 
          <h1 className="text-2xl text-[#003F22] font-bold mb-3">Welcome to Forrest Co-Working space</h1>
          <p className="text-sm text-slate-600 mb-3">Choose how you'd like to sign in.</p> 
          <br></br>
          <div className="space-y-6">
            {ROLES.map(({ id, label, description, Icon, color }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  window.location.href = `/login/${id}`;
                }}
                className="w-full flex items-center gap-3 rounded-xl border border-slate-200 bg-white/80 px-4 py-6 text-left shadow-sm hover:shadow-md hover:bg-white transition"
              >
                <div className={`w-10 h-10 shrink-0 rounded-lg ${color} flex items-center justify-center`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900">{label}</p>
                  <p className="text-sm text-slate-500 truncate">{description}</p>
                </div>
                <ChevronRight size={18} className="text-slate-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Right panel: static description */}
        <div className="w-2/5 backdrop-blur-sm p-6  ">
              <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 object-contain mb-4 rounded-full "
  />  
  <br></br>
            <h1 className="text-2xl font-bold mb-3 text-white">Find your space.</h1>
            <h1 className="text-2xl font-bold mb-3 text-white">Find your focus.</h1>
            <p  className="text-white">Focus.Connect.Grow</p>
            <br></br>
          <p className="text-slate-800 text-white">Forrest Co-working space is a study hub where you can find the perfect place to focus and grow your ideas.</p>
        </div>
      </div>
    </div>
  );
}