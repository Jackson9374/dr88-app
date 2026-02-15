import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    UserRound,
    Users,
    Calculator,
    Bell,
    ChevronRight,
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

export default function Sidebar({ isOpen, onClose }) {
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
                "w-64 h-screen bg-doctor-blue text-white flex flex-col fixed left-0 top-0 shadow-xl z-50 transition-transform duration-300 lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6 border-b border-blue-800 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">닥터88+</h1>
                        <p className="text-xs text-blue-300 mt-1 uppercase font-semibold">Doctor 88+ System</p>
                    </div>
                    <button onClick={onClose} className="lg:hidden p-1 hover:bg-white/10 rounded">
                        <X size={20} />
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
                                <div className="flex items-center gap-3">
                                    <item.icon size={20} className={cn(isActive ? "text-doctor-blue" : "text-blue-300 group-hover:text-white")} />
                                    <span className="text-sm">{item.name}</span>
                                </div>
                                {isActive && <ChevronRight size={16} />}
                            </button>
                        );
                    })}
                </nav>
                <div className="p-6 border-t border-blue-800 text-[10px] text-blue-400 font-inter">
                    &copy; 2026 닥터88+. <br /> All rights reserved.
                </div>
            </div>
        </>
    );
}
