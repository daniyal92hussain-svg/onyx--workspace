import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 🌟 FUNCTIONAL STATUS DROPDOWN 🌟
const ClientStatusDropdown = ({ currentStatus, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const statuses = ['Active', 'Inactive', 'Lead'];

  const getTheme = (status) => {
    switch(status) {
      case 'Active': return 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100';
      case 'Inactive': return 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100';
      case 'Lead': return 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-200';
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${getTheme(currentStatus)} cursor-pointer`}>
        <div className={`w-1.5 h-1.5 rounded-full ${currentStatus === 'Active' ? 'bg-emerald-500' : currentStatus === 'Lead' ? 'bg-blue-500' : 'bg-slate-400'}`}></div>
        {currentStatus}
        <svg className={`w-3.5 h-3.5 ml-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[110]" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 z-[120] mt-2 w-36 bg-white border border-slate-100 rounded-xl shadow-lg overflow-hidden p-1.5 animate-[popIn_0.2s_ease-out]">
            {statuses.map(s => (
              <div key={s} onClick={() => { onStatusChange(s); setIsOpen(false); }} className={`px-3 py-2 rounded-lg text-[12px] font-bold cursor-pointer transition-colors ${currentStatus === s ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-600'}`}>
                {s}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// 💥 THE NEW CUSTOM PROJECT FILTER DROPDOWN (NATIVE KILLER) 💥
const ProjectFilterDropdown = ({ currentFilter, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const filters = ['Active', 'Completed', 'All'];

  const getDisplayText = (filter) => {
    if (filter === 'All') return 'All Projects';
    return `${filter} Projects`;
  };

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-white border border-slate-200 text-slate-600 text-[11px] font-bold px-3 py-1.5 rounded-lg outline-none cursor-pointer flex items-center gap-2 hover:bg-slate-50 hover:border-indigo-200 transition-all shadow-sm"
      >
        {getDisplayText(currentFilter)}
        <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-500' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[110]" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 z-[120] mt-2 w-36 bg-white/95 backdrop-blur-xl border border-slate-100/80 rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] overflow-hidden p-1.5 animate-[popIn_0.2s_ease-out] origin-top-right">
            {filters.map(f => (
              <div 
                key={f} 
                onClick={() => { onFilterChange(f); setIsOpen(false); }} 
                className={`px-3 py-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${currentFilter === f ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}
              >
                {getDisplayText(f)}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default function Clients() {
  const navigate = useNavigate();
  
  const [clients, setClients] = useState(() => {
    const savedClients = localStorage.getItem('Onyx_clients');
    if (savedClients) return JSON.parse(savedClients);
    return [
      { id: 1, company: 'Tech Corp', contact: 'Sarah Miller', email: 'sarah@techcorp.com', phone: '+1 (555) 123-4567', status: 'Active', joined: 'Oct 15, 2026', history: [{ id: 101, type: 'note', text: 'Had a kickoff sync. Requirements are finalized.', date: 'Oct 16, 2026' }, { id: 102, type: 'system', text: 'Client profile created.', date: 'Oct 15, 2026' }] },
      { id: 2, company: 'Startup Inc', contact: 'Michael Chang', email: 'michael@startup.io', phone: '+1 (555) 987-6543', status: 'Lead', joined: 'Oct 20, 2026', history: [{ id: 201, type: 'system', text: 'Client profile created.', date: 'Oct 20, 2026' }] },
      { id: 3, company: 'Local Biz', contact: 'Tony Stark', email: 'tony@localbiz.com', phone: '+1 (555) 555-0000', status: 'Active', joined: 'Sep 01, 2026', history: [{ id: 301, type: 'system', text: 'Client profile created.', date: 'Sep 01, 2026' }] },
    ];
  });

  const allProjects = JSON.parse(localStorage.getItem('Onyx_projects')) || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({ company: '', contact: '', email: '', phone: '', status: 'Active' });
  
  const [viewClient, setViewClient] = useState(null);
  const [drawerTab, setDrawerTab] = useState('overview');
  const [isEditingClient, setIsEditingClient] = useState(false);
  const [editClientData, setEditClientData] = useState(null);
  const [newActivityText, setNewActivityText] = useState('');
  
  const [projectFilter, setProjectFilter] = useState('Active'); // Active, Completed, All

  useEffect(() => {
    localStorage.setItem('Onyx_clients', JSON.stringify(clients));
  }, [clients]);

  const filteredClients = clients.filter(c => c.company.toLowerCase().includes(searchQuery.toLowerCase()) || c.contact.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAddClient = (e) => {
    e.preventDefault();
    if (!newClient.company || !newClient.contact) return;
    const initialHistory = [{ id: Date.now(), type: 'system', text: `Client profile created by Daniyal.`, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }];
    const clientData = { id: Date.now(), company: newClient.company, contact: newClient.contact, email: newClient.email || 'N/A', phone: newClient.phone || 'N/A', status: newClient.status, joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), history: initialHistory };
    setClients([clientData, ...clients]);
    setIsModalOpen(false);
    setNewClient({ company: '', contact: '', email: '', phone: '', status: 'Active' });
  };

  const deleteClient = (id, e) => {
    e.stopPropagation();
    setClients(clients.filter(c => c.id !== id));
  };

  const updateClientStatus = (id, newStatus) => {
    setClients(clients.map(c => {
      if (c.id === id) {
        const statusLog = { id: Date.now(), type: 'status', text: `Status updated to ${newStatus}`, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };
        const updatedHistory = [statusLog, ...(c.history || [])];
        const updatedClient = { ...c, status: newStatus, history: updatedHistory };
        if (viewClient && viewClient.id === id) setViewClient(updatedClient);
        return updatedClient;
      }
      return c;
    }));
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!newActivityText.trim()) return;
    const newLog = { id: Date.now(), type: 'note', text: newActivityText, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };
    setClients(clients.map(c => {
      if (c.id === viewClient.id) {
        const updatedClient = { ...c, history: [newLog, ...(c.history || [])] };
        setViewClient(updatedClient);
        return updatedClient;
      }
      return c;
    }));
    setNewActivityText('');
  };

  const handleDeleteActivity = (clientId, logId) => {
    setClients(clients.map(c => {
      if (c.id === clientId) {
        const updatedHistory = c.history.filter(log => log.id !== logId);
        const updatedClient = { ...c, history: updatedHistory };
        if (viewClient && viewClient.id === clientId) setViewClient(updatedClient);
        return updatedClient;
      }
      return c;
    }));
  };

  const openDrawer = (client) => {
    setViewClient(client);
    setEditClientData(client);
    setIsEditingClient(false);
    setDrawerTab('overview');
    setNewActivityText('');
    setProjectFilter('Active');
  };

  const handleSaveEdits = () => {
    setClients(clients.map(c => c.id === editClientData.id ? editClientData : c));
    setViewClient(editClientData);
    setIsEditingClient(false);
  };

  const getAvatarColor = (name) => {
    const colors = ['from-indigo-500 to-purple-500', 'from-emerald-400 to-teal-500', 'from-rose-400 to-red-500', 'from-amber-400 to-orange-500', 'from-blue-400 to-cyan-500'];
    return colors[name.length % colors.length];
  };

  const allClientProjects = viewClient ? allProjects.filter(p => p.client.toLowerCase() === viewClient.company.toLowerCase()) : [];
  const displayedProjects = allClientProjects.filter(p => {
    if (projectFilter === 'Active') return p.progress < 100;
    if (projectFilter === 'Completed') return p.progress === 100;
    return true; 
  });

  return (
    <div className="min-h-[90vh] -m-6 p-8 bg-slate-100 animate-[fadeInUp_0.4s_ease-out_forwards]">
      
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 relative z-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Clients Directory</h1>
          <p className="text-[14px] text-slate-500 mt-1.5 font-medium">Manage your client relationships, contacts, and active projects.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search clients..." className="w-64 bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-[13px] font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm" />
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all shadow-[0_4px_15px_rgba(79,70,229,0.2)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.3)] hover:-translate-y-0.5 flex items-center gap-2 shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg> Add Client
          </button>
        </div>
      </div>

      {/* CLIENTS GRID */}
      {filteredClients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm border-dashed">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4"><svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg></div>
          <h3 className="text-[16px] font-black text-slate-700">No clients found</h3><p className="text-[13px] text-slate-400 mt-1">Try adjusting your search or add a new client.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClients.map((client, index) => {
            const connectedProjects = allProjects.filter(p => p.client.toLowerCase() === client.company.toLowerCase()).length;
            
            return (
              <div key={client.id} style={{ animationDelay: `${index * 0.1}s` }} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-indigo-200 transition-all duration-300 animate-[fadeInUp_0.4s_ease-out_forwards] opacity-0 group">
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-[18px] shadow-md bg-gradient-to-br ${getAvatarColor(client.company)}`}>{client.company.charAt(0)}</div>
                    <div>
                      <h3 className="text-[16px] font-black text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">{client.company}</h3>
                      <p className="text-[12px] font-bold text-slate-400 mt-0.5">{client.contact}</p>
                    </div>
                  </div>
                  <button onClick={(e) => deleteClient(client.id, e)} className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all" title="Delete Client"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-[13px] font-medium text-slate-600"><div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>{client.email}</div>
                  <div className="flex items-center gap-3 text-[13px] font-medium text-slate-600"><div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></div>{client.phone}</div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Projects</p><p className="text-[14px] font-black text-slate-700">{connectedProjects}</p></div>
                    <div className="w-px h-6 bg-slate-200"></div>
                    <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Status</p>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${client.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : client.status === 'Lead' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>{client.status}</span>
                    </div>
                  </div>
                  <button onClick={() => openDrawer(client)} className="px-4 py-2 bg-slate-50 hover:bg-indigo-600 text-slate-600 hover:text-white text-[12px] font-bold rounded-xl transition-all shadow-sm">
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 🌟 PREMIUM SLIDE-OVER DRAWER 🌟 */}
      {viewClient && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={() => setViewClient(null)}></div>
          
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-[slideInRight_0.3s_ease-out]">
            
            <div className="p-8 pb-6 border-b border-slate-100 relative">
              <button onClick={() => setViewClient(null)} className="absolute top-6 right-6 p-2 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-full transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg></button>
              
              <div className="flex items-center gap-5 mb-6">
                <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center text-white font-black text-[24px] shadow-lg bg-gradient-to-br ${getAvatarColor(viewClient.company)}`}>{viewClient.company.charAt(0)}</div>
                <div><h2 className="text-2xl font-black text-slate-900 tracking-tight">{viewClient.company}</h2><p className="text-[14px] font-bold text-slate-500">{viewClient.contact}</p></div>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="flex-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Status</p>
                  <ClientStatusDropdown currentStatus={viewClient.status} onStatusChange={(newStatus) => updateClientStatus(viewClient.id, newStatus)} />
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <div className="flex-1"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Client Since</p><p className="text-[13px] font-bold text-slate-700">{viewClient.joined || 'Recent'}</p></div>
              </div>
            </div>

            <div className="flex gap-6 px-8 border-b border-slate-100">
              <button onClick={() => setDrawerTab('overview')} className={`pb-4 text-[13px] font-bold border-b-2 transition-colors ${drawerTab === 'overview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>Overview & Details</button>
              <button onClick={() => setDrawerTab('history')} className={`pb-4 text-[13px] font-bold border-b-2 transition-colors ${drawerTab === 'history' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>Activity History</button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-50/50">
              
              {drawerTab === 'overview' && (
                <div className="space-y-8 animate-[fadeInUp_0.3s_ease-out]">
                  
                  {/* CLIENT DETAILS */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Client Details</h4>
                      {!isEditingClient ? (
                        <button onClick={() => setIsEditingClient(true)} className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors shadow-sm"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg> Edit</button>
                      ) : (
                        <div className="flex gap-2">
                          <button onClick={() => { setIsEditingClient(false); setEditClientData(viewClient); }} className="text-[11px] font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors">Cancel</button>
                          <button onClick={handleSaveEdits} className="text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg transition-colors shadow-md">Save Changes</button>
                        </div>
                      )}
                    </div>

                    {isEditingClient ? (
                      <div className="bg-white p-5 rounded-2xl border border-indigo-200 shadow-[0_0_15px_rgba(79,70,229,0.1)] space-y-4 animate-[popIn_0.2s_ease-out]">
                        <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 block">Company Name</label><input type="text" value={editClientData.company} onChange={e => setEditClientData({...editClientData, company: e.target.value})} className="w-full text-[13px] font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" /></div>
                        <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 block">Contact Person</label><input type="text" value={editClientData.contact} onChange={e => setEditClientData({...editClientData, contact: e.target.value})} className="w-full text-[13px] font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" /></div>
                        <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 block">Email Address</label><input type="email" value={editClientData.email} onChange={e => setEditClientData({...editClientData, email: e.target.value})} className="w-full text-[13px] font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" /></div>
                        <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 block">Phone Number</label><input type="text" value={editClientData.phone} onChange={e => setEditClientData({...editClientData, phone: e.target.value})} className="w-full text-[13px] font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" /></div>
                      </div>
                    ) : (
                      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
                        <div className="flex items-center gap-4"><div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div><div><p className="text-[11px] font-bold text-slate-400">Email Address</p><p className="text-[14px] font-bold text-slate-700">{viewClient.email}</p></div></div>
                        <div className="w-full h-px bg-slate-50"></div>
                        <div className="flex items-center gap-4"><div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></div><div><p className="text-[11px] font-bold text-slate-400">Phone Number</p><p className="text-[14px] font-bold text-slate-700">{viewClient.phone}</p></div></div>
                      </div>
                    )}
                  </div>

                  {/* 💥 THE FIXED CUSTOM PROJECTS FILTER DROPDOWN 💥 */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        Projects <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-md text-[10px]">{allClientProjects.length}</span>
                      </h4>
                      {allClientProjects.length > 0 && (
                        <ProjectFilterDropdown currentFilter={projectFilter} onFilterChange={setProjectFilter} />
                      )}
                    </div>

                    {displayedProjects.length === 0 ? (
                      <div className="bg-white p-8 rounded-2xl border border-slate-200 border-dashed text-center flex flex-col items-center justify-center shadow-sm">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                          <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        </div>
                        <p className="text-[13px] font-bold text-slate-500 mb-4">
                          {allClientProjects.length === 0 ? "No projects connected to this client." : `No ${projectFilter.toLowerCase()} projects found.`}
                        </p>
                        <button onClick={() => { setViewClient(null); navigate('/projects'); }} className="text-[12px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-all border border-indigo-100">
                          + Create New Project
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {displayedProjects.map(proj => (
                          <div key={proj.id} onClick={() => navigate(`/projects/${proj.id}`)} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 cursor-pointer transition-colors group relative overflow-hidden">
                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${proj.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}></div>
                            <div className="flex justify-between items-center mb-2 pl-2">
                              <span className="text-[14px] font-extrabold text-slate-800 group-hover:text-indigo-600">{proj.name}</span>
                              <span className={`text-[11px] font-black ${proj.progress === 100 ? 'text-emerald-500' : 'text-indigo-500'}`}>{proj.progress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2 ml-2 w-[calc(100%-8px)]">
                              <div className={`h-full rounded-full ${proj.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} style={{ width: `${proj.progress}%` }}></div>
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-2 mt-2">Due: {proj.dueDate}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ACTIVITY HISTORY TIMELINE */}
              {drawerTab === 'history' && (
                <div className="animate-[fadeInUp_0.3s_ease-out] flex flex-col h-full">
                  <form onSubmit={handleAddActivity} className="mb-8 relative z-20">
                    <textarea value={newActivityText} onChange={(e) => setNewActivityText(e.target.value)} placeholder="Log a meeting, call, or note..." className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-[13px] font-medium text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm min-h-[100px] resize-none" />
                    <div className="absolute bottom-3 right-3">
                      <button type="submit" disabled={!newActivityText.trim()} className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl text-[12px] font-bold transition-all shadow-sm">Log Activity</button>
                    </div>
                  </form>

                  <div className="relative pl-4 flex-1">
                    <div className="absolute left-6 top-2 bottom-0 w-0.5 bg-slate-200"></div>
                    <div className="space-y-6 relative pb-10">
                      {viewClient.history && viewClient.history.length > 0 ? (
                        viewClient.history.map((log) => (
                          <div key={log.id} className="flex gap-4 relative z-10 animate-[fadeInUp_0.3s_ease-out] group">
                            <div className={`w-5 h-5 rounded-full border-4 border-[#f8fafc] mt-1 shrink-0 ${log.type === 'status' ? 'bg-emerald-500' : log.type === 'note' ? 'bg-indigo-500' : 'bg-slate-400'}`}></div>
                            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex-1 hover:shadow-md transition-shadow relative pr-10">
                              <button onClick={() => handleDeleteActivity(viewClient.id, log.id)} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all" title="Delete Log"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                              <p className={`text-[13px] ${log.type === 'note' ? 'font-medium text-slate-600' : 'font-bold text-slate-700'}`}>{log.text}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{log.date}</p>
                                {log.type === 'note' && <span className="bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">Note</span>}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-[13px] font-bold text-slate-400 pl-8 pt-4">No history recorded yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ADD CLIENT MODAL */}
      {isModalOpen && (
         <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-900/30 backdrop-blur-sm custom-scrollbar">
         <div className="min-h-screen px-4 py-10 flex items-center justify-center">
           <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl border border-white animate-[popIn_0.3s_ease-out] relative">
             <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Add New Client</h2>
             <form onSubmit={handleAddClient} className="space-y-5">
               <div><label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Company Name</label><input type="text" required autoFocus value={newClient.company} onChange={(e) => setNewClient({...newClient, company: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50/50 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-slate-800 text-[14px]" placeholder="e.g. Stark Industries" /></div>
               <div><label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Contact Person</label><input type="text" required value={newClient.contact} onChange={(e) => setNewClient({...newClient, contact: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50/50 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-slate-800 text-[14px]" placeholder="e.g. Tony Stark" /></div>
               <div className="grid grid-cols-2 gap-4">
                 <div><label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Email</label><input type="email" value={newClient.email} onChange={(e) => setNewClient({...newClient, email: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50/50 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-700 text-[13px]" placeholder="email@company.com" /></div>
                 <div><label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Phone</label><input type="text" value={newClient.phone} onChange={(e) => setNewClient({...newClient, phone: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50/50 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-700 text-[13px]" placeholder="+1 234 567" /></div>
               </div>
               <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-[14px] font-bold text-slate-500 hover:bg-slate-100 rounded-2xl transition-colors">Cancel</button>
                 <button type="submit" className="px-6 py-3 text-[14px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5 shadow-md rounded-2xl transition-all">Save Client</button>
               </div>
             </form>
           </div>
         </div>
       </div>
      )}
    </div>
  );
}