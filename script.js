// قاعدة بيانات تجريبية لكاميرات البث المباشر في العراق
const feeds = [
    { id: 1, region: "بغداد", name: "تقاطع ساحة التحرير - بغداد", res: "1080p HD", status: "نشط" },
    { id: 2, region: "البصرة", name: "كورنيش شط العرب - البصرة", res: "1080p HD", status: "نشط" },
    { id: 3, region: "أربيل", name: "قلعة أربيل المركزية - أربيل", res: "720p HD", status: "نشط" },
    { id: 4, region: "بغداد", name: "جسر الأئمة الرئيسي - بغداد", res: "1080p HD", status: "نشط" }
];

// دالة عرض الكاميرات في الشبكة بناءً على القطاع المحدد
function renderFeeds(selectedRegion = 'الكل') {
    const grid = document.getElementById('feeds-grid');
    grid.innerHTML = '';

    const filtered = selectedRegion === 'الكل' ? feeds : feeds.filter(f => f.region === selectedRegion);

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-2 text-center py-12 text-slate-500 text-sm">
                لا توجد عُقد نشطة متاحة في هذا القطاع حالياً.
            </div>
        `;
        return;
    }

    filtered.forEach(feed => {
        const card = document.createElement('div');
        card.className = "bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-xl relative group h-64";
        card.innerHTML = `
            <div class="bg-slate-950/80 px-4 py-2 border-b border-slate-800 flex justify-between items-center text-xs">
                <span class="font-semibold text-slate-300">${feed.name}</span>
                <span class="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/50 flex items-center space-x-1 space-x-reverse">
                    <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    <span>${feed.status}</span>
                </span>
            </div>
            <div class="flex-1 flex flex-col items-center justify-center bg-slate-950 relative">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent opacity-40"></div>
                <div class="text-slate-600 text-3xl mb-2">📡</div>
                <span class="text-xs text-slate-500 tracking-wider">تدفق فيديو مباشر (${feed.res})</span>
            </div>
            <div class="bg-slate-900/90 px-4 py-2 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
                <span>القطاع: ${feed.region}</span>
                <button onclick="alert('جاري الاتصال بالعقدة: ${feed.name}')" class="bg-slate-800 hover:bg-emerald-600 hover:text-white px-3 py-1 rounded transition">استعراض</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// دالة تصفية القطاعات عند الضغط على الأزرار الجانبية
function filterRegion(region) {
    renderFeeds(region);
}

// تشغيل النظام وعرض كافة العقد فور تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    renderFeeds('الكل');
});
