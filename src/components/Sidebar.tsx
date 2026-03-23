import { Calendar as CalendarIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "../lib/utils";
import { format } from "date-fns";
import { type ServiceProvider } from "../lib/mock-data";
import * as React from "react";
import Swal from "sweetalert2";

interface SidebarProps {
  allProviders: ServiceProvider[];
  setFilteredData: React.Dispatch<React.SetStateAction<ServiceProvider[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ allProviders, setFilteredData, isOpen, setIsOpen }) => {
  const [postcode, setPostcode] = React.useState("");
  const [status, setStatus] = React.useState<string[]>([]);
  const [startDate, setStartDate] = React.useState<Date | undefined>();
  const [endDate, setEndDate] = React.useState<Date | undefined>();
  const [vendorType, setVendorType] = React.useState<string[]>([]);
  const [serviceOffering, setServiceOffering] = React.useState<string[]>([]);

  const handleFilter = () => {
    let filtered = allProviders;

    if (postcode) {
      filtered = filtered.filter((provider) =>
        provider.postcode.toLowerCase().includes(postcode.toLowerCase())
      );
    }

    if (status.length > 0) {
      filtered = filtered.filter((provider) => status.includes(provider.status));
    }

    if (startDate) {
      filtered = filtered.filter(
        (provider) => new Date(provider.signupDate) >= startDate
      );
    }

    if (endDate) {
      filtered = filtered.filter(
        (provider) => new Date(provider.signupDate) <= endDate
      );
    }

    if (vendorType.length > 0) {
      filtered = filtered.filter((provider) =>
        vendorType.includes(provider.vendorType)
      );
    }

    if (serviceOffering.length > 0) {
      filtered = filtered.filter((provider) =>
        serviceOffering.includes(provider.serviceOffering)
      );
    }

    setFilteredData(filtered);

    // Success Toast
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    Toast.fire({
      icon: "success",
      title: "Filters applied successfully",
    });

    // Close sidebar on mobile after filtering
    setIsOpen(false);
  };

  const handleCheckboxChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    currentValues: string[]
  ) => {
    if (currentValues.includes(value)) {
      setter(currentValues.filter((v) => v !== value));
    } else {
      setter([...currentValues, value]);
    }
  };

  return (
    <>
      <aside 
        className={cn(
          "fixed top-0 left-0 w-full max-w-xs p-6 bg-white border-r border-gray-200 h-screen overflow-y-auto transform transition-transform duration-300 ease-in-out z-40",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:relative md:translate-x-0 md:h-screen"
        )}
      >
        <div className="flex items-center justify-between gap-2 mb-10">
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="text-2xl font-bold text-blue-500">gler</span>
              <span className="absolute -top-1 -right-2 text-yellow-400">✦</span>
            </div>
            <span className="text-xl font-medium text-blue-900">Admin Panel</span>
          </div>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-10">
          <button className="w-full text-left px-4 py-2 bg-gray-200 rounded-md text-sm font-bold text-gray-800">
            User Management
          </button>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Postcode
            </label>
            <Input
              placeholder="ZIP"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="h-10 border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-4">
              Registration Status
            </label>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="onboarded"
                  checked={status.includes("Onboarded")}
                  onCheckedChange={() =>
                    handleCheckboxChange("Onboarded", setStatus, status)
                  }
                  className="rounded-md border-gray-400"
                />
                <label htmlFor="onboarded" className="text-sm font-medium text-gray-600">
                  Onboarded
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="rejected"
                  checked={status.includes("Rejected")}
                  onCheckedChange={() =>
                    handleCheckboxChange("Rejected", setStatus, status)
                  }
                  className="rounded-md border-gray-400"
                />
                <label htmlFor="rejected" className="text-sm font-medium text-gray-600">
                  Rejected
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-bold text-gray-700">
                Date Registered
              </label>
              {(startDate || endDate) && (
                <button
                  onClick={() => {
                    setStartDate(undefined);
                    setEndDate(undefined);
                  }}
                  className="text-[10px] text-blue-600 font-bold uppercase hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 border-2 border-blue-500 rounded-xl p-2 relative">
              <div className="relative">
                <span className="absolute -top-3 left-2 bg-white px-1 text-[10px] text-blue-500 font-bold">Date</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full h-10 px-2 justify-between border-gray-200 font-normal",
                        !startDate && "text-gray-400"
                      )}
                    >
                      {startDate ? format(startDate, "MM/dd/yyyy") : "Start"}
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      captionLayout="dropdown"
                      fromYear={2015}
                      toYear={2026}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="relative">
                <span className="absolute -top-3 left-2 bg-white px-1 text-[10px] text-blue-500 font-bold">Date</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full h-10 px-2 justify-between border-gray-200 font-normal",
                        !endDate && "text-gray-400"
                      )}
                    >
                      {endDate ? format(endDate, "MM/dd/yyyy") : "End"}
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      captionLayout="dropdown"
                      fromYear={2015}
                      toYear={2026}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="col-span-2 flex justify-between text-[10px] text-gray-400 px-1 mt-1">
                <span>MM/DD/YYYY</span>
                <span>MM/DD/YYYY</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-4">
              Vendor Type
            </label>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="independent"
                  checked={vendorType.includes("Independent")}
                  onCheckedChange={() =>
                    handleCheckboxChange("Independent", setVendorType, vendorType)
                  }
                  className="rounded-md border-gray-400"
                />
                <label htmlFor="independent" className="text-sm font-medium text-gray-600">
                  Independent
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="company"
                  checked={vendorType.includes("Company")}
                  onCheckedChange={() =>
                    handleCheckboxChange("Company", setVendorType, vendorType)
                  }
                  className="rounded-md border-gray-400"
                />
                <label htmlFor="company" className="text-sm font-medium text-gray-600">
                  Company
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-4">
              Service Offering
            </label>
            <div className="space-y-3">
              {[
                "Housekeeping",
                "Window Cleaning",
                "Car Valet",
              ].map((service) => (
                <div key={service} className="flex items-center gap-3">
                  <Checkbox
                    id={service.toLowerCase().replace(" ", "-")}
                    checked={serviceOffering.includes(service)}
                    onCheckedChange={() =>
                      handleCheckboxChange(service, setServiceOffering, serviceOffering)
                    }
                    className="rounded-md border-gray-400"
                  />
                  <label
                    htmlFor={service.toLowerCase().replace(" ", "-")}
                    className="text-sm font-medium text-gray-600"
                  >
                    {service}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <Button
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full shadow-lg shadow-blue-200 transition-all active:scale-95"
              onClick={handleFilter}
            >
              Filter
            </Button>
          </div>
        </div>
      </aside>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;

