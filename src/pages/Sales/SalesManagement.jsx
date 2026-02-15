import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import {
    Plus,
    Search,
    Filter,
    Download,
    CheckCircle2,
    Clock,
    Truck,
    X,
    CreditCard,
    Banknote,
    Repeat,
    FileText,
    FileImage,
    Edit,
    Copy,
    Trash2,
    FileUp
} from 'lucide-react';
import { SALES_DATA, AGENTS } from '../../constants/dummyData';

const maskName = (name) => {
    if (name.length <= 1) return name;
    if (name.length === 2) return name[0] + '*';
    return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
};

// 가시성 검증 로직: 수익 연결 고리(Profit Link) 체크
const checkVisibility = (currentUser, saleAgentId) => {
    if (!currentUser || !saleAgentId) return false;
    if (currentUser.id === saleAgentId) return true; // 본인 실적

    const saleAgent = AGENTS.find(a => a.id === saleAgentId);
    if (!saleAgent) return false;

    // 계층 추적
    let currentPathAgent = saleAgent;
    let path = [];

    while (currentPathAgent && currentPathAgent.uplineId) {
        const upline = AGENTS.find(a => a.id === currentPathAgent.uplineId);
        if (upline) {
            path.push({ node: currentPathAgent, upline: upline });
            if (upline.id === currentUser.id) break;
            currentPathAgent = upline;
        } else {
            break;
        }
    }

    // currentUser가 path의 최상단 upline인지 확인
    const lastLink = path[path.length - 1];
    if (!lastLink || lastLink.upline.id !== currentUser.id) return false;

    // 수익 고리 검증 (역순으로 체크: currentUser부터 saleAgent까지)
    for (let i = path.length - 1; i >= 0; i--) {
        const link = path[i];
        const u = link.upline;
        const d = link.node;

        // 추월/동급 체크 (수익 단절 조건)
        // 1. 점장이 하위 점장을 가질 때 (수익 40만 소멸 -> 본인 직판만 허용)
        if (u.rank === '점장' && d.rank === '점장') {
            // d가 currentUser의 직계 하위이고, d의 실적인 경우만 허용
            return d.id === saleAgentId;
        }
        // 2. 지사장이 하위 지사장을 가질 때 (수익 15만 소멸 -> 본인 직판만 허용)
        if (u.rank === '지사장' && d.rank === '지사장') {
            return d.id === saleAgentId;
        }

        // 정상 수당 관계
        // 지사장 -> 점장(15만), 점장 -> 프리랜서(40만), 지사장 -> 프리랜서(유효)
        // 만약 여기까지 왔는데 위 조건에 안걸리면 다음 단계로 진행
    }

    return true;
};

const PaymentDetailModal = ({ isOpen, onClose, data }) => {
    // ... 기존 코드 유지 ...
};

export default function SalesManagement() {
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);
    const [isFilterExpanded, setIsFilterExpanded] = useState(false); // Mobile filter toggle state
    const [paymentDetail, setPaymentDetail] = useState(null);
    const [currentAgent, setCurrentAgent] = useState(AGENTS[0]); // 기본: 김철수(지사장)
    const [filters, setFilters] = useState({
        agent: '',
        customer: '',
        region: '',
        startDate: '',
        endDate: '',
        payment: '',
        status: ''
    });
    const sigCanvas = useRef(null);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    // 가시성에 따른 데이터 필터링 + 멀티 필터 적용
    const filteredSales = SALES_DATA.filter(sale => {
        // 1. 가시성 권한 체크 (현재 지사장 권한으로 고정하여 모든 하위 실적 조회 가능하게 설정 가능하나 요청에 따라 유지)
        if (!checkVisibility(currentAgent, sale.agentId)) return false;

        // 2. 멀티 필터 조건 체크
        if (filters.agent && !sale.agent.includes(filters.agent)) return false;
        if (filters.customer && !sale.customer.includes(filters.customer) && !sale.phone.includes(filters.customer)) return false;
        if (filters.region && sale.region !== filters.region) return false;
        if (filters.payment && sale.payment !== filters.payment) return false;
        if (filters.status && sale.status !== filters.status) return false;

        if (filters.startDate || filters.endDate) {
            const saleDate = new Date(sale.regDate);
            if (filters.startDate && saleDate < new Date(filters.startDate)) return false;
            if (filters.endDate && saleDate > new Date(filters.endDate)) return false;
        }

        return true;
    });

    return (
        <div className="space-y-4">
            {/* Optimized Filter & Action Integrated Section - Precise 12-Column Grid */}
            {/* Optimized Filter & Action Integrated Section - Precise 12-Column Grid */}
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                {/* Mobile Filter Toggle Button */}
                <div className="lg:hidden flex justify-between items-center mb-2 px-1">
                    <button
                        onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                        className="flex items-center gap-2 text-xs font-black text-doctor-blue bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 transition-all active:scale-95"
                    >
                        <Filter size={14} className={isFilterExpanded ? 'rotate-180 transition-transform' : ''} />
                        {isFilterExpanded ? '상세 필터 접기' : '상세 필터 열기'}
                    </button>
                    {!isFilterExpanded && (
                        <div className="flex gap-1">
                            <button className="p-1.5 bg-gray-800 text-white rounded-lg hover:bg-black transition-all">
                                <Search size={14} />
                            </button>
                            <button
                                onClick={() => setFilters({ agent: '', customer: '', region: '', startDate: '', endDate: '', payment: '', status: '' })}
                                className="p-1.5 bg-gray-100 text-gray-400 rounded-lg border border-gray-200"
                            >
                                <Repeat size={14} />
                            </button>
                        </div>
                    )}
                </div>

                <div className={`${isFilterExpanded ? 'grid' : 'hidden lg:grid'} grid-cols-2 md:grid-cols-5 lg:grid-cols-12 gap-x-1.5 gap-y-3 items-end transition-all duration-300`}>
                    {/* 영업자 검색 (1 col) */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-tighter ml-0.5">영업자</label>
                        <input
                            type="text"
                            placeholder="성명"
                            value={filters.agent}
                            onChange={(e) => handleFilterChange('agent', e.target.value)}
                            className="bg-gray-50 border border-gray-100 rounded-lg px-1.5 py-1 text-[10px] font-bold text-gray-700 outline-none focus:ring-1 focus:ring-doctor-blue focus:bg-white transition-all w-full"
                        />
                    </div>

                    {/* 구매자 검색 (1 col) */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-tighter ml-0.5">구매자</label>
                        <input
                            type="text"
                            placeholder="이름/연락처"
                            value={filters.customer}
                            onChange={(e) => handleFilterChange('customer', e.target.value)}
                            className="bg-gray-50 border border-gray-100 rounded-lg px-1.5 py-1 text-[10px] font-bold text-gray-700 outline-none focus:ring-1 focus:ring-doctor-blue focus:bg-white transition-all w-full"
                        />
                    </div>

                    {/* 지역 필터 (1 col) */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-tighter ml-0.5">지역</label>
                        <select
                            value={filters.region}
                            onChange={(e) => handleFilterChange('region', e.target.value)}
                            className="bg-gray-50 border border-gray-100 rounded-lg px-1 py-1 text-[10px] font-bold text-gray-700 outline-none focus:ring-1 focus:ring-doctor-blue focus:bg-white transition-all w-full appearance-none cursor-pointer"
                        >
                            <option value="" className="text-gray-700">전지역</option>
                            {['서울', '경기', '인천', '부산', '대구', '대전', '광주', '울산', '강원', '충북', '충남', '전북', '전남', '제주', '경북', '경남'].map(r => (
                                <option key={r} value={r} className="text-gray-700">{r}</option>
                            ))}
                        </select>
                    </div>

                    {/* 등록일자 (시작) (1 col) */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-tighter ml-0.5">시작일</label>
                        <input
                            type="date"
                            value={filters.startDate}
                            onChange={(e) => handleFilterChange('startDate', e.target.value)}
                            className="bg-gray-50 border border-gray-100 rounded-lg px-1 py-1 text-[10px] font-bold text-gray-700 outline-none focus:ring-1 focus:ring-doctor-blue focus:bg-white transition-all w-full"
                        />
                    </div>

                    {/* 등록일자 (종료) (1 col) */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-tighter ml-0.5">종료일</label>
                        <input
                            type="date"
                            value={filters.endDate}
                            onChange={(e) => handleFilterChange('endDate', e.target.value)}
                            className="bg-gray-50 border border-gray-100 rounded-lg px-1 py-1 text-[10px] font-bold text-gray-700 outline-none focus:ring-1 focus:ring-doctor-blue focus:bg-white transition-all w-full"
                        />
                    </div>

                    {/* 결제방식 필터 (1 col) */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-tighter ml-0.5">결제방식</label>
                        <select
                            value={filters.payment}
                            onChange={(e) => handleFilterChange('payment', e.target.value)}
                            className="bg-gray-50 border border-gray-100 rounded-lg px-1 py-1 text-[10px] font-bold text-gray-700 outline-none focus:ring-1 focus:ring-doctor-blue focus:bg-white transition-all w-full appearance-none cursor-pointer"
                        >
                            <option value="" className="text-gray-700">전체</option>
                            <option value="렌탈" className="text-gray-700">렌탈</option>
                            <option value="계좌입금" className="text-gray-700">계좌입금</option>
                            <option value="카드결제" className="text-gray-700">카드결제</option>
                        </select>
                    </div>

                    {/* 배송현황 필터 (1 col) */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-tighter ml-0.5">배송현황</label>
                        <select
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="bg-gray-50 border border-gray-100 rounded-lg px-1 py-1 text-[10px] font-bold text-gray-700 outline-none focus:ring-1 focus:ring-doctor-blue focus:bg-white transition-all w-full appearance-none cursor-pointer"
                        >
                            <option value="" className="text-gray-700">전체</option>
                            <option value="준비중" className="text-gray-700">준비중</option>
                            <option value="배송중" className="text-gray-700">배송중</option>
                            <option value="도착완료" className="text-gray-700">도착완료</option>
                        </select>
                    </div>

                    {/* Action Buttons (Search & Reset) (2 cols) */}
                    <div className="flex items-center gap-1 lg:col-span-2">
                        <button className="flex-none w-8 bg-gray-800 text-white rounded-lg h-[28px] flex items-center justify-center hover:bg-black transition-all shadow-sm">
                            <Search size={14} />
                        </button>
                        <button
                            onClick={() => setFilters({ agent: '', customer: '', region: '', startDate: '', endDate: '', payment: '', status: '' })}
                            className="bg-gray-100 text-gray-500 rounded-lg h-[28px] px-2 flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-200 text-[10px] font-bold whitespace-nowrap"
                            style={{ width: '70%' }}
                        >
                            검색초기화
                        </button>
                    </div>

                    {/* Spacer (1 col) */}
                    <div className="hidden lg:block lg:col-span-1"></div>

                    {/* Excel Download Button (1 col) */}
                    <div className="lg:block">
                        <button className="w-full flex items-center justify-center gap-1 h-[28px] text-doctor-blue bg-blue-50 hover:bg-blue-100 rounded-lg font-bold transition-all text-[10px] border border-blue-100">
                            <Download size={12} />
                            엑셀출력
                        </button>
                    </div>

                    {/* Performance Registration Button (1 col) */}
                    <div className="lg:block">
                        <button
                            onClick={() => setIsRegModalOpen(true)}
                            className="w-full flex items-center justify-center gap-1 h-[28px] bg-doctor-blue text-white rounded-lg font-black shadow-md shadow-blue-100 hover:bg-blue-800 transition-all text-[10px] whitespace-nowrap"
                        >
                            <Plus size={14} />
                            실적 등록
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Summary Row - Seniors Friendly (Larger Font) */}
            <div className="flex justify-start items-center px-4 py-3 bg-white border-y border-gray-50">
                <span className="text-base font-black text-gray-500">
                    현재 조회된 건수: <span className="text-doctor-blue text-xl">{filteredSales.length}</span>건
                </span>
            </div>

            <div className="bg-white rounded-b-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full text-left table-fixed font-inter min-w-[1600px]">
                        <thead>
                            <tr className="bg-doctor-blue text-white">
                                <th className="w-16 px-2 py-6 text-sm font-black uppercase text-center border-r border-white/10 whitespace-nowrap">순번</th>
                                <th className="w-32 px-4 py-6 text-sm font-black uppercase tracking-wider text-center border-r border-white/10 whitespace-nowrap">판매자</th>
                                <th className="w-48 px-4 py-6 text-sm font-black uppercase tracking-wider border-r border-white/10 whitespace-nowrap">구매 고객</th>
                                <th className="w-28 px-4 py-6 text-sm font-black uppercase tracking-wider text-center border-r border-white/10 whitespace-nowrap">지역</th>
                                <th className="w-[600px] min-w-[600px] px-4 py-6 text-sm font-black uppercase tracking-wider leading-tight border-r border-white/10 whitespace-nowrap">배송 주소</th>
                                <th className="w-36 px-4 py-6 text-sm font-black uppercase tracking-wider text-center border-r border-white/10 whitespace-nowrap">등록일</th>
                                <th className="w-32 px-4 py-6 text-sm font-black uppercase tracking-wider text-center border-r border-white/10 whitespace-nowrap">결제방식</th>
                                <th className="w-28 px-4 py-6 text-sm font-black uppercase tracking-wider text-center border-r border-white/10 whitespace-nowrap">서류</th>
                                <th className="w-32 px-4 py-6 text-sm font-black uppercase tracking-wider text-center border-r border-white/10 whitespace-nowrap">배송상태</th>
                                <th className="w-40 px-4 py-6 text-sm font-black uppercase tracking-wider text-center whitespace-nowrap">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredSales.length > 0 ? (
                                filteredSales.map((sale, index) => (
                                    <tr key={sale.id} className="hover:bg-blue-50/40 transition-colors group">
                                        <td className="px-2 py-8 text-center text-xs font-bold text-gray-400">{filteredSales.length - index}</td>
                                        <td className="px-4 py-8 text-center">
                                            <span className="text-sm font-black text-gray-900 bg-gray-100 px-3 py-1.5 rounded uppercase">{sale.agent}</span>
                                        </td>
                                        <td className="px-4 py-8">
                                            <p className="text-base font-black text-gray-900 leading-tight">{maskName(sale.customer)}</p>
                                            <p className="text-sm font-bold text-blue-600 font-mono mt-1">{sale.phone}</p>
                                        </td>
                                        <td className="px-4 py-8 text-center">
                                            <span className="text-sm font-bold text-gray-800">{sale.region}</span>
                                        </td>
                                        <td className="px-4 py-8 text-sm text-gray-600 font-medium whitespace-normal break-all" title={sale.address}>{sale.address}</td>
                                        <td className="px-4 py-8 text-center">
                                            <span className="text-sm font-bold text-gray-600 font-mono">{sale.regDate}</span>
                                        </td>
                                        <td className="px-4 py-8 text-center">
                                            <button
                                                onClick={() => setPaymentDetail(sale.paymentDetails)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-black text-white shadow-sm hover:scale-105 transition-all ${sale.payment === '렌탈' ? 'bg-purple-600' : sale.payment === '카드결제' ? 'bg-indigo-600' : 'bg-emerald-600'
                                                    }`}
                                            >
                                                {sale.payment}
                                            </button>
                                        </td>
                                        <td className="px-4 py-8 text-center">
                                            {sale.attachments ? (
                                                <div className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-100 font-black whitespace-nowrap min-w-[70px]">
                                                    <FileText size={16} />
                                                    <span className="text-xs">{sale.attachments.length}개</span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-300 font-black">-</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-8 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                {sale.status === '도착완료' && <CheckCircle2 size={20} className="text-green-600" />}
                                                {sale.status === '배송중' && <Truck size={20} className="text-blue-600" />}
                                                {sale.status === '준비중' && <Clock size={20} className="text-gray-400" />}
                                                <span className="text-[11px] font-black text-gray-600">{sale.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-8 text-center">
                                            <div className="flex justify-center gap-2.5">
                                                <button title="수정" className="p-2.5 rounded-xl bg-gray-50 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 border border-gray-100 transition-all shadow-sm"><Edit size={18} /></button>
                                                <button title="복사" className="p-2.5 rounded-xl bg-gray-50 text-gray-500 hover:text-blue-600 hover:bg-blue-50 border border-gray-100 transition-all shadow-sm"><Copy size={18} /></button>
                                                <button title="삭제" className="p-2.5 rounded-xl bg-gray-50 text-gray-500 hover:text-red-500 hover:bg-red-50 border border-gray-100 transition-all shadow-sm"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-2 text-gray-400">
                                            <FileText size={48} className="opacity-20" />
                                            <p className="text-sm font-bold">표시할 실적 내역이 없습니다.</p>
                                            <p className="text-xs">필터 조건을 변경하거나 신규 실적을 등록하세요.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <PaymentDetailModal isOpen={!!paymentDetail} onClose={() => setPaymentDetail(null)} data={paymentDetail} />

            {isRegModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden font-inter my-8">
                        <div className="p-6 lg:p-8">
                            <div className="flex justify-between items-center mb-6 lg:mb-8 border-b border-gray-100 pb-4">
                                <h3 className="text-xl lg:text-2xl font-black text-gray-800 tracking-tight">영업 실적 등록</h3>
                                <button onClick={() => setIsRegModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1"><X size={24} /></button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
                                <div className="space-y-2 col-span-1 sm:col-span-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">파일 첨부 (구매신청서 등)</label>
                                    <label className="flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 hover:bg-blue-50/50 hover:border-blue-300 transition-all cursor-pointer group">
                                        <div className="flex flex-col items-center justify-center py-4 px-2 text-center">
                                            <FileUp size={24} className="text-gray-300 group-hover:text-blue-500 mb-1 transition-colors" />
                                            <p className="text-[11px] font-bold text-gray-500">클릭하거나 파일을 드래그하세요</p>
                                        </div>
                                        <input type="file" className="hidden" multiple />
                                    </label>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">고객명</label>
                                    <input type="text" className="w-full border-b-2 border-gray-200 py-2 focus:border-doctor-blue outline-none font-bold text-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">전화번호</label>
                                    <input type="text" className="w-full border-b-2 border-gray-200 py-2 focus:border-doctor-blue outline-none font-bold text-sm" />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-gray-100">
                                <button onClick={() => setIsRegModalOpen(false)} className="flex-1 py-3.5 bg-gray-50 text-gray-600 rounded-2xl font-black hover:bg-gray-100 transition-all uppercase tracking-widest text-[10px]">취소</button>
                                <button onClick={() => setIsRegModalOpen(false)} className="flex-1 py-3.5 bg-doctor-blue text-white rounded-2xl font-black hover:bg-blue-800 shadow-xl shadow-blue-100 transition-all uppercase tracking-widest text-[10px]">실적 저장</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
