import { LogOut, CircleUserRound, Activity } from 'lucide-react';

const Navbar = ({ active = false }) => {
  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white shadow-md">
      <div className="flex items-center gap-2 text-[#00ABE4] font-bold text-xl">
        <Activity className="text-[#00ABE4]" />
        Argos
      </div>
      <div className="flex items-center gap-6">
        <div className={`flex items-center space-x-2 text-sm px-3 py-1 rounded-full ${active ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'} border`}>
          <Activity className="h-4 w-4" />
          <span>Session Active</span>
        </div>
        <div className="flex items-center space-x-2">
          <CircleUserRound />
          <span className="text-sm font-semibold">John Doe</span>
          <span className="text-sm font-semibold">Annotator ID</span>
        </div>
        <LogOut className="cursor-pointer" onClick={() => window.location.href = '/'} />
      </div>
    </div>
  );
};
export default Navbar;