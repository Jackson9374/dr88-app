import React, { useState } from 'react';
import {
    Search,
    Plus,
    Megaphone,
    FileText,
    Calendar,
    MoreVertical,
    ChevronRight
} from 'lucide-react';

const DUMMY_NOTICES = [
    { id: 1, title: '2월 영업 정책 변경 안내', category: '영업지침', date: '2024-02-10', author: '본사 관리부', content: '2월부터 적용되는 새로운 수수료 체계 및 기기 판매 정책입니다...' },
    { id: 2, title: '설 연휴 배송 일정 공지', category: '공지사항', date: '2024-02-05', author: '물류팀', content: '설 연휴 기간 동안의 제품 발송 및 젤 추가 주문 배송 일정을 안내 드립니다.' },
    { id: 3, title: '[중요] 개인정보 처리방침 개정 알림', category: '공지사항', date: '2024-01-30', author: '법무팀', content: '사용자 및 영업자 개인정보 처리방침이 아래와 같이 변경될 예정입니다.' },
    { id: 4, title: '신규 점장 승격 대상자 명단 발송', category: '공지사항', date: '2024-01-28', author: '영업본부', content: '1월 실적 기준 점장 승격 대상자 명단을 각 지사장님 메일로 발송하였습니다.' },
    { id: 5, title: '닥터88+ 기기 유지보수 및 AS 가이드', category: '영업지침', date: '2024-01-20', author: '기술지원팀', content: '기기 사용 중 발생할 수 있는 주요 장애 현상 및 현장 대응 매뉴얼입니다.' }
];

export default function Notice() {
    return (
        <div className="space-y-4">
            <div className="flex justify-end items-center">
                <button className="flex items-center gap-2 px-5 py-2 bg-doctor-blue text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-800 transition-all text-xs">
                    <Plus size={16} />
                    글쓰기
                </button>
            </div>

            <div className="flex gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="제목, 내용 검색..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-doctor-blue outline-none transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    {['전체', '공지사항', '영업지침'].map(cat => (
                        <button key={cat} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${cat === '전체' ? 'bg-doctor-blue text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                {DUMMY_NOTICES.map((notice) => (
                    <div key={notice.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-doctor-blue transition-all cursor-pointer group relative overflow-hidden">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                                <div className={`mt-1 p-3 rounded-2xl ${notice.category === '영업지침' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                    {notice.category === '영업지침' ? <FileText size={20} /> : <Megaphone size={20} />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{notice.category}</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
                                            <Calendar size={10} />
                                            {notice.date}
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-800 group-hover:text-doctor-blue transition-colors">{notice.title}</h4>
                                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{notice.content}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right mr-2">
                                    <p className="text-xs font-bold text-gray-700">{notice.author}</p>
                                    <p className="text-[10px] text-gray-400">관리자</p>
                                </div>
                                <ChevronRight size={20} className="text-gray-300 group-hover:text-doctor-blue group-hover:translate-x-1 transition-all" />
                            </div>
                        </div>
                        {/* 가늘게 우측 강조색 표시 */}
                        <div className={`absolute right-0 top-0 bottom-0 w-1 ${notice.category === '영업지침' ? 'bg-orange-500' : 'bg-blue-500'
                            } opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-10">
                <div className="flex gap-1">
                    {[1, 2, 3].map(p => (
                        <button key={p} className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${p === 1 ? 'bg-doctor-blue text-white shadow-md shadow-blue-100' : 'bg-white text-gray-400 hover:bg-gray-50'
                            }`}>
                            {p}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
