import React, { useState } from 'react';
import {
    Search,
    Download,
    Plus,
    Edit,
    Trash2,
    CheckCircle2,
    FileText,
    ArrowRight,
    X
} from 'lucide-react';
import { AGENTS } from '../../constants/dummyData';

const AgentRow = ({ agent, index, total }) => {
    const level = agent.level || 1;
    const [status, setStatus] = useState(agent.status || '정상');

    return (
        <tr className={`hover:bg-blue-50/40 transition-colors group border-b border-gray-50 ${status === '정지' ? 'bg-red-50/20' : ''}`}>
            <td className="px-4 py-9 text-center text-xs font-bold text-gray-400 border-r border-gray-50">{total - index}</td>
            <td className="px-6 py-9 border-r border-gray-50 min-w-[240px]">
                <div className="flex items-center gap-3" style={{ paddingLeft: `${(level - 1) * 32}px` }}>
                    {level > 1 && <div className="w-5 h-5 border-l-2 border-b-2 border-gray-200 rounded-bl-lg -mt-4 opacity-70 shrink-0" />}
                    <div className="flex flex-col">
                        <span className={`text-base font-black ${level === 1 ? 'text-doctor-blue' : 'text-gray-900'}`}>{agent.name}</span>
                        <span className="text-[10px] font-bold text-gray-400 mt-0.5">{agent.id}</span>
                    </div>
                </div>
            </td>
            <td className="px-4 py-9 text-center border-r border-gray-50">
                <span className={`px-3 py-1.5 rounded-lg text-xs font-black text-white shadow-sm ${agent.rank === '지사장' ? 'bg-indigo-600' : 'bg-blue-600'
                    }`}>
                    {agent.rank}
                </span>
            </td>
            <td className="px-4 py-9 text-center border-r border-gray-50">
                <span className="text-sm font-black text-gray-700 font-mono tracking-tight">{agent.phone || '010-0000-0000'}</span>
            </td>
            <td className="px-4 py-9 text-center border-r border-gray-50">
                <div className="flex flex-col items-center">
                    <span className="text-base font-black text-doctor-blue">{agent.sales || 0} / {agent.teamSales || 0}</span>
                    <span className="text-[10px] font-bold text-gray-400">본인실적 / 그룹실적</span>
                </div>
            </td>
            <td className="px-4 py-9 text-center border-r border-gray-50">
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={`px-3 py-2 rounded-xl text-xs font-black outline-none border transition-all ${status === '정상'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200 focus:ring-2 focus:ring-emerald-500'
                        : 'bg-red-50 text-red-600 border-red-200 focus:ring-2 focus:ring-red-500'
                        }`}
                >
                    <option value="정상">정상</option>
                    <option value="정지">정지</option>
                </select>
            </td>
            <td className="px-4 py-9 text-center border-r border-gray-50 text-sm font-black text-gray-600 font-mono">
                {agent.regDate || '2024-01-01'}
            </td>
            <td className="px-4 py-9 text-center">
                <div className="flex justify-center gap-2.5">
                    <button title="상세" className="p-3 rounded-xl bg-gray-50 text-gray-500 hover:text-blue-600 hover:bg-blue-50 border border-gray-100 transition-all shadow-sm"><FileText size={22} /></button>
                    <button title="삭제" className="p-3 rounded-xl bg-gray-50 text-gray-500 hover:text-red-500 hover:bg-red-50 border border-gray-100 transition-all shadow-sm"><Trash2 size={22} /></button>
                </div>
            </td>
        </tr>
    );
};

export default function AgentManagement() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
                <div className="flex gap-4 flex-1 w-full lg:max-w-lg">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="성함 또는 연락처 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-doctor-blue outline-none transition-all text-base font-bold"
                        />
                    </div>
                    <button className="px-6 py-3.5 bg-gray-800 text-white rounded-2xl font-black hover:bg-black transition-all shadow-lg text-sm">
                        검색
                    </button>
                </div>
                <div className="flex gap-3">
                    <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-50 text-doctor-blue border border-blue-100 rounded-2xl font-black hover:bg-blue-100 transition-all text-sm">
                        <Download size={18} />
                        엑셀 저장
                    </button>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-doctor-blue text-white rounded-2xl font-black hover:bg-blue-800 transition-all shadow-xl shadow-blue-100 text-sm"
                    >
                        <Plus size={20} />
                        영업자 등록
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-b-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full text-left table-fixed min-w-[1100px]">
                        <thead>
                            <tr className="bg-doctor-blue text-white text-center">
                                <th className="w-20 px-4 py-7 text-sm font-black uppercase tracking-wider border-r border-white/10 text-center">순번</th>
                                <th className="w-64 px-6 py-7 text-sm font-black uppercase tracking-wider border-r border-white/10 text-left">성함</th>
                                <th className="w-32 px-4 py-7 text-sm font-black uppercase tracking-wider border-r border-white/10">직함</th>
                                <th className="w-44 px-4 py-7 text-sm font-black uppercase tracking-wider border-r border-white/10 text-center">연락처</th>
                                <th className="w-32 px-4 py-7 text-sm font-black uppercase tracking-wider border-r border-white/10 text-center">실적수</th>
                                <th className="w-32 px-4 py-7 text-sm font-black uppercase tracking-wider border-r border-white/10 text-center">상태</th>
                                <th className="w-36 px-4 py-7 text-sm font-black uppercase tracking-wider border-r border-white/10 text-center">등록일</th>
                                <th className="w-36 px-4 py-7 text-sm font-black uppercase tracking-wider text-center">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {AGENTS.map((agent, index) => (
                                <AgentRow key={agent.id} agent={agent} index={index} total={AGENTS.length} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-black text-gray-800">신규 영업자 등록</h3>
                                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2"><X size={28} /></button>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-400 uppercase tracking-widest">영업자 성함</label>
                                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-5 focus:border-doctor-blue focus:bg-white outline-none font-bold text-lg" placeholder="성함을 입력하세요" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-400 uppercase tracking-widest">연락처</label>
                                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-5 focus:border-doctor-blue focus:bg-white outline-none font-bold text-lg" placeholder="010-0000-0000" />
                                </div>
                            </div>
                            <div className="flex gap-4 mt-10">
                                <button onClick={() => setIsAddModalOpen(false)} className="flex-1 py-4.5 bg-gray-100 text-gray-600 rounded-2xl font-black hover:bg-gray-200 transition-all text-base">취소</button>
                                <button onClick={() => setIsAddModalOpen(false)} className="flex-1 py-4.5 bg-doctor-blue text-white rounded-2xl font-black hover:bg-blue-800 shadow-xl shadow-blue-100 transition-all text-base">등록하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
