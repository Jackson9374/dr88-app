import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu, Bell, User } from 'lucide-react';
import Sidebar from './Sidebar';

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const location = useLocation();

    const getTitle = () => {
        const path = location.pathname;
        if (path === '/') return '대시보드';
        if (path === '/sales') return '영업 실적관리';
        if (path === '/agent') return '영업자 관리';
        if (path === '/settlement') return '정산 관리';
        if (path === '/notice') return '공지사항';
        return '시스템';
    };

    return (
        <div className="flex bg-[#f8fafc] min-h-screen font-inter">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="flex-1 lg:ml-64 w-full">
                {/* Mobile Top Header */}
                <header className="lg:hidden bg-doctor-blue text-white p-4 flex justify-between items-center sticky top-0 z-30 shadow-md">
                    <h1 className="text-lg font-black tracking-tighter">{getTitle()}</h1>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                </header>

                <div className="p-3 lg:p-6">
                    {/* Desktop Header Content - Optimized Space */}
                    <header className="hidden lg:flex mb-4 justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-1 bg-doctor-blue rounded-full"></div>
                            <div>
                                <h2 className="text-xl font-black text-gray-800 tracking-tight">{getTitle()}</h2>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <button className="text-gray-400 hover:text-doctor-blue transition-colors">
                                <Bell size={20} />
                            </button>
                            <div className="flex items-center gap-3 border-l pl-6 border-gray-100">
                                <div className="text-right">
                                    <p className="text-xs font-black text-gray-700">관리자님</p>
                                    <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">본사 총괄</p>
                                </div>
                                <div className="w-9 h-9 rounded-xl bg-doctor-blue flex items-center justify-center text-white font-black shadow-md shadow-blue-100">
                                    <User size={18} />
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
