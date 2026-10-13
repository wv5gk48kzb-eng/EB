
import React, { useState } from 'react';
import {
  Search, Globe, Heart, Shirt, Sparkles,
  Leaf, Wind, Menu, X, ArrowLeft
} from 'lucide-react';

const items = [
  {
    id: 1,
    name: 'القطن',
    en: 'Cotton',
    type: 'fabric',
    desc: 'قماش ناعم ومريح وجيد التهوية.',
    use: 'القمصان والملابس اليومية وملابس النوم.',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'الكتان',
    en: 'Linen',
    type: 'fabric',
    desc: 'خامة خفيفة مناسبة للأجواء الدافئة.',
    use: 'القمصان الصيفية والفساتين والبناطيل.',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'الدنيم',
    en: 'Denim',
    type: 'fabric',
    desc: 'قماش متين يتحمل الاستخدام المتكرر.',
    use: 'الجينز والجاكيتات والتنانير.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'الحرير',
    en: 'Silk',
    type: 'fabric',
    desc: 'خامة ناعمة وانسيابية تحتاج عناية مناسبة.',
    use: 'البلوزات والأوشحة والفساتين.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    name: 'الفساتين',
    en: 'Dresses',
    type: 'clothing',
    desc: 'تختلف الخامة المناسبة حسب التصميم والموسم.',
    use: 'القطن للاستخدام اليومي والكتان للصيف.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    name: 'القمصان',
    en: 'Shirts',
    type: 'clothing',
    desc: 'اختاري خامة مريحة تناسب طريقة الاستخدام.',
    use: 'القطن والكتان وخلطات الأقمشة.',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80'
  }
];

export default function App() {
  const [english, setEnglish] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const t = (ar, en) => english ? en : ar;

  const filtered = items.filter(item => {
    const matchesCategory =
      category === 'all' || item.type === category ||
      (category === 'favorites' && favorites.includes(item.id));

    const matchesSearch =
      item.name.includes(search) ||
      item.en.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  function toggleFavorite(id) {
    setFavorites(old =>
      old.includes(id) ? old.filter(x => x !== id) : [...old, id]
    );
  }

  return (
    <div className="app" dir={english ? 'ltr' : 'rtl'}>
      <header className="header">
        <button className="brand" onClick={() => setSelected(null)}>
          <span className="brand-icon"><Shirt /></span>
          <span>EB <b>Doc</b><small>{t('دليل الأقمشة والملابس', 'Fabric & Clothing Guide')}</small></span>
        </button>

        <button className="language" onClick={() => setEnglish(!english)}>
          <Globe size={18} /> {english ? 'عربي' : 'English'}
        </button>
      </header>

      {!selected ? (
        <>
          <section className="hero">
            <div className="hero-text">
              <span className="eyebrow"><Sparkles size={16} /> EB DOC GUIDE</span>
              <h1>{t('اكتشفي عالم الأقمشة', 'Discover the world of fabrics')}</h1>
              <p>{t(
                'دليلك لاختيار الأقمشة والملابس المناسبة لك، مع صور وخصائص واستخدامات كل خامة.',
                'Explore fabrics and clothing with useful properties, photos and recommendations.'
              )}</p>
              <button className="main-button" onClick={() =>
                document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' })
              }>
                {t('ابدئي الاستكشاف', 'Explore now')} <ArrowLeft size={18} />
              </button>
            </div>
            <img className="hero-image"
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1100&q=85"
              alt={t('ملابس متنوعة', 'Fashion clothing')} />
          </section>

          <main className="content" id="catalog">
            <div className="heading">
              <div>
                <span className="eyebrow">{t('دليلك الشخصي', 'YOUR STYLE GUIDE')}</span>
                <h2>{t('اختاري الصنف المناسب', 'Find your category')}</h2>
              </div>
              <span className="count">{filtered.length} {t('أصناف', 'items')}</span>
            </div>

            <div className="search-box">
              <Search size={20} />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder={t('ابحثي عن القطن أو الفساتين...', 'Search fabrics or clothing...')} />
            </div>

            <div className="filters">
              {[
                ['all', t('الكل', 'All')],
                ['fabric', t('الأقمشة', 'Fabrics')],
                ['clothing', t('الملابس', 'Clothing')],
                ['favorites', t('المفضلة', 'Favorites')]
              ].map(([value, label]) => (
                <button key={value}
                  className={category === value ? 'filter active' : 'filter'}
                  onClick={() => setCategory(value)}>
                  {label}
                </button>
              ))}
            </div>

            <div className="grid">
              {filtered.map(item => (
                <article className="card" key={item.id}>
                  <button className="photo" onClick={() => setSelected(item)}>
                    <img src={item.image} alt={english ? item.en : item.name}
                      loading="lazy" />
                  </button>
                  <button className="favorite"
                    onClick={() => toggleFavorite(item.id)}
                    aria-label={t('إضافة للمفضلة', 'Add to favorites')}>
                    <Heart size={19}
                      fill={favorites.includes(item.id) ? '#d38ca5' : 'none'}
                      color="#c7839d" />
                  </button>
                  <div className="card-text">
                    <span className="english-name">{item.en}</span>
                    <h3>{english ? item.en : item.name}</h3>
                    <p>{english ? item.desc : item.desc}</p>
                    <button className="details" onClick={() => setSelected(item)}>
                      {t('التفاصيل', 'Details')} <ArrowLeft size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {!filtered.length && (
              <p className="empty">{t('ما لقينا نتائج، جرّبي كلمة ثانية.', 'No results found.')}</p>
            )}
          </main>
        </>
      ) : (
        <main className="detail">
          <button className="back" onClick={() => setSelected(null)}>
            <ArrowLeft size={18} /> {t('العودة للأصناف', 'Back to categories')}
          </button>
          <div className="detail-layout">
            <img src={selected.image} alt={selected.en} />
            <div className="detail-info">
              <span className="eyebrow">{selected.en}</span>
              <h1>{english ? selected.en : selected.name}</h1>
              <p>{english ? selected.desc : selected.desc}</p>
              <h3><Leaf size={18} /> {t('الاستخدامات المناسبة', 'Suggested uses')}</h3>
              <p>{english ? selected.use : selected.use}</p>
              <h3><Wind size={18} /> {t('نصيحة', 'Tip')}</h3>
              <p>{t(
                'تحققي من ملصق العناية وجرّبي الخامة إذا كانت بشرتك حساسة.',
                'Check the care label and test fabric comfort if you have sensitive skin.'
              )}</p>
              <button className="main-button" onClick={() => toggleFavorite(selected.id)}>
                <Heart size={18} /> {t('إضافة للمفضلة', 'Add to favorites')}
              </button>
            </div>
          </div>
        </main>
      )}

      <footer className="footer">
        <span>EB Doc ♡</span>
        <p>{t('اختيارات أفضل تبدأ بمعرفة الخامة.', 'Better choices start with knowing your fabric.')}</p>
      </footer>
    </div>
  );
}
