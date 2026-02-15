import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, UserPlus, ShieldCheck, Phone, User as UserIcon, Lock } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);

            let user;
            if (userId === 'admin' && password === 'admin1234') {
                user = { name: '관리자', rank: '본사 총괄', id: 'SUPER', role: 'ADMIN' };
            } else {
                user = { name: '김철수', rank: '지사장', id: 'A1', role: 'BRANCH' };
            }

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-inter">
            <div className="max-w-md w-full">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-doctor-blue rounded-2xl shadow-xl shadow-blue-100 mb-4">
                        <ShieldCheck size={32} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">닥터88+ 영업 관리 시스템</h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Smart Sales & Agent Management</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200 border border-gray-100 overflow-hidden">
                    <div className="p-8 pb-10">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800">로그인</h2>
                            <p className="text-xs text-gray-400 mt-1 font-medium italic">아이디와 비밀번호를 입력하세요.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider ml-1">아이디 (ID)</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <UserIcon size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                        placeholder="이메일 또는 아이디"
                                        required
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-doctor-blue focus:bg-white outline-none transition-all text-sm font-bold text-gray-900 placeholder:text-gray-300 placeholder:italic"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider ml-1">비밀번호 (Password)</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-doctor-blue focus:bg-white outline-none transition-all text-sm font-bold text-gray-900 placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-doctor-blue text-white rounded-2xl font-black shadow-lg shadow-blue-200 hover:bg-blue-800 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        입장하기
                                        <LogIn size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Signup Link Section */}
                    <div className="bg-gray-50/50 p-6 text-center border-t border-gray-100">
                        <p className="text-[11px] text-gray-400 mb-3 font-bold">아직 영업코드로 가입하지 않으셨나요?</p>
                        <Link
                            to="/signup"
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black text-gray-700 hover:bg-gray-100 transition-all shadow-sm"
                        >
                            <UserPlus size={14} className="text-blue-600" />
                            신규 회원가입하기
                        </Link>
                    </div>
                </div>

                {/* Footer Info */}
                <p className="text-center mt-8 text-[10px] text-gray-400 font-medium">
                    &copy; 2026 닥터88+. All rights reserved. <br />
                    관리자로부터 승인받은 사용자만 접근 가능한 시스템입니다.
                </p>
            </div>
        </div>
    );
}
