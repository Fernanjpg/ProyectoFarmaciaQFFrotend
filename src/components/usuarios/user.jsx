import React from 'react';
import { User } from 'lucide-react';

const UserProfile = ({ user }) => {
  return (
    <div className="bg-white p-4 rounded-full flex items-center gap-3 border border-slate-200/50 shadow-sm">
      <div className="w-10 h-10 bg-[#1a4d3a] text-white rounded-full flex items-center justify-center shadow-inner shrink-0">
        <User className="w-5 h-5" />
      </div>
      <div className="text-left flex-1 overflow-hidden">
        <p className="text-sm font-bold text-slate-800 truncate">{user?.username || 'Admin QF'}</p>
        <p className="text-[10px] font-medium text-slate-500">Corporación QF</p>
      </div>
    </div>
  );
};

export default UserProfile;
