export const users = [
  { id: 'u1', name: 'Daniyal (You)', avatar: 'D', color: 'bg-indigo-500' },
  { id: 'u2', name: 'Sarah Miller', avatar: 'S', color: 'bg-emerald-500' },
  { id: 'u3', name: 'Michael Chang', avatar: 'M', color: 'bg-amber-500' },
  { id: 'u4', name: 'Emma Watson', avatar: 'E', color: 'bg-rose-500' },
  { id: 'u5', name: 'David Chen', avatar: 'D', color: 'bg-blue-500' }
];

export const initialClients = [
  { 
    id: 1, company: 'TechNova Solutions', contact: 'Alex Mercer', email: 'alex@technova.io', phone: '+1 (415) 555-0198', status: 'Active', joined: 'Jan 12, 2026', 
    history: [
      { id: 101, type: 'note', text: 'Approved the high-fidelity wireframes for the new SaaS Dashboard.', date: 'Mar 10, 2026' }, 
      { id: 102, type: 'status', text: 'Status updated to Active', date: 'Jan 15, 2026' }
    ] 
  },
  { 
    id: 2, company: 'GlobalPay Inc.', contact: 'Elena Rodriguez', email: 'elena@globalpay.com', phone: '+1 (212) 987-6543', status: 'Active', joined: 'Feb 05, 2026', 
    history: [
      { id: 201, type: 'note', text: 'Kickoff meeting completed. Focus is on Stripe API integration.', date: 'Feb 10, 2026' }
    ] 
  },
  { 
    id: 3, company: 'Lumina Healthcare', contact: 'Dr. Marcus Webb', email: 'marcus@luminahealth.org', phone: '+1 (650) 444-9999', status: 'Lead', joined: 'Mar 01, 2026', 
    history: [
      { id: 301, type: 'note', text: 'Sent proposal for Patient Portal redesign. Waiting for approval.', date: 'Mar 11, 2026' }
    ] 
  },
  { 
    id: 4, company: 'Stark Enterprises', contact: 'Tony Stark', email: 'tony@stark.com', phone: '+1 (310) 888-0000', status: 'Inactive', joined: 'Nov 20, 2025', 
    history: [
      { id: 401, type: 'status', text: 'Project put on hold due to budget cuts.', date: 'Dec 15, 2025' }
    ] 
  }
];

export const initialProjects = [
  { id: 1, name: 'SaaS Dashboard Analytics', client: 'TechNova Solutions', status: 'In Progress', progress: 65, dueDate: '2026-04-15', type: 'Epic', totalPoints: 120, completedPoints: 78, team: ['u1', 'u2', 'u5'] },
  { id: 2, name: 'Mobile Wallet App', client: 'GlobalPay Inc.', status: 'Planning', progress: 25, dueDate: '2026-05-20', type: 'Project', totalPoints: 80, completedPoints: 20, team: ['u1', 'u3', 'u4'] },
  { id: 3, name: 'Marketing Website', client: 'TechNova Solutions', status: 'Completed', progress: 100, dueDate: '2026-02-28', type: 'Project', totalPoints: 40, completedPoints: 40, team: ['u2', 'u4'] },
  { id: 4, name: 'Patient Portal Redesign', client: 'Lumina Healthcare', status: 'Planning', progress: 0, dueDate: '2026-06-10', type: 'Epic', totalPoints: 200, completedPoints: 0, team: ['u1', 'u2', 'u3', 'u5'] },
];

export const initialTasks = [
  { id: 1001, projectId: 1, title: 'Design Analytics Widgets', description: 'Create high-fidelity wireframes for the revenue and user growth widgets.', status: 'Completed', assignee: 'u2', priority: 'High', date: 'Mar 01' },
  { id: 1002, projectId: 1, title: 'Develop Chart Components', description: 'Implement Recharts for dynamic data visualization on the dashboard.', status: 'In Progress', assignee: 'u3', priority: 'High', date: 'Mar 10' },
  { id: 1003, projectId: 1, title: 'API Endpoint Integration', description: 'Connect frontend charts with the Node.js backend analytics endpoints.', status: 'To Do', assignee: 'u5', priority: 'Medium', date: 'Mar 15' },
  
  { id: 2001, projectId: 2, title: 'Setup Stripe Connect', description: 'Integrate Stripe SDK for processing wallet top-ups.', status: 'In Progress', assignee: 'u5', priority: 'High', date: 'Mar 11' },
  { id: 2002, projectId: 2, title: 'Biometric Auth UI', description: 'Design FaceID and Fingerprint login screens for iOS/Android.', status: 'To Do', assignee: 'u2', priority: 'Medium', date: 'Mar 14' },
  { id: 2003, projectId: 2, title: 'Write API Documentation', description: 'Document all new payment endpoints in Swagger.', status: 'To Do', assignee: 'u4', priority: 'Low', date: 'Mar 18' },
  
  { id: 3001, projectId: 3, title: 'SEO Optimization', description: 'Add meta tags, alt text, and generate sitemap.xml.', status: 'Completed', assignee: 'u4', priority: 'Medium', date: 'Feb 25' },
  { id: 3002, projectId: 3, title: 'Deploy to Vercel', description: 'Setup CI/CD pipeline and configure custom domain.', status: 'Completed', assignee: 'u1', priority: 'High', date: 'Feb 28' },
  
  { id: 4001, projectId: 4, title: 'HIPAA Compliance Audit', description: 'Review architecture to ensure patient data is encrypted at rest.', status: 'To Do', assignee: 'u1', priority: 'High', date: 'Mar 20' },
  { id: 4002, projectId: 4, title: 'Competitor Analysis', description: 'Review top 3 patient portals and document UX flaws.', status: 'To Do', assignee: 'u4', priority: 'Low', date: 'Mar 22' },
];

export const projectsData = initialProjects; // Fallback mapping