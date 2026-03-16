import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsData, users } from '../data/Dummydata';

// 🌟 PREMIUM TIME FILTER DROPDOWN 🌟
const TimeFilterDropdown = ({ currentFilter, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const filters = ['This Week', 'Last Week'];

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-slate-50 border border-slate-200 text-slate-600 text-[12px] font-bold px-3 py-1.5 rounded-lg outline-none cursor-pointer flex items-center gap-2 hover:bg-slate-100 transition-colors"
      >
        {currentFilter}
        <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 z-50 mt-2 w-32 bg-white/95 backdrop-blur-xl border border-slate-100/80 rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] overflow-hidden p-1.5 animate-[popIn_0.2s_ease-out]">
            {filters.map(f => (
              <div 
                key={f} 
                onClick={() => { onFilterChange(f); setIsOpen(false); }} 
                className={`px-3 py-2 rounded-lg text-[12px] font-bold cursor-pointer transition-all ${currentFilter === f ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}
              >
                {f}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('Onyx_projects');
    return saved ? JSON.parse(saved) : projectsData;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('Onyx_global_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 't1', title: 'Design Landing Page Wireframes', status: 'To Do', priority: 'High' },
      { id: 't2', title: 'Setup Authentication API', status: 'To Do', priority: 'Medium' },
      { id: 't3', title: 'Fix Navigation Bug on Mobile', status: 'In Progress', priority: 'High' },
      { id: 't4', title: 'Database Schema Design', status: 'Completed', priority: 'Low' },
    ];
  });

  const [timeFilter, setTimeFilter] = useState('This Week');
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowChart(true), 100);
    return () => clearTimeout(timer);
  }, [timeFilter]); // Re-trigger animation on filter change

  const stats = useMemo(() => {
    const activeProjects = projects.length;
    const activeTasks = tasks.filter(t => t.status !== 'Completed').length;
    const completedTasks = tasks.filter(t => t.status === 'Completed').length;
    const productivityScore = tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

    return { activeProjects, activeTasks, productivityScore };
  }, [projects, tasks]);

  const activityData = timeFilter === 'This Week' 
    ? [ { day: 'Mon', value: 40 }, { day: 'Tue', value: 70 }, { day: 'Wed', value: 45 }, { day: 'Thu', value: 90 }, { day: 'Fri', value: 65 }, { day: 'Sat', value: 20 }, { day: 'Sun', value: 30 } ]
    : [ { day: 'Mon', value: 60 }, { day: 'Tue', value: 30 }, { day: 'Wed', value: 80 }, { day: 'Thu', value: 50 }, { day: 'Fri', value: 95 }, { day: 'Sat', value: 10 }, { day: 'Sun', value: 40 } ];

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-[90vh] -m-6 p-8 bg-slate-100 animate-[fadeInUp_0.4s_ease-out_forwards] flex flex-col gap-8 pb-20">
      
      {/* 🌟 HEADER 🌟 */}
      <div className="flex justify-between items-end bg-white p-8 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="relative z-10">
          <p className="text-[12px] font-black text-indigo-500 uppercase tracking-widest mb-2">{today}</p>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back, Daniyal! 👋</h1>
          <p className="text-[14px] text-slate-500 mt-2 font-medium max-w-lg leading-relaxed">Here's what's happening with your projects and tasks today. You have <span className="font-bold text-slate-700">{stats.activeTasks} tasks</span> that need your attention.</p>
        </div>
        
        <div className="relative z-10 flex gap-3">
          <button onClick={() => navigate('/projects')} className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[13px] font-bold rounded-xl transition-all border border-slate-200 shadow-sm">View Projects</button>
          <button onClick={() => navigate('/tasks')} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-bold rounded-xl transition-all shadow-[0_4px_15px_rgba(79,70,229,0.3)] hover:-translate-y-0.5">Go to Board</button>
        </div>
      </div>

      {/* 🌟 METRICS WIDGETS 🌟 */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300 group">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </div>
          <div>
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Active Projects</p>
            <h3 className="text-3xl font-black text-slate-800">{stats.activeProjects}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300 group">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          </div>
          <div>
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Tasks Pending</p>
            <h3 className="text-3xl font-black text-slate-800">{stats.activeTasks}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300 group">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <div>
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Productivity Score</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-black text-slate-800">{stats.productivityScore}%</h3>
              <span className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">+5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT SPLIT */}
      <div className="grid grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: CHART & HEALTH */}
        <div className="col-span-2 space-y-6">
          
          {/* 💥 FIXED TAILWIND BAR CHART 💥 */}
          <div className="bg-white p-7 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-[16px] font-black text-slate-800">Weekly Activity</h2>
              <TimeFilterDropdown currentFilter={timeFilter} onFilterChange={(val) => { setShowChart(false); setTimeFilter(val); }} />
            </div>
            
            {/* Chart Area */}
            <div className="h-56 flex items-end justify-between gap-4 px-2">
              {activityData.map((data, index) => (
                // FIXED: Added h-full and flex-1 here so bars don't collapse
                <div key={index} className="flex flex-col items-center gap-4 flex-1 h-full group">
                  {/* Bar Background Container */}
                  <div className="w-full flex-1 bg-slate-100 rounded-t-xl relative flex items-end">
                    
                    {/* Animated Fill Bar */}
                    <div 
                      className="w-full bg-indigo-500 rounded-t-xl transition-all duration-[1000ms] ease-out group-hover:bg-indigo-600 relative flex justify-center"
                      style={{ 
                        height: showChart ? `${data.value}%` : '0%', 
                        transitionDelay: `${index * 50}ms` 
                      }}
                    >
                      {/* Tooltip on Hover */}
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[11px] font-bold py-1.5 px-3 rounded-lg whitespace-nowrap z-10 pointer-events-none shadow-lg">
                        {data.value} Tasks
                        {/* Tooltip Arrow */}
                        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                      </div>
                    </div>

                  </div>
                  {/* Day Label */}
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PROJECT HEALTH */}
          <div className="bg-white p-7 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[16px] font-black text-slate-800">Project Health</h2>
              <button onClick={() => navigate('/projects')} className="text-[12px] font-bold text-indigo-600 hover:text-indigo-700">View All</button>
            </div>
            
            <div className="space-y-5">
              {projects.slice(0, 3).map(project => (
                <div key={project.id} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[14px] font-bold text-slate-700 group-hover:text-indigo-600 transition-colors cursor-pointer" onClick={() => navigate(`/projects/${project.id}`)}>
                      {project.name}
                    </span>
                    <span className="text-[12px] font-black text-slate-500">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${project.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} 
                      style={{ width: showChart ? `${project.progress}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: RECENT TASKS */}
        <div className="bg-white p-7 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[16px] font-black text-slate-800">Recent Tasks</h2>
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold">{tasks.slice(0,5).length}</span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {tasks.slice(0, 6).map(task => (
              <div key={task.id} className="p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all group bg-slate-50/50 hover:bg-white cursor-pointer" onClick={() => navigate('/tasks')}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${task.priority === 'High' ? 'bg-rose-50 text-rose-600 border-rose-100' : task.priority === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                    {task.priority}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${task.status === 'Completed' ? 'bg-emerald-500' : task.status === 'In Progress' ? 'bg-indigo-500' : 'bg-slate-300'}`}></div>
                </div>
                <h3 className="text-[13px] font-extrabold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">{task.title}</h3>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-3">
                  {task.status}
                </p>
              </div>
            ))}
          </div>
          
          <button onClick={() => navigate('/tasks')} className="w-full mt-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 text-[12px] font-bold rounded-xl transition-colors">
            Manage All Tasks
          </button>
        </div>

      </div>
    </div>
  );
}