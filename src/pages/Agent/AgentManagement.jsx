import React, { useState } from 'react';
import {
    Search,
    Download,
    UserPlus,
    Edit,
    Trash2,
    ChevronRight,
    ChevronDown,
    User,
    ArrowRight,
    X,
    CheckCircle2
} from 'lucide-react';
import { AGENTS } from '../../constants/dummyData';

const AgentRow = ({ agent, allAgents, depth = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const directs = allAgents.filter(a => a.uplineId === agent.id);
    const hasSub = directs.length > 0;

    // 레벨에 따른 아이콘 색상 및 번호
    const levelColor = depth === 0 ? 'bg-blue-600' : depth === 1 ? 'bg-indigo-500' : 'bg-gray-400';

    return (
        <>
            <tr className="hover:bg-blue-50/50 transition-colors border-b border-gray-100 group">
                <td className="w-12 py-5 text-center text-[10px] text-gray-400 font-mono">{agent.id.replace('A', '')}</td>
                <td className="py-5 px-4">
                    <div className="flex items-center gap-1" style={{ paddingLeft: `${depth * 16}px` }}>
                        <div className="flex items-center gap-1.5 min-w-[120px]">
                            {depth > 0 && <ArrowRight size={10} className="text-blue-400" />}
                            <span className={`w-4 h-4 rounded-full ${levelColor} text-white text-[8px] flex items-center justify-center font-black`}>
                                {depth + 1}
                            </span>
                            <span className="text-[11px] font-bold text-gray-800 truncate" title={agent.name}>{agent.name}</span>
                        </div>
                    </div>
                </td>
                <td className="py-5 px-4 text-[11px] text-gray-600 font-medium">{agent.name}</td>
                <td className="py-5 px-4 text-[11px] text-gray-600 font-medium">{agent.rank}</td>
                <td className="py-5 px-4 text-[11px] text-gray-500 font-mono">010-0000-0000</td>
                <td className="py-5 px-4 text-center">
                    <span className="text-[10px] font-bold text-blue-600 underline cursor-pointer">{agent.sales} / {agent.teamSales}</span>
                </td>
                <td className="py-5 px-4 text-center">
                    <select className="text-[10px] border border-gray-200 rounded px-1 py-0.5 bg-white font-bold text-emerald-600 outline-none">
                        <option className="text-emerald-600">정상</option>
                        <option className="text-rose-500">중지</option>
                    </select>
                </td>
                <td className="py-5 px-4 text-[11px] text-gray-400 font-mono text-center">2025/05/02</td>
                <td className="py-5 px-4 text-[11px] text-gray-400 font-mono text-center">2025/05/02</td>
                <td className="py-5 px-4">
                    <div className="flex justify-end gap-1.5">
                        <button title="추가" className="p-1 rounded bg-lime-500 text-white hover:bg-lime-600 transition-colors"><UserPlus size={12} /></button>
                        <button title="수정" className="p-1 rounded bg-sky-500 text-white hover:bg-sky-600 transition-colors"><Edit size={12} /></button>
                        <button title="삭제" className="p-1 rounded bg-rose-400 text-white hover:bg-rose-500 transition-colors"><Trash2 size={12} /></button>
                    </div>
                </td>
            </tr>
            {directs.map(subAgent => (
                <AgentRow key={subAgent.id} agent={subAgent} allAgents={allAgents} depth={depth + 1} />
            ))}
        </>
    );
};

export default function AgentManagement() {
    const rootAgents = AGENTS.filter(a => !a.uplineId);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newAgent, setNewAgent] = useState({ name: '', phone: '' });
    const [generatedCode, setGeneratedCode] = useState(null);

    const handleAddAgent = (e) => {
        e.preventDefault();
        // 실제로는 서버에서 코드를 받아오겠지만, 여기서는 가상으로 생성
        const randomCode = 'V' + Math.random().toString(36).substring(2, 9).toUpperCase();
        setGeneratedCode(randomCode);
    };

    const closeModal = () => {
        setIsAddModalOpen(false);
        setGeneratedCode(null);
        setNewAgent({ name: '', phone: '' });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
                <div className="flex gap-4 flex-1 w-full lg:max-w-lg">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="성명, 아이디, 대리점명 검색..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-doctor-blue outline-none transition-all text-sm"
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <button className="flex items-center justify-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-bold transition-colors text-xs border border-gray-100">
                        <Download size={16} />
                        엑셀 다운로드
                    </button>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center justify-center gap-2 px-5 py-2 bg-doctor-blue text-white rounded-xl font-black shadow-lg shadow-blue-200 hover:bg-blue-800 transition-all text-xs"
                    >
                        <UserPlus size={16} />
                        영업자 추가
                    </button>
                </div>
            </div>

            {/* 영업자 추가 모달 (Admin 전용) */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="bg-doctor-blue p-6 text-white flex justify-between items-center">
                            <h3 className="text-xl font-bold">영업자 신규 등록 (Admin)</h3>
                            <button onClick={closeModal} className="hover:bg-white/20 p-1 rounded-lg">
                                <X size={24} />
                            </button>
                        </div>

                        {!generatedCode ? (
                            <form onSubmit={handleAddAgent} className="p-8 space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 ml-1">성함</label>
                                    <input
                                        type="text"
                                        placeholder="가입 대상자 실명"
                                        required
                                        value={newAgent.name}
                                        onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-doctor-blue outline-none font-bold text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 ml-1">연락처</label>
                                    <input
                                        type="tel"
                                        placeholder="010-0000-0000"
                                        required
                                        value={newAgent.phone}
                                        onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-doctor-blue outline-none font-bold text-sm"
                                    />
                                </div>
                                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-50">
                                    <p className="text-[10px] text-blue-600 font-bold leading-relaxed">
                                        ※ 입력하신 정보로 가입 권한(영업코드)이 생성됩니다.<br />
                                        최초 접속자가 해당 정보로 회원가입을 진행할 수 있습니다.
                                    </p>
                                </div>
                                <button type="submit" className="w-full py-4 bg-doctor-blue text-white rounded-2xl font-black shadow-lg hover:bg-blue-800 transition-all text-sm">
                                    영업코드 발급 및 등록
                                </button>
                            </form>
                        ) : (
                            <div className="p-10 text-center space-y-6 animate-in zoom-in-95 duration-300">
                                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                    <CheckCircle2 size={40} />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black text-gray-800 tracking-tight">{newAgent.name}님 등록 완료</h4>
                                    <p className="text-sm text-gray-400 font-medium mt-1">아래 발급된 코드를 전달해주세요.</p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-[2rem] border-2 border-dashed border-gray-200 relative group">
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 py-1 border border-gray-100 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest">Sales Code</span>
                                    <span className="text-3xl font-black text-doctor-blue tracking-[0.2em] font-mono select-all cursor-pointer" title="클릭하여 복사">
                                        {generatedCode}
                                    </span>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-xl"
                                >
                                    목록으로 돌아가기
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden font-inter">
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full text-left table-fixed min-w-[1000px]">
                        <thead>
                            <tr className="bg-doctor-blue text-white">
                                <th className="w-12 py-5 text-center text-[10px] font-black uppercase">NO</th>
                                <th className="w-48 py-5 px-4 text-[10px] font-black uppercase tracking-widest">성명</th>
                                <th className="w-32 py-5 px-4 text-[10px] font-black uppercase tracking-widest">아이디</th>
                                <th className="w-32 py-5 px-4 text-[10px] font-black uppercase tracking-widest">대리점명</th>
                                <th className="w-40 py-5 px-4 text-[10px] font-black uppercase tracking-widest">연락처</th>
                                <th className="w-24 py-5 px-4 text-[10px] font-black uppercase tracking-widest text-center">실적(직/팀)</th>
                                <th className="w-24 py-5 px-4 text-[10px] font-black uppercase tracking-widest text-center">상태</th>
                                <th className="w-32 py-5 px-4 text-[10px] font-black uppercase tracking-widest text-center">등록일</th>
                                <th className="w-32 py-5 px-4 text-[10px] font-black uppercase tracking-widest text-center">수정일</th>
                                <th className="w-36 py-5 px-4 text-[10px] font-black uppercase tracking-widest text-right">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {rootAgents.map(agent => (
                                <AgentRow key={agent.id} agent={agent} allAgents={AGENTS} />
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bg-gray-50 p-4 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-2">
                        <p className="text-[10px] font-bold text-gray-500 text-center sm:text-left leading-relaxed">
                            총 {AGENTS.length}명의 영업자가 등록되어 있습니다.<br className="sm:hidden" /> 조직 관리에 유의해 주세요.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
