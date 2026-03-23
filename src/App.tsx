import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Table from "./components/Table";
import { serviceProviders, type ServiceProvider } from "./lib/mock-data";
import { Bell, MessageSquare, Search, Menu } from "lucide-react";

function App() {
  const [allProviders, setAllProviders] = useState<ServiceProvider[]>(serviceProviders);
  const [filteredData, setFilteredData] = useState<ServiceProvider[]>(serviceProviders);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleUpdateProvider = (updatedProvider: ServiceProvider) => {
    setAllProviders(prev => prev.map(p => p.id === updatedProvider.id ? updatedProvider : p));
    setFilteredData(prev => prev.map(p => p.id === updatedProvider.id ? updatedProvider : p));
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FC]">
      <Sidebar 
        allProviders={allProviders}
        setFilteredData={setFilteredData} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-auto sm:h-16 bg-white border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-8 py-4 sm:py-0 sticky top-0 z-10">
          <div className="w-full sm:w-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
                <Menu className="h-6 w-6" />
              </button>
              <nav className="hidden md:flex items-center gap-8">
                <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Service Dashboard</a>
                <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Finance Forecast</a>
                <a href="#" className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 h-16 flex items-center">Human Resources</a>
                <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Users</a>
                <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Compliances & Verification</a>
              </nav>
            </div>

            <div className="flex sm:hidden items-center gap-6">
              <button className="text-gray-400 hover:text-gray-600 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <MessageSquare className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-6">
            <button className="text-gray-400 hover:text-gray-600 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <MessageSquare className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">Max Smith</div>
                <div className="text-[10px] text-gray-500">London, UK</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Max" alt="User avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
                <h1 className="text-3xl font-bold text-gray-900">Waitlist</h1>
                <div className="flex gap-4">
                  <button className="px-6 py-2 bg-blue-100 text-blue-700 font-semibold rounded-lg text-sm border border-blue-200 transition-all hover:bg-blue-200">
                    Service Providers
                  </button>
                  <button className="px-6 py-2 bg-white text-gray-500 font-semibold rounded-lg text-sm border border-gray-200 transition-all hover:bg-gray-50">
                    Customers
                  </button>
                </div>
              </div>
              
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search User" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
            </div>

            <Table 
              data={filteredData} 
              searchTerm={searchTerm} 
              onUpdateProvider={handleUpdateProvider}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
