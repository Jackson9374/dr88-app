import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu, Bell, User, ChevronRight, PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import Sidebar from './Sidebar';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // 사이드바 내부에서 발생하는 접기 이벤트를 수신하여 상태 동기화
    React.useEffect(() => {
        const handleToggle = () => setIsSidebarCollapsed(prev => !prev);
        window.addEventListener('toggle-sidebar', handleToggle);
        return () => window.removeEventListener('toggle-sidebar', handleToggle);
    }, []);

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
            <Sidebar
                isOpen={isSidebarOpen}
                isCollapsed={isSidebarCollapsed}
                onClose={() => setIsSidebarOpen(false)}
            />

            <main className={cn(
                "flex-1 w-full transition-all duration-300",
                isSidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
            )}>
                {/* Mobile Top Header - Seniors Friendly (Larger Text) */}
                <header className="lg:hidden bg-doctor-blue text-white p-5 flex justify-between items-center sticky top-0 z-30 shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                            <h1 className="text-xl font-black tracking-tight leading-none">닥터88+</h1>
                            <span className="text-[10px] font-bold text-blue-200 mt-1 tracking-widest uppercase">Admin System</span>
                        </div>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2">
                        <h1 className="text-base font-black tracking-tight text-white">{getTitle()}</h1>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2.5 bg-white/10 rounded-xl active:bg-white/20 transition-colors"
                        aria-label="메뉴 열기"
                    >
                        <Menu size={28} />
                    </button>
                </header>

                <div className="p-3 lg:p-6">
                    {/* Desktop Header Content - Optimized Space */}
                    <header className="hidden lg:flex mb-4 justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                                className={cn(
                                    "p-2.5 rounded-xl transition-all duration-300 group flex items-center gap-2",
                                    isSidebarCollapsed
                                        ? "bg-doctor-blue text-white shadow-lg shadow-blue-100 hover:bg-blue-800"
                                        : "hover:bg-gray-50 text-gray-400 hover:text-doctor-blue"
                                )}
                                title={isSidebarCollapsed ? "메뉴 펼치기" : "메뉴 접기"}
                            >
                                {isSidebarCollapsed ? <PanelLeftOpen size={24} /> : <PanelLeftClose size={24} />}
                                {isSidebarCollapsed && <span className="text-xs font-black pr-1">메뉴 펼치기</span>}
                            </button>
                            <div className="h-6 w-px bg-gray-100 mx-1"></div>
                            <div>
                                <h2 className="text-xl font-black text-gray-800 tracking-tight">{getTitle()}</h2>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <button className="text-gray-400 hover:text-doctor-blue transition-colors">
                                <Bell size={20} />
                            </button>
                            <div className="flex items-center gap-4 border-l pl-6 border-gray-100">
                                <div className="text-right">
                                    <p className="text-sm font-black text-gray-800">
                                        {JSON.parse(localStorage.getItem('user'))?.name || '관리자'}님
                                    </p>
                                    <p className="text-xs text-blue-700 font-bold uppercase tracking-wider mt-0.5">
                                        {JSON.parse(localStorage.getItem('user'))?.rank || '본사 총괄'}
                                    </p>
                                </div>
                                <div className="w-11 h-11 rounded-2xl bg-doctor-blue flex items-center justify-center text-white font-black shadow-lg shadow-blue-100">
                                    <User size={22} />
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
