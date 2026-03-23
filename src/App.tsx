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
        <header className="h-auto sm:h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-0 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <a href="#" className="text-[13px] lg:text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Service Dashboard</a>
              <a href="#" className="text-[13px] lg:text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Finance Forecast</a>
              <a href="#" className="text-[13px] lg:text-sm font-medium text-blue-600 border-b-2 border-blue-600 h-16 flex items-center">Human Resources</a>
              <a href="#" className="text-[13px] lg:text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Users</a>
              <a href="#" className="text-[13px] lg:text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors whitespace-nowrap">Compliances & Verification</a>
            </nav>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-4 sm:gap-6 border-r border-gray-100 pr-4 sm:pr-6">
              <button className="text-gray-400 hover:text-gray-600 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <MessageSquare className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden xs:block">
                <div className="text-sm font-bold text-gray-900 leading-none">Max Smith</div>
                <div className="text-[10px] text-gray-500 mt-1">London, UK</div>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm shrink-0">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Max" alt="User avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 lg:mb-8 gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Waitlist</h1>
                <div className="flex bg-gray-100/50 p-1 rounded-xl w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-white text-blue-700 font-semibold rounded-lg text-xs sm:text-sm shadow-sm transition-all border border-transparent">
                    Service Providers
                  </button>
                  <button className="flex-1 sm:flex-none px-4 sm:px-6 py-2 text-gray-500 font-semibold rounded-lg text-xs sm:text-sm transition-all hover:text-gray-700">
                    Customers
                  </button>
                </div>
              </div>
              
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search User" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
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
