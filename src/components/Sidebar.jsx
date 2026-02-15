import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    UserRound,
    Users,
    Calculator,
    Bell,
    ChevronRight,
    ChevronLeft,
    PanelLeftClose,
    X
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const menuItems = [
    { id: 'dashboard', name: '대시보드', path: '/', icon: LayoutDashboard },
    { id: 'sales', name: '영업 실적 관리', path: '/sales', icon: UserRound },
    { id: 'agent', name: '영업자 관리', path: '/agent', icon: Users },
    { id: 'settlement', name: '정산 관리', path: '/settlement', icon: Calculator },
    { id: 'notice', name: '공지사항', path: '/notice', icon: Bell },
];

export default function Sidebar({ isOpen, isCollapsed, onClose }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (path) => {
        navigate(path);
        if (onClose) onClose(); // 모바일에서 메뉴 클릭 시 닫기
    };

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Sidebar Shell */}
            <div className={cn(
                "h-screen bg-doctor-blue text-white flex flex-col fixed left-0 top-0 shadow-xl z-50 transition-all duration-300 lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full",
                isCollapsed ? "lg:w-20" : "lg:w-64"
            )}>
                <div className={cn(
                    "p-6 border-b border-blue-800 flex justify-between items-center overflow-hidden transition-all duration-300",
                    isCollapsed && "lg:px-4 lg:py-8 flex-col gap-4"
                )}>
                    <div className={cn("transition-all duration-300 flex flex-col", isCollapsed && "lg:opacity-0 lg:scale-0 lg:h-0")}>
                        <h1 className="text-xl font-bold tracking-tight">닥터88+</h1>
                        <p className="text-xs text-blue-300 mt-1 uppercase font-semibold">Doctor 88+ System</p>
                    </div>

                    {!isCollapsed && (
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('toggle-sidebar'))}
                            className="hidden lg:flex p-1.5 hover:bg-white/10 rounded-lg text-blue-200 hover:text-white transition-colors"
                            title="메뉴 접기"
                        >
                            <ChevronLeft size={20} />
                        </button>
                    )}

                    {isCollapsed && (
                        <div className="hidden lg:flex flex-col items-center animate-in zoom-in duration-300">
                            <h1 className="text-2xl font-black text-white italic tracking-tighter">D+</h1>
                        </div>
                    )}
                    <button onClick={onClose} className="lg:hidden p-1 hover:bg-white/10 rounded font-bold">
                        <X size={24} />
                    </button>
                </div>
                <nav className="flex-1 mt-6 px-3">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavigate(item.path)}
                                className={cn(
                                    "w-full flex items-center justify-between px-4 py-3 mb-2 rounded-lg transition-all duration-200 group font-inter",
                                    isActive
                                        ? "bg-white text-doctor-blue shadow-lg font-bold"
                                        : "hover:bg-blue-800 text-blue-100"
                                )}
                            >
                                <div className={cn("flex items-center gap-3 transition-all", isCollapsed && "lg:justify-center lg:gap-0")}>
                                    <item.icon size={22} className={cn(isActive ? "text-doctor-blue" : "text-blue-300 group-hover:text-white")} />
                                    <span className={cn(
                                        "text-sm whitespace-nowrap transition-all duration-300",
                                        isCollapsed && "lg:w-0 lg:opacity-0 lg:overflow-hidden"
                                    )}>
                                        {item.name}
                                    </span>
                                </div>
                                {!isCollapsed && isActive && <ChevronRight size={16} />}
                            </button>
                        );
                    })}
                </nav>
                <div className={cn(
                    "p-6 border-t border-blue-800 text-[10px] text-blue-400 font-inter transition-all duration-300",
                    isCollapsed && "lg:p-4 lg:opacity-0 lg:h-0 overflow-hidden"
                )}>
                    &copy; 2026 닥터88+. <br /> All rights reserved.
                </div>
            </div>
        </>
    );
}
