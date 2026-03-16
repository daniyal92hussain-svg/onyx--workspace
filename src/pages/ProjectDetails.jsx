import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
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
      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} type="button" className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors disabled:opacity-30"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg></button>
      <div className="flex gap-2">
        <div className="relative">
          <button onClick={() => { setMonthOpen(!monthOpen); setYearOpen(false); }} type="button" className="px-3 py-1.5 text-[13px] font-extrabold text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 transition-colors">{months[date.getMonth()]}<svg className={`w-3.5 h-3.5 text-slate-400 transition-transform ${monthOpen ? 'rotate-180 text-indigo-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg></button>
          {monthOpen && (<><div className="fixed inset-0 z-[999]" onClick={() => setMonthOpen(false)}></div><div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-32 bg-white border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] rounded-xl p-1.5 z-[1000] h-48 overflow-y-auto animate-[popIn_0.15s_ease-out] custom-scrollbar">{months.map((m, i) => (<div key={m} onClick={() => { changeMonth(i); setMonthOpen(false); }} className={`px-3 py-2 text-[12px] font-bold rounded-lg cursor-pointer transition-colors ${date.getMonth() === i ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-slate-50 text-slate-600'}`}>{m}</div>))}</div></>)}
        </div>
        <div className="relative">
          <button onClick={() => { setYearOpen(!yearOpen); setMonthOpen(false); }} type="button" className="px-3 py-1.5 text-[13px] font-extrabold text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 transition-colors">{date.getFullYear()}<svg className={`w-3.5 h-3.5 text-slate-400 transition-transform ${yearOpen ? 'rotate-180 text-indigo-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg></button>
          {yearOpen && (<><div className="fixed inset-0 z-[999]" onClick={() => setYearOpen(false)}></div><div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-24 bg-white border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] rounded-xl p-1.5 z-[1000] h-48 overflow-y-auto animate-[popIn_0.15s_ease-out] custom-scrollbar">{years.map((y) => (<div key={y} onClick={() => { changeYear(y); setYearOpen(false); }} className={`px-3 py-2 text-[12px] font-bold rounded-lg cursor-pointer transition-colors ${date.getFullYear() === y ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-slate-50 text-slate-600'}`}>{y}</div>))}</div></>)}
        </div>
      </div>
      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} type="button" className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors disabled:opacity-30"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg></button>
    </div>
  );
};

const TaskStatusDropdown = ({ currentStatus, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const statuses = ['To Do', 'In Progress', 'Completed'];
  const theme = { 'To Do': 'bg-slate-100 text-slate-600 border-slate-200/60 hover:bg-slate-200/80', 'In Progress': 'bg-indigo-50 text-indigo-600 border-indigo-200/60 hover:bg-indigo-100', 'Completed': 'bg-emerald-50 text-emerald-600 border-emerald-200/60 hover:bg-emerald-100' };

  return (
    <div className="relative">
      <button onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} className={`flex items-center justify-between w-[115px] px-3 py-1.5 text-[11px] font-black uppercase tracking-wider rounded-lg border transition-all duration-300 ${theme[currentStatus]}`}><span className="truncate">{currentStatus}</span><svg className={`w-3.5 h-3.5 ml-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg></button>
      {isOpen && (
        <><div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}></div><div className="absolute right-0 z-50 mt-2 w-44 bg-white/95 backdrop-blur-xl border border-slate-100/80 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden animate-[popIn_0.2s_ease-out] origin-top-right p-1.5">{statuses.map(status => (<div key={status} onClick={(e) => { e.stopPropagation(); onStatusChange(status); setIsOpen(false); }} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-[12px] font-bold cursor-pointer transition-all duration-200 ${currentStatus === status ? 'bg-indigo-50/80 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}><div className={`w-4 h-4 rounded-md flex items-center justify-center transition-colors ${currentStatus === status ? 'bg-indigo-500 text-white' : 'bg-transparent'}`}>{currentStatus === status && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>}</div>{status}</div>))}</div></>
      )}
    </div>
  );
};

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [searchParams] = useSearchParams();
  const targetTaskId = searchParams.get('taskId');
  
  const [currentProject, setCurrentProject] = useState(() => {
    const savedProjects = localStorage.getItem('Onyx_projects');
    if (savedProjects) { const parsed = JSON.parse(savedProjects); const found = parsed.find(p => p.id === parseInt(id)); if (found) return found; }
    return projectsData.find(p => p.id === parseInt(id)) || projectsData[0];
  });

  useEffect(() => {
    const savedProjects = localStorage.getItem('Onyx_projects');
    let foundProject = null;
    if (savedProjects) { const parsed = JSON.parse(savedProjects); foundProject = parsed.find(p => p.id === parseInt(id)); }
    if (!foundProject) { foundProject = projectsData.find(p => p.id === parseInt(id)) || projectsData[0]; }
    setCurrentProject(foundProject);
  }, [id]);

  // 💥 THE FIX: Bulletproof Task Loader 💥
  const [tasks, setTasks] = useState(() => {
    // Check specific project tasks first
    const savedProjectTasks = localStorage.getItem(`Onyx_tasks_${id}`);
    if (savedProjectTasks) {
      return JSON.parse(savedProjectTasks).map(t => ({ ...t, subtasks: t.subtasks || [] }));
    }
    
    // Check global tasks fallback
    const savedGlobalTasks = localStorage.getItem('Onyx_global_tasks');
    if (savedGlobalTasks) {
      const parsedGlobal = JSON.parse(savedGlobalTasks);
      const filtered = parsedGlobal.filter(t => t.projectId === parseInt(id));
      if (filtered.length > 0) {
        return filtered.map(t => ({ ...t, subtasks: t.subtasks || [] }));
      }
    }

    // Default Fallback
    return [
      { id: 101, title: 'Welcome to this Project', assignee: 'u1', status: 'To Do', description: 'Start adding your tasks here.', subtasks: [] }
    ];
  });

  const [comments, setComments] = useState(() => {
    const savedComments = localStorage.getItem(`Onyx_comments_${id}`);
    if (savedComments) return JSON.parse(savedComments);
    return [{ id: 1, userId: 'u2', text: 'Started working on this project.', time: '2h ago' }];
  });

  useEffect(() => { localStorage.setItem(`Onyx_tasks_${id}`, JSON.stringify(tasks)); }, [tasks, id]);
  useEffect(() => { localStorage.setItem(`Onyx_comments_${id}`, JSON.stringify(comments)); }, [comments, id]);

  const [newTask, setNewTask] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newSubtasks, setNewSubtasks] = useState({});
  
  const [expandedTasks, setExpandedTasks] = useState(() => {
    if (targetTaskId) return [parseInt(targetTaskId)];
    return tasks.length > 0 ? [tasks[0].id] : [];
  });

  const [editingDescId, setEditingDescId] = useState(null);
  const [descEditValue, setDescEditValue] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskTitleValue, setEditTaskTitleValue] = useState('');

  const projectProgress = useMemo(() => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.status === 'Completed').length;
    return Math.round((completed / tasks.length) * 100);
  }, [tasks]);

  const handleAddTask = (e) => { e.preventDefault(); if (!newTask.trim()) return; setTasks([{ id: Date.now(), projectId: parseInt(id), title: newTask, assignee: 'u1', status: 'To Do', description: 'Click to add description...', subtasks: [], priority: 'Medium', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }, ...tasks]); setNewTask(''); };
  const deleteTask = (taskId) => { setTasks(tasks.filter(t => t.id !== taskId)); };
  const startEditingTaskTitle = (task, e) => { e.stopPropagation(); setEditingTaskId(task.id); setEditTaskTitleValue(task.title); };
  const saveTaskTitle = (taskId, e) => { e?.preventDefault(); e?.stopPropagation(); if (editTaskTitleValue.trim()) { setTasks(tasks.map(t => t.id === taskId ? { ...t, title: editTaskTitleValue } : t)); } setEditingTaskId(null); };
  
  // 💥 THE FIX: Bulletproof Status Updater 💥
  const updateTaskStatus = (taskId, newStatus) => { setTasks(tasks.map(t => { if (t.id === taskId) { const updatedSubtasks = newStatus === 'Completed' ? (t.subtasks || []).map(sub => ({ ...sub, completed: true })) : (t.subtasks || []); return { ...t, status: newStatus, subtasks: updatedSubtasks }; } return t; })); };
  
  const handleProjectDateChange = (date) => { if(!date) return; const dateString = date.toISOString().split('T')[0]; const updatedProject = {...currentProject, dueDate: dateString}; setCurrentProject(updatedProject); const savedProjects = localStorage.getItem('Onyx_projects'); if (savedProjects) { let parsed = JSON.parse(savedProjects); parsed = parsed.map(p => p.id === updatedProject.id ? updatedProject : p); localStorage.setItem('Onyx_projects', JSON.stringify(parsed)); } };
  const toggleExpand = (taskId) => setExpandedTasks(prev => prev.includes(taskId) ? prev.filter(tId => tId !== taskId) : [...prev, taskId]);
  const startEditingDesc = (task, e) => { e.stopPropagation(); setEditingDescId(task.id); setDescEditValue(task.description); };
  const saveDescription = (taskId) => { setTasks(tasks.map(t => t.id === taskId ? { ...t, description: descEditValue || 'No description provided.' } : t)); setEditingDescId(null); };
  
  // 💥 THE FIX: Bulletproof Subtask Toggler 💥
  const toggleSubtask = (taskId, subtaskId) => { setTasks(tasks.map(t => { if (t.id === taskId) { const currentSubtasks = t.subtasks || []; const updatedSubtasks = currentSubtasks.map(s => s.id === subtaskId ? { ...s, completed: !s.completed } : s); const allCompleted = updatedSubtasks.length > 0 && updatedSubtasks.every(s => s.completed); let newStatus = t.status; if (allCompleted) newStatus = 'Completed'; else if (t.status === 'Completed' && !allCompleted) newStatus = 'In Progress'; return { ...t, subtasks: updatedSubtasks, status: newStatus }; } return t; })); };
  
  // 💥 THE FIX: Bulletproof Subtask Adder 💥
  const handleAddSubtask = (taskId, e) => { e.preventDefault(); const subtaskText = newSubtasks[taskId]; if (!subtaskText || !subtaskText.trim()) return; setTasks(tasks.map(t => t.id === taskId ? { ...t, subtasks: [...(t.subtasks || []), { id: Date.now(), text: subtaskText, completed: false }] } : t)); setNewSubtasks({ ...newSubtasks, [taskId]: '' }); };
  const deleteSubtask = (taskId, subtaskId) => { setTasks(tasks.map(t => t.id === taskId ? { ...t, subtasks: (t.subtasks || []).filter(s => s.id !== subtaskId) } : t)); };
  
  const handleAddComment = (e) => { e.preventDefault(); if (!newComment.trim()) return; setComments([...comments, { id: Date.now(), userId: 'u1', text: newComment, time: 'Just now' }]); setNewComment(''); };

  if (!currentProject) return null; // Safe guard

  return (
    <div className="min-h-[90vh] -m-6 p-8 bg-slate-100 animate-[fadeInUp_0.4s_ease-out_forwards] flex flex-col">
      <button onClick={() => navigate('/projects')} className="flex items-center gap-2 text-[13px] font-extrabold text-slate-400 hover:text-indigo-600 transition-colors mb-6 group w-fit">
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg> Back to Workspace
      </button>

      <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 mb-8 flex justify-between items-center relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg border ${currentProject.type === 'Epic' ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>{currentProject.type}</span>
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>{currentProject.id?.toString().padStart(4, '0')}</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{currentProject.name}</h1>
          <div className="flex items-center gap-2 mt-1.5 group/date cursor-pointer w-fit">
            <span className="text-[14px] text-slate-500 font-semibold">Due:</span>
            <div className="relative flex items-center">
              <DatePicker selected={new Date(currentProject.dueDate)} onChange={handleProjectDateChange} dateFormat="MMM d, yyyy" renderCustomHeader={(props) => <CustomCalendarHeader {...props} />} popperPlacement="bottom-start" className="bg-transparent text-slate-700 text-[14px] font-bold cursor-pointer hover:text-indigo-600 outline-none w-[100px] transition-colors" portalId="root" />
              <svg className="w-4 h-4 text-slate-400 group-hover/date:text-indigo-500 transition-colors absolute right-[-5px] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
        <div className="w-64 flex flex-col items-end">
          <div className="flex justify-between items-center mb-2 w-full"><span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Project Health</span><span className={`text-[14px] font-black ${projectProgress === 100 ? 'text-emerald-500' : 'text-indigo-600'}`}>{projectProgress}%</span></div>
          <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all duration-700 ${projectProgress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} style={{ width: `${projectProgress}%` }}></div></div>
        </div>
      </div>

      <div className="flex-1 flex gap-6 items-start h-[calc(100vh-250px)]">
        <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden h-full">
          <div className="sticky top-0 bg-white z-20 p-6 border-b border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.01)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[16px] font-black text-slate-800">Tasks</h2>
              <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-lg text-[12px] font-bold">{tasks.length} Total</span>
            </div>
            <form onSubmit={handleAddTask} className="relative mb-0 group">
              <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="What needs to be done?" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-5 pr-16 text-[14px] font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400" />
              <button type="submit" className="absolute right-2.5 top-2.5 bottom-2.5 bg-indigo-600 hover:bg-indigo-700 text-white p-2 px-3 rounded-xl transition-all shadow-md shadow-indigo-100 active:scale-95 group-focus-within:bg-indigo-700"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg></button>
            </form>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
            {tasks.map((task, index) => {
              const assignee = users.find(u => u.id === task.assignee);
              const isExpanded = expandedTasks.includes(task.id);
              const isCompleted = task.status === 'Completed';
              const isTargetTask = targetTaskId && parseInt(targetTaskId) === task.id;
              
              // 💥 THE FIX: Safely access subtasks 💥
              const safeSubtasks = task.subtasks || [];

              return (
                <div key={task.id} style={{ zIndex: tasks.length - index }} className={`relative group flex flex-col rounded-2xl border transition-all duration-300 ${isExpanded ? 'border-indigo-100 bg-indigo-50/20' : 'border-slate-100 hover:border-indigo-100 bg-white hover:-translate-y-[1px]'} ${isTargetTask ? 'ring-4 ring-indigo-500/20 shadow-lg' : ''}`}>
                  <div onClick={() => toggleExpand(task.id)} className="flex items-center justify-between p-4 cursor-pointer">
                    <div className="flex items-start gap-4 flex-1">
                      <button onClick={(e) => { e.stopPropagation(); updateTaskStatus(task.id, isCompleted ? 'To Do' : 'Completed'); }} className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${isCompleted ? 'bg-emerald-500 border-emerald-500 shadow-md scale-110' : 'border-slate-300 hover:border-indigo-500'}`}>
                        {isCompleted && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>}
                      </button>
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 group/title">
                          {editingTaskId === task.id ? (
                            <form onSubmit={(e) => saveTaskTitle(task.id, e)} onClick={(e) => e.stopPropagation()} className="flex-1"><input autoFocus value={editTaskTitleValue} onChange={(e) => setEditTaskTitleValue(e.target.value)} onBlur={(e) => saveTaskTitle(task.id, e)} className="w-full text-[14px] font-bold text-slate-800 bg-white border border-indigo-300 rounded px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" /></form>
                          ) : (
                            <><p className={`text-[14px] font-bold transition-colors ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{task.title}</p><button onClick={(e) => startEditingTaskTitle(task, e)} className="opacity-0 group-hover/title:opacity-100 text-slate-300 hover:text-indigo-500 transition-opacity p-1" title="Edit Task Name"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button><svg className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-indigo-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></>
                          )}
                        </div>
                        {/* 💥 THE FIX: Use safeSubtasks 💥 */}
                        {safeSubtasks.length > 0 && <p className="text-[11px] font-bold text-slate-400 mt-1">{safeSubtasks.filter(s=>s.completed).length} / {safeSubtasks.length} subtasks</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all" title="Delete Task"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                      <TaskStatusDropdown currentStatus={task.status} onStatusChange={(newStatus) => updateTaskStatus(task.id, newStatus)} />
                      <div title={assignee?.name} className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black text-white shadow-sm border-2 border-white ${assignee?.color || 'bg-slate-300'}`}>{assignee?.avatar}</div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-12 pb-5 pt-2 border-t border-slate-100 animate-[fadeInUp_0.2s_ease-out]">
                      <div className="mb-5 group/desc relative">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">Description {!editingDescId && <button onClick={(e) => startEditingDesc(task, e)} className="opacity-0 group-hover/desc:opacity-100 text-indigo-500 hover:text-indigo-700 transition-opacity"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>}</h4>
                        {editingDescId === task.id ? (<div className="flex flex-col gap-2"><textarea autoFocus value={descEditValue} onChange={(e) => setDescEditValue(e.target.value)} className="w-full text-[13px] text-slate-600 p-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 min-h-[80px]" /><div className="flex gap-2 justify-end"><button onClick={() => setEditingDescId(null)} className="px-3 py-1.5 text-[11px] font-bold text-slate-500 hover:bg-slate-100 rounded-lg">Cancel</button><button onClick={() => saveDescription(task.id)} className="px-3 py-1.5 text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm">Save</button></div></div>) : <p onClick={(e) => startEditingDesc(task, e)} className="text-[13px] text-slate-600 leading-relaxed cursor-text p-2 -ml-2 rounded-lg hover:bg-slate-50 transition-colors">{task.description}</p>}
                      </div>
                      
                      <div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Checklist</h4>
                        <div className="space-y-2.5">
                          {/* 💥 THE FIX: Use safeSubtasks 💥 */}
                          {safeSubtasks.map((sub) => (
                            <div key={sub.id} className="flex items-center justify-between group/sub">
                              <div className="flex items-center gap-3"><button onClick={() => toggleSubtask(task.id, sub.id)} className={`w-4 h-4 rounded-[5px] border flex items-center justify-center transition-all ${sub.completed ? 'bg-indigo-500 border-indigo-500' : 'border-slate-300 hover:border-indigo-400'}`}>{sub.completed && <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>}</button><span className={`text-[13px] font-semibold transition-colors ${sub.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{sub.text}</span></div>
                              <button onClick={() => deleteSubtask(task.id, sub.id)} className="opacity-0 group-hover/sub:opacity-100 text-slate-300 hover:text-red-500 mr-2 transition-all"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                            </div>
                          ))}
                          <form onSubmit={(e) => handleAddSubtask(task.id, e)} className="flex items-center gap-3 mt-3 pt-2"><div className="w-4 h-4 rounded-[5px] border border-slate-200 flex items-center justify-center bg-slate-50"><svg className="w-2.5 h-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg></div><input type="text" value={newSubtasks[task.id] || ''} onChange={(e) => setNewSubtasks({...newSubtasks, [task.id]: e.target.value})} placeholder="Add a new subtask..." className="bg-transparent text-[13px] font-semibold text-slate-600 placeholder:text-slate-400 focus:outline-none w-full"/></form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="w-96 flex flex-col h-full bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden relative">
          <div className="p-5 border-b border-slate-100 bg-white sticky top-0 z-10 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.01)]"><h2 className="text-[16px] font-black text-slate-800 flex items-center gap-2"><svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>Activity & Comments</h2></div>
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/50 custom-scrollbar">
            {comments.map(comment => {
              const user = users.find(u => u.id === comment.userId);
              return (<div key={comment.id} className="flex gap-3 animate-[fadeInUp_0.3s_ease-out]"><div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-bold text-white shadow-sm mt-1 border-2 border-white ${user?.color || 'bg-slate-300'}`}>{user?.avatar}</div><div><div className="flex items-center gap-2 mb-1"><span className="text-[13px] font-extrabold text-slate-800">{user?.name}</span><span className="text-[10px] font-bold text-slate-400">{comment.time}</span></div><div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.01)] text-[13px] font-medium text-slate-600 leading-relaxed hover:border-indigo-100 transition-colors">{comment.text}</div></div></div>);
            })}
          </div>
          <form onSubmit={handleAddComment} className="p-4 bg-white border-t border-slate-100 sticky bottom-0 z-10">
            <div className="relative group"><input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-4 pr-16 text-[13px] font-semibold text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400" /><button type="submit" className="absolute right-2.5 top-2.5 bottom-2.5 text-white bg-indigo-600 hover:bg-indigo-700 px-3.5 rounded-lg transition-all font-bold text-[12px] shadow-sm">Post</button></div>
          </form>
        </div>
      </div>
    </div>
  );
}