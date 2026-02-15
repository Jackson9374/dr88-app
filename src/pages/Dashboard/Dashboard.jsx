import {
    TrendingUp,
    Users,
    Package,
    Wallet
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts';
import { MONTHLY_TREND } from '../../constants/dummyData';

const StatCard = ({ title, value, subValue, icon: Icon, color }) => (
    <div className="bg-white p-4 lg:p-8 rounded-3xl shadow-md border border-gray-100 flex items-start justify-between transition-transform hover:scale-[1.02]">
        <div className="overflow-hidden">
            <p className="text-[11px] lg:text-base font-bold text-gray-500 mb-1 lg:mb-2 truncate">{title}</p>
            <h3 className="text-xl lg:text-3xl font-black text-gray-900 tracking-tight leading-tight">{value}</h3>
            {subValue && (
                <div className="flex items-center gap-1.5 mt-2 lg:mt-2.5">
                    <span className="text-[10px] lg:text-sm text-green-600 font-black bg-green-50 px-2 py-0.5 rounded-full whitespace-nowrap">{subValue}</span>
                </div>
            )}
        </div>
        <div className={`p-2.5 lg:p-4 rounded-xl lg:rounded-2xl ${color} text-white shrink-0 ml-2 lg:ml-3 shadow-lg`}>
            <Icon size={20} className="lg:hidden" />
            <Icon size={32} className="hidden lg:block" />
        </div>
    </div>
);

export default function Dashboard() {
    return (
        <div className="space-y-8">
            {/* 요약 카드 영역 - Seniors Friendly Optimization: Mobile 2 columns */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8">
                <StatCard
                    title="당월 총 판매량"
                    value="184대"
                    subValue="+12% 전월 대비"
                    icon={TrendingUp}
                    color="bg-blue-600"
                />
                <StatCard
                    title="활성 영업자 수"
                    value="142명"
                    subValue="+5명 신규"
                    icon={Users}
                    color="bg-indigo-600"
                />
                <StatCard
                    title="미처리 배송 현황"
                    value="24건"
                    subValue="긴급 3건"
                    icon={Package}
                    color="bg-orange-500"
                />
                <StatCard
                    title="누적 매출액"
                    value="12.8억원"
                    subValue="+8,500만원"
                    icon={Wallet}
                    color="bg-emerald-600"
                />
            </div>

            {/* 차트 영역 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="lg:col-span-2 bg-white p-4 lg:p-8 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <h4 className="text-lg font-bold text-gray-800">최근 6개월 판매 추이</h4>
                        <select className="w-full sm:w-auto text-sm border-gray-200 rounded-lg focus:ring-doctor-blue outline-none">
                            <option>전체 제품</option>
                            <option>닥터88+</option>
                            <option>전용 젤</option>
                        </select>
                    </div>
                    <div className="h-[250px] lg:h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={MONTHLY_TREND}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="sales" fill="#1e3a8a" radius={[4, 4, 0, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-doctor-blue p-6 lg:p-8 rounded-2xl shadow-lg text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h4 className="text-xl font-bold mb-2 tracking-tight">지사 승격 대상자</h4>
                        <p className="text-blue-200 text-xs mb-6 font-medium">이번 달 요건 충족 현황 (Top 2)</p>

                        <div className="space-y-4">
                            {[
                                { name: '이영희 점장', progress: 85, left: '점장 3명' },
                                { name: '정지웅 점장', progress: 70, left: '점장 4명' },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-blue-800/50 p-4 rounded-xl border border-blue-700/50">
                                    <div className="flex justify-between text-xs mb-2 font-bold">
                                        <span>{item.name}</span>
                                        <span className="text-blue-300">남은 요건: {item.left}</span>
                                    </div>
                                    <div className="w-full bg-blue-900 rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-blue-400 h-full rounded-full transition-all duration-1000" style={{ width: `${item.progress}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-8 py-3 bg-white text-doctor-blue rounded-xl font-black text-xs hover:bg-black hover:text-white transition-all uppercase tracking-widest">
                            상세 리포트 보기
                        </button>
                    </div>
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-700/30 rounded-full blur-3xl"></div>
                </div>
            </div>
        </div>
    );
}
