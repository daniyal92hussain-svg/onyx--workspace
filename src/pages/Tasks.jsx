import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../data/Dummydata';

const PriorityDropdown = ({ currentPriority, onPriorityChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const priorities = ['Low', 'Medium', 'High'];

  return (
    <div className="relative w-full">
      <div onClick={() => setIsOpen(!isOpen)} className="w-full px-5 py-3.5 bg-slate-50/50 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all font-bold text-slate-700 text-[14px] cursor-pointer flex justify-between items-center">
        <span className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${currentPriority === 'High' ? 'bg-rose-500' : currentPriority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>{currentPriority} Priority</span>
        <svg className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute left-0 right-0 z-50 mt-2 bg-white/95 backdrop-blur-xl border border-slate-100/80 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden p-1.5 animate-[popIn_0.2s_ease-out]">
            {priorities.map(p => (
              <div key={p} onClick={() => { onPriorityChange(p); setIsOpen(false); }} className={`px-4 py-3 rounded-xl text-[13px] font-bold cursor-pointer transition-all flex items-center gap-2 ${currentPriority === p ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}><div className={`w-2 h-2 rounded-full ${p === 'High' ? 'bg-rose-500' : p === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>{p} Priority</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const AssigneeDropdown = ({ currentAssigneeId, onAssigneeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = users.find(u => u.id === currentAssigneeId) || users[0];

  return (
    <div className="relative w-full">
      <div onClick={() => setIsOpen(!isOpen)} className="w-full px-5 py-3.5 bg-slate-50/50 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all font-bold text-slate-700 text-[14px] cursor-pointer flex justify-between items-center">
        <span className="flex items-center gap-3"><div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white ${currentUser.color}`}>{currentUser.avatar}</div>{currentUser.name}</span>
        <svg className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute left-0 right-0 z-50 mt-2 bg-white/95 backdrop-blur-xl border border-slate-100/80 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden p-1.5 animate-[popIn_0.2s_ease-out]">
            {users.map(u => (
              <div key={u.id} onClick={() => { onAssigneeChange(u.id); setIsOpen(false); }} className={`px-4 py-3 rounded-xl text-[13px] font-bold cursor-pointer transition-all flex items-center gap-3 ${currentAssigneeId === u.id ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}><div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white ${u.color}`}>{u.avatar}</div>{u.name}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default function Tasks() {
  const navigate = useNavigate();
  
  // 💥 THE SYNC MAGIC: Ab yeh direct Project 1 ke storage se data uthayega 💥
  const [tasks, setTasks] = useState(() => {
    const savedProjectTasks = localStorage.getItem('Onyx_tasks_1');
    if (savedProjectTasks) {
      // Add visual fallback properties if they don't exist in Project details yet
      return JSON.parse(savedProjectTasks).map(t => ({
        ...t,
        projectId: 1,
        priority: t.priority || (t.id === 101 ? 'High' : 'Medium'),
        date: t.date || 'Oct 24'
      }));
    }
    return [];
  });

  const [activeColumn, setActiveColumn] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskData, setNewTaskData] = useState({ title: '', description: '', priority: 'Medium', assignee: 'u1' });
  const [openAssigneeId, setOpenAssigneeId] = useState(null);

  // 💥 THE SYNC MAGIC: Jab yahan koi change hoga, tou Project Details aur Dashboard DONO mein save hoga! 💥
  useEffect(() => {
    localStorage.setItem('Onyx_tasks_1', JSON.stringify(tasks));
    localStorage.setItem('Onyx_global_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // 💥 BUG FIXED: Standard HTML5 'text/plain' format added for flawless drag & drop 💥
  const handleDragStart = (e, taskId) => { 
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData('text/plain', taskId.toString()); 
    setTimeout(() => { e.target.style.opacity = '0.4'; }, 0); 
  };
  const handleDragEnd = (e) => { e.target.style.opacity = '1'; setActiveColumn(null); };
  const handleDragOver = (e, status) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; setActiveColumn(status); };
  const handleDragLeave = (e) => { e.preventDefault(); setActiveColumn(null); };
  
  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const draggedTaskId = e.dataTransfer.getData('text/plain');
    if (!draggedTaskId) return;

    setTasks(prevTasks => prevTasks.map(task => {
      if (task.id === parseInt(draggedTaskId)) {
        // 💥 PRO LEVEL: Agar task board pe Completed hua, tou uske andar ke checkmarks (subtasks) bhi auto-tick ho jayenge!
        const updatedSubtasks = newStatus === 'Completed' && task.subtasks 
          ? task.subtasks.map(sub => ({ ...sub, completed: true })) 
          : task.subtasks;

        return { ...task, status: newStatus, subtasks: updatedSubtasks };
      }
      return task;
    }));
    setActiveColumn(null);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskData.title) return;
    const newTask = { 
      id: Date.now(), projectId: 1, title: newTaskData.title, description: newTaskData.description || 'No description provided.', 
      status: 'To Do', assignee: newTaskData.assignee, priority: newTaskData.priority, 
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      subtasks: [] // Ensure subtasks array exists for Details page
    };
    setTasks([newTask, ...tasks]);
    setIsModalOpen(false);
    setNewTaskData({ title: '', description: '', priority: 'Medium', assignee: 'u1' });
  };

  const handleAssignUser = (taskId, userId, e) => { e.stopPropagation(); setTasks(tasks.map(t => t.id === taskId ? { ...t, assignee: userId } : t)); setOpenAssigneeId(null); };

  const columns = ['To Do', 'In Progress', 'Completed'];
  const getPriorityTheme = (priority) => {
    switch(priority) {
      case 'High': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'Medium': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Low': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className="min-h-[90vh] -m-6 p-8 bg-slate-100 animate-[fadeInUp_0.4s_ease-out_forwards] flex flex-col">
      <div className="flex justify-between items-end mb-8 relative z-20">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Global Task Board</h1>
          <p className="text-[14px] text-slate-500 mt-1.5 font-medium">Drag and drop tasks to automatically sync across projects and dashboards.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {users.map(user => (
              <div key={user.id} title={user.name} className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white border-2 border-slate-100 shadow-sm ${user.color}`}>{user.avatar}</div>
            ))}
          </div>
          <button onClick={() => setIsModalOpen(true)} type="button" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all shadow-[0_4px_15px_rgba(79,70,229,0.2)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.3)] hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer z-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg> Add Task
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 h-[calc(100vh-200px)] overflow-x-auto pb-4 custom-scrollbar items-start w-full">
        {columns.map((status, colIndex) => {
          const columnTasks = tasks.filter(task => task.status === status);
          const isHovered = activeColumn === status;

          return (
            <div 
              key={status} 
              onDragOver={(e) => handleDragOver(e, status)} 
              onDragLeave={handleDragLeave} 
              onDrop={(e) => handleDrop(e, status)} 
              style={{ animationDelay: `${colIndex * 0.1}s` }} 
              className={`flex flex-col flex-1 min-w-[300px] bg-slate-200/50 rounded-[1.5rem] border transition-all duration-300 animate-[fadeInUp_0.4s_ease-out_forwards] opacity-0 max-h-full ${isHovered ? 'border-indigo-300 bg-indigo-50/50 shadow-inner scale-[1.01]' : 'border-slate-200/60'}`}
            >
              <div className="px-5 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2.5"><div className={`w-2 h-2 rounded-full ${status === 'To Do' ? 'bg-slate-400' : status === 'In Progress' ? 'bg-indigo-500' : 'bg-emerald-500'}`}></div><h2 className="text-[13px] font-black text-slate-700 uppercase tracking-widest">{status}</h2></div>
                <span className="bg-slate-200 text-slate-600 px-2.5 py-0.5 rounded-lg text-[11px] font-extrabold">{columnTasks.length}</span>
              </div>

              <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-3 custom-scrollbar">
                {columnTasks.length === 0 ? (
                  <div className="h-24 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-300/60 rounded-xl mx-2 bg-transparent"><p className="text-[12px] font-bold">Drop tasks here</p></div>
                ) : (
                  columnTasks.map((task, index) => {
                    const assignee = users.find(u => u.id === task.assignee);
                    return (
                      <div 
                        key={task.id} 
                        draggable 
                        onDragStart={(e) => handleDragStart(e, task.id)} 
                        onDragEnd={handleDragEnd} 
                        style={{ zIndex: columnTasks.length - index }} 
                        className="relative bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-indigo-300 cursor-grab active:cursor-grabbing transition-all group"
                      >
                        <div className="flex justify-between items-start mb-2.5">
                          <span className={`px-2 py-0.5 rounded-md border text-[10px] font-black uppercase tracking-wider ${getPriorityTheme(task.priority)}`}>{task.priority}</span>
                          <button 
                            onClick={(e) => { e.stopPropagation(); navigate(`/projects/${task.projectId || 1}?taskId=${task.id}`); }}
                            className="opacity-0 group-hover:opacity-100 p-1.5 bg-slate-50 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg transition-all"
                            title="Open in Project Details"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </button>
                        </div>

                        <h3 className="text-[14px] font-extrabold text-slate-800 mb-1.5 leading-snug group-hover:text-indigo-600 transition-colors pr-6">{task.title}</h3>
                        <p className="text-[12px] font-medium text-slate-500 line-clamp-2 leading-relaxed mb-4">{task.description}</p>
                        
                        <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-auto">
                          <div className="flex items-center gap-1.5 text-slate-400"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg><span className="text-[11px] font-bold tracking-wide">{task.date}</span></div>
                          <div className="relative">
                            <div onClick={() => setOpenAssigneeId(openAssigneeId === task.id ? null : task.id)} title={assignee?.name || 'Assign User'} className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm ring-2 ring-white cursor-pointer hover:scale-110 transition-transform ${assignee?.color || 'bg-slate-100 border border-slate-300 border-dashed text-slate-400'}`}>{assignee?.avatar || '+'}</div>
                            {openAssigneeId === task.id && (
                              <>
                                <div className="fixed inset-0 z-40" onClick={() => setOpenAssigneeId(null)}></div>
                                <div className="absolute bottom-full right-0 mb-2 w-48 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden z-[1000] p-2 animate-[popIn_0.2s_ease-out]">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-2 pt-1">Assign To</p>
                                  {users.map(u => (
                                    <div key={u.id} onClick={(e) => handleAssignUser(task.id, u.id, e)} className={`flex items-center gap-3 px-2 py-2 rounded-xl text-[12px] font-bold cursor-pointer transition-colors ${task.assignee === u.id ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-700'}`}><div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] text-white ${u.color}`}>{u.avatar}</div>{u.name}{task.assignee === u.id && <svg className="w-3.5 h-3.5 ml-auto text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>}</div>
                                  ))}
                                  <div onClick={(e) => handleAssignUser(task.id, null, e)} className="flex items-center gap-3 px-2 py-2 rounded-xl text-[12px] font-bold cursor-pointer transition-colors hover:bg-rose-50 text-rose-600 mt-1 border-t border-slate-100"><div className="w-5 h-5 rounded-full flex items-center justify-center bg-rose-100"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg></div>Unassign</div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-900/30 backdrop-blur-sm custom-scrollbar">
          <div className="min-h-screen px-4 py-10 flex items-center justify-center">
            <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl border border-white animate-[popIn_0.3s_ease-out] relative">
              <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Create Global Task</h2>
              <form onSubmit={handleAddTask} className="space-y-5">
                <div><label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Task Title</label><input type="text" required autoFocus value={newTaskData.title} onChange={(e) => setNewTaskData({...newTaskData, title: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50/50 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-slate-800 text-[14px]" placeholder="e.g. Update Hero Section" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Priority</label><PriorityDropdown currentPriority={newTaskData.priority} onPriorityChange={(val) => setNewTaskData({...newTaskData, priority: val})} /></div>
                  <div><label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Assignee</label><AssigneeDropdown currentAssigneeId={newTaskData.assignee} onAssigneeChange={(val) => setNewTaskData({...newTaskData, assignee: val})} /></div>
                </div>
                <div><label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Description</label><textarea value={newTaskData.description} onChange={(e) => setNewTaskData({...newTaskData, description: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50/50 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-600 text-[13px] min-h-[80px]" placeholder="Add details..." /></div>
                <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-[14px] font-bold text-slate-500 hover:bg-slate-100 rounded-2xl transition-colors">Cancel</button>
                  <button type="submit" className="px-6 py-3 text-[14px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5 shadow-md rounded-2xl transition-all">Add Task</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}