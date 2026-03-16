import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Clients from './pages/Clients';
import ProjectDetails from './pages/ProjectDetails';
import SplashScreen from './components/SplashScreen'; // 💥 Import it

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      {/* 💥 SHOW SPLASH SCREEN UNTIL LOADING IS DONE 💥 */}
      {isLoading && <SplashScreen finishLoading={() => setIsLoading(false)} />}

      <div className={`flex h-screen bg-slate-50 overflow-hidden transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <Navbar />
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/clients" element={<Clients />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}