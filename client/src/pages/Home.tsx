/**
 * أبو علي للاتصالات — Landing Page
 * Design: Bold Electric Blue
 * Primary: #0057FF | Accent: #FF6B00 | BG: #F4F6FA | Text: #0D1B2A
 * Fonts: Cairo (headings) + Tajawal (body) + Space Grotesk (numbers)
 */

import { useState, useEffect, useMemo, useRef } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// ─── Scroll Animation Hook ────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Star,
  Truck,
  Shield,
  Headphones,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Zap,
  Award,
  RefreshCw,
  Smartphone,
  Laptop,
  Watch,
  Cpu,
  Cable,
  Wrench,
  ArrowLeft,
  CheckCircle,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  LogOut,
  User,
  ChevronDown,
  Search,
  Grid2X2,
} from "lucide-react";

// ─── Image URLs ───────────────────────────────────────────────────────────────
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663786811951/JRcgdRnyZJ9kJAosaM5xmy/hero-phones-SGaT8CjQ2U74WdzKsdc8JZ.webp";
const LOGO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663786811951/JRcgdRnyZJ9kJAosaM5xmy/logo-icon-25Ymxw43M7XJ4ot9A6W2DR.webp";
const PRODUCTS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663786811951/JRcgdRnyZJ9kJAosaM5xmy/products-banner-Ah5DDtn8483e8hcfHe7qZB.webp";
const OFFER_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663786811951/JRcgdRnyZJ9kJAosaM5xmy/offer-banner-VDtaR2fGfBCPSCNWmhGF2H.webp";
const DELIVERY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663786811951/JRcgdRnyZJ9kJAosaM5xmy/delivery-icon-KTUVpFbdUR8S46stnPejGJ.webp";

// ─── Data ─────────────────────────────────────────────────────────────────────

const offers = [
  { title: "خصم 30% على الهواتف المجددة", sub: "عروض محدودة الوقت", color: "from-blue-700 to-blue-900" },
  { title: "اشترِ لابتوب واحصل على حقيبة مجاناً", sub: "لفترة محدودة", color: "from-orange-500 to-orange-700" },
  { title: "شحن مجاني على الطلبات فوق 500 ريال", sub: "لجميع المحافظات", color: "from-green-600 to-green-800" },
];

const stats = [
  { value: "50,000+", label: "عميل راضٍ" },
  { value: "10,000+", label: "منتج متوفر" },
  { value: "15+", label: "سنة خبرة" },
  { value: "4.9/5", label: "تقييم العملاء" },
];

const features = [
  {
    icon: Truck,
    title: "توصيل سريع",
    desc: "توصيل خلال 24-48 ساعة لجميع المحافظات مع تتبع فوري لشحنتك",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Shield,
    title: "ضمان أصالة المنتج",
    desc: "جميع منتجاتنا أصلية 100% مع ضمان رسمي من الشركة المصنعة",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: RefreshCw,
    title: "سياسة إرجاع مرنة",
    desc: "إرجاع مجاني خلال 14 يوماً من تاريخ الاستلام بدون شروط معقدة",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: Headphones,
    title: "دعم فني 24/7",
    desc: "فريق متخصص لدعمك على مدار الساعة عبر الهاتف والواتساب والشات",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const paymentMethods = ["Visa", "Mastercard", "Apple Pay", "Google Pay", "مدى", "الدفع عند الاستلام", "تحويل بنكي"];


// ─── Components ───────────────────────────────────────────────────────────────

function Navbar({ selectedCategory, onCategoryChange }: { selectedCategory?: string; onCategoryChange: (value: string | undefined) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const [, navigate] = useLocation();
  const { data: categories = [] } = trpc.products.categories.useQuery();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      toast.success("تم تسجيل الخروج بنجاح");
    } catch (error) {
      toast.error("حدث خطأ أثناء تسجيل الخروج");
    }
  };

  const handleShoppingCart = () => {
    if (loading) return;
    if (!user) {
      window.location.href = getLoginUrl();
    } else {
      navigate("/cart");
    }
  };

  const navLinks = [
    { label: "الرئيسية", href: "#hero" },
    { label: "المنتجات", href: "#products" },
    { label: "العروض", href: "#offers" },
    { label: "تواصل معنا", href: "#contact" },
  ];

  const handleCategorySelect = (category?: string) => {
    onCategoryChange(category);
    if (category) {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        "bg-white/95 backdrop-blur-xl shadow-lg shadow-blue-900/5"
      }`}
    >
      <div className="hidden bg-blue-600 text-white md:block">
        <div className="container flex items-center justify-between py-2 text-xs" style={{ fontFamily: "'Cairo', sans-serif" }}>
          <span>متجر أبو علي للاتصالات — تسوق بثقة</span>
          <div className="flex items-center gap-5"><span>واتساب: 050 000 0000</span><span>الدعم متاح يومياً</span></div>
        </div>
      </div>
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-blue-600 flex items-center justify-center shadow-md group-hover:shadow-blue-500/30 transition-shadow">
              <img src={LOGO_IMG} alt="أبو علي للاتصالات" className="w-8 h-8 object-contain" />
            </div>
            <div className="leading-tight">
              <div
                className={`font-bold text-base md:text-lg leading-none font-cairo transition-colors ${
                  "text-gray-900"
                }`}
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                أبو علي للاتصالات
              </div>
              <div className={`text-xs transition-colors ${"text-blue-600"}`}>
                وجهتك الأولى للتقنية
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-blue-600/10 hover:text-blue-600 ${
                  "text-gray-700 hover:text-blue-600"
                }`}
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:bg-blue-600/10 hover:text-blue-600 ${
                    "text-gray-700 hover:text-blue-600"
                  }`}
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  <span>{selectedCategory || "الفئات"}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 max-h-72 overflow-auto">
                <DropdownMenuLabel className="text-right">اختر فئة</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => handleCategorySelect(undefined)} className="text-right">
                  كل الفئات
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem key={category} onSelect={() => handleCategorySelect(category)} className="text-right">
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+966500000000"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                "text-gray-700 hover:text-blue-600"
              }`}
            >
              <Phone className="w-4 h-4" />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>+966 50 000 0000</span>
            </a>
                      {user ? (
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all focus:outline-none ${
"bg-blue-50 text-blue-700 hover:bg-blue-100"
                      }`}
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                      <User className="w-4 h-4" />
                      أهلاً وسهلاً، {user.name || "عميل"}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="text-right">
                      {user.name ? `مرحباً ${user.name}` : "مرحباً بك"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={() => navigate("/cart")}
                      className="text-right"
                    >
                      <ShoppingCart className="w-4 h-4 ml-2" />
                      السلة
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={handleLogout}
                      className="text-right text-destructive"
                    >
                      <LogOut className="w-4 h-4 ml-2" />
                      تسجيل الخروج
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    if (!loading) window.location.href = getLoginUrl();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 active:scale-95"
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                  disabled={loading}
                >
                  {loading ? "جارٍ التحقق..." : "تسجيل الدخول"}
                </Button>
                <Button
                  onClick={handleShoppingCart}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2 rounded-xl shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 active:scale-95"
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  <ShoppingCart className="w-4 h-4 ml-2" />
                  السلة
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 py-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700" style={{ fontFamily: "'Cairo', sans-serif" }}>
                الفئات
              </label>
              <select
                value={selectedCategory ?? ""}
                onChange={(event) => {
                  handleCategorySelect(event.target.value || undefined);
                  setMenuOpen(false);
                }}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-right text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:bg-white"
              >
                <option value="">كل الفئات</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
              <a
                href="tel:+966500000000"
                className="flex items-center gap-2 px-4 py-3 text-gray-600"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>+966 50 000 0000</span>
              </a>
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-blue-50 text-blue-700">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium" style={{ fontFamily: "'Cairo', sans-serif" }}>
                      أهلاً وسهلاً، {user.name || "عميل"}
                    </span>
                  </div>
                  <Button
                    onClick={() => {
                      handleShoppingCart();
                      setMenuOpen(false);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full rounded-xl"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    <ShoppingCart className="w-4 h-4 ml-2" />
                    السلة
                  </Button>
                  <Button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full text-sm font-medium rounded-lg border-gray-300 hover:bg-gray-100"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    <LogOut className="w-4 h-4 ml-1" />
                    خروج
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      if (!loading) {
                        window.location.href = getLoginUrl();
                      }
                      setMenuOpen(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold w-full rounded-xl"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                    disabled={loading}
                  >
                    {loading ? "جارٍ التحقق..." : "تسجيل الدخول"}
                  </Button>
                  <Button
                    onClick={() => {
                      handleShoppingCart();
                      setMenuOpen(false);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full rounded-xl"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    <ShoppingCart className="w-4 h-4 ml-2" />
                    السلة
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function CatalogHero({
  selectedCategory,
  onCategoryChange,
  onSearch,
}: {
  selectedCategory?: string;
  onCategoryChange: (value: string | undefined) => void;
  onSearch: (value: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [brandsOpen, setBrandsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { data: categories = [] } = trpc.products.categories.useQuery();
  const { data: brands = [] } = trpc.products.brands.useQuery();

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query.trim());
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openQuickSearch = () => {
    document.getElementById("quick-search")?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => searchInputRef.current?.focus(), 250);
  };

  const selectBrand = (brandName: string) => {
    setBrandsOpen(false);
    onSearch(brandName);
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="hero" className="bg-gradient-to-b from-slate-50 via-white to-white pt-24 pb-12 md:pt-28 md:pb-16">
      <div className="container">
        <div className="flex flex-col gap-5 rounded-[2rem] border border-white bg-white/90 p-4 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <form id="quick-search" onSubmit={submitSearch} className="flex min-h-14 flex-1 items-center overflow-hidden rounded-2xl border-2 border-gray-200 bg-white transition-colors focus-within:border-blue-600 focus-within:shadow-lg focus-within:shadow-blue-500/10">
              <Search className="mx-4 h-5 w-5 shrink-0 text-blue-600" />
              <input
                ref={searchInputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="ابحث عن منتج أو برند..."
                className="h-full min-w-0 flex-1 bg-transparent px-1 text-right text-sm text-gray-800 outline-none"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              />
              <button type="submit" className="h-full bg-blue-600 px-6 font-bold text-white transition hover:bg-blue-700" style={{ fontFamily: "'Cairo', sans-serif" }}>
                بحث
              </button>
            </form>
            <div className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-white lg:min-w-56">
              <Grid2X2 className="h-5 w-5" />
              <span className="font-bold" style={{ fontFamily: "'Cairo', sans-serif" }}>تصفح المتجر</span>
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
            <aside className="order-2 overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm lg:order-1 lg:sticky lg:top-28 lg:w-60 lg:shrink-0">
              <div
                className="relative"
                onMouseEnter={() => setBrandsOpen(true)}
                onMouseLeave={() => setBrandsOpen(false)}
              >
                <div className="flex items-center justify-between gap-3 rounded-t-2xl bg-gradient-to-l from-blue-700 to-blue-600 px-4 py-3.5 text-center font-bold text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  <button
                    type="button"
                    onClick={() => setBrandsOpen((open) => !open)}
                    onFocus={() => setBrandsOpen(true)}
                    aria-expanded={brandsOpen}
                    aria-haspopup="true"
                    className="inline-flex items-center gap-1.5 rounded-lg px-1 py-1 transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/60"
                  >
                    <span>البرندات</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${brandsOpen ? "rotate-180" : ""}`} />
                  </button>
                  <button
                    type="button"
                    onClick={openQuickSearch}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-2.5 py-1.5 text-[11px] font-semibold transition hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/60"
                    title="فتح البحث السريع"
                  >
                    <Search className="h-3.5 w-3.5" />
                    <span>بحث سريع</span>
                  </button>
                </div>
                <div
                  className={`absolute right-0 top-full z-50 mt-2 w-64 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 text-right shadow-2xl shadow-slate-900/15 transition-all duration-200 ${brandsOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
                  role="menu"
                  aria-label="أشهر البرندات"
                >
                  <div className="px-3 py-2 text-xs font-bold text-slate-400" style={{ fontFamily: "'Cairo', sans-serif" }}>أشهر البرندات</div>
                  <div className="grid grid-cols-2 gap-1">
                    {brands.slice(0, 6).map((brand) => (
                      <button
                        key={brand.id}
                        type="button"
                        role="menuitem"
                        onClick={() => selectBrand(brand.name)}
                        className="flex min-w-0 items-center gap-2 rounded-xl px-2 py-2 text-right text-xs font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:outline-none"
                      >
                        {brand.logo ? <img src={brand.logo} alt="" className="h-5 w-5 shrink-0 rounded object-contain" /> : <span className="h-2 w-2 shrink-0 rounded-full bg-orange-500" />}
                        <span className="truncate">{brand.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto p-2">
                <button onClick={() => onSearch("")} className="w-full rounded-xl px-3 py-2 text-right text-sm font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600" style={{ fontFamily: "'Cairo', sans-serif" }}>كل البرندات</button>
                {brands.map((brand) => (
                  <button key={brand.id} onClick={() => selectBrand(brand.name)} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-right text-sm text-gray-600 transition hover:bg-blue-50 hover:text-blue-600" style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {brand.logo ? <img src={brand.logo} alt="" className="h-6 w-6 rounded object-contain" /> : <span className="h-2 w-2 rounded-full bg-orange-500" />}
                    <span>{brand.name}</span>
                  </button>
                ))}
              </div>
            </aside>

            <div className="order-1 grid min-h-[290px] min-w-0 flex-1 gap-3 sm:grid-cols-2 lg:order-2 lg:grid-cols-[1.15fr_.85fr]">
              <div className="relative overflow-hidden rounded-3xl bg-[#0D1B2A] p-7 text-white sm:col-span-2 lg:col-span-1">
                <img src={HERO_IMG} alt="أحدث المنتجات" className="absolute inset-0 h-full w-full object-cover opacity-35" />
                <div className="absolute inset-0 bg-gradient-to-l from-[#0D1B2A]/20 to-[#0D1B2A]/95" />
                <div className="relative z-10 flex h-full max-w-md flex-col justify-center">
                  <span className="mb-3 text-sm font-semibold text-orange-300" style={{ fontFamily: "'Cairo', sans-serif" }}>عروض وتقنيات جديدة</span>
                  <h1 className="text-3xl font-black leading-tight md:text-4xl" style={{ fontFamily: "'Cairo', sans-serif" }}>كل ما تحتاجه<br /><span className="text-blue-300">في مكان واحد</span></h1>
                  <p className="mt-3 text-sm leading-7 text-gray-200" style={{ fontFamily: "'Tajawal', sans-serif" }}>اكتشف المنتجات والبرندات والفئات المتوفرة في متجرنا.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {categories.slice(0, 4).map((category, index) => (
                  <button key={category} onClick={() => { onCategoryChange(category); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); }} className={`group relative overflow-hidden rounded-2xl border border-gray-100 p-4 text-right ${index % 2 ? "bg-blue-50" : "bg-orange-50"}`}>
                    <div className="absolute -bottom-5 -left-5 h-20 w-20 rounded-full bg-white/50 transition group-hover:scale-125" />
                    <div className="relative z-10 flex h-full flex-col justify-end"><span className="text-xs text-gray-500" style={{ fontFamily: "'Tajawal', sans-serif" }}>تصفح الآن</span><span className="mt-1 font-bold text-gray-900" style={{ fontFamily: "'Cairo', sans-serif" }}>{category}</span></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0D1B2A]"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="أحدث الهواتف الذكية"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#0D1B2A]/20 via-[#0D1B2A]/60 to-[#0D1B2A]/95" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up">
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-blue-300 text-sm font-medium" style={{ fontFamily: "'Cairo', sans-serif" }}>
              أكثر من 10,000 منتج في المخزون
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 animate-fade-in-up delay-100"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            من التقنيات إلى
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-blue-600">
              الهدايا والأعراس والخدمات المخصصة
            </span>
          </h1>

          {/* Sub */}
          <p
            className="text-lg text-gray-300 leading-relaxed mb-8 max-w-lg animate-fade-in-up delay-200"
            style={{ fontFamily: "'Tajawal', sans-serif" }}
          >
            استكشف محاور متنوعة تشمل الأجهزة الإلكترونية، الهدايا، مستلزمات الأعراس
            والخدمات الخاصة، مع إمكانية إضافة محاور جديدة بسهولة.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up delay-300">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-base rounded-2xl shadow-xl shadow-orange-500/30 btn-cta transition-all hover:shadow-orange-500/50 active:scale-95"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <ShoppingCart className="w-5 h-5 ml-2" />
              تسوق الآن
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-bold px-8 py-4 text-base rounded-2xl backdrop-blur-sm transition-all"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <Phone className="w-5 h-5 ml-2" />
              اتصل بنا
            </Button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up delay-400">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-2xl font-black text-white mb-0.5"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400" style={{ fontFamily: "'Tajawal', sans-serif" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-8 bg-gradient-to-b from-white/0 to-white/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
      </div>
    </section>
  );
}

function ProductsSection({ selectedCategory, searchQuery }: { selectedCategory?: string; searchQuery: string }) {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const searchResult = trpc.products.search.useQuery({ query: searchQuery || undefined, limit: 24 });
  const productList = trpc.products.list.useQuery(undefined, { enabled: !searchQuery });
  const products = searchQuery ? (searchResult.data ?? []) : (productList.data ?? []);
  const productsLoading = searchQuery ? searchResult.isLoading : productList.isLoading;
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  const addToCartMutation = trpc.cart.add.useMutation({
    onSuccess: () => {
      toast.success("تم إضافة المنتج إلى السلة");
    },
    onError: () => {
      toast.error("يرجى تسجيل الدخول أولاً");
      window.location.href = getLoginUrl();
    },
  });

  const handleAddToCart = (productId: number) => {
    if (!user) {
      window.location.href = getLoginUrl();
      return;
    }
    addToCartMutation.mutate({ productId, quantity: 1 });
  };

  return (
    <section id="products" className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4" style={{ fontFamily: "'Cairo', sans-serif" }}>
              <Star className="w-4 h-4 fill-orange-500" />
              المنتجات المميزة
            </div>
            <h2
              className="text-3xl md:text-4xl font-black text-gray-900"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              الأكثر مبيعاً هذا الشهر
            </h2>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {((productsLoading ? Array.from({ length: 6 }) : filteredProducts) as any[]).map((product: any, i: number) => {
            const isPlaceholder = productsLoading;
            const ratingValue = isPlaceholder ? 0 : Math.floor(Number(product.rating) || 0);
            return (
              <div
                key={isPlaceholder ? `loading-${i}` : product.id}
                className="product-card group bg-white rounded-2xl border border-gray-100 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
              {/* Image */}
              <div className="relative h-52 bg-gray-50 overflow-hidden">
                {isPlaceholder ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                ) : (
                  <img
                    src={product.image || "https://via.placeholder.com/400x300?text=Product"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                {!isPlaceholder && product.badge && (
                  <div className={`absolute top-3 right-3 ${product.badgeColor || "bg-blue-600"} text-white text-xs font-bold px-2.5 py-1 rounded-lg`} style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {product.badge}
                  </div>
                )}
                <button className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50 hover:text-red-500">
                  <Star className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="text-xs text-blue-600 font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isPlaceholder ? "..." : product.brand}
                </div>
                <h3
                  className="font-bold text-gray-900 mb-2 leading-tight"
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  {isPlaceholder ? "..." : product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className={`w-3.5 h-3.5 ${j < ratingValue ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {isPlaceholder ? "..." : `${Number(product.rating || 0).toFixed(1)} (${product.reviewCount ?? 0})`}
                  </span>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className="text-xl font-black text-blue-600"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {isPlaceholder ? "..." : `${Number(product.price).toLocaleString()} ر.س`}
                    </div>
                    {!isPlaceholder && product.oldPrice && (
                      <div
                        className="text-sm text-gray-400 line-through"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {`${Number(product.oldPrice).toLocaleString()} ر.س`}
                      </div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => !isPlaceholder && handleAddToCart(product.id)}
                    disabled={addToCartMutation.isPending || isPlaceholder}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    <ShoppingCart className="w-4 h-4 ml-1" />
                    {addToCartMutation.isPending ? "جاري..." : "أضف للسلة"}
                  </Button>
                </div>
              </div>
              </div>
            );
          })}
          <Button
            variant="outline"
            size="lg"
            className="border-blue-200 text-blue-600 hover:bg-blue-50 font-bold px-8 rounded-2xl transition-all"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            عرض جميع المنتجات
            <ArrowLeft className="w-4 h-4 mr-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function OffersSection() {
  return (
    <section id="offers" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={OFFER_BG} alt="" className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-[#0D1B2A]/75" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-400 rounded-full px-4 py-1.5 text-sm font-medium mb-4" style={{ fontFamily: "'Cairo', sans-serif" }}>
            <Zap className="w-4 h-4" />
            عروض حصرية
          </div>
          <h2
            className="text-3xl md:text-4xl font-black text-white"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            لا تفوّت هذه العروض!
          </h2>
          <p className="text-gray-400 mt-2" style={{ fontFamily: "'Tajawal', sans-serif" }}>
            عروض محدودة الوقت — اغتنم الفرصة قبل انتهائها
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {offers.map((offer, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${offer.color} rounded-2xl p-6 border border-white/10 hover:scale-105 transition-transform duration-200 cursor-pointer animate-fade-in-up`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-white/70 text-sm mb-2" style={{ fontFamily: "'Tajawal', sans-serif" }}>
                {offer.sub}
              </div>
              <h3
                className="text-white font-black text-xl leading-tight"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {offer.title}
              </h3>
              <button
                className="mt-4 text-white/80 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                اكتشف العرض
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Products image */}
        <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <img
            src={PRODUCTS_IMG}
            alt="منتجاتنا المميزة"
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-[#F4F6FA]">
      <div className="container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4" style={{ fontFamily: "'Cairo', sans-serif" }}>
            <Award className="w-4 h-4" />
            لماذا أبو علي؟
          </div>
          <h2
            className="text-3xl md:text-4xl font-black text-gray-900"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            تجربة تسوق لا مثيل لها
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-200 animate-fade-in-up group"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`w-12 h-12 ${feat.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${feat.color}`} />
                </div>
                <h3
                  className="font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  {feat.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: "'Tajawal', sans-serif" }}>
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Delivery visual */}
        <div className="mt-16 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 text-sm font-medium mb-6 w-fit" style={{ fontFamily: "'Cairo', sans-serif" }}>
                <Truck className="w-4 h-4" />
                التوصيل السريع
              </div>
              <h3
                className="text-2xl md:text-3xl font-black text-gray-900 mb-4"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                توصيل لجميع المحافظات
                <br />
                <span className="text-blue-600">خلال 24-48 ساعة</span>
              </h3>
              <ul className="space-y-3 mb-8">
                {[
                  "تتبع فوري لشحنتك عبر الرسائل",
                  "شحن مجاني على الطلبات فوق 500 ر.س",
                  "التغليف الآمن لجميع الأجهزة",
                  "خيار الاستلام من المتجر متاح",
                ].map((item, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600 text-sm" style={{ fontFamily: "'Tajawal', sans-serif" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl w-fit shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                اطلب الآن
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Button>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-8">
              <img
                src={DELIVERY_IMG}
                alt="توصيل سريع"
                className="w-full max-w-sm object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PaymentSection() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3
              className="text-lg font-bold text-gray-900 mb-1"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              وسائل الدفع المتاحة
            </h3>
            <p className="text-sm text-gray-500" style={{ fontFamily: "'Tajawal', sans-serif" }}>
              ادفع بالطريقة التي تناسبك — آمن ومشفر 100%
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            {paymentMethods.map((method, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 font-medium"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-700 via-blue-800 to-[#0D1B2A] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-orange-500/20 blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white rounded-full px-4 py-1.5 text-sm font-medium mb-6" style={{ fontFamily: "'Cairo', sans-serif" }}>
          <MessageCircle className="w-4 h-4" />
          تواصل معنا عبر واتساب
        </div>
        <h2
          className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight"
          style={{ fontFamily: "'Cairo', sans-serif" }}
        >
          جاهز للتسوق؟
          <br />
          <span className="text-orange-400">نحن هنا لمساعدتك</span>
        </h2>
        <p
          className="text-gray-300 text-lg mb-10 max-w-xl mx-auto"
          style={{ fontFamily: "'Tajawal', sans-serif" }}
        >
          فريقنا المتخصص يستقبل استفساراتك على مدار الساعة.
          احصل على أفضل عرض لما تحتاجه الآن.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white font-black text-base px-10 py-4 rounded-2xl shadow-xl shadow-green-500/30 btn-cta transition-all active:scale-95"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            <MessageCircle className="w-5 h-5 ml-2" />
            تواصل عبر واتساب
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 font-bold text-base px-10 py-4 rounded-2xl transition-all"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            <Phone className="w-5 h-5 ml-2" />
            اتصل بنا مباشرة
          </Button>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#F4F6FA]">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 text-sm font-medium mb-6" style={{ fontFamily: "'Cairo', sans-serif" }}>
              <Phone className="w-4 h-4" />
              تواصل معنا
            </div>
            <h2
              className="text-3xl md:text-4xl font-black text-gray-900 mb-4"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              نحن دائماً
              <br />
              <span className="text-blue-600">في خدمتك</span>
            </h2>
            <p
              className="text-gray-500 mb-8 leading-relaxed"
              style={{ fontFamily: "'Tajawal', sans-serif" }}
            >
              هل لديك استفسار؟ تريد معرفة سعر منتج معين؟ أو تحتاج مساعدة في اختيار الجهاز المناسب؟
              فريقنا جاهز لمساعدتك.
            </p>

            <div className="space-y-4">
              {[
                { icon: Phone, label: "الهاتف", value: "+966 50 000 0000", href: "tel:+966500000000" },
                { icon: MessageCircle, label: "واتساب", value: "+966 50 000 0000", href: "https://wa.me/966500000000" },
                { icon: Mail, label: "البريد الإلكتروني", value: "info@abuali-telecom.com", href: "mailto:info@abuali-telecom.com" },
                { icon: MapPin, label: "العنوان", value: "الرياض، المملكة العربية السعودية", href: "#" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href={item.href}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-blue-50 group-hover:bg-blue-600 rounded-xl flex items-center justify-center transition-colors flex-shrink-0">
                      <Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-0.5" style={{ fontFamily: "'Cairo', sans-serif" }}>
                        {item.label}
                      </div>
                      <div className="font-semibold text-gray-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {item.value}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h3
              className="text-xl font-black text-gray-900 mb-6"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              أرسل لنا رسالة
            </h3>
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h4 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  تم إرسال رسالتك بنجاح!
                </h4>
                <p className="text-gray-500 text-sm" style={{ fontFamily: "'Tajawal', sans-serif" }}>
                  سنتواصل معك في أقرب وقت ممكن
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="أدخل اسمك الكامل"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-gray-800 bg-gray-50"
                    style={{ fontFamily: "'Tajawal', sans-serif" }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    رقم الجوال
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+966 5X XXX XXXX"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-gray-800 bg-gray-50"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", direction: "ltr", textAlign: "right" }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    رسالتك
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="اكتب استفسارك أو طلبك هنا..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-gray-800 bg-gray-50 resize-none"
                    style={{ fontFamily: "'Tajawal', sans-serif" }}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  إرسال الرسالة
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0D1B2A] text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <img src={LOGO_IMG} alt="أبو علي للاتصالات" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <div className="font-black text-lg" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  أبو علي للاتصالات
                </div>
                <div className="text-xs text-blue-400">وجهتك الأولى للتقنية</div>
              </div>
            </div>
            <p
              className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm"
              style={{ fontFamily: "'Tajawal', sans-serif" }}
            >
              متجرك المتخصص في الهواتف الذكية، اللابتوبات، الإكسسوارات وقطع الغيار.
              خبرة تتجاوز 15 عاماً في خدمة عملائنا الكرام.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Youtube, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4
              className="font-bold text-white mb-4"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              روابط سريعة
            </h4>
            <ul className="space-y-2">
              {["الصفحة الرئيسية", "المنتجات", "العروض والتخفيضات", "من نحن", "سياسة الخصوصية", "الشروط والأحكام"].map(
                (link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-bold text-white mb-4"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              تواصل معنا
            </h4>
            <ul className="space-y-3">
              {[
                { icon: Phone, text: "+966 50 000 0000" },
                { icon: Mail, text: "info@abuali-telecom.com" },
                { icon: MapPin, text: "الرياض، المملكة العربية السعودية" },
              ].map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Icon className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span
                    className="text-gray-400 text-sm"
                    style={{ fontFamily: i === 0 ? "'Space Grotesk', sans-serif" : "'Tajawal', sans-serif" }}
                  >
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-gray-500 text-sm"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            © 2024 أبو علي للاتصالات. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-gray-500 text-xs" style={{ fontFamily: "'Tajawal', sans-serif" }}>
              موقع آمن ومشفر بـ SSL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── WhatsApp Floating Button ─────────────────────────────────────────────────
function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a
      href="https://wa.me/966500000000"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 left-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-green-500/40 transition-all duration-300 animate-pulse-ring ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
      }`}
      title="تواصل عبر واتساب"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  useScrollReveal();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen" dir="rtl">
      <Navbar selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      <CatalogHero selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} onSearch={setSearchQuery} />
      <ProductsSection selectedCategory={selectedCategory} searchQuery={searchQuery} />
      <OffersSection />
      <FeaturesSection />
      <PaymentSection />
      <CTASection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
