"use client";

import React, { useState, useEffect, useRef, forwardRef } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { 
  Search, Home, FileText, FileKey, Users, BarChart2, Shield, Settings, HelpCircle, Calendar, Upload, Menu, X, Video
} from "lucide-react";
import Link from "next/link";

interface FormData {
  title: string;
  description: string;
  date: string;
  rights: string;
  files: File[];
}

// Form Field Component
interface FormFieldProps {
  number: string;
  label: string;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
  select?: boolean;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  field: keyof FormData;
}

function FormField({ number, label, placeholder, type = "text", textarea, select, formData, setFormData, field }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-[#222] text-center text-sm flex items-center justify-center rounded-sm">{number}</div>
        <label className="text-sm font-medium">{label}</label>
      </div>
      {textarea ? (
        <textarea
          value={formData[field] as string}
          onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
          className="w-full p-3 bg-[#121212] text-white text-sm border border-[#333] rounded-md focus:outline-none focus:border-[#fa5f02]"
          placeholder={placeholder}
          rows={4}
          required
        />
      ) : select ? (
        <select
          value={formData[field] as string}
          onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
          className="w-full p-3 bg-[#121212] text-white text-sm border border-[#333] rounded-md focus:outline-none focus:border-[#fa5f02]"
          required
        >
          <option value="">Select an option</option>
          <option value="exclusive">Exclusive Rights</option>
          <option value="non-exclusive">Non-Exclusive Rights</option>
          <option value="limited">Limited Rights</option>
        </select>
      ) : (
        <input
          type={type}
          value={formData[field] as string}
          onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
          className="w-full p-3 bg-[#121212] text-white text-sm border border-[#333] rounded-md focus:outline-none focus:border-[#fa5f02]"
          placeholder={placeholder}
          required
        />
      )}
    </div>
  );
}

// Sidebar Item Component
interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function SidebarItem({ icon, label, active = false }: SidebarItemProps) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-md ${active ? "bg-[#1a1a1a]" : "hover:bg-[#1a1a1a]/50"}`}>
      <div className="w-5 h-5 text-[#888888]">{icon}</div>
      <span className={active ? "font-medium" : "text-[#888888]"}>{label}</span>
    </div>
  );
}

// Date Picker Field Component - Fixed UI
interface DatePickerFieldProps {
  number: string;
  label: string;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

function DatePickerField({ number, label, selectedDate, setSelectedDate, formData, setFormData }: DatePickerFieldProps) {
  // Create a custom input component to ensure consistent styling
  const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <div className="relative">
      <input
        ref={ref}
        value={value || ''}
        onClick={onClick}
        readOnly
        className="w-full p-3 bg-[#121212] text-white text-sm border border-[#333] rounded-md focus:outline-none focus:border-[#fa5f02]"
        placeholder="Select a date"
        required
      />
      <Calendar className="absolute right-3 top-3 text-gray-400 w-5 h-5 pointer-events-none" />
    </div>
  ));
  
  // Need to explicitly name our forwardRef component
  CustomInput.displayName = "CustomDateInput";

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-[#222] text-center text-sm flex items-center justify-center rounded-sm">{number}</div>
        <label className="text-sm font-medium">{label}</label>
      </div>
      
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          if (date) {
            const formattedDate = date.toISOString().split("T")[0];
            setFormData(prev => ({ ...prev, date: formattedDate }));
          } else {
            setFormData(prev => ({ ...prev, date: "" }));
          }
        }}
        customInput={<CustomInput />}
        dateFormat="yyyy-MM-dd"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        popperClassName="custom-popper" // Add custom class for styling
        popperPlacement="bottom-start" // Control placement
        portalId="date-picker-portal" // Set a portal ID for rendering
      />
      
      {formData.date && (
        <div className="text-sm text-gray-300 mt-1">
          Selected: {new Date(formData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      )}
    </div>
  );
}

// File Upload Component (Improved UI and restricted to MP4)
interface FileUploadFieldProps {
  number: string;
  label: string;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

function FileUploadField({ number, label, formData, setFormData }: FileUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    // Get the first file only (single file restriction)
    const file = selectedFiles[0];
    
    // Check if file is MP4
    if (file.type !== "video/mp4") {
      alert("Only MP4 files are allowed");
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }
    
    // Update form data with single file
    setFormData(prev => ({ ...prev, files: [file] }));
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, files: [] }));
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Format file size
  const formatFileSize = (size: number): string => {
    if (size < 1024) return size + ' bytes';
    else if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
    else return (size / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-[#222] text-center text-sm flex items-center justify-center rounded-sm">{number}</div>
        <label className="text-sm font-medium">{label}</label>
      </div>
      
      {formData.files.length === 0 ? (
        <div 
          className="border-2 border-dashed border-[#333] rounded-md p-8 flex flex-col items-center justify-center text-center bg-[#0d0d0d] hover:border-[#fa5f02] transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Video className="w-12 h-12 text-[#666] mb-3" />
          <p className="text-sm font-medium mb-1">Upload your MP4 file</p>
          <p className="text-xs text-gray-500">Click to browse or drag and drop</p>
          <p className="text-xs text-gray-500 mt-3">Only MP4 format accepted</p>
          
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="video/mp4"
            required
          />
        </div>
      ) : (
        <div className="border border-[#333] rounded-md bg-[#121212] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1a1a1a] rounded-md flex items-center justify-center text-[#fa5f02]">
                <Video className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{formData.files[0].name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(formData.files[0].size)}</p>
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#333] transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      )}
      
      <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
        <span className="inline-block w-1 h-1 bg-[#fa5f02] rounded-full"></span>
        <span>Only single MP4 file upload is supported</span>
      </div>
    </div>
  );
}

export default function RegisterIP() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    date: "",
    rights: "",
    files: [],
  });

  // Add custom styles for DatePicker globally
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .react-datepicker {
        background-color: #121212 !important;
        color: white !important;
        border: 1px solid #333 !important;
        font-family: inherit !important;
      }
      .react-datepicker__header {
        background-color: #1a1a1a !important;
        border-bottom: 1px solid #333 !important;
      }
      .react-datepicker__current-month,
      .react-datepicker__day-name,
      .react-datepicker-time__header {
        color: white !important;
      }
      .react-datepicker__day {
        color: white !important;
      }
      .react-datepicker__day:hover {
        background-color: #333 !important;
      }
      .react-datepicker__day--selected {
        background-color: #fa5f02 !important;
      }
      .react-datepicker__day--keyboard-selected {
        background-color: #fa5f02 !important;
      }
      .react-datepicker__month-select,
      .react-datepicker__year-select {
        background-color: #121212 !important;
        color: white !important;
        border: 1px solid #333 !important;
        padding: 2px !important;
      }
      .react-datepicker__month-select option,
      .react-datepicker__year-select option {
        background-color: #121212 !important;
      }
      .react-datepicker__triangle {
        border-bottom-color: #1a1a1a !important;
      }
      .react-datepicker__triangle::before {
        border-bottom-color: #333 !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    
    let filledCount = 0;
    if (formData.title) filledCount++;
    if (formData.description) filledCount++;
    if (formData.date) filledCount++;
    if (formData.rights) filledCount++;
    if (formData.files.length > 0) filledCount++;
    
    setProgress((filledCount / 5) * 100);
  }, [formData]);

  const handleClickOutside = (e: MouseEvent) => {
    if (isMobileMenuOpen && e.target instanceof HTMLElement) {
      const sidebar = document.getElementById('sidebar');
      const sidebarToggle = document.getElementById('sidebar-toggle');
      if (sidebar && !sidebar.contains(e.target) && !sidebarToggle?.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  if (!mounted) return null;

  const handleSubmit = () => {

    const isFormValid = formData.title && formData.description && formData.date && formData.rights && formData.files.length > 0;
    if (!isFormValid) {
        alert("Please fill all required fields.");
        return;
    }

    setIsSubmitting(true);
    
    const formDataForExport = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      rights: formData.rights,
      file: formData.files.length > 0 ? {
        name: formData.files[0].name,
        type: formData.files[0].type,
        size: formData.files[0].size,
        lastModified: formData.files[0].lastModified
      } : null
    };
    
    console.log("Form Data JSON:", JSON.stringify(formDataForExport, null, 2));
    
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/register/confirmation");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar - Desktop */}
      <div
        id="sidebar"
        className="hidden lg:block w-64 border-r border-[#333] p-4 bg-black h-screen sticky top-0"
      >
        <div className="mb-6 flex justify-center">
          <div className="text-xl font-bold text-[#fa5f02]">IP REGISTER</div>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-[#1a1a1a] rounded-md text-sm border border-[#333] focus:outline-none focus:border-[#fa5f02]"
          />
        </div>

        <div className="space-y-1">
          <Link href="/">
            <SidebarItem icon={<Home />} label="Dashboard" />
          </Link>
          <Link href="/register">
            <SidebarItem icon={<FileText />} label="Register IP" active />
          </Link>
          <SidebarItem icon={<FileKey />} label="Generate ZPK" />
          <SidebarItem icon={<Users />} label="Collaborations" />
          <SidebarItem icon={<BarChart2 />} label="Analytics" />
          <Link href="/credentials">
            <SidebarItem icon={<Shield />} label="Credentials" />
          </Link>
          <SidebarItem icon={<Settings />} label="Settings" />
          <SidebarItem icon={<HelpCircle />} label="Help" />
        </div>
      </div>

      {/* Mobile Menu - Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-80 z-30" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-40 w-64 border-r border-[#333] p-4 bg-black transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-6 flex justify-center">
          <div className="text-xl font-bold text-[#fa5f02]">IP REGISTER</div>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-[#1a1a1a] rounded-md text-sm border border-[#333] focus:outline-none focus:border-[#fa5f02]"
          />
        </div>

        <div className="space-y-1">
          <Link href="/">
            <SidebarItem icon={<Home />} label="Dashboard" />
          </Link>
          <Link href="/register">
            <SidebarItem icon={<FileText />} label="Register IP" active />
          </Link>
          <SidebarItem icon={<FileKey />} label="Generate ZPK" />
          <SidebarItem icon={<Users />} label="Collaborations" />
          <SidebarItem icon={<BarChart2 />} label="Analytics" />
          <Link href="/credentials">
            <SidebarItem icon={<Shield />} label="Credentials" />
          </Link>
          <SidebarItem icon={<Settings />} label="Settings" />
          <SidebarItem icon={<HelpCircle />} label="Help" />
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        id="sidebar-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#1a1a1a] hover:bg-[#222] transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Main Content */}
      <div className="flex-1 p-4 pt-16 lg:pt-8 lg:p-8">
        <div className="max-w-3xl mx-auto w-full">
          <div className="mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-medium text-[#fa5f02]">REGISTER YOUR IP</h1>
            <h2 className="text-xl sm:text-2xl font-medium mt-2">We just need some information</h2>

            <div className="relative h-2 w-full max-w-md bg-[#222] mx-auto mt-6 rounded-full overflow-hidden">
              <div 
                className="absolute h-full bg-[#fa5f02] transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-400 mt-1">{Math.round(progress)}% Complete</div>
          </div>

          <div className="space-y-6 mx-auto bg-[#0a0a0a] border border-[#222] rounded-lg p-6 shadow-lg">
            <FormField 
              number="1" 
              label="Asset Title" 
              placeholder="Enter title..." 
              formData={formData} 
              setFormData={setFormData} 
              field="title" 
            />
            <FormField 
              number="2" 
              label="Description" 
              placeholder="Enter description..." 
              textarea 
              formData={formData} 
              setFormData={setFormData} 
              field="description" 
            />
            <DatePickerField 
              number="3" 
              label="Creation Date" 
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate} 
              formData={formData} 
              setFormData={setFormData} 
            />
            <FormField 
              number="4" 
              label="Rights Management" 
              select 
              formData={formData} 
              setFormData={setFormData} 
              field="rights" 
            />
            <FileUploadField 
              number="5" 
              label="Upload MP4 File" 
              formData={formData} 
              setFormData={setFormData} 
            />

            <div className="flex justify-center pt-4">
              <button 
                className={`px-8 py-3 bg-[#fa5f02] font-medium hover:bg-[#d94e00] transition-colors rounded-full text-lg w-full sm:w-auto flex items-center justify-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : "Register Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}