export const AGENTS = [
    { id: 'A1', name: '김철수', rank: '지사장', level: 1, status: '정상', sales: 12, teamSales: 156, regDate: '2023-01-10' },
    { id: 'A2', name: '이영희', rank: '점장', uplineId: 'A1', level: 2, status: '정상', sales: 8, teamSales: 42, regDate: '2023-03-15' },
    { id: 'A3', name: '박민수', rank: '점장', uplineId: 'A2', level: 2, isPromoted: true, status: '정상', sales: 15, teamSales: 15, regDate: '2023-05-20' },
    { id: 'A4', name: '정지웅', rank: '점장', uplineId: 'A1', level: 2, status: '정상', sales: 5, teamSales: 38, regDate: '2023-06-12' },
    { id: 'A5', name: '최유진', rank: '프리랜서', uplineId: 'A4', level: 3, status: '정상', sales: 10, teamSales: 10, regDate: '2023-08-01' },
    { id: 'A6', name: '강현우', rank: '프리랜서', uplineId: 'A4', level: 3, status: '정상', sales: 7, teamSales: 7, regDate: '2023-09-11' },
    { id: 'A7', name: '지사장A', rank: '지사장', uplineId: 'A1', level: 1, isPromoted: true, status: '정상', sales: 22, teamSales: 45, regDate: '2023-02-14' },
    { id: 'A8', name: '점장B', rank: '점장', uplineId: 'A7', level: 2, status: '정상', sales: 12, teamSales: 20, regDate: '2023-04-25' },
    { id: 'A9', name: '프리C', rank: '프리랜서', uplineId: 'A8', level: 3, status: '정기', sales: 8, teamSales: 8, regDate: '2023-11-03' },
];

export const SALES_DATA = [
    {
        id: '12897',
        customer: '홍길동',
        phone: '010-1234-5678',
        region: '서울',
        address: '서울특별시 강남구 테헤란로 123',
        regDate: '2024-02-14',
        payment: '렌탈',
        agent: '박민수',
        agentId: 'A3', // A3의 직판
        status: '도착완료',
        attachments: [{ name: 'doc1.pdf', type: 'document' }]
    },
    {
        id: '12896',
        customer: '성춘향',
        phone: '010-2345-6789',
        region: '경기',
        address: '경기도 성남시 분당구 판교역로 234',
        regDate: '2024-02-13',
        payment: '카드',
        agent: '최유진',
        agentId: 'A5', // A4의 하위 프리랜서 실적
        status: '배송중',
        attachments: [{ name: 'img1.jpg', type: 'image' }]
    },
    {
        id: '12895',
        customer: '이몽룡',
        phone: '010-3456-7890',
        region: '인천',
        address: '인천광역시 연수구 송도미래로 34',
        regDate: '2024-02-12',
        payment: '계좌입금',
        agent: '한상훈',
        agentId: 'A4', // A4의 직판
        status: '준비중',
        attachments: []
    },
    {
        id: '12894',
        customer: '강감찬',
        phone: '010-1111-2222',
        region: '서울',
        address: '서울시 종로구',
        regDate: '2024-02-15',
        payment: '렌탈',
        agent: '점장B',
        agentId: 'A8', // A7의 하위 조직 실적 (A1이 볼 때 A7이 지사장이면 차단되어야 함)
        status: '도착완료',
    },
    {
        id: '12893',
        customer: '유관순',
        phone: '010-3333-4444',
        region: '충남',
        address: '천안시 서북구',
        regDate: '2024-02-16',
        payment: '카드',
        agent: '지사장A',
        agentId: 'A7', // A7의 직판 (A1이 볼 수 있어야 함)
        status: '배송중',
    }
];

export const MONTHLY_TREND = [
    { month: '9월', sales: 45 },
    { month: '10월', sales: 52 },
    { month: '11월', sales: 48 },
    { month: '12월', sales: 61 },
    { month: '1월', sales: 55 },
    { month: '2월', sales: 42 },
];
