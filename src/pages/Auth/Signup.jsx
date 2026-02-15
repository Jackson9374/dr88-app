import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ShieldCheck, Phone, User as UserIcon, Calendar, MapPin, Mail, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Signup() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: 본인인증, 2: 정보입력, 3: 완료
    const [authData, setAuthData] = useState({ name: '', phone: '' });
    const [extraInfo, setExtraInfo] = useState({ birthDate: '', address: '', email: '' });
    const [isLoading, setIsLoading] = useState(false);

    // 본인 확인 (관리자가 등록한 정보와 대조 모사)
    const handleVerify = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            // 임시: 모든 입력을 통과로 처리
            setStep(2);
        }, 800);
    };

    // 가입 완료
    const handleComplete = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep(3);
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-inter">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 mb-4">
                        <UserPlus size={32} className="text-doctor-blue" />
                    </div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight tracking-tighter">영업자 신규 등록</h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">회원가입을 위해 정보를 입력해주세요.</p>
                </div>

                {/* Progress Bar */}
                {step < 3 && (
                    <div className="flex justify-center gap-2 mb-6">
                        {[1, 2].map((i) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${step === i ? 'w-8 bg-doctor-blue' : 'w-2 bg-gray-200'}`} />
                        ))}
                    </div>
                )}

                {/* Content Card */}
                <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200 border border-gray-100 overflow-hidden">
                    <div className="p-8">
                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-gray-800">본인 확인</h2>
                                    <p className="text-xs text-gray-400 mt-1 font-medium italic">관리자에게 등록된 성함과 연락처를 입력하세요.</p>
                                </div>

                                <form onSubmit={handleVerify} className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider ml-1">성명</label>
                                        <div className="relative">
                                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                placeholder="예: 홍길동"
                                                required
                                                value={authData.name}
                                                onChange={(e) => setAuthData({ ...authData, name: e.target.value })}
                                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-doctor-blue focus:bg-white outline-none transition-all text-sm font-bold"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider ml-1">연락처</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="tel"
                                                placeholder="010-0000-0000"
                                                required
                                                value={authData.phone}
                                                onChange={(e) => setAuthData({ ...authData, phone: e.target.value })}
                                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-doctor-blue focus:bg-white outline-none transition-all text-sm font-bold"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-doctor-blue text-white rounded-2xl font-black shadow-lg shadow-blue-200 hover:bg-blue-800 transition-all flex items-center justify-center gap-2 mt-4"
                                    >
                                        확인 및 다음 단계
                                        <ArrowRight size={18} />
                                    </button>
                                </form>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="mb-6 flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">추가 정보 입력</h2>
                                        <p className="text-xs text-gray-400 mt-1 font-medium italic">원활한 활동을 위해 상세 정보를 완성해주세요.</p>
                                    </div>
                                    <button onClick={() => setStep(1)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">
                                        <ArrowLeft size={16} />
                                    </button>
                                </div>

                                <form onSubmit={handleComplete} className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider ml-1">생년월일</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="date"
                                                required
                                                value={extraInfo.birthDate}
                                                onChange={(e) => setExtraInfo({ ...extraInfo, birthDate: e.target.value })}
                                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-doctor-blue focus:bg-white outline-none transition-all text-sm font-bold"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider ml-1">주소</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                placeholder="상세 주소를 입력하세요"
                                                required
                                                value={extraInfo.address}
                                                onChange={(e) => setExtraInfo({ ...extraInfo, address: e.target.value })}
                                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-doctor-blue focus:bg-white outline-none transition-all text-sm font-bold"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider ml-1">이메일</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="email"
                                                placeholder="vibe@example.com"
                                                required
                                                value={extraInfo.email}
                                                onChange={(e) => setExtraInfo({ ...extraInfo, email: e.target.value })}
                                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-doctor-blue focus:bg-white outline-none transition-all text-sm font-bold font-mono"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-doctor-blue text-white rounded-2xl font-black shadow-lg shadow-blue-200 hover:bg-blue-800 transition-all flex items-center justify-center gap-2 mt-4"
                                    >
                                        가입 완료하기
                                        <CheckCircle2 size={18} />
                                    </button>
                                </form>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="text-center py-6 animate-in zoom-in-95 duration-500">
                                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h2 className="text-2xl font-black text-gray-800 mb-2">가입 신청 완료!</h2>
                                <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed">
                                    영업 코드가 정상적으로 등록되었습니다.<br />
                                    관리자 승인 후 즉시 활동이 가능합니다.
                                </p>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-xl"
                                >
                                    로그인 페이지로 이동
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Back to Login */}
                {step < 3 && (
                    <div className="text-center mt-6">
                        <Link to="/login" className="text-[11px] font-bold text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-1.5">
                            <ArrowLeft size={12} />
                            이미 가입하셨나요? 로그인하기
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
