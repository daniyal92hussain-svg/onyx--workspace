import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsData, users } from '../data/Dummydata';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomCalendarHeader = ({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => {
  const [monthOpen, setMonthOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = Array.from({ length: 15 }, (_, i) => 2020 + i);

  return (
    <div className="flex justify-between items-center px-3 py-3 bg-white border-b border-slate-50">
      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} type="button" className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors disabled:opacity-30">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
      </button>

      <div className="flex gap-2">
        <div className="relative">
          <button onClick={() => { setMonthOpen(!monthOpen); setYearOpen(false); }} type="button" className="px-3 py-1.5 text-[13px] font-extrabold text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 transition-colors">
            {months[date.getMonth()]}
            <svg className={`w-3.5 h-3.5 text-slate-400 transition-transform ${monthOpen ? 'rotate-180 text-indigo-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {monthOpen && (
            <>
              <div className="fixed inset-0 z-[999]" onClick={() => setMonthOpen(false)}></div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-32 bg-white border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] rounded-xl p-1.5 z-[1000] h-48 overflow-y-auto animate-[popIn_0.15s_ease-out] custom-scrollbar">
                {months.map((m, i) => (
                  <div key={m} onClick={() => { changeMonth(i); setMonthOpen(false); }} className={`px-3 py-2 text-[12px] font-bold rounded-lg cursor-pointer transition-colors ${date.getMonth() === i ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-slate-50 text-slate-600'}`}>{m}</div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <button onClick={() => { setYearOpen(!yearOpen); setMonthOpen(false); }} type="button" className="px-3 py-1.5 text-[13px] font-extrabold text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 transition-colors">
            {date.getFullYear()}
            <svg className={`w-3.5 h-3.5 text-slate-400 transition-transform ${yearOpen ? 'rotate-180 text-indigo-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {yearOpen && (
            <>
              <div className="fixed inset-0 z-[999]" onClick={() => setYearOpen(false)}></div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-24 bg-white border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] rounded-xl p-1.5 z-[1000] h-48 overflow-y-auto animate-[popIn_0.15s_ease-out] custom-scrollbar">
                {years.map((y) => (
                  <div key={y} onClick={() => { changeYear(y); setYearOpen(false); }} className={`px-3 py-2 text-[12px] font-bold rounded-lg cursor-pointer transition-colors ${date.getFullYear() === y ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-slate-50 text-slate-600'}`}>{y}</div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} type="button" className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors disabled:opacity-30">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
};

const ProjectTypeDropdown = ({ currentType, onTypeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const types = ['Project', 'Epic'];
  return (
    <div className="relative w-full">
      <div onClick={() => setIsOpen(!isOpen)} className="w-full px-5 py-3.5 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all font-bold text-slate-700 text-[14px] cursor-pointer flex justify-between items-center">
        {currentType}
        <svg className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute left-0 right-0 z-50 mt-2 bg-white/95 backdrop-blur-xl border border-slate-100/80 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden p-1.5 animate-[popIn_0.2s_ease-out]">
            {types.map(type => (
              <div key={type} onClick={() => { onTypeChange(type); setIsOpen(false); }} className={`px-4 py-3 rounded-xl text-[13px] font-bold cursor-pointer transition-all ${currentType === type ? 'bg-indigo-50/80 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}>
                {type}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// 💥 NEW: DYNAMIC CLIENT DROPDOWN 💥
const ClientDropdown = ({ currentClient, onClientChange, clientsList }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div onClick={() => setIsOpen(!isOpen)} className={`w-full px-5 py-3.5 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all font-bold text-[14px] cursor-pointer flex justify-between items-center ${currentClient ? 'text-slate-700' : 'text-slate-400'}`}>
        {currentClient || 'Select a linked client...'}
        <svg className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute left-0 right-0 z-50 mt-2 max-h-56 overflow-y-auto bg-white/95 backdrop-blur-xl border border-slate-100/80 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] p-1.5 animate-[popIn_0.2s_ease-out] custom-scrollbar">
            {clientsList.length > 0 ? (
              clientsList.map(c => (
                <div key={c.id} onClick={() => { onClientChange(c.company); setIsOpen(false); }} className={`px-4 py-3 rounded-xl text-[13px] font-bold cursor-pointer transition-all flex items-center gap-3 ${currentClient === c.company ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}>
                  <div className="w-6 h-6 rounded-md bg-indigo-100 flex items-center justify-center text-indigo-600 text-[10px] font-black">{c.company.charAt(0)}</div>
                  {c.company}
                </div>
              ))
            ) : (
              <div className="px-4 py-6 flex flex-col items-center justify-center text-center">
                <p className="text-[12px] font-bold text-slate-500 mb-2">No clients found</p>
                <p className="text-[10px] text-slate-400">Add a client in the Clients tab first.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default function Projects() {
  const navigate = useNavigate();

  // Load Projects
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('Onyx_projects');
    return savedProjects ? JSON.parse(savedProjects) : projectsData;
  });

  // 💥 NEW: Fetch Clients for the Dropdown 💥
  const [crmClients, setCrmClients] = useState(() => {
    const savedClients = localStorage.getItem('Onyx_clients');
    if (savedClients) return JSON.parse(savedClients);
    // Dummy fallback if none exist
    return [
      { id: 1, company: 'Tech Corp' },
      { id: 2, company: 'Startup Inc' },
      { id: 3, company: 'Local Biz' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('Onyx_projects', JSON.stringify(projects));
  }, [projects]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newProjectData, setNewProjectData] = useState({ id: null, name: '', client: '', type: 'Project' });

  const openAddModal = () => {
    setIsEditing(false);
    setNewProjectData({ id: null, name: '', client: crmClients[0]?.company || '', type: 'Project' });
    setIsModalOpen(true);
  };

  const openEditModal = (project, e) => {
    e.stopPropagation();
    setIsEditing(true);
    setNewProjectData({ id: project.id, name: project.name, client: project.client, type: project.type });
    setIsModalOpen(true);
  };

  const deleteProject = (id, e) => {
    e.stopPropagation();
    setProjects(projects.filter(p => p.id !== id));
  };

  const handleSubmitProject = (e) => {
    e.preventDefault();
    if (!newProjectData.name || !newProjectData.client) return; // Prevent submission if no client is selected
    
    if (isEditing) {
      setProjects(projects.map(p => p.id === newProjectData.id ? { ...p, name: newProjectData.name, client: newProjectData.client, type: newProjectData.type } : p));
    } else {
      const newProject = { id: Date.now(), name: newProjectData.name, client: newProjectData.client, status: 'Planning', progress: 0, dueDate: new Date().toISOString().split('T')[0], type: newProjectData.type, totalPoints: 0, completedPoints: 0, team: ['u1'] };
      setProjects([newProject, ...projects]);
    }
    setIsModalOpen(false);
  };

  const handleDateChange = (id, date) => {
    if (!date) return;
    const dateString = date.toISOString().split('T')[0];
    setProjects(projects.map(p => p.id === id ? { ...p, dueDate: dateString } : p));
  };

  return (
    <div className="min-h-[90vh] -m-6 p-8 bg-slate-100 pb-32">
      <div className="flex justify-between items-end mb-8 animate-[fadeInUp_0.5s_ease-out_forwards]">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Projects Workspace</h1>
          <p className="text-[14px] text-slate-500 mt-1.5 font-medium">Click on any project to view Epics, Tasks, and Comments.</p>
        </div>
        <button onClick={openAddModal} className="group relative bg-indigo-600 text-white px-6 py-3 rounded-2xl text-[14px] font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(79,70,229,0.3)] flex items-center gap-2 overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 to-indigo-600 group-hover:scale-105 transition-transform duration-300"></div>
          <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
          <span className="relative z-10">New Project</span>
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-4 px-8 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.1s' }}>
          <div className="col-span-4">Project Details</div>
          <div className="col-span-2">Client</div>
          <div className="col-span-3">Team & Points</div>
          <div className="col-span-3">Progress</div>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 border-dashed">
             <p className="text-slate-500 font-bold">No projects yet. Create one to get started!</p>
          </div>
        ) : (
          projects.map((project, index) => (
            <div key={project.id} onClick={() => navigate(`/projects/${project.id}`)} style={{ animationDelay: `${(index + 2) * 0.1}s` }} className="group grid grid-cols-12 gap-4 items-center bg-white p-4 px-8 rounded-2xl border border-transparent hover:border-indigo-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.08)] transition-all duration-300 cursor-pointer animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0 hover:-translate-y-[1px]">
              <div className="col-span-4 flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors">{project.name}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${project.type === 'Epic' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{project.type}</span>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                    <button onClick={(e) => openEditModal(project, e)} className="p-1.5 bg-slate-50 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors" title="Edit Project">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button onClick={(e) => deleteProject(project.id, e)} className="p-1.5 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors" title="Delete Project">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
                
                <div onClick={(e) => e.stopPropagation()} className="relative flex items-center gap-1.5 mt-1 text-[12px] font-bold text-slate-400 hover:text-indigo-500 transition-colors w-fit group/date z-20">
                  <svg className="w-3.5 h-3.5 group-hover/date:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <DatePicker selected={new Date(project.dueDate)} onChange={(date) => handleDateChange(project.id, date)} dateFormat="'Due' MMM d, yyyy" renderCustomHeader={(props) => <CustomCalendarHeader {...props} />} popperPlacement="bottom-start" className="bg-transparent outline-none cursor-pointer text-slate-400 group-hover/date:text-indigo-500 w-[120px] transition-colors" portalId="root" />
                </div>
              </div>
              
              <div className="col-span-2">
                <span className="text-[12px] font-extrabold text-slate-500 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{project.client}</span>
              </div>

              <div className="col-span-3 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {project.team.map(userId => {
                    const user = users.find(u => u.id === userId);
                    return <div key={user?.id || Math.random()} title={user?.name} className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white ${user?.color || 'bg-slate-300'}`}>{user?.avatar}</div>;
                  })}
                </div>
                <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-500 group-hover:border-indigo-100 transition-colors">
                  <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  {project.completedPoints}/{project.totalPoints} pts
                </div>
              </div>
              
              <div className="col-span-3 flex items-center gap-3 pr-4">
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-1000 ${project.progress === 100 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.5)]'}`} style={{ width: `${project.progress}%` }}></div>
                </div>
                <span className={`text-[12px] font-black w-8 text-right ${project.progress === 100 ? 'text-emerald-500' : 'text-slate-500'}`}>{project.progress}%</span>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/20 backdrop-blur-sm animate-[fadeInUp_0.2s_ease-out]">
          <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-8 w-full max-w-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white animate-[popIn_0.3s_ease-out]">
            <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">{isEditing ? 'Edit Workspace' : 'Create Workspace'}</h2>
            
            <form onSubmit={handleSubmitProject} className="space-y-5">
              <div>
                <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Workspace Name</label>
                <input type="text" required autoFocus value={newProjectData.name} onChange={(e) => setNewProjectData({...newProjectData, name: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50/50 rounded-2xl border border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-slate-700 text-[14px]" placeholder="e.g. Mobile App Redesign" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Linked Client</label>
                  {/* 💥 THE NEW DYNAMIC CLIENT DROPDOWN 💥 */}
                  <ClientDropdown 
                    currentClient={newProjectData.client} 
                    onClientChange={(val) => setNewProjectData({...newProjectData, client: val})} 
                    clientsList={crmClients} 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Type</label>
                  <ProjectTypeDropdown currentType={newProjectData.type} onTypeChange={(val) => setNewProjectData({...newProjectData, type: val})} />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-[14px] font-bold text-slate-500 hover:bg-slate-100 rounded-2xl transition-colors">Cancel</button>
                <button type="submit" disabled={!newProjectData.client} className="px-6 py-3 text-[14px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed hover:shadow-[0_8px_20px_rgba(79,70,229,0.3)] hover:-translate-y-0.5 rounded-2xl transition-all">
                  {isEditing ? 'Save Changes' : 'Launch'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}