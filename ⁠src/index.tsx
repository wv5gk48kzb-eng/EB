import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  ShieldCheck, Heart, Sparkles, Bell, Globe, Mail, Lock, Search, ChevronRight, ArrowRight
} from 'lucide-react';

const FABRICS_DATA = [
  {
    id: 'silk-natural',
    nameAr: 'الحرير الطبيعي',
    shortDesc: 'ينزلق بسلاسة فائقة دون سحب أو احتكاك ميكانيكي بالجلد.',
    icon: '🧵',
    frictionRisk: 'منخفض جداً'
  }
];

function App() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'main' | 'recommendations'>('login');
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  return (
    <div className="min-h-screen bg-[#FFF8F6] text-[#2C1820] font-sans flex justify-center items-center p-0 sm:p-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md bg-white min-h-screen sm:min-h-[844px] sm:rounded-[40px] shadow-2xl flex flex-col justify-between overflow-hidden relative">
        <div className="bg-[#FFF3F0] px-6 pt-3 pb-2 flex justify-between items-center border-b border-[#F5E2DC]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-5 h-5 text-[#C85274]" />
            <span className="font-bold text-sm text-[#4A2031]">EB Doc</span>
          </div>
          <button onClick={() => setLanguage(l => l === 'ar' ? 'en' : 'ar')} className="flex items-center gap-1 text-xs font-semibold text-[#8C3A53] bg-white px-2.5 py-1 rounded-full border border-[#F0C2CF]">
            <Globe className="w-3.5 h-3.5" />
            {language === 'ar' ? 'English' : 'العربية'}
          </button>
        </div>

        {currentScreen === 'login' && (
          <div className="flex-1 p-6 flex flex-col justify-between bg-gradient-to-b from-[#FFF3F0] to-white">
            <div className="text-center my-auto space-y-4">
              <div className="w-20 h-20 bg-[#FCE8ED] rounded-full flex items-center justify-center mx-auto border-2 border-[#F0B8C8]">
                <Heart className="w-10 h-10 text-[#C85274] fill-[#C85274]" />
              </div>
              <h1 className="text-2xl font-black text-[#4A2031]">EB Doc</h1>
              <p className="text-sm font-medium text-[#7A4053]">دليلك الشامل للاهتمام بالبشرة الهشة والعناية المتخصصة</p>

              <div className="space-y-3 pt-4 text-right">
                <div className="relative">
                  <input type="email" placeholder="البريد الإلكتروني أو اسم المستخدم" className="w-full p-3.5 pr-11 bg-[#FFF8F6] border border-[#F0D0D8] rounded-2xl text-xs outline-none" />
                  <Mail className="w-4 h-4 text-[#A06075] absolute right-4 top-4" />
                </div>
                <div className="relative">
                  <input type="password" placeholder="كلمة المرور" className="w-full p-3.5 pr-11 bg-[#FFF8F6] border border-[#F0D0D8] rounded-2xl text-xs outline-none" />
                  <Lock className="w-4 h-4 text-[#A06075] absolute right-4 top-4" />
                </div>
              </div>

              <button onClick={() => setCurrentScreen('main')} className="w-full bg-[#C85274] text-white py-3.5 rounded-2xl font-bold text-sm shadow-md mt-2">
                تسجيل الدخول
              </button>
            </div>
          </div>
        )}

        {currentScreen === 'main' && (
          <div className="flex-1 p-5 space-y-4 overflow-y-auto">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-[#4A2031]">مرحباً بك في EB Doc 👋</h2>
                <p className="text-xs text-[#8C5869]">نحن هنا لمساعدتك في العناية ببشرتك</p>
              </div>
              <button className="p-2 bg-[#FDE8ED] rounded-full text-[#C85274]"><Bell className="w-5 h-5" /></button>
            </div>

            <button onClick={() => setCurrentScreen('recommendations')} className="w-full bg-[#C85274] text-white p-3.5 rounded-2xl font-bold text-xs flex justify-between items-center shadow-sm">
              <span>تصفح كل التوصيات والمنتجات</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          </div>
        )}

        {currentScreen === 'recommendations' && (
          <div className="flex-1 p-5 space-y-4 overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#4A2031]">دليل التوصيات والمنتجات</h2>
              <button onClick={() => setCurrentScreen('main')} className="text-xs text-[#8C3A53] font-semibold">إلغاء</button>
            </div>
            <div className="space-y-3">
              {FABRICS_DATA.map(item => (
                <div key={item.id} className="bg-white p-3.5 rounded-2xl border border-[#F5E0E6] shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl bg-[#FFF0F4] p-2 rounded-xl">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-xs text-[#4A2031]">{item.nameAr}</h4>
                      <p className="text-[10px] text-[#7A4053]">{item.shortDesc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#A06075] rotate-180" />
                </div>
              ))}
            </div>
          </div>
        )}

        {currentScreen !== 'login' && (
          <nav className="bg-white border-t border-[#F5E0E6] p-2 flex justify-around items-center text-[10px] font-bold text-[#8C5869]">
            <button onClick={() => setCurrentScreen('main')} className="flex flex-col items-center gap-1 p-1"><Heart className="w-5 h-5" /><span>الرئيسية</span></button>
            <button onClick={() => setCurrentScreen('recommendations')} className="flex flex-col items-center gap-1 p-1"><Sparkles className="w-5 h-5" /><span>التوصيات</span></button>
          </nav>
        )}
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
