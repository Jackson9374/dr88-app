import React, { useState } from 'react';
import {
    Calculator,
    ChevronRight,
    ChevronDown,
    ArrowUpRight,
    TrendingDown,
    Info,
    CalendarDays,
    Printer,
    FileCheck
} from 'lucide-react';
import { AGENTS } from '../../constants/dummyData';

const HierarchySettlementRow = ({ agent, allAgents, depth = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const children = allAgents.filter(a => a.uplineId === agent.id);
    const hasChildren = children.length > 0;
    const upline = allAgents.find(a => a.id === agent.uplineId);

    // 정산 계산 시뮬레이션
    const calculateResult = (a) => {
        const sales = a.sales || 0;
        const teamSales = a.teamSales || 0;
        let direct = sales * 1100000;
        let override = Math.max(0, (teamSales - sales)) * 150000;
        if (a.rank === '프리랜서') {
            direct = sales * 700000;
            override = 0;
        }
        return { direct, override, total: direct + override };
    };

    const res = calculateResult(agent);

    return (
        <>
            <tr className={`hover:bg-blue-50/50 transition-all group ${depth === 0 ? 'bg-gray-50/80' : ''}`}>
                <td className="px-6 py-2.5 relative">
                    {/* 계층 연결선 수직바 */}
                    {depth > 0 && (
                        <div
                            className="absolute left-[34px] top-0 bottom-0 w-px bg-gray-200"
                            style={{ left: `${(depth - 1) * 24 + 34}px` }}
                        />
                    )}
                    <div className="flex items-center gap-2 relative z-10" style={{ marginLeft: `${depth * 24}px` }}>
                        {/* 계층 연결선 수평바 */}
                        {depth > 0 && (
                            <div className="w-4 h-px bg-gray-200 mr-1" />
                        )}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className={`p-1 rounded-md hover:bg-gray-200 transition-all ${hasChildren ? 'visible' : 'invisible'} ${isExpanded ? 'bg-gray-100' : ''}`}
                        >
                            {isExpanded ? <ChevronDown size={12} className="text-gray-600" /> : <ChevronRight size={12} className="text-gray-400" />}
                        </button>
                        <div>
                            <p className="text-[11px] font-black text-gray-900 leading-tight">{agent.name}</p>
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-black mt-0.5 uppercase tracking-tighter ${agent.rank === '지사장' ? 'bg-blue-100 text-blue-700' :
                                agent.rank === '점장' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {agent.rank}
                            </span>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-2.5">
                    {upline ? (
                        <div className="flex items-center gap-1.5">
                            <div className="w-1 h-3 bg-blue-400 rounded-full opacity-50" />
                            <span className="text-[10px] font-bold text-gray-500">{upline.name}</span>
                        </div>
                    ) : (
                        <span className="text-[10px] font-bold text-gray-300 italic">- 직속 -</span>
                    )}
                </td>
                <td className="px-6 py-2.5 text-center">
                    <div className="flex flex-col items-center">
                        <span className="text-[11px] font-black text-doctor-blue">{agent.sales}<span className="text-[9px] opacity-60 ml-0.5">대</span></span>
                        <div className="w-8 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                            <div className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" style={{ width: `${Math.min((agent.sales / 50) * 100, 100)}%` }} />
                        </div>
                    </div>
                </td>
                <td className="px-6 py-2.5 text-center">
                    {depth < 2 ? (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full">
                            <ArrowUpRight size={10} />
                            <span className="text-[10px] font-black">{(agent.teamSales - agent.sales)}</span>
                            <span className="text-[8px] font-bold opacity-70">대</span>
                        </div>
                    ) : <span className="text-gray-300">-</span>}
                </td>
                <td className="px-6 py-2.5 text-right">
                    <p className="text-[11px] font-black text-gray-700">{res.direct.toLocaleString()}</p>
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Direct</span>
                </td>
                <td className="px-6 py-2.5 text-right">
                    <p className="text-[11px] font-black text-indigo-600">{res.override.toLocaleString()}</p>
                    <span className="text-[8px] font-bold text-indigo-300 uppercase tracking-tighter">Override</span>
                </td>
                <td className="px-6 py-2.5 text-right">
                    <p className="text-xs font-black text-gray-900 tracking-tighter decoration-blue-500/20 underline underline-offset-4 decoration-2">
                        {res.total.toLocaleString()}
                    </p>
                </td>
                <td className="px-6 py-2.5 text-right">
                    <button className="text-[9px] font-black text-white bg-doctor-blue px-3 py-1 rounded-lg shadow-md shadow-blue-100 hover:shadow-lg hover:bg-blue-800 transition-all uppercase tracking-wider">
                        명세서
                    </button>
                </td>
            </tr>
            {isExpanded && children.map(child => (
                <HierarchySettlementRow key={child.id} agent={child} allAgents={allAgents} depth={depth + 1} />
            ))}
        </>
    );
};

export default function Settlement() {
    const [selectedYear, setSelectedYear] = useState('2024');
    const [selectedMonth, setSelectedMonth] = useState('02');
    const rootAgents = AGENTS.filter(a => !a.uplineId);

    return (
        <div className="space-y-6 font-inter">
            <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
                <div className="flex gap-4 flex-1 w-full lg:max-w-lg">
                    {/* 연도/월 통합 선택기 */}
                    <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 flex items-center gap-6 flex-1 shadow-sm">
                        <div className="flex items-center gap-3">
                            <CalendarDays size={18} className="text-doctor-blue opacity-50" />
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Year</span>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="text-sm font-black text-gray-800 bg-transparent border-none p-0 focus:ring-0 cursor-pointer outline-none min-w-[60px]"
                                >
                                    <option value="2024">2024년</option>
                                    <option value="2023">2023년</option>
                                    <option value="2022">2022년</option>
                                </select>
                            </div>
                        </div>

                        <div className="w-px h-8 bg-gray-100 hidden sm:block" />

                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Month</span>
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="text-sm font-black text-gray-800 bg-transparent border-none p-0 focus:ring-0 cursor-pointer outline-none min-w-[70px]"
                            >
                                <option value="all">전체</option>
                                {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(m => (
                                    <option key={m} value={m}>{m}월</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <button className="flex items-center justify-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-bold transition-colors text-xs border border-gray-100">
                        <Printer size={16} />
                        리포트 출력
                    </button>
                    <button className="flex items-center justify-center gap-2 px-6 py-2 bg-doctor-blue text-white rounded-xl font-black shadow-lg shadow-blue-200 hover:bg-blue-800 transition-all text-xs">
                        <FileCheck size={16} />
                        정산 최종 승인
                    </button>
                </div>
            </div>

            <div className="bg-gradient-to-br from-doctor-blue to-[#0a1e5e] text-white p-4 lg:p-6 rounded-2xl shadow-xl border border-blue-900/20 flex flex-col lg:flex-row justify-between items-center gap-4">
                <div className="flex flex-col sm:flex-row gap-6 lg:gap-12 w-full lg:w-auto">
                    <div className="text-center sm:text-left">
                        <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest mb-1 opacity-80">본월 전체 판매수량</p>
                        <p className="text-xl lg:text-2xl font-black tracking-tighter font-inter text-white drop-shadow-sm">1,245<span className="text-[10px] font-bold ml-1 text-blue-300 uppercase">Unit</span></p>
                    </div>
                    <div className="text-center sm:text-left">
                        <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest mb-1 opacity-80">전월 대비 증감</p>
                        <p className="text-xl lg:text-2xl font-black text-emerald-400 tracking-tighter flex items-center justify-center sm:justify-start gap-1 font-inter drop-shadow-sm">
                            <ArrowUpRight size={20} /> 12.5%
                        </p>
                    </div>
                </div>
                <button className="w-full lg:w-auto px-6 py-2.5 bg-white text-doctor-blue rounded-xl font-black hover:bg-blue-50 shadow-xl shadow-blue-900/40 transition-all uppercase tracking-widest text-[10px] hover:-translate-y-0.5 active:translate-y-0">엑셀 데이터 추출</button>
            </div>

            <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full text-left min-w-[900px]">
                        <thead>
                            <tr className="bg-doctor-blue text-white">
                                <th className="px-6 py-3.5 text-[10px] font-black uppercase tracking-widest">조직 명단 및 구조</th>
                                <th className="px-6 py-3.5 text-[10px] font-black uppercase tracking-widest">추천인(상공인)</th>
                                <th className="px-6 py-3.5 text-[10px] font-black uppercase tracking-widest text-center">본인판매</th>
                                <th className="px-6 py-3.5 text-[10px] font-black uppercase tracking-widest text-center">조직판매</th>
                                <th className="px-6 py-3.5 text-[10px] font-black uppercase tracking-widest text-right">직판 수당</th>
                                <th className="px-6 py-3.5 text-[10px] font-black uppercase tracking-widest text-right">오버라이딩</th>
                                <th className="px-6 py-3.5 text-[10px] font-black uppercase tracking-widest text-right">최종 정산액</th>
                                <th className="px-6 py-3.5 text-right px-8">상세</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {rootAgents.map(agent => (
                                <HierarchySettlementRow key={agent.id} agent={agent} allAgents={AGENTS} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
