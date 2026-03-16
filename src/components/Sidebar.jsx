import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: 'grid' },
    { name: 'Projects', path: '/projects', icon: 'folder' },
    { name: 'Tasks', path: '/tasks', icon: 'check' },
    { name: 'Clients', path: '/clients', icon: 'users' },
  ];

  return (
    <aside className="w-64 bg-[#0f172a] text-white flex flex-col h-full border-r border-slate-800/50">
      
      {/* 🌟 PREMIUM BRANDING: ONYX 🌟 */}
      <div className="p-8 pb-10">
        <div className="flex items-center gap-3 group cursor-pointer">
          {/* Custom Onyx Sparkle Logo */}
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)] group-hover:scale-110 transition-transform duration-500">
             <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2C16 2 20 12 30 16C30 16 20 20 16 30C16 30 12 20 2 16C2 16 12 12 16 2Z" fill="white"/>
                <path d="M16 8C16 8 18 14 24 16C24 16 18 18 16 24C16 24 14 18 8 16C8 16 14 14 16 8Z" fill="white" opacity="0.6"/>
             </svg>
          </div>
          
          {/* Classy & Rare Font Style */}
          <h1 className="text-2xl font-black tracking-[-0.05em] text-white group-hover:tracking-[0.02em] transition-all duration-500">
            Onyx
          </h1>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Main Menu</p>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[14px] font-bold transition-all duration-300 group ${
                isActive 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.1)]' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`
            }
          >
            {/* Icons logic yahan wese hi rahegi... */}
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Workspace Pro Card */}
      <div className="p-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] p-5 border border-slate-700/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/10 rounded-full blur-3xl group-hover:bg-indigo-600/20 transition-colors"></div>
          <h3 className="text-[13px] font-black mb-1 flex items-center gap-2">Workspace Pro <span className="text-amber-400 text-[10px]">★</span></h3>
          <p className="text-[11px] text-slate-400 font-medium leading-relaxed mb-4">Unlock advanced reporting, automations, and more.</p>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl text-[12px] font-black transition-all shadow-lg shadow-indigo-900/20 active:scale-95">Upgrade Now</button>
        </div>
      </div>
    </aside>
  );
}