import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 💥 IMPORT DEMO DATA 💥
import { initialClients, initialProjects, initialTasks } from '../data/Dummydata';

export default function Navbar() {
  const navigate = useNavigate();
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'task', text: 'Sarah completed "Design Analytics Widgets".', time: '1h ago', unread: true },
    { id: 2, type: 'comment', text: 'David mentioned you in "API Endpoint Integration".', time: '3h ago', unread: true },
    { id: 3, type: 'system', text: 'Workspace successfully upgraded to Pro!', time: '1d ago', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const closeAll = () => {
    setIsAddOpen(false);
    setIsNotifOpen(false);
    setIsProfileOpen(false);
  };

  // 💥 THE MAGIC RESET FUNCTION FOR PORTFOLIO 💥
  const handleLoadDemoData = () => {
    if(window.confirm("This will clear current data and load the Premium Demo Data for your portfolio. Continue?")) {
      localStorage.setItem('Onyx_clients', JSON.stringify(initialClients));
      localStorage.setItem('Onyx_projects', JSON.stringify(initialProjects));
      localStorage.setItem('Onyx_global_tasks', JSON.stringify(initialTasks));
      
      // Seed Project 1 tasks specifically for the details page
      const proj1Tasks = initialTasks.filter(t => t.projectId === 1);
      localStorage.setItem('Onyx_tasks_1', JSON.stringify(proj1Tasks));
      
      window.location.reload(); // Refresh to apply changes instantly
    }
  };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-8 sticky top-0 z-40 transition-all">
      
      {/* SEARCH BAR */}
      <div className="flex-1 max-w-md relative group">
        <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input 
          type="text" 
          placeholder="Search projects, tasks, or clients..." 
          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-[13px] font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400 placeholder:font-medium"
        />
      </div>

      <div className="flex items-center gap-6">
        
        {/* QUICK ADD BUTTON */}
        <div className="relative">
          <button onClick={() => { closeAll(); setIsAddOpen(!isAddOpen); }} className={`p-2 rounded-xl transition-all duration-300 ${isAddOpen ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
            <svg className={`w-5 h-5 transition-transform duration-300 ${isAddOpen ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          </button>

          {isAddOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={closeAll}></div>
              <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden z-50 p-2 animate-[popIn_0.2s_ease-out] origin-top-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-2">Quick Add</p>
                <div onClick={() => { closeAll(); navigate('/tasks'); }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors group"><div className="w-7 h-7 rounded-lg bg-indigo-100/50 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg></div>New Task</div>
                <div onClick={() => { closeAll(); navigate('/projects'); }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors group"><div className="w-7 h-7 rounded-lg bg-indigo-100/50 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg></div>New Project</div>
              </div>
            </>
          )}
        </div>

        {/* NOTIFICATIONS BUTTON */}
        <div className="relative">
          <button onClick={() => { closeAll(); setIsNotifOpen(!isNotifOpen); }} className={`p-2 rounded-xl transition-all duration-300 relative ${isNotifOpen ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full animate-pulse"></span>}
          </button>

          {isNotifOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={closeAll}></div>
              <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-100 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden z-50 animate-[popIn_0.2s_ease-out] origin-top-right">
                <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                  <h3 className="text-[14px] font-black text-slate-800">Notifications</h3>
                  {unreadCount > 0 && <button onClick={markAllAsRead} className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700">Mark all read</button>}
                </div>
                <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                  {notifications.map(notif => (
                    <div key={notif.id} className={`p-4 border-b border-slate-50 flex gap-3 hover:bg-slate-50 transition-colors cursor-pointer ${notif.unread ? 'bg-indigo-50/20' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${notif.type === 'task' ? 'bg-emerald-100 text-emerald-600' : notif.type === 'comment' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                        {notif.type === 'task' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                        {notif.type === 'comment' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
                        {notif.type === 'system' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                      </div>
                      <div>
                        <p className={`text-[13px] leading-snug ${notif.unread ? 'font-bold text-slate-800' : 'font-medium text-slate-600'}`}>{notif.text}</p>
                        <span className="text-[10px] font-bold text-slate-400 block mt-1">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="w-px h-8 bg-slate-200"></div>

        {/* USER PROFILE BUTTON */}
        <div className="relative">
          <div onClick={() => { closeAll(); setIsProfileOpen(!isProfileOpen); }} className="flex items-center gap-3 cursor-pointer group">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-[13px] font-extrabold text-slate-800 leading-none">Daniyal</span>
              <span className="text-[10px] font-bold text-slate-400 mt-1">Workspace Admin</span>
            </div>
            <div className="relative">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-black text-[15px] shadow-[0_4px_10px_rgba(79,70,229,0.3)] group-hover:scale-105 transition-transform">D</div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <svg className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180 text-indigo-500' : 'group-hover:text-slate-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
          </div>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={closeAll}></div>
              <div className="absolute right-0 mt-4 w-64 bg-white border border-slate-100 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden z-50 animate-[popIn_0.2s_ease-out] origin-top-right">
                
                <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-black shadow-sm">D</div>
                  <div>
                    <p className="text-[14px] font-black text-slate-800">Daniyal</p>
                    <p className="text-[11px] font-bold text-slate-500">daniyal@Onyx.com</p>
                  </div>
                </div>

                <div className="p-2 border-b border-slate-100">
                  {/* 💥 LOAD DEMO DATA BUTTON 💥 */}
                  <div onClick={handleLoadDemoData} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-emerald-600 bg-emerald-50/50 hover:bg-emerald-50 cursor-pointer transition-colors group border border-emerald-100/50">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    </div>
                    Load Demo Data
                  </div>
                </div>
                
                <div className="p-2 border-t border-slate-100">
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Log out
                  </div>
                </div>

              </div>
            </>
          )}
        </div>

      </div>
    </header>
  );
}