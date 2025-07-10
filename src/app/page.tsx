'use client'
import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import '@fortawesome/fontawesome-free/css/all.min.css';
const App: React.FC = () => {
const [loading, setLoading] = useState(true);
const [activeTab, setActiveTab] = useState('dashboard');
const [showProfileDropdown, setShowProfileDropdown] = useState(false);
const [showNotifications, setShowNotifications] = useState(false);
const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
const [searchQuery, setSearchQuery] = useState('');
// Simulate loading splash screen
useEffect(() => {
const timer = setTimeout(() => {
setLoading(false);
}, 2000);
return () => clearTimeout(timer);
}, []);
// Initialize charts after component mounts
useEffect(() => {
if (!loading && activeTab === 'dashboard') {
// Attendance Chart
const attendanceChart = echarts.init(document.getElementById('attendance-chart'));
const attendanceOption = {
animation: false,
tooltip: {
trigger: 'axis'
},
legend: {
data: ['Students', 'Teachers', 'Staff']
},
grid: {
left: '3%',
right: '4%',
bottom: '3%',
containLabel: true
},
xAxis: {
type: 'category',
boundaryGap: false,
data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
},
yAxis: {
type: 'value',
max: 100
},
series: [
{
name: 'Students',
type: 'line',
data: [92, 89, 95, 93, 90, 88],
smooth: true,
color: '#4F46E5'
},
{
name: 'Teachers',
type: 'line',
data: [98, 97, 99, 96, 95, 100],
smooth: true,
color: '#10B981'
},
{
name: 'Staff',
type: 'line',
data: [95, 94, 97, 96, 93, 95],
smooth: true,
color: '#F59E0B'
}
]
};
attendanceChart.setOption(attendanceOption);
// Performance Chart
const performanceChart = echarts.init(document.getElementById('performance-chart'));
const performanceOption = {
animation: false,
tooltip: {
trigger: 'item'
},
legend: {
orient: 'vertical',
left: 'left',
},
series: [
{
name: 'Performance',
type: 'pie',
radius: ['40%', '70%'],
avoidLabelOverlap: false,
itemStyle: {
borderRadius: 10,
borderColor: '#fff',
borderWidth: 2
},
label: {
show: false,
position: 'center'
},
emphasis: {
label: {
show: true,
fontSize: '18',
fontWeight: 'bold'
}
},
labelLine: {
show: false
},
data: [
{ value: 45, name: 'Excellent', itemStyle: { color: '#10B981' } },
{ value: 30, name: 'Good', itemStyle: { color: '#4F46E5' } },
{ value: 15, name: 'Average', itemStyle: { color: '#F59E0B' } },
{ value: 10, name: 'Below Average', itemStyle: { color: '#EF4444' } }
]
}
]
};
performanceChart.setOption(performanceOption);
// Handle resize
const handleResize = () => {
attendanceChart.resize();
performanceChart.resize();
};
window.addEventListener('resize', handleResize);
return () => {
window.removeEventListener('resize', handleResize);
attendanceChart.dispose();
performanceChart.dispose();
};
}
}, [loading, activeTab]);
if (loading) {
return (
<div className="flex items-center justify-center min-h-screen bg-indigo-50">
<div className="text-center">
<div className="mb-6 animate-pulse">
<img
src="https://readdy.ai/api/search-image?query=A%20modern%2C%20minimalist%20school%20logo%20design%20with%20a%20stylized%20open%20book%20and%20graduation%20cap%2C%20featuring%20blue%20and%20gold%20colors%20on%20a%20white%20background%2C%20professional%20and%20clean%20design%20suitable%20for%20an%20educational%20institution&width=200&height=200&seq=1&orientation=squarish"
alt="Vishwa Bharathi School"
className="mx-auto w-40 h-40 object-contain"
/>
</div>
<h1 className="text-3xl font-bold text-indigo-700 mb-2">Vishwa Bharathi School</h1>
<p className="text-gray-600 mb-6">School Management Dashboard</p>
<div className="w-16 h-16 border-t-4 border-indigo-600 border-solid rounded-full animate-spin mx-auto"></div>
</div>
</div>
);
}
return (
<div className="flex h-screen bg-gray-50">
{/* Sidebar */}
<div className={`bg-indigo-800 text-white transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
<div className="p-4 flex items-center justify-between">
{!sidebarCollapsed && (
<div className="flex items-center space-x-2">
<img
src="https://readdy.ai/api/search-image?query=A%20modern%2C%20minimalist%20school%20logo%20design%20with%20a%20stylized%20open%20book%20and%20graduation%20cap%2C%20featuring%20blue%20and%20gold%20colors%20on%20a%20white%20background%2C%20professional%20and%20clean%20design%20suitable%20for%20an%20educational%20institution&width=40&height=40&seq=1&orientation=squarish"
alt="Logo"
className="w-10 h-10"
/>
<span className="font-bold text-lg">VB School</span>
</div>
)}
{sidebarCollapsed && (
<img
src="https://readdy.ai/api/search-image?query=A%20modern%2C%20minimalist%20school%20logo%20design%20with%20a%20stylized%20open%20book%20and%20graduation%20cap%2C%20featuring%20blue%20and%20gold%20colors%20on%20a%20white%20background%2C%20professional%20and%20clean%20design%20suitable%20for%20an%20educational%20institution&width=40&height=40&seq=1&orientation=squarish"
alt="Logo"
className="w-10 h-10 mx-auto"
/>
)}
<button
onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
className="text-white hover:bg-indigo-700 rounded-full p-1 cursor-pointer !rounded-button whitespace-nowrap"
>
<i className={`fas ${sidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
</button>
</div>
<div className="mt-8">
<ul>
<li className={`mb-2 ${activeTab === 'dashboard' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>
<button
onClick={() => setActiveTab('dashboard')}
className={`flex items-center py-3 px-4 w-full text-left cursor-pointer !rounded-button whitespace-nowrap ${sidebarCollapsed ? 'justify-center' : ''}`}
>
<i className="fas fa-tachometer-alt text-xl"></i>
{!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
</button>
</li>
<li className={`mb-2 ${activeTab === 'academic' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>
<button
onClick={() => setActiveTab('academic')}
className={`flex items-center py-3 px-4 w-full text-left cursor-pointer !rounded-button whitespace-nowrap ${sidebarCollapsed ? 'justify-center' : ''}`}
>
<i className="fas fa-graduation-cap text-xl"></i>
{!sidebarCollapsed && <span className="ml-3">Academic</span>}
</button>
</li>

<li className={`mb-2 ${activeTab === 'students' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>
<button
onClick={() => setActiveTab('students')}
className={`flex items-center py-3 px-4 w-full text-left cursor-pointer !rounded-button whitespace-nowrap ${sidebarCollapsed ? 'justify-center' : ''}`}
>
<i className="fas fa-user-graduate text-xl"></i>
{!sidebarCollapsed && <span className="ml-3">Students</span>}
</button>
</li>
<li className={`mb-2 ${activeTab === 'finance' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>
<button
onClick={() => setActiveTab('finance')}
className={`flex items-center py-3 px-4 w-full text-left cursor-pointer !rounded-button whitespace-nowrap ${sidebarCollapsed ? 'justify-center' : ''}`}
>
<i className="fas fa-money-bill-wave text-xl"></i>
{!sidebarCollapsed && <span className="ml-3">Finance</span>}
</button>
</li>
<li className={`mb-2 ${activeTab === 'operations' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>
<button
onClick={() => setActiveTab('operations')}
className={`flex items-center py-3 px-4 w-full text-left cursor-pointer !rounded-button whitespace-nowrap ${sidebarCollapsed ? 'justify-center' : ''}`}
>
<i className="fas fa-cogs text-xl"></i>
{!sidebarCollapsed && <span className="ml-3">Operations</span>}
</button>
</li>
<li className={`mb-2 ${activeTab === 'communication' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>
<button
onClick={() => setActiveTab('communication')}
className={`flex items-center py-3 px-4 w-full text-left cursor-pointer !rounded-button whitespace-nowrap ${sidebarCollapsed ? 'justify-center' : ''}`}
>
<i className="fas fa-comments text-xl"></i>
{!sidebarCollapsed && <span className="ml-3">Communication</span>}
</button>
</li>
<li className={`mb-2 ${activeTab === 'analytics' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>
<button
onClick={() => setActiveTab('analytics')}
className={`flex items-center py-3 px-4 w-full text-left cursor-pointer !rounded-button whitespace-nowrap ${sidebarCollapsed ? 'justify-center' : ''}`}
>
<i className="fas fa-chart-line text-xl"></i>
{!sidebarCollapsed && <span className="ml-3">Analytics</span>}
</button>
</li>
<li className={`mb-2 ${activeTab === 'teachers' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>
<button
onClick={() => setActiveTab('teachers')}
className={`flex items-center py-3 px-4 w-full text-left cursor-pointer !rounded-button whitespace-nowrap ${sidebarCollapsed ? 'justify-center' : ''}`}
>
<i className="fas fa-chalkboard-teacher text-xl"></i>
{!sidebarCollapsed && <span className="ml-3">Teachers</span>}
</button>
</li>
<li className={`mb-2 ${activeTab === 'hr' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>
<button
onClick={() => setActiveTab('hr')}
className={`flex items-center py-3 px-4 w-full text-left cursor-pointer !rounded-button whitespace-nowrap ${sidebarCollapsed ? 'justify-center' : ''}`}
>
<i className="fas fa-users text-xl"></i>
{!sidebarCollapsed && <span className="ml-3">HR</span>}
</button>
</li>
<li className={`mb-2 ${activeTab === 'settings' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}>
<button
onClick={() => setActiveTab('settings')}
className={`flex items-center py-3 px-4 w-full text-left cursor-pointer !rounded-button whitespace-nowrap ${sidebarCollapsed ? 'justify-center' : ''}`}
>
<i className="fas fa-cog text-xl"></i>
{!sidebarCollapsed && <span className="ml-3">Settings</span>}
</button>
</li>
</ul>
</div>
<div className="absolute bottom-0 left-0 right-0 p-4">
  <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
    <button
      onClick={() => {
        const dialog = document.getElementById('helpDialog');
        if (dialog) dialog.classList.remove('hidden');
      }}
      className="text-white hover:text-indigo-200 cursor-pointer !rounded-button whitespace-nowrap"
    >
      <i className="fas fa-question-circle text-xl"></i>
      {!sidebarCollapsed && <span className="ml-2">Help</span>}
    </button>

    {/* Help Dialog */}
    <div
      id="helpDialog"
      className="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={(e) => {
        // Fixed with type assertion
        if ((e.target as HTMLElement).id === 'helpDialog') {
          const dialog = document.getElementById('helpDialog');
          if (dialog) dialog.classList.add('hidden');
        }
      }}
    >
      {/* ... dialog content remains the same ... */}
    </div>

    {!sidebarCollapsed && (
      <button className="text-white hover:text-indigo-200 cursor-pointer !rounded-button whitespace-nowrap">
        <i className="fas fa-sign-out-alt text-xl"></i>
      </button>
    )}
  </div>
</div>
          </div>

          {/* Support Section */}
          <div className="mt-6 p-6 bg-indigo-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Need More Help?</h3>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Contact our support team for personalized assistance</p>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 !rounded-button whitespace-nowrap">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Logout Button (visible when sidebar is expanded) */}
    {!sidebarCollapsed && (
      <button className="text-white hover:text-indigo-200 cursor-pointer !rounded-button whitespace-nowrap">
        <i className="fas fa-sign-out-alt text-xl"></i>
      </button>
    )}
  </div>
</div>
</div>
{/* Main Content */}
<div className="flex-1 flex flex-col overflow-hidden">
{/* Top Navigation */}
<header className="bg-white shadow-sm">
<div className="flex items-center justify-between p-4">
<div className="flex items-center">
<div className="relative">
<span className="absolute inset-y-0 left-0 flex items-center pl-3">
<i className="fas fa-search text-gray-400"></i>
</span>
<input
type="text"
placeholder="Search..."
className="pl-10 pr-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
/>
</div>
<button className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center cursor-pointer !rounded-button whitespace-nowrap">
<i className="fas fa-microphone mr-2"></i>
AI Assistant
</button>
</div>
<div className="flex items-center space-x-4">
<div className="relative">
<button
onClick={() => setShowNotifications(!showNotifications)}
className="relative text-gray-600 hover:text-indigo-600 cursor-pointer !rounded-button whitespace-nowrap"
>
<i className="fas fa-bell text-xl"></i>
<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
</button>
{showNotifications && (
<div className="absolute right-0 mt-2 w-80 bg-white text-black rounded-lg shadow-lg py-2 z-10 border border-gray-200">
<div className="px-4 py-2 border-b border-gray-200">
<h3 className="font-semibold">Notifications</h3>
</div>
<div className="max-h-64 overflow-y-auto">
<div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
<p className="text-sm font-medium text-gray-900">New admission request</p>
<p className="text-xs text-gray-500">2 minutes ago</p>
</div>
<div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
<p className="text-sm font-medium text-gray-900">Staff meeting reminder</p>
<p className="text-xs text-gray-500">1 hour ago</p>
</div>
<div className="px-4 py-3 hover:bg-gray-50">
<p className="text-sm font-medium text-gray-900">Fee payment due</p>
<p className="text-xs text-gray-500">5 hours ago</p>
</div>
</div>
<div className="px-4 py-2 border-t border-gray-200">
<button className="text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer !rounded-button whitespace-nowrap">View all notifications</button>
</div>
</div>
)}
</div>
<div className="relative">
<button
onClick={() => setShowProfileDropdown(!showProfileDropdown)}
className="flex items-center space-x-2 cursor-pointer !rounded-button whitespace-nowrap"
>
<img
src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20school%20principal%20or%20administrator%2C%20middle-aged%20person%20with%20a%20friendly%20smile%20wearing%20formal%20business%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait%20photograph&width=40&height=40&seq=2&orientation=squarish"
alt="Profile"
className="w-10 h-10 rounded-full object-cover"
/>
<span className="text-gray-700">Admin</span>
<i className="fas fa-chevron-down text-gray-500"></i>
</button>
{showProfileDropdown && (
<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
<a href="#profile" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">My Profile</a>
<a href="#account" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">Account Settings</a>
<div className="border-t border-gray-100 my-1"></div>
<a href="#logout" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">Logout</a>
</div>
)}
</div>
</div>
</div>
</header>
{/* Main Dashboard Content */}
<main className="flex-1 overflow-y-auto p-6 bg-gray-50">
{activeTab === 'dashboard' && (
<>
<div className="mb-8">
<h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
<p className="text-gray-600">Welcome back, Admin! Last login: June 3, 2025 at 09:15 AM</p>
</div>
{/* Stats Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-indigo-100 p-3 rounded-lg">
<i className="fas fa-user-graduate text-indigo-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Total Students</h3>
<p className="text-2xl font-bold text-gray-800">1,248</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-green-500 flex items-center">
<i className="fas fa-arrow-up mr-1"></i> 5.2%
</span>
<span className="text-gray-500 ml-2">from last month</span>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-green-100 p-3 rounded-lg">
<i className="fas fa-chalkboard-teacher text-green-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Today's Attendance</h3>
<p className="text-2xl font-bold text-gray-800">94%</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-green-500 flex items-center">
<i className="fas fa-arrow-up mr-1"></i> 1.8%
</span>
<span className="text-gray-500 ml-2">from yesterday</span>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-amber-100 p-3 rounded-lg">
<i className="fas fa-tasks text-amber-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Pending Tasks</h3>
<p className="text-2xl font-bold text-gray-800">12</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-red-500 flex items-center">
<i className="fas fa-arrow-up mr-1"></i> 3
</span>
<span className="text-gray-500 ml-2">from yesterday</span>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-red-100 p-3 rounded-lg">
<i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Alerts</h3>
<p className="text-2xl font-bold text-gray-800">5</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-red-500 flex items-center">
<i className="fas fa-arrow-up mr-1"></i> 2
</span>
<span className="text-gray-500 ml-2">from yesterday</span>
</div>
</div>
</div>
{/* Quick Access Modules */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
<div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
<div className="p-6">
<div className="flex items-center justify-between mb-4">
<h3 className="font-semibold text-lg text-gray-800">Academic Management</h3>
<i className="fas fa-graduation-cap text-indigo-600"></i>
</div>
<div className="space-y-3">
<div className="flex items-center justify-between">
<span className="text-sm text-gray-600">Timetables</span>
<span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Updated</span>
</div>
<div className="flex items-center justify-between">
<span className="text-sm text-gray-600">Lesson Plans</span>
<span className="text-xs bg-amber-100 text-amber-800 py-1 px-2 rounded-full">5 Pending</span>
</div>
<div className="flex items-center justify-between">
<span className="text-sm text-gray-600">Exams</span>
<span className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full">Upcoming</span>
</div>
</div>
</div>
<div className="bg-gray-50 px-6 py-3">
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">Manage Academic</button>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
<div className="p-6">
<div className="flex items-center justify-between mb-4">
<h3 className="font-semibold text-lg text-gray-800">Student Lifecycle</h3>
<i className="fas fa-user-graduate text-green-600"></i>
</div>
<div className="space-y-3">
<div className="flex items-center justify-between">
<span className="text-sm text-gray-600">Admissions</span>
<span className="text-xs bg-red-100 text-red-800 py-1 px-2 rounded-full">8 New</span>
</div>
<div className="flex items-center justify-between">
<span className="text-sm text-gray-600">Attendance</span>
<span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">94% Today</span>
</div>
<div className="flex items-center justify-between">
<span className="text-sm text-gray-600">Health Records</span>
<span className="text-xs bg-amber-100 text-amber-800 py-1 px-2 rounded-full">3 Updates</span>
</div>
</div>
</div>
<div className="bg-gray-50 px-6 py-3">
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">Manage Students</button>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
<div className="p-6">
<div className="flex items-center justify-between mb-4">
<h3 className="font-semibold text-lg text-gray-800">Financial Ecosystem</h3>
<i className="fas fa-money-bill-wave text-amber-600"></i>
</div>
<div className="space-y-3">
<div className="flex items-center justify-between">
<span className="text-sm text-gray-600">Fee Collection</span>
<span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">₹2.4M</span>
</div>
<div className="flex items-center justify-between">
<span className="text-sm text-gray-600">Pending Payments</span>
<span className="text-xs bg-red-100 text-red-800 py-1 px-2 rounded-full">₹320K</span>
</div>
<div className="flex items-center justify-between">
<span className="text-sm text-gray-600">Scholarships</span>
<span className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full">12 Active</span>
</div>
</div>
</div>
<div className="bg-gray-50 px-6 py-3">
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">Manage Finance</button>
</div>
</div>
</div>
{/* Charts & Calendar */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Attendance Trends</h3>
<div className="flex space-x-2">
<button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">Weekly</button>
<button className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">Monthly</button>
<button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">Yearly</button>
</div>
</div>
<div id="attendance-chart" className="w-full h-64"></div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Student Performance</h3>
<div>
<button className="text-gray-400 hover:text-gray-600 cursor-pointer !rounded-button whitespace-nowrap">
<i className="fas fa-ellipsis-v"></i>
</button>
</div>
</div>
<div id="performance-chart" className="w-full h-64"></div>
</div>
</div>
{/* Recent Activity & Calendar */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Recent Activity</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">View All</button>
</div>
<div className="space-y-4">
<div className="flex">
<div className="flex-shrink-0 w-10">
<div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
<i className="fas fa-user-plus text-green-600"></i>
</div>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">New student admission completed</p>
<p className="text-xs text-gray-500">Today at 10:30 AM</p>
</div>
</div>
<div className="flex">
<div className="flex-shrink-0 w-10">
<div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
<i className="fas fa-calendar-check text-blue-600"></i>
</div>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Staff meeting scheduled</p>
<p className="text-xs text-gray-500">Today at 02:00 PM</p>
</div>
</div>
<div className="flex">
<div className="flex-shrink-0 w-10">
<div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
<i className="fas fa-money-check-alt text-amber-600"></i>
</div>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Fee payment received</p>
<p className="text-xs text-gray-500">Today at 09:45 AM</p>
</div>
</div>
<div className="flex">
<div className="flex-shrink-0 w-10">
<div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
<i className="fas fa-exclamation-circle text-red-600"></i>
</div>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Low inventory alert: Science lab supplies</p>
<p className="text-xs text-gray-500">Yesterday at 04:15 PM</p>
</div>
</div>
<div className="flex">
<div className="flex-shrink-0 w-10">
<div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
<i className="fas fa-book text-indigo-600"></i>
</div>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">New curriculum update available</p>
<p className="text-xs text-gray-500">Yesterday at 11:30 AM</p>
</div>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Upcoming Events</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">View Calendar</button>
</div>
<div className="space-y-4">
<div className="flex items-center p-3 bg-indigo-50 rounded-lg">
<div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-lg flex flex-col items-center justify-center">
<span className="text-xs font-medium">JUN</span>
<span className="text-lg font-bold">05</span>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Staff Meeting</p>
<p className="text-xs text-gray-600">02:00 PM - 03:30 PM</p>
</div>
</div>
<div className="flex items-center p-3 bg-green-50 rounded-lg">
<div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-lg flex flex-col items-center justify-center">
<span className="text-xs font-medium">JUN</span>
<span className="text-lg font-bold">10</span>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Parent-Teacher Meeting</p>
<p className="text-xs text-gray-600">09:00 AM - 04:00 PM</p>
</div>
</div>
<div className="flex items-center p-3 bg-amber-50 rounded-lg">
<div className="flex-shrink-0 w-12 h-12 bg-amber-600 text-white rounded-lg flex flex-col items-center justify-center">
<span className="text-xs font-medium">JUN</span>
<span className="text-lg font-bold">15</span>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Science Exhibition</p>
<p className="text-xs text-gray-600">10:00 AM - 03:00 PM</p>
</div>
</div>
<div className="flex items-center p-3 bg-red-50 rounded-lg">
<div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-lg flex flex-col items-center justify-center">
<span className="text-xs font-medium">JUN</span>
<span className="text-lg font-bold">20</span>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Final Exam Preparation</p>
<p className="text-xs text-gray-600">All Day</p>
</div>
</div>
</div>
</div>
</div>
</>
)}
{activeTab === 'academic' && (
<div className="p-6 bg-gray-50">
<div className="mb-8">
<h1 className="text-2xl font-bold text-gray-800">Academic Management</h1>
<p className="text-gray-600">Manage timetables, curriculum, and academic activities</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-4">
<h3 className="font-semibold text-lg text-gray-800">Class Timetable</h3>
<button className="text-indigo-600 hover:text-indigo-800 !rounded-button whitespace-nowrap">
<i className="fas fa-plus"></i>
</button>
</div>
<div className="space-y-3">
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div>
<p className="text-sm font-medium text-gray-800">Grade 10 - Science</p>
<p className="text-xs text-gray-500">Mon-Fri, 8:00 AM - 2:30 PM</p>
</div>
<button className="text-gray-400 hover:text-gray-600 !rounded-button whitespace-nowrap">
<i className="fas fa-ellipsis-v"></i>
</button>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div>
<p className="text-sm font-medium text-gray-800">Grade 11 - Commerce</p>
<p className="text-xs text-gray-500">Mon-Fri, 9:00 AM - 3:30 PM</p>
</div>
<button className="text-gray-400 hover:text-gray-600 !rounded-button whitespace-nowrap">
<i className="fas fa-ellipsis-v"></i>
</button>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-4">
<h3 className="font-semibold text-lg text-gray-800">Lesson Plans</h3>
<button className="text-indigo-600 hover:text-indigo-800 !rounded-button whitespace-nowrap">
<i className="fas fa-plus"></i>
</button>
</div>
<div className="space-y-3">
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div>
<p className="text-sm font-medium text-gray-800">Physics - Wave Motion</p>
<p className="text-xs text-gray-500">Grade 10 • Week 3</p>
</div>
<span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Approved</span>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div>
<p className="text-sm font-medium text-gray-800">Chemistry - Organic</p>
<p className="text-xs text-gray-500">Grade 11 • Week 2</p>
</div>
<span className="text-xs bg-amber-100 text-amber-800 py-1 px-2 rounded-full">Pending</span>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-4">
<h3 className="font-semibold text-lg text-gray-800">Examinations</h3>
<button className="text-indigo-600 hover:text-indigo-800 !rounded-button whitespace-nowrap">
<i className="fas fa-plus"></i>
</button>
</div>
<div className="space-y-3">
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div>
<p className="text-sm font-medium text-gray-800">Mid-Term Examination</p>
<p className="text-xs text-gray-500">July 15-30, 2025</p>
</div>
<span className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full">Upcoming</span>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div>
<p className="text-sm font-medium text-gray-800">Unit Test - II</p>
<p className="text-xs text-gray-500">August 10-15, 2025</p>
</div>
<span className="text-xs bg-gray-100 text-gray-800 py-1 px-2 rounded-full">Scheduled</span>
</div>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Academic Calendar</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium !rounded-button whitespace-nowrap">View All</button>
</div>
<div className="space-y-4">
<div className="flex items-center p-3 bg-gray-50 rounded-lg">
<div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-lg flex flex-col items-center justify-center">
<span className="text-xs font-medium">JUN</span>
<span className="text-lg font-bold">15</span>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Science Exhibition</p>
<p className="text-xs text-gray-600">All Grades • Main Auditorium</p>
</div>
</div>
<div className="flex items-center p-3 bg-gray-50 rounded-lg">
<div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-lg flex flex-col items-center justify-center">
<span className="text-xs font-medium">JUN</span>
<span className="text-lg font-bold">20</span>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Sports Day</p>
<p className="text-xs text-gray-600">All Grades • Sports Ground</p>
</div>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Teacher Assignments</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium !rounded-button whitespace-nowrap">View All</button>
</div>
<div className="space-y-4">
<div className="flex items-center">
<img
src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20female%20teacher%20in%20her%2030s%20wearing%20smart%20casual%20attire%2C%20standing%20against%20a%20light%20background%20with%20a%20warm%20and%20approachable%20smile&width=40&height=40&seq=3&orientation=squarish"
alt="Teacher"
className="w-10 h-10 rounded-full"
/>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Ms. Sarah Johnson</p>
<p className="text-xs text-gray-500">Physics • Grade 10, 11</p>
</div>
<div className="ml-auto">
<span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Active</span>
</div>
</div>
<div className="flex items-center">
<img
src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20male%20teacher%20in%20his%2040s%20wearing%20a%20formal%20shirt%20and%20tie%2C%20captured%20against%20a%20neutral%20background%20with%20a%20confident%20and%20friendly%20expression&width=40&height=40&seq=4&orientation=squarish"
alt="Teacher"
className="w-10 h-10 rounded-full"
/>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Mr. Robert Chen</p>
<p className="text-xs text-gray-500">Mathematics • Grade 9, 10</p>
</div>
<div className="ml-auto">
<span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Active</span>
</div>
</div>
</div>
</div>
</div>
</div>
)}
{activeTab === 'students' && (
<div>
<div className="mb-8">
<h1 className="text-2xl font-bold text-gray-800">Student Management</h1>
<p className="text-gray-600">Manage student information, attendance, and academic records</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-4">
<h3 className="font-semibold text-lg text-gray-800">Quick Actions</h3>
<i className="fas fa-bolt text-amber-500"></i>
</div>
<div className="space-y-3">
<button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-2 px-4 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap">
<span>Add New Student</span>
<i className="fas fa-plus"></i>
</button>
<button className="w-full bg-green-50 hover:bg-green-100 text-green-600 py-2 px-4 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap">
<span>Take Attendance</span>
<i className="fas fa-check"></i>
</button>
<button className="w-full bg-amber-50 hover:bg-amber-100 text-amber-600 py-2 px-4 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap">
<span>Generate Reports</span>
<i className="fas fa-file-alt"></i>
</button>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-4">
<h3 className="font-semibold text-lg text-gray-800">Student Statistics</h3>
<i className="fas fa-chart-pie text-indigo-500"></i>
</div>
<div className="space-y-4">
<div className="flex justify-between items-center">
<span className="text-gray-600">Total Students</span>
<span className="font-semibold text-gray-800">1,248</span>
</div>
<div className="flex justify-between items-center">
<span className="text-gray-600">Present Today</span>
<span className="font-semibold text-green-600">1,172 (94%)</span>
</div>
<div className="flex justify-between items-center">
<span className="text-gray-600">On Leave</span>
<span className="font-semibold text-amber-600">76 (6%)</span>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-4">
<h3 className="font-semibold text-lg text-gray-800">Recent Activities</h3>
<i className="fas fa-history text-blue-500"></i>
</div>
<div className="space-y-3">
<div className="flex items-center text-sm">
<div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
<span className="text-gray-600">New admission in Grade 10</span>
</div>
<div className="flex items-center text-sm">
<div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
<span className="text-gray-600">Updated health records</span>
</div>
<div className="flex items-center text-sm">
<div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
<span className="text-gray-600">Fee payment reminder sent</span>
</div>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
<div className="p-6">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Student Directory</h3>
<div className="flex space-x-2">
<div className="relative">
<input
type="text"
placeholder="Search students..."
className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
/>
<span className="absolute left-3 top-2.5 text-gray-400">
<i className="fas fa-search"></i>
</span>
</div>
<button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center !rounded-button whitespace-nowrap">
<i className="fas fa-filter mr-2"></i>
Filter
</button>
</div>
</div>
<div className="overflow-x-auto">
<table className="min-w-full">
<thead>
<tr className="bg-gray-50">
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
</tr>
</thead>
<tbody className="bg-white divide-y divide-gray-200">
{[1, 2, 3, 4, 5].map((item) => (
<tr key={item} className="hover:bg-gray-50">
<td className="px-6 py-4 whitespace-nowrap">
<div className="flex items-center">
<img
src={`https://readdy.ai/api/search-image?query=Professional%20student%20portrait%20photo%20of%20a%20teenage%20student%20in%20school%20uniform%20with%20a%20natural%20smile%20against%20a%20light%20background%2C%20school%20ID%20photo%20style&width=40&height=40&seq=${item}&orientation=squarish`}
alt="Student"
className="w-8 h-8 rounded-full"
/>
<div className="ml-3">
<p className="text-sm font-medium text-gray-900">Student Name {item}</p>
<p className="text-xs text-gray-500">student{item}@email.com</p>
</div>
</div>
</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">STU2025{item.toString().padStart(4, '0')}</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Grade {10 + (item % 3)}</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">98%</td>
<td className="px-6 py-4 whitespace-nowrap">
<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
item % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
}`}>
{item % 2 === 0 ? 'Active' : 'On Leave'}
</span>
</td>
<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
<button className="text-indigo-600 hover:text-indigo-900 mr-3 !rounded-button whitespace-nowrap">
<i className="fas fa-edit"></i>
</button>
<button className="text-gray-600 hover:text-gray-900 !rounded-button whitespace-nowrap">
<i className="fas fa-ellipsis-v"></i>
</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
<div className="flex items-center justify-between px-6 py-4 bg-gray-50">
<div className="text-sm text-gray-500">
Showing 1 to 5 of 1,248 entries
</div>
<div className="flex space-x-2">
<button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100 !rounded-button whitespace-nowrap">Previous</button>
<button className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 !rounded-button whitespace-nowrap">Next</button>
</div>
</div>
</div>
</div>
</div>
)}
{activeTab === 'finance' && (
<div>
<div className="mb-8">
<h1 className="text-2xl font-bold text-gray-800">Financial Management</h1>
<p className="text-gray-600">Track and manage school finances, fees, and transactions</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-green-100 p-3 rounded-lg">
<i className="fas fa-money-bill-wave text-green-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
<p className="text-2xl font-bold text-gray-800">₹24.5M</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-green-500 flex items-center">
<i className="fas fa-arrow-up mr-1"></i> 8.2%
</span>
<span className="text-gray-500 ml-2">from last month</span>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-red-100 p-3 rounded-lg">
<i className="fas fa-file-invoice text-red-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Pending Fees</h3>
<p className="text-2xl font-bold text-gray-800">₹320K</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-red-500 flex items-center">
<i className="fas fa-arrow-up mr-1"></i> 12 students
</span>
<span className="text-gray-500 ml-2">overdue</span>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-amber-100 p-3 rounded-lg">
<i className="fas fa-hand-holding-usd text-amber-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Scholarships</h3>
<p className="text-2xl font-bold text-gray-800">₹450K</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-amber-500 flex items-center">
<i className="fas fa-user-graduate mr-1"></i> 24
</span>
<span className="text-gray-500 ml-2">students</span>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-blue-100 p-3 rounded-lg">
<i className="fas fa-chart-line text-blue-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Expenses</h3>
<p className="text-2xl font-bold text-gray-800">₹890K</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-blue-500 flex items-center">
<i className="fas fa-arrow-down mr-1"></i> 3.1%
</span>
<span className="text-gray-500 ml-2">from last month</span>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Recent Transactions</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">View All</button>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
<div className="flex items-center">
<div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
<i className="fas fa-arrow-down text-green-600"></i>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Fee Payment Received</p>
<p className="text-xs text-gray-500">From: Student ID ST2025</p>
</div>
</div>
<div className="text-right">
<p className="text-sm font-medium text-green-600">+ ₹45,000</p>
<p className="text-xs text-gray-500">Today, 10:30 AM</p>
</div>
</div>
<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
<div className="flex items-center">
<div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
<i className="fas fa-arrow-up text-red-600"></i>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Salary Disbursement</p>
<p className="text-xs text-gray-500">Staff Payments</p>
</div>
</div>
<div className="text-right">
<p className="text-sm font-medium text-red-600">- ₹280,000</p>
<p className="text-xs text-gray-500">Yesterday, 5:30 PM</p>
</div>
</div>
<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
<div className="flex items-center">
<div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
<i className="fas fa-arrow-up text-amber-600"></i>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Utility Payment</p>
<p className="text-xs text-gray-500">Electricity Bill</p>
</div>
</div>
<div className="text-right">
<p className="text-sm font-medium text-red-600">- ₹35,000</p>
<p className="text-xs text-gray-500">Jun 2, 2:15 PM</p>
</div>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Fee Collection Status</h3>
<div className="flex space-x-2">
<button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">Monthly</button>
<button className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">Quarterly</button>
<button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">Yearly</button>
</div>
</div>
<div className="space-y-4">
<div className="relative pt-1">
<div className="flex mb-2 items-center justify-between">
<div>
<span className="text-xs font-semibold inline-block text-gray-800">Grade 10</span>
</div>
<div className="text-right">
<span className="text-xs font-semibold inline-block text-gray-800">92%</span>
</div>
</div>
<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
<div style={{ width: '92%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
</div>
</div>
<div className="relative pt-1">
<div className="flex mb-2 items-center justify-between">
<div>
<span className="text-xs font-semibold inline-block text-gray-800">Grade 11</span>
</div>
<div className="text-right">
<span className="text-xs font-semibold inline-block text-gray-800">85%</span>
</div>
</div>
<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
<div style={{ width: '85%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
</div>
</div>
<div className="relative pt-1">
<div className="flex mb-2 items-center justify-between">
<div>
<span className="text-xs font-semibold inline-block text-gray-800">Grade 12</span>
</div>
<div className="text-right">
<span className="text-xs font-semibold inline-block text-gray-800">78%</span>
</div>
</div>
<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
<div style={{ width: '78%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-500"></div>
</div>
</div>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Quick Actions</h3>
<i className="fas fa-bolt text-amber-500"></i>
</div>
<div className="space-y-3">
<button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-2 px-4 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap">
<span>Record Payment</span>
<i className="fas fa-plus"></i>
</button>
<button className="w-full bg-green-50 hover:bg-green-100 text-green-600 py-2 px-4 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap">
<span>Generate Invoice</span>
<i className="fas fa-file-invoice"></i>
</button>
<button className="w-full bg-amber-50 hover:bg-amber-100 text-amber-600 py-2 px-4 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap">
<span>Send Reminders</span>
<i className="fas fa-bell"></i>
</button>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Payment Methods</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">Configure</button>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div className="flex items-center">
<i className="fab fa-cc-visa text-blue-600 text-2xl"></i>
<span className="ml-3 text-sm text-gray-600">Online Payment</span>
</div>
<span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Active</span>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div className="flex items-center">
<i className="fas fa-university text-gray-600 text-2xl"></i>
<span className="ml-3 text-sm text-gray-600">Bank Transfer</span>
</div>
<span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Active</span>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div className="flex items-center">
<i className="fas fa-money-bill-wave text-green-600 text-2xl"></i>
<span className="ml-3 text-sm text-gray-600">Cash Payment</span>
</div>
<span className="text-xs bg-amber-100 text-amber-800 py-1 px-2 rounded-full">Limited</span>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Recent Notifications</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">View All</button>
</div>
<div className="space-y-4">
<div className="flex items-center text-sm">
<div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
<span className="text-gray-600">3 fee payments overdue</span>
</div>
<div className="flex items-center text-sm">
<div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
<span className="text-gray-600">Monthly report generated</span>
</div>
<div className="flex items-center text-sm">
<div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
<span className="text-gray-600">New scholarship application</span>
</div>
</div>
</div>
</div>
</div>
)}
{activeTab === 'operations' && (
<div>
<div className="mb-8">
<h1 className="text-2xl font-bold text-gray-800">Operations Management</h1>
<p className="text-gray-600">Manage facilities, inventory, and school operations</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-blue-100 p-3 rounded-lg">
<i className="fas fa-building text-blue-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Facilities</h3>
<p className="text-2xl font-bold text-gray-800">24</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-blue-500 flex items-center">
<i className="fas fa-check-circle mr-1"></i> All Operational
</span>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-amber-100 p-3 rounded-lg">
<i className="fas fa-boxes text-amber-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Inventory Items</h3>
<p className="text-2xl font-bold text-gray-800">1,248</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-red-500 flex items-center">
<i className="fas fa-exclamation-circle mr-1"></i> 15 Low Stock
</span>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-green-100 p-3 rounded-lg">
<i className="fas fa-tasks text-green-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Maintenance</h3>
<p className="text-2xl font-bold text-gray-800">8</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-amber-500 flex items-center">
<i className="fas fa-clock mr-1"></i> Tasks Pending
</span>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-purple-100 p-3 rounded-lg">
<i className="fas fa-calendar-check text-purple-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Events Today</h3>
<p className="text-2xl font-bold text-gray-800">3</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-purple-500 flex items-center">
<i className="fas fa-info-circle mr-1"></i> All Scheduled
</span>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Facility Status</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">View All</button>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
<div className="flex items-center">
<div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
<i className="fas fa-flask text-green-600"></i>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Science Labs</p>
<p className="text-xs text-gray-500">All equipment operational</p>
</div>
</div>
<span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Active</span>
</div>
<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
<div className="flex items-center">
<div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
<i className="fas fa-basketball-ball text-amber-600"></i>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Sports Complex</p>
<p className="text-xs text-gray-500">Maintenance scheduled</p>
</div>
</div>
<span className="text-xs bg-amber-100 text-amber-800 py-1 px-2 rounded-full">Scheduled</span>
</div>
<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
<div className="flex items-center">
<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
<i className="fas fa-book text-blue-600"></i>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Library</p>
<p className="text-xs text-gray-500">New books being cataloged</p>
</div>
</div>
<span className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full">In Use</span>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Maintenance Schedule</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">Add Task</button>
</div>
<div className="space-y-4">
<div className="flex items-center">
<div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-lg flex flex-col items-center justify-center">
<span className="text-xs font-medium">JUN</span>
<span className="text-lg font-bold">05</span>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">AC Maintenance</p>
<p className="text-xs text-gray-500">All Classrooms • 9:00 AM</p>
</div>
<div className="ml-auto">
<span className="text-xs bg-red-100 text-red-800 py-1 px-2 rounded-full">High Priority</span>
</div>
</div>
<div className="flex items-center">
<div className="flex-shrink-0 w-12 h-12 bg-amber-600 text-white rounded-lg flex flex-col items-center justify-center">
<span className="text-xs font-medium">JUN</span>
<span className="text-lg font-bold">08</span>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Lab Equipment Check</p>
<p className="text-xs text-gray-500">Science Labs • 2:00 PM</p>
</div>
<div className="ml-auto">
<span className="text-xs bg-amber-100 text-amber-800 py-1 px-2 rounded-full">Medium Priority</span>
</div>
</div>
<div className="flex items-center">
<div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-lg flex flex-col items-center justify-center">
<span className="text-xs font-medium">JUN</span>
<span className="text-lg font-bold">10</span>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Garden Maintenance</p>
<p className="text-xs text-gray-500">School Grounds • 8:00 AM</p>
</div>
<div className="ml-auto">
<span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Low Priority</span>
</div>
</div>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Quick Actions</h3>
<i className="fas fa-bolt text-amber-500"></i>
</div>
<div className="space-y-3">
<button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-2 px-4 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap">
<span>Report Issue</span>
<i className="fas fa-plus"></i>
</button>
<button className="w-full bg-green-50 hover:bg-green-100 text-green-600 py-2 px-4 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap">
<span>Schedule Maintenance</span>
<i className="fas fa-calendar-plus"></i>
</button>
<button className="w-full bg-amber-50 hover:bg-amber-100 text-amber-600 py-2 px-4 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap">
<span>Order Supplies</span>
<i className="fas fa-shopping-cart"></i>
</button>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Low Stock Items</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">Order Now</button>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div className="flex items-center">
<i className="fas fa-pencil-alt text-gray-400"></i>
<span className="ml-3 text-sm text-gray-600">Stationery Items</span>
</div>
<span className="text-xs bg-red-100 text-red-800 py-1 px-2 rounded-full">Critical</span>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div className="flex items-center">
<i className="fas fa-flask text-gray-400"></i>
<span className="ml-3 text-sm text-gray-600">Lab Supplies</span>
</div>
<span className="text-xs bg-amber-100 text-amber-800 py-1 px-2 rounded-full">Low</span>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div className="flex items-center">
<i className="fas fa-first-aid text-gray-400"></i>
<span className="ml-3 text-sm text-gray-600">Medical Supplies</span>
</div>
<span className="text-xs bg-amber-100 text-amber-800 py-1 px-2 rounded-full">Low</span>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Recent Activities</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">View All</button>
</div>
<div className="space-y-4">
<div className="flex items-center text-sm">
<div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
<span className="text-gray-600">New maintenance request filed</span>
</div>
<div className="flex items-center text-sm">
<div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
<span className="text-gray-600">Inventory check completed</span>
</div>
<div className="flex items-center text-sm">
<div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
<span className="text-gray-600">Supply order delivered</span>
</div>
</div>
</div>
</div>
</div>
)}
{activeTab === 'communication' && (
<div>
<div className="mb-8">
<h1 className="text-2xl font-bold text-gray-800">Communication Center</h1>
<p className="text-gray-600">Manage all school communications and announcements</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-indigo-100 p-3 rounded-lg">
<i className="fas fa-envelope text-indigo-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Messages</h3>
<p className="text-2xl font-bold text-gray-800">128</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-indigo-500 flex items-center">
<i className="fas fa-arrow-up mr-1"></i> 12 New
</span>
<span className="text-gray-500 ml-2">today</span>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-green-100 p-3 rounded-lg">
<i className="fas fa-bullhorn text-green-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Announcements</h3>
<p className="text-2xl font-bold text-gray-800">45</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-green-500 flex items-center">
<i className="fas fa-check mr-1"></i> 3 Active
</span>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-amber-100 p-3 rounded-lg">
<i className="fas fa-calendar-alt text-amber-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Events</h3>
<p className="text-2xl font-bold text-gray-800">8</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-amber-500 flex items-center">
<i className="fas fa-clock mr-1"></i> Upcoming
</span>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-red-100 p-3 rounded-lg">
<i className="fas fa-flag text-red-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Reports</h3>
<p className="text-2xl font-bold text-gray-800">15</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-red-500 flex items-center">
<i className="fas fa-exclamation-circle mr-1"></i> Pending
</span>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Recent Messages</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">View All</button>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
<div className="flex items-center">
<img
src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20female%20parent%20in%20her%2030s%20with%20a%20warm%20smile%20wearing%20casual%20business%20attire%20against%20a%20neutral%20background&width=40&height=40&seq=10&orientation=squarish"
alt="Parent"
className="w-10 h-10 rounded-full"
/>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Sarah Parker</p>
<p className="text-xs text-gray-500">Regarding: Student Leave Application</p>
</div>
</div>
<span className="text-xs bg-red-100 text-red-800 py-1 px-2 rounded-full">New</span>
</div>
<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
<div className="flex items-center">
<img
src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20male%20teacher%20in%20his%2040s%20wearing%20formal%20attire%20with%20glasses%20against%20a%20light%20background&width=40&height=40&seq=11&orientation=squarish"
alt="Teacher"
className="w-10 h-10 rounded-full"
/>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">John Smith</p>
<p className="text-xs text-gray-500">Subject: Class Performance Report</p>
</div>
</div>
<span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Replied</span>
</div>
<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
<div className="flex items-center">
<img
src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20female%20administrator%20in%20her%2050s%20with%20a%20professional%20appearance%20against%20an%20office%20background&width=40&height=40&seq=12&orientation=squarish"
alt="Staff"
className="w-10 h-10 rounded-full"
/>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Mary Johnson</p>
<p className="text-xs text-gray-500">Re: Staff Meeting Minutes</p>
</div>
</div>
<span className="text-xs bg-gray-100 text-gray-800 py-1 px-2 rounded-full">Read</span>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Active Announcements</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">Create New</button>
</div>
<div className="space-y-4">
<div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
<div className="flex items-center justify-between mb-2">
<h4 className="font-medium text-indigo-900">Annual Sports Day</h4>
<span className="text-xs bg-indigo-100 text-indigo-800 py-1 px-2 rounded-full">Featured</span>
</div>
<p className="text-sm text-indigo-700 mb-3">Annual sports day will be held on June 20th. All students must register by June 15th.</p>
<div className="flex items-center justify-between text-xs text-indigo-600">
<span>Posted: June 3, 2025</span>
<span>Valid till: June 15, 2025</span>
</div>
</div>
<div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
<div className="flex items-center justify-between mb-2">
<h4 className="font-medium text-amber-900">Parent-Teacher Meeting</h4>
<span className="text-xs bg-amber-100 text-amber-800 py-1 px-2 rounded-full">Important</span>
</div>
<p className="text-sm text-amber-700 mb-3">Quarterly parent-teacher meeting scheduled for next week. Please book your slots.</p>
<div className="flex items-center justify-between text-xs text-amber-600">
<span>Posted: June 2, 2025</span>
<span>Valid till: June 10, 2025</span>
</div>
</div>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Quick Actions</h3>
<i className="fas fa-bolt text-amber-500"></i>
</div>
<div className="space-y-3">
<button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-2 px-4 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap">
<span>Send Message</span>
<i className="fas fa-paper-plane"></i>
</button>
<button className="w-full bg-green-50 hover:bg-green-100 text-green-600 py-2 px-4 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap">
<span>New Announcement</span>
<i className="fas fa-bullhorn"></i>
</button>
<button className="w-full bg-amber-50 hover:bg-amber-100 text-amber-600 py-2 px-4 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap">
<span>Schedule Event</span>
<i className="fas fa-calendar-plus"></i>
</button>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Communication Stats</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">View Report</button>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div className="flex items-center">
<i className="fas fa-envelope text-gray-400"></i>
<span className="ml-3 text-sm text-gray-600">Messages Sent</span>
</div>
<span className="text-sm font-medium text-gray-800">1,234</span>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div className="flex items-center">
<i className="fas fa-eye text-gray-400"></i>
<span className="ml-3 text-sm text-gray-600">Read Rate</span>
</div>
<span className="text-sm font-medium text-gray-800">92%</span>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div className="flex items-center">
<i className="fas fa-reply text-gray-400"></i>
<span className="ml-3 text-sm text-gray-600">Response Rate</span>
</div>
<span className="text-sm font-medium text-gray-800">85%</span>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Message Templates</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">Add New</button>
</div>
<div className="space-y-4">
<div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
<p className="text-sm font-medium text-gray-800">Leave Application Response</p>
<p className="text-xs text-gray-500 mt-1">Standard template for leave approvals</p>
</div>
<div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
<p className="text-sm font-medium text-gray-800">Event Reminder</p>
<p className="text-xs text-gray-500 mt-1">Reminder template for school events</p>
</div>
<div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
<p className="text-sm font-medium text-gray-800">Fee Payment Notice</p>
<p className="text-xs text-gray-500 mt-1">Payment reminder template</p>
</div>
</div>
</div>
</div>
</div>
)}
{activeTab === 'analytics' && (
<div>
<div className="mb-8">
<h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
<p className="text-gray-600">Comprehensive data analysis and insights</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-purple-100 p-3 rounded-lg">
<i className="fas fa-chart-line text-purple-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Performance Index</h3>
<p className="text-2xl font-bold text-gray-800">87.5%</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-green-500 flex items-center">
<i className="fas fa-arrow-up mr-1"></i> 3.2%
</span>
<span className="text-gray-500 ml-2">from last term</span>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-blue-100 p-3 rounded-lg">
<i className="fas fa-user-graduate text-blue-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Student Growth</h3>
<p className="text-2xl font-bold text-gray-800">+15%</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-green-500 flex items-center">
<i className="fas fa-arrow-up mr-1"></i> 2.4%
</span>
<span className="text-gray-500 ml-2">yearly increase</span>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-green-100 p-3 rounded-lg">
<i className="fas fa-chart-pie text-green-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Resource Utilization</h3>
<p className="text-2xl font-bold text-gray-800">92%</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-green-500 flex items-center">
<i className="fas fa-check-circle mr-1"></i> Optimal
</span>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-amber-100 p-3 rounded-lg">
<i className="fas fa-trophy text-amber-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Achievement Rate</h3>
<p className="text-2xl font-bold text-gray-800">94%</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-amber-500 flex items-center">
<i className="fas fa-star mr-1"></i> Excellence
</span>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Academic Performance Trends</h3>
<div className="flex space-x-2">
<button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">Term</button>
<button className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">Year</button>
<button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">All</button>
</div>
</div>
<div className="space-y-4">
<div className="relative pt-1">
<div className="flex mb-2 items-center justify-between">
<div>
<span className="text-xs font-semibold inline-block text-gray-800">Science</span>
</div>
<div className="text-right">
<span className="text-xs font-semibold inline-block text-gray-800">92%</span>
</div>
</div>
<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
<div style={{ width: '92%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
</div>
</div>
<div className="relative pt-1">
<div className="flex mb-2 items-center justify-between">
<div>
<span className="text-xs font-semibold inline-block text-gray-800">Mathematics</span>
</div>
<div className="text-right">
<span className="text-xs font-semibold inline-block text-gray-800">88%</span>
</div>
</div>
<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
<div style={{ width: '88%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
</div>
</div>
<div className="relative pt-1">
<div className="flex mb-2 items-center justify-between">
<div>
<span className="text-xs font-semibold inline-block text-gray-800">Languages</span>
</div>
<div className="text-right">
<span className="text-xs font-semibold inline-block text-gray-800">85%</span>
</div>
</div>
<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
<div style={{ width: '85%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
</div>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Resource Distribution</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">View Details</button>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
<div className="flex items-center">
<div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
<i className="fas fa-book text-purple-600"></i>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Learning Materials</p>
<p className="text-xs text-gray-500">Digital and Physical Resources</p>
</div>
</div>
<span className="text-sm font-medium text-gray-800">35%</span>
</div>
<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
<div className="flex items-center">
<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
<i className="fas fa-laptop text-blue-600"></i>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Technology</p>
<p className="text-xs text-gray-500">Infrastructure & Equipment</p>
</div>
</div>
<span className="text-sm font-medium text-gray-800">28%</span>
</div>
<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
<div className="flex items-center">
<div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
<i className="fas fa-users text-green-600"></i>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Human Resources</p>
<p className="text-xs text-gray-500">Staff Development</p>
</div>
</div>
<span className="text-sm font-medium text-gray-800">37%</span>
</div>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Quick Insights</h3>
<i className="fas fa-lightbulb text-amber-500"></i>
</div>
<div className="space-y-4">
<div className="p-4 bg-green-50 border border-green-100 rounded-lg">
<div className="flex items-center mb-2">
<i className="fas fa-arrow-up text-green-600 mr-2"></i>
<h4 className="font-medium text-green-900">Improved Performance</h4>
</div>
<p className="text-sm text-green-700">Science grades show 15% improvement in last quarter</p>
</div>
<div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
<div className="flex items-center mb-2">
<i className="fas fa-exclamation-circle text-amber-600 mr-2"></i>
<h4 className="font-medium text-amber-900">Attention Needed</h4>
</div>
<p className="text-sm text-amber-700">Mathematics attendance dropped by 5%</p>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Key Metrics</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">Export</button>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<span className="text-sm text-gray-600">Student-Teacher Ratio</span>
<span className="text-sm font-medium text-gray-800">18:1</span>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<span className="text-sm text-gray-600">Course Completion Rate</span>
<span className="text-sm font-medium text-gray-800">95%</span>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<span className="text-sm text-gray-600">Student Satisfaction</span>
<span className="text-sm font-medium text-gray-800">4.5/5</span>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Recommendations</h3>
<i className="fas fa-clipboard-list text-indigo-500"></i>
</div>
<div className="space-y-4">
<div className="p-3 bg-gray-50 rounded-lg">
<p className="text-sm font-medium text-gray-800">Increase STEM Resources</p>
<p className="text-xs text-gray-500 mt-1">Based on student performance trends</p>
</div>
<div className="p-3 bg-gray-50 rounded-lg">
<p className="text-sm font-medium text-gray-800">Schedule Teacher Training</p>
<p className="text-xs text-gray-500 mt-1">For new technology adoption</p>
</div>
<div className="p-3 bg-gray-50 rounded-lg">
<p className="text-sm font-medium text-gray-800">Review Attendance Policy</p>
<p className="text-xs text-gray-500 mt-1">To improve participation rates</p>
</div>
</div>
</div>
</div>
</div>
)}
{activeTab === 'settings' && (
<div>
<div className="mb-8">
<h1 className="text-2xl font-bold text-gray-800">System Settings</h1>
<p className="text-gray-600">Configure and manage system preferences</p>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">General Settings</h3>
<i className="fas fa-sliders-h text-indigo-500"></i>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div className="flex items-center">
<i className="fas fa-globe text-gray-400 w-5"></i>
<span className="ml-3 text-sm text-gray-600">Language</span>
</div>
<button className="text-sm text-gray-600 hover:text-indigo-600 !rounded-button whitespace-nowrap">English (US)</button>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div className="flex items-center">
<i className="fas fa-clock text-gray-400 w-5"></i>
<span className="ml-3 text-sm text-gray-600">Time Zone</span>
</div>
<button className="text-sm text-gray-600 hover:text-indigo-600 !rounded-button whitespace-nowrap">UTC +05:30</button>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div className="flex items-center">
<i className="fas fa-palette text-gray-400 w-5"></i>
<span className="ml-3 text-sm text-gray-600">Theme</span>
</div>
<button className="text-sm text-gray-600 hover:text-indigo-600 !rounded-button whitespace-nowrap">Light Mode</button>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Notifications</h3>
<i className="fas fa-bell text-amber-500"></i>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div className="flex items-center">
<i className="fas fa-envelope text-gray-400 w-5"></i>
<span className="ml-3 text-sm text-gray-600">Email Notifications</span>
</div>
<button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-indigo-600 !rounded-button whitespace-nowrap">
<span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out"></span>
</button>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div className="flex items-center">
<i className="fas fa-mobile-alt text-gray-400 w-5"></i>
<span className="ml-3 text-sm text-gray-600">SMS Alerts</span>
</div>
<button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-gray-200 !rounded-button whitespace-nowrap">
<span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out"></span>
</button>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div className="flex items-center">
<i className="fas fa-desktop text-gray-400 w-5"></i>
<span className="ml-3 text-sm text-gray-600">Desktop Alerts</span>
</div>
<button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-indigo-600 !rounded-button whitespace-nowrap">
<span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out"></span>
</button>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Security</h3>
<i className="fas fa-shield-alt text-green-500"></i>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div className="flex items-center">
<i className="fas fa-key text-gray-400 w-5"></i>
<span className="ml-3 text-sm text-gray-600">Two-Factor Auth</span>
</div>
<button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-indigo-600 !rounded-button whitespace-nowrap">
<span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out"></span>
</button>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div className="flex items-center">
<i className="fas fa-history text-gray-400 w-5"></i>
<span className="ml-3 text-sm text-gray-600">Login History</span>
</div>
<button className="text-sm text-indigo-600 hover:text-indigo-800 !rounded-button whitespace-nowrap">View</button>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div className="flex items-center">
<i className="fas fa-lock text-gray-400 w-5"></i>
<span className="ml-3 text-sm text-gray-600">Password</span>
</div>
<button className="text-sm text-indigo-600 hover:text-indigo-800 !rounded-button whitespace-nowrap">Change</button>
</div>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">System Information</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">Update</button>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<span className="text-sm text-gray-600">Version</span>
<span className="text-sm font-medium text-gray-800">2.5.0</span>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<span className="text-sm text-gray-600">Last Updated</span>
<span className="text-sm font-medium text-gray-800">June 1, 2025</span>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<span className="text-sm text-gray-600">Server Status</span>
<span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Operational</span>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<span className="text-sm text-gray-600">Storage Used</span>
<span className="text-sm font-medium text-gray-800">45.8 GB / 100 GB</span>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Backup & Recovery</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">Configure</button>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div className="flex items-center">
<i className="fas fa-cloud-upload-alt text-gray-400 w-5"></i>
<span className="ml-3 text-sm text-gray-600">Auto Backup</span>
</div>
<button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-indigo-600 !rounded-button whitespace-nowrap">
<span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out"></span>
</button>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<span className="text-sm text-gray-600">Last Backup</span>
<span className="text-sm font-medium text-gray-800">June 2, 2025 10:30 PM</span>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<span className="text-sm text-gray-600">Backup Size</span>
<span className="text-sm font-medium text-gray-800">2.3 GB</span>
</div>
<button className="w-full mt-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-2 px-4 rounded-lg flex items-center justify-center !rounded-button whitespace-nowrap">
<i className="fas fa-download mr-2"></i>
<span>Download Latest Backup</span>
</button>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">API Integration</h3>
<i className="fas fa-code text-purple-500"></i>
</div>
<div className="space-y-4">
<div className="p-3 bg-gray-50 rounded-lg">
<div className="flex items-center justify-between mb-2">
<span className="text-sm font-medium text-gray-800">API Status</span>
<span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Active</span>
</div>
<p className="text-xs text-gray-500">Last checked: 5 minutes ago</p>
</div>
<button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-2 px-4 rounded-lg flex items-center justify-center !rounded-button whitespace-nowrap">
<i className="fas fa-key mr-2"></i>
<span>Generate New Key</span>
</button>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Data Management</h3>
<i className="fas fa-database text-blue-500"></i>
</div>
<div className="space-y-4">
<div className="p-3 bg-gray-50 rounded-lg">
<div className="flex items-center justify-between mb-2">
<span className="text-sm font-medium text-gray-800">Data Cleanup</span>
<button className="text-sm text-indigo-600 hover:text-indigo-800 !rounded-button whitespace-nowrap">Run</button>
</div>
<p className="text-xs text-gray-500">Last cleanup: 7 days ago</p>
</div>
<button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-2 px-4 rounded-lg flex items-center justify-center !rounded-button whitespace-nowrap">
<i className="fas fa-file-export mr-2"></i>
<span>Export Data</span>
</button>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Support</h3>
<i className="fas fa-headset text-green-500"></i>
</div>
<div className="space-y-4">
<div className="p-3 bg-gray-50 rounded-lg">
<p className="text-sm font-medium text-gray-800">Need Help?</p>
<p className="text-xs text-gray-500 mt-1">Contact our support team</p>
</div>
<button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-2 px-4 rounded-lg flex items-center justify-center !rounded-button whitespace-nowrap">
<i className="fas fa-envelope mr-2"></i>
<span>Contact Support</span>
</button>
</div>
</div>
</div>
</div>
)}
{activeTab === 'hr' && (
<div>
<div className="mb-8">
<h1 className="text-2xl font-bold text-gray-800">Human Resources</h1>
<p className="text-gray-600">Manage staff, recruitment, and employee relations</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-blue-100 p-3 rounded-lg">
<i className="fas fa-user-tie text-blue-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Total Staff</h3>
<p className="text-2xl font-bold text-gray-800">124</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-green-500 flex items-center">
<i className="fas fa-arrow-up mr-1"></i> 4
</span>
<span className="text-gray-500 ml-2">new this month</span>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-green-100 p-3 rounded-lg">
<i className="fas fa-chalkboard-teacher text-green-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Teaching Staff</h3>
<p className="text-2xl font-bold text-gray-800">82</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-green-500 flex items-center">
<i className="fas fa-check-circle mr-1"></i> 98%
</span>
<span className="text-gray-500 ml-2">attendance</span>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-amber-100 p-3 rounded-lg">
<i className="fas fa-briefcase text-amber-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Open Positions</h3>
<p className="text-2xl font-bold text-gray-800">6</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-amber-500 flex items-center">
<i className="fas fa-clock mr-1"></i> Active
</span>
<span className="text-gray-500 ml-2">recruitments</span>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-purple-100 p-3 rounded-lg">
<i className="fas fa-certificate text-purple-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Training Programs</h3>
<p className="text-2xl font-bold text-gray-800">8</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-purple-500 flex items-center">
<i className="fas fa-users mr-1"></i> 45
</span>
<span className="text-gray-500 ml-2">enrolled</span>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Staff Directory</h3>
<div className="flex space-x-2">
<div className="relative">
<input
type="text"
placeholder="Search staff..."
className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
/>
<span className="absolute left-3 top-2.5 text-gray-400">
<i className="fas fa-search"></i>
</span>
</div>
<button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center !rounded-button whitespace-nowrap">
<i className="fas fa-plus mr-2"></i>
Add Staff
</button>
</div>
</div>
<div className="space-y-4">
{[1, 2, 3, 4].map((item) => (
<div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
<div className="flex items-center">
<img
src={`https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20a%20school%20teacher%20or%20staff%20member%20in%20business%20attire%20with%20a%20friendly%20expression%20against%20a%20light%20background&width=40&height=40&seq=${item + 20}&orientation=squarish`}
alt="Staff"
className="w-10 h-10 rounded-full"
/>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Staff Name {item}</p>
<p className="text-xs text-gray-500">{item % 2 === 0 ? 'Mathematics Teacher' : 'Science Teacher'}</p>
</div>
</div>
<div className="flex items-center space-x-2">
<button className="text-gray-400 hover:text-indigo-600 !rounded-button whitespace-nowrap">
<i className="fas fa-envelope"></i>
</button>
<button className="text-gray-400 hover:text-indigo-600 !rounded-button whitespace-nowrap">
<i className="fas fa-phone"></i>
</button>
<button className="text-gray-400 hover:text-gray-600 !rounded-button whitespace-nowrap">
<i className="fas fa-ellipsis-v"></i>
</button>
</div>
</div>
))}
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Recruitment Pipeline</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">View All</button>
</div>
<div className="space-y-6">
<div className="relative">
<div className="flex items-center mb-4">
<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
<span className="text-sm font-medium text-blue-600">12</span>
</div>
<div className="ml-4">
<h4 className="text-sm font-medium text-gray-800">Applications</h4>
<p className="text-xs text-gray-500">New applications received</p>
</div>
</div>
<div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
</div>
<div className="relative">
<div className="flex items-center mb-4">
<div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
<span className="text-sm font-medium text-amber-600">8</span>
</div>
<div className="ml-4">
<h4 className="text-sm font-medium text-gray-800">Screening</h4>
<p className="text-xs text-gray-500">Candidates under review</p>
</div>
</div>
<div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
</div>
<div className="relative">
<div className="flex items-center mb-4">
<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
<span className="text-sm font-medium text-green-600">4</span>
</div>
<div className="ml-4">
<h4 className="text-sm font-medium text-gray-800">Interviews</h4>
<p className="text-xs text-gray-500">Scheduled for this week</p>
</div>
</div>
<div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
</div>
<div className="relative">
<div className="flex items-center">
<div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
<span className="text-sm font-medium text-purple-600">2</span>
</div>
<div className="ml-4">
<h4 className="text-sm font-medium text-gray-800">Offers</h4>
<p className="text-xs text-gray-500">Pending acceptance</p>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Quick Actions</h3>
<i className="fas fa-bolt text-amber-500"></i>
</div>
<div className="space-y-3">
<button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-2 px-4 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap">
<span>Post New Position</span>
<i className="fas fa-plus"></i>
</button>
<button className="w-full bg-green-50 hover:bg-green-100 text-green-600 py-2 px-4 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap">
<span>Schedule Interview</span>
<i className="fas fa-calendar-plus"></i>
</button>
<button className="w-full bg-amber-50 hover:bg-amber-100 text-amber-600 py-2 px-4 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap">
<span>Generate Reports</span>
<i className="fas fa-file-alt"></i>
</button>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Training Calendar</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">View All</button>
</div>
<div className="space-y-4">
<div className="flex items-center">
<div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-lg flex flex-col items-center justify-center">
<span className="text-xs font-medium">JUN</span>
<span className="text-lg font-bold">08</span>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Digital Learning Tools</p>
<p className="text-xs text-gray-500">For Teaching Staff • 2:00 PM</p>
</div>
</div>
<div className="flex items-center">
<div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-lg flex flex-col items-center justify-center">
<span className="text-xs font-medium">JUN</span>
<span className="text-lg font-bold">12</span>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Child Psychology</p>
<p className="text-xs text-gray-500">All Staff • 10:00 AM</p>
</div>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Department Overview</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">Details</button>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<span className="text-sm text-gray-600">Science</span>
<span className="text-sm font-medium text-gray-800">18 Staff</span>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<span className="text-sm text-gray-600">Mathematics</span>
<span className="text-sm font-medium text-gray-800">15 Staff</span>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<span className="text-sm text-gray-600">Languages</span>
<span className="text-sm font-medium text-gray-800">12 Staff</span>
</div>
</div>
</div>
</div>
</div>
)}
{activeTab === 'teachers' && (
<div>
<div className="mb-8">
<h1 className="text-2xl font-bold text-gray-800">Teacher Management</h1>
<p className="text-gray-600">Manage teachers, assignments, and performance</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-indigo-100 p-3 rounded-lg">
<i className="fas fa-chalkboard-teacher text-indigo-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Total Teachers</h3>
<p className="text-2xl font-bold text-gray-800">82</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-green-500 flex items-center">
<i className="fas fa-arrow-up mr-1"></i> 3
</span>
<span className="text-gray-500 ml-2">new this term</span>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-green-100 p-3 rounded-lg">
<i className="fas fa-book text-green-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Classes</h3>
<p className="text-2xl font-bold text-gray-800">156</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-green-500 flex items-center">
<i className="fas fa-check-circle mr-1"></i> Active
</span>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-amber-100 p-3 rounded-lg">
<i className="fas fa-star text-amber-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Avg. Rating</h3>
<p className="text-2xl font-bold text-gray-800">4.8</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-amber-500 flex items-center">
<i className="fas fa-star mr-1"></i> Excellence
</span>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center">
<div className="bg-purple-100 p-3 rounded-lg">
<i className="fas fa-certificate text-purple-600 text-xl"></i>
</div>
<div className="ml-4">
<h3 className="text-gray-500 text-sm font-medium">Certifications</h3>
<p className="text-2xl font-bold text-gray-800">245</p>
</div>
</div>
<div className="mt-4 flex items-center text-sm">
<span className="text-purple-500 flex items-center">
<i className="fas fa-check mr-1"></i> Verified
</span>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Teacher Directory</h3>
<div className="flex space-x-2">
<div className="relative">
<input
type="text"
placeholder="Search teachers..."
className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
/>
<span className="absolute left-3 top-2.5 text-gray-400">
<i className="fas fa-search"></i>
</span>
</div>
<button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center !rounded-button whitespace-nowrap">
<i className="fas fa-plus mr-2"></i>
Add Teacher
</button>
</div>
</div>
<div className="space-y-4">
{[1, 2, 3, 4].map((item) => (
<div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
<div className="flex items-center">
<img
src={`https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20a%20school%20teacher%20in%20formal%20attire%20with%20a%20confident%20and%20approachable%20expression%2C%20light%20background%2C%20high%20quality&width=40&height=40&seq=${item + 30}&orientation=squarish`}
alt="Teacher"
className="w-10 h-10 rounded-full"
/>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Dr. Sarah Johnson</p>
<p className="text-xs text-gray-500">{item % 2 === 0 ? 'Science Department' : 'Mathematics Department'}</p>
</div>
</div>
<div className="flex items-center space-x-3">
<span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Active</span>
<button className="text-gray-400 hover:text-indigo-600 !rounded-button whitespace-nowrap">
<i className="fas fa-envelope"></i>
</button>
<button className="text-gray-400 hover:text-gray-600 !rounded-button whitespace-nowrap">
<i className="fas fa-ellipsis-v"></i>
</button>
</div>
</div>
))}
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Performance Overview</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">View All</button>
</div>
<div className="space-y-6">
<div className="space-y-4">
<div className="flex justify-between items-center">
<span className="text-sm text-gray-600">Student Satisfaction</span>
<span className="text-sm font-medium text-gray-800">92%</span>
</div>
<div className="relative pt-1">
<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
<div style={{ width: '92%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
</div>
</div>
</div>
<div className="space-y-4">
<div className="flex justify-between items-center">
<span className="text-sm text-gray-600">Course Completion</span>
<span className="text-sm font-medium text-gray-800">88%</span>
</div>
<div className="relative pt-1">
<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
<div style={{ width: '88%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
</div>
</div>
</div>
<div className="space-y-4">
<div className="flex justify-between items-center">
<span className="text-sm text-gray-600">Attendance Rate</span>
<span className="text-sm font-medium text-gray-800">95%</span>
</div>
<div className="relative pt-1">
<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
<div style={{ width: '95%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Quick Actions</h3>
<i className="fas fa-bolt text-amber-500"></i>
</div>
<div className="space-y-3">
<button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-2 px-4 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap">
<span>Assign Classes</span>
<i className="fas fa-plus"></i>
</button>
<button className="w-full bg-green-50 hover:bg-green-100 text-green-600 py-2 px-4 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap">
<span>Schedule Training</span>
<i className="fas fa-calendar-plus"></i>
</button>
<button className="w-full bg-amber-50 hover:bg-amber-100 text-amber-600 py-2 px-4 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap">
<span>Performance Review</span>
<i className="fas fa-chart-line"></i>
</button>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Upcoming Events</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">View All</button>
</div>
<div className="space-y-4">
<div className="flex items-center">
<div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-lg flex flex-col items-center justify-center">
<span className="text-xs font-medium">JUN</span>
<span className="text-lg font-bold">10</span>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Department Meeting</p>
<p className="text-xs text-gray-500">Science Department • 2:00 PM</p>
</div>
</div>
<div className="flex items-center">
<div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-lg flex flex-col items-center justify-center">
<span className="text-xs font-medium">JUN</span>
<span className="text-lg font-bold">15</span>
</div>
<div className="ml-4">
<p className="text-sm font-medium text-gray-900">Professional Development</p>
<p className="text-xs text-gray-500">All Teachers • 9:00 AM</p>
</div>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
<div className="flex items-center justify-between mb-6">
<h3 className="font-semibold text-lg text-gray-800">Department Stats</h3>
<button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">Details</button>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<span className="text-sm text-gray-600">Science</span>
<span className="text-sm font-medium text-gray-800">24 Teachers</span>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<span className="text-sm text-gray-600">Mathematics</span>
<span className="text-sm font-medium text-gray-800">18 Teachers</span>
</div>
<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<span className="text-sm text-gray-600">Languages</span>
<span className="text-sm font-medium text-gray-800">15 Teachers</span>
</div>
</div>
</div>
</div>
</div>
)}
{activeTab !== 'dashboard' && activeTab !== 'students' && activeTab !== 'finance' && activeTab !== 'operations' && activeTab !== 'communication' && activeTab !== 'analytics' && activeTab !== 'settings' && activeTab !== 'hr' && activeTab !== 'teachers' && activeTab !== 'academic' && (
<div className="flex items-center justify-center h-full">
<div className="text-center">
<i className="fas fa-cogs text-6xl text-gray-300 mb-4"></i>
<h2 className="text-2xl font-bold text-gray-700 mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module</h2>
<p className="text-gray-500 mb-6">This module is under development. Please check back later.</p>
<button
onClick={() => setActiveTab('dashboard')}
className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 cursor-pointer !rounded-button whitespace-nowrap"
>
Return to Dashboard
</button>
</div>
</div>
)}
</main>
</div>
</div>
);
};
export default App
