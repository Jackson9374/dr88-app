import React, { useState } from 'react';
import {
    Calculator,
    ArrowUpRight,
    TrendingDown,
    CalendarDays,
    FileText,
    Download,
    Printer,
    CheckCircle2,
    ChevronRight
} from 'lucide-react';

const HierarchySettlementRow = ({ data, level = 0 }) => (
    <tr className={`hover:bg-blue-50/40 transition-colors border-b border-gray-100 ${level === 0 ? 'bg-white font-black' : 'bg-gray-50/20'}`}>
        <td className="px-4 py-8 text-center border-r border-gray-50">
            <div className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter leading-none">정산일</span>
                <span className="text-sm font-black text-gray-700 font-mono tracking-tighter">{data.date}</span>
            </div>
        </td>
        <td className="px-6 py-8 border-r border-gray-50 min-w-[240px]">
            <div className="flex items-center gap-3" style={{ paddingLeft: `${level * 32}px` }}>
                {level > 0 && <div className="w-5 h-5 border-l-2 border-b-2 border-gray-100 rounded-bl-lg -mt-4 opacity-70 shrink-0" />}
                <div className="flex flex-col">
                    <span className={`text-base font-black ${level === 0 ? 'text-doctor-blue' : 'text-gray-900'}`}>{data.agent}</span>
                    <span className="text-[10px] font-bold text-gray-400 mt-0.5">{data.agentId || 'ID-000'}</span>
                </div>
            </div>
        </td>
        <td className="px-4 py-8 text-center border-r border-gray-50">
            <span className={`px-3 py-1.5 rounded-lg text-xs font-black text-white shadow-sm ${data.rank === '지사장' ? 'bg-indigo-600' : 'bg-blue-600'
                }`}>
                {data.rank}
            </span>
        </td>
        <td className="px-4 py-8 text-center border-r border-gray-50">
            <div className="flex flex-col items-center">
                <span className="text-base font-black text-doctor-blue">{data.salesCount || 0} / {data.subSalesCount || 0}</span>
                <span className="text-[10px] font-bold text-gray-400">본인 / 하위</span>
            </div>
        </td>
        <td className="px-4 py-8 text-right border-r border-gray-50">
            <div className="flex flex-col items-end px-2">
                <span className="text-base font-black text-gray-900">{(data.personalAmount || 0).toLocaleString()}원</span>
                <span className="text-[10px] font-bold text-indigo-500">추천: {(data.referralAmount || 0).toLocaleString()}원</span>
            </div>
        </td>
        <td className="px-4 py-8 text-right border-r border-gray-50 font-mono font-black text-blue-700">
            <span className="text-lg">{data.commission.toLocaleString()}원</span>
        </td>
        <td className="px-4 py-8 text-center border-r border-gray-50">
            <span className={`px-4 py-2 rounded-xl text-xs font-black text-white shadow-md ${data.status === '정산완료' ? 'bg-emerald-600' : 'bg-amber-500'
                }`}>
                {data.status}
            </span>
        </td>
        <td className="px-4 py-8 text-center">
            <button className="p-3 rounded-2xl bg-gray-50 text-gray-600 hover:bg-doctor-blue hover:text-white transition-all shadow-sm border border-gray-200">
                <FileText size={22} />
            </button>
        </td>
    </tr>
);

export default function Settlement() {
    const [selectedYear, setSelectedYear] = useState('2024');
    const [selectedMonth, setSelectedMonth] = useState('02');

    const dummySettlementData = [
        { id: '1', date: '2024-02-28', agent: '김철수', agentId: 'A1', rank: '지사장', salesCount: 15, subSalesCount: 141, personalAmount: 45000000, referralAmount: 79500000, commission: 12450000, status: '정산완료', level: 0 },
        { id: '2', date: '2024-02-28', agent: '이지영', agentId: 'A2', rank: '점장', salesCount: 8, subSalesCount: 34, personalAmount: 24000000, referralAmount: 56000000, commission: 8000000, status: '정산대기', level: 1 },
        { id: '3', date: '2024-02-28', agent: '박민준', agentId: 'A3', rank: '프리랜서', salesCount: 15, subSalesCount: 0, personalAmount: 30000000, referralAmount: 0, commission: 2100000, status: '정산완료', level: 2 },
        { id: '4', date: '2024-02-28', agent: '최유리', agentId: 'A5', rank: '프리랜서', salesCount: 10, subSalesCount: 0, personalAmount: 20000000, referralAmount: 0, commission: 1400000, status: '정산대기', level: 2 },
        { id: '5', date: '2024-02-28', agent: '정우성', agentId: 'A4', rank: '점장', salesCount: 5, subSalesCount: 33, personalAmount: 15000000, referralAmount: 55000000, commission: 7000000, status: '정산완료', level: 1 },
    ];

    return (
        <div className="space-y-8 font-inter">
            <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6">
                <div className="flex gap-4 flex-1 lg:max-w-md">
                    <div className="flex-1 relative">
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="w-full appearance-none bg-white border border-gray-200 rounded-2xl pl-6 pr-12 py-4 font-black text-lg text-gray-800 outline-none focus:ring-2 focus:ring-doctor-blue shadow-sm"
                        >
                            <option value="2024">2024년</option>
                            <option value="2023">2023년</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <ChevronRight className="rotate-90" size={20} />
                        </div>
                    </div>
                    <div className="flex-1 relative">
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="w-full appearance-none bg-white border border-gray-200 rounded-2xl pl-6 pr-12 py-4 font-black text-lg text-gray-800 outline-none focus:ring-2 focus:ring-doctor-blue shadow-sm"
                        >
                            <option value="all">전체</option>
                            {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(m => (
                                <option key={m} value={m}>{m}월</option>
                            ))}
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <ChevronRight className="rotate-90" size={20} />
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex-1 lg:flex-none flex items-center justify-center gap-2.5 px-8 py-4 bg-blue-50 text-doctor-blue border border-blue-100 rounded-2xl font-black hover:bg-blue-100 transition-all text-base shadow-sm">
                        <Printer size={20} />
                        출력
                    </button>
                    <button className="flex-1 lg:flex-none flex items-center justify-center gap-2.5 px-8 py-4 bg-doctor-blue text-white rounded-2xl font-black hover:bg-blue-800 transition-all shadow-xl shadow-blue-100 text-base">
                        <Download size={20} />
                        엑셀
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-doctor-blue p-8 rounded-3xl text-white shadow-xl shadow-blue-100">
                    <p className="text-blue-200 font-bold mb-2 flex items-center gap-2"><Calculator size={18} /> 정산 총액</p>
                    <h3 className="text-3xl lg:text-4xl font-black tracking-tight">4.8<span className="text-xl ml-1 font-bold">억원</span></h3>
                    <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-sm font-bold">
                        <ArrowUpRight size={14} className="text-emerald-400" />
                        <span className="text-emerald-400">+5.2%</span> 전월 대비
                    </div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-50">
                    <p className="text-gray-400 font-bold mb-2">당월 실적 총액</p>
                    <h3 className="text-3xl lg:text-4xl font-black text-doctor-blue tracking-tight">32.4<span className="text-xl ml-1 font-bold">억원</span></h3>
                    <p className="text-xs text-gray-400 mt-4 leading-none font-bold italic">* 2024.02 기준</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-50">
                    <p className="text-gray-400 font-bold mb-2">정산 대기 건수</p>
                    <h3 className="text-3xl lg:text-4xl font-black text-amber-500 tracking-tight">2<span className="text-xl ml-1 font-bold">건</span></h3>
                    <div className="mt-4 flex items-center gap-1.5 text-red-500 font-black text-sm">
                        <TrendingDown size={16} /> 신속 정산 필요
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-b-3xl shadow-2xl shadow-gray-100 border border-gray-100 overflow-hidden mt-8">
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full text-left table-fixed min-w-[1000px]">
                        <thead>
                            <tr className="bg-doctor-blue text-white text-center">
                                <th className="w-32 px-4 py-8 text-sm font-black uppercase tracking-wider border-r border-white/10">정산일</th>
                                <th className="w-64 px-6 py-8 text-sm font-black uppercase tracking-wider border-r border-white/10 text-left">성함</th>
                                <th className="w-32 px-4 py-8 text-sm font-black uppercase tracking-wider border-r border-white/10 text-center">직함</th>
                                <th className="w-40 px-4 py-8 text-sm font-black uppercase tracking-wider border-r border-white/10 text-center">실적수</th>
                                <th className="px-4 py-8 text-sm font-black uppercase tracking-wider border-r border-white/10 text-right">판매실적금액</th>
                                <th className="w-44 px-4 py-8 text-sm font-black uppercase tracking-wider text-right border-r border-white/10">확정 정산액</th>
                                <th className="w-32 px-4 py-8 text-sm font-black uppercase tracking-wider text-center border-r border-white/10">상태</th>
                                <th className="w-24 px-4 py-8 text-sm font-black uppercase tracking-wider text-center">명세서</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 italic-none">
                            {dummySettlementData.map(item => (
                                <HierarchySettlementRow key={item.id} data={item} level={item.level || 0} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
