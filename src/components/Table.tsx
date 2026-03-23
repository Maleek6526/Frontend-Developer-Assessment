import React, { useState, useMemo } from "react";
import { type ServiceProvider } from "../lib/mock-data";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import Swal from "sweetalert2";
import { Edit2, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

interface TableProps {
  data: ServiceProvider[];
  searchTerm: string;
  onUpdateProvider: (updated: ServiceProvider) => void;
}

const Table: React.FC<TableProps> = ({ data, searchTerm, onUpdateProvider }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Reset page to 1 when search or data changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, data]);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof ServiceProvider;
    direction: string;
  } | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === undefined || bValue === undefined) {
          if (aValue === undefined && bValue === undefined) return 0;
          return aValue === undefined ? 1 : -1;
        }

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const filteredData = useMemo(() => {
    return sortedData.filter((item) =>
      Object.entries(item).some(([key, val]) => {
        if (key === "signupDate" && val instanceof Date) {
          return val
            .toLocaleDateString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        }
        return String(val).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [sortedData, searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const requestSort = (key: keyof ServiceProvider) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleEdit = (provider: ServiceProvider) => {
    const getModalValues = () => {
      const email = (document.getElementById('swal-email') as HTMLInputElement)?.value;
      const phoneNumber = (document.getElementById('swal-phone') as HTMLInputElement)?.value;
      const postcode = (document.getElementById('swal-postcode') as HTMLInputElement)?.value;
      const vendorType = (document.getElementById('swal-vendor') as HTMLSelectElement)?.value as ServiceProvider['vendorType'];
      const serviceOffering = (document.getElementById('swal-service') as HTMLSelectElement)?.value as ServiceProvider['serviceOffering'];
      const notes = (document.getElementById('swal-notes') as HTMLTextAreaElement)?.value;

      return { email, phoneNumber, postcode, vendorType, serviceOffering, notes };
    };

    Swal.fire({
      title: `<div class="text-left px-4">
        <h3 class="text-xl font-bold text-gray-900">User Details</h3>
        <hr class="my-4 border-gray-100" />
      </div>`,
      html: `
        <div class="text-left px-4 space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-lg font-bold text-gray-900">${
                provider.email.split("@")[0]
              } Solutions</h4>
              <p class="text-sm text-gray-400">${provider.email}</p>
            </div>
            <div class="flex gap-2">
              <span class="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">Customer</span>
              <span class="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">Invited</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h5 class="text-xs font-bold text-gray-900 uppercase mb-3">Contact Information</h5>
              <div class="space-y-4">
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">Email</label>
                  <input id="swal-email" class="w-full text-sm text-gray-600 bg-transparent border-b border-gray-200 focus:border-blue-500 outline-none pb-1" value="${provider.email}">
                </div>
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">Phone</label>
                  <input id="swal-phone" class="w-full text-sm text-gray-600 bg-transparent border-b border-gray-200 focus:border-blue-500 outline-none pb-1" value="${provider.phoneNumber}">
                </div>
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">Postcode</label>
                  <input id="swal-postcode" class="w-full text-sm text-gray-600 bg-transparent border-b border-gray-200 focus:border-blue-500 outline-none pb-1" value="${provider.postcode}">
                </div>
              </div>
            </div>
            <div>
              <h5 class="text-xs font-bold text-gray-900 uppercase mb-3">Provider Details</h5>
              <div class="space-y-4">
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">Vendor Type</label>
                  <select id="swal-vendor" class="w-full text-sm text-gray-600 bg-transparent border-b border-gray-200 focus:border-blue-500 outline-none pb-1">
                    <option value="Independent" ${provider.vendorType === 'Independent' ? 'selected' : ''}>Independent</option>
                    <option value="Company" ${provider.vendorType === 'Company' ? 'selected' : ''}>Company</option>
                  </select>
                </div>
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">Service Offering</label>
                  <select id="swal-service" class="w-full text-sm text-gray-600 bg-transparent border-b border-gray-200 focus:border-blue-500 outline-none pb-1">
                    <option value="Housekeeping" ${provider.serviceOffering === 'Housekeeping' ? 'selected' : ''}>Housekeeping</option>
                    <option value="Window Cleaning" ${provider.serviceOffering === 'Window Cleaning' ? 'selected' : ''}>Window Cleaning</option>
                    <option value="Car Valet" ${provider.serviceOffering === 'Car Valet' ? 'selected' : ''}>Car Valet</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div class="flex justify-between items-center mb-2">
              <h5 class="text-xs font-bold text-gray-900 uppercase">Internal Notes</h5>
              <button class="text-[10px] text-blue-600 font-bold uppercase">Edit</button>
            </div>
            <textarea id="swal-notes" class="w-full text-sm text-gray-600 bg-transparent border-none focus:ring-0 resize-none h-20" placeholder="Add internal notes...">${provider.notes || ''}</textarea>
          </div>
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: "Onboard",
      confirmButtonColor: "#2563eb",
      showDenyButton: true,
      denyButtonText: "Reject",
      denyButtonColor: "#ef4444",
      customClass: {
        popup: "rounded-3xl p-4 sm:p-6 w-[95%] sm:w-[600px] max-w-2xl",
        confirmButton: "rounded-xl px-6 sm:px-8 py-3 font-bold",
        denyButton: "rounded-xl px-6 sm:px-8 py-3 font-bold",
      },
      buttonsStyling: true,
      preConfirm: () => {
        const values = getModalValues();
        if (!values.email || !values.phoneNumber || !values.postcode) {
          Swal.showValidationMessage('Please fill in all required fields');
          return false;
        }
        return values;
      },
      preDeny: () => {
        return getModalValues();
      }
    }).then((result) => {
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

      if (result.isConfirmed && result.value) {
        const updated = { ...provider, ...result.value, status: 'Onboarded' as const };
        onUpdateProvider(updated);
        Toast.fire({
          icon: "success",
          title: "Provider onboarded successfully",
        });
      } else if (result.isDenied && result.value) {
        const updated = { ...provider, ...result.value, status: 'Rejected' as const };
        onUpdateProvider(updated);
        Toast.fire({
          icon: "success",
          title: "Provider rejected successfully",
        });
      }
    });
  };

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedRows(filteredData.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const isAllSelected = filteredData.length > 0 && selectedRows.length === filteredData.length;
  const isSomeSelected = selectedRows.length > 0 && selectedRows.length < filteredData.length;

  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-[#F8F9FC]">
            <tr>
              <th className="px-6 py-5 text-left">
                <Checkbox
                  checked={isAllSelected ? true : isSomeSelected ? "indeterminate" : false}
                  onCheckedChange={handleSelectAll}
                  className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 rounded-md h-5 w-5"
                />
              </th>
              {[
                { label: "Email", key: "email" },
                { label: "Phone Number", key: "phoneNumber" },
                { label: "Postcode", key: "postcode" },
                { label: "Vendor Type", key: "vendorType" },
                { label: "Service Offering", key: "serviceOffering" },
                { label: "Signup Date", key: "signupDate" },
                { label: "Status", key: "status" },
              ].map((column) => (
                <th
                  key={column.key}
                  onClick={() =>
                    requestSort(column.key as keyof ServiceProvider)
                  }
                  className={cn(
                    "px-6 py-5 text-left text-[13px] font-bold text-gray-800 tracking-tight cursor-pointer hover:text-blue-600 transition-colors",
                    {
                      "hidden xl:table-cell": [
                        "phoneNumber",
                        "postcode",
                        "vendorType",
                        "serviceOffering",
                      ].includes(column.key),
                      "hidden lg:table-cell": ["signupDate"].includes(column.key),
                      "hidden md:table-cell": ["status"].includes(column.key),
                    }
                  )}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {sortConfig?.key === column.key && (
                      <span className="text-blue-500">
                        {sortConfig.direction === "ascending" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              <th className="px-6 py-5 text-left"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedData.map((provider) => (
              <tr
                key={provider.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-5">
                  <Checkbox
                    checked={selectedRows.includes(provider.id)}
                    onCheckedChange={() => handleSelectRow(provider.id)}
                    className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 rounded-md h-5 w-5"
                  />
                </td>
                <td className="px-4 sm:px-6 py-4 sm:py-5 text-sm text-gray-600 font-medium">
                  <div className="flex flex-col">
                    <span>{provider.email}</span>
                    <span className="text-xs text-gray-400 xl:hidden">
                      {provider.phoneNumber}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-gray-500 hidden xl:table-cell">
                  {provider.phoneNumber}
                </td>
                <td className="px-6 py-5 text-sm text-gray-500 hidden xl:table-cell">
                  {provider.postcode}
                </td>
                <td className="px-6 py-5 text-sm text-gray-500 hidden xl:table-cell">
                  {provider.vendorType}
                </td>
                <td className="px-6 py-5 text-sm text-gray-500 hidden xl:table-cell">
                  {provider.serviceOffering}
                </td>
                <td className="px-6 py-5 text-sm text-gray-500 hidden lg:table-cell">
                  {new Date(provider.signupDate).toLocaleDateString()}
                </td>
                <td className="px-4 sm:px-6 py-4 sm:py-5 text-sm hidden md:table-cell">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap",
                      {
                        "bg-green-100 text-green-700":
                          provider.status === "Onboarded",
                        "bg-red-100 text-red-700":
                          provider.status === "Rejected",
                        "text-gray-500": !provider.status,
                      }
                    )}
                  >
                    {provider.status || "Invited"}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 sm:py-5 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(provider)}
                    className="hover:bg-gray-200/60 rounded-full h-8 w-8 sm:h-9 sm:w-9"
                  >
                    <Edit2 className="h-4 w-4 text-gray-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-8 py-5 bg-white border-t border-gray-100 flex items-center justify-between">
        <div className="text-sm text-gray-500 font-medium hidden sm:block">
          Showing <span className="text-gray-900">{(currentPage - 1) * rowsPerPage + 1}</span> to <span className="text-gray-900">{Math.min(currentPage * rowsPerPage, filteredData.length)}</span> of <span className="text-gray-900">{filteredData.length}</span> results
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 text-gray-400 disabled:opacity-30 hover:bg-gray-50 rounded-md transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex gap-1">
            {/* Show only relevant pages on mobile */}
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              const isCurrent = currentPage === pageNum;
              const isNear = Math.abs(currentPage - pageNum) <= 1;

              if (pageNum !== 1 && pageNum !== totalPages && !isNear) {
                if (pageNum === 2 || pageNum === totalPages - 1) {
                  return <span key={pageNum} className="w-8 flex items-center justify-center text-gray-400">...</span>;
                }
                return null;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 text-sm font-bold rounded-lg transition-all ${
                    isCurrent
                      ? "bg-white text-blue-600 border-2 border-blue-500 shadow-sm"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 text-gray-400 disabled:opacity-30 hover:bg-gray-50 rounded-md transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
