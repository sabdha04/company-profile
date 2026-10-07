import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Navbar() {
    const { lang, setLang, t } = useLanguage();

    // State interaksi
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopProfilOpen, setIsDesktopProfilOpen] = useState(false);
    const [isMobileTentangOpen, setIsMobileTentangOpen] = useState(false);
    const [isMobileProfilOpen, setIsMobileProfilOpen] = useState(false);

    // Efek Perubahan Background Navbar saat di-scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            id="navbar"
            className={`fixed top-0 left-0 w-full z-50 py-3 px-6 md:px-12 transition-all duration-300 ease-in-out ${isScrolled
                    ? 'bg-white/70 backdrop-blur-md text-[#0f4c81] shadow-md'
                    : 'bg-transparent text-white'
                }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* LOGO */}
                <a href="/" className="md:ml-12 pt-2">
                    <img
                        id="logoImg"
                        src={isScrolled ? '/images/asabri-warna.png' : '/images/logo-light@2x.png'}
                        alt={t('nav.logoAlt')}
                        className="h-12 w-auto object-contain"
                    />
                </a>

                {/* NAVBAR DESKTOP */}
                <ul className="hidden md:flex items-center space-x-10 font-medium absolute left-1/2 -translate-x-1/2">
                    {/* Beranda */}
                    <li>
                        <a href="/" className="hover:text-blue-500 transition">
                            {t('nav.home')}
                        </a>
                    </li>

                    {/* Tentang Kami */}
                    <li className="relative group">
                        <a href="#" className="hover:text-blue-500 transition">
                            {t('nav.about')}
                        </a>

                        {/* Dropdown Utama Desktop */}
                        <div className="absolute left-0 top-full mt-4 w-60 bg-white text-gray-800 rounded-lg shadow-lg overflow-visible opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                            {/* Profil Perusahaan Toggle */}
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setIsDesktopProfilOpen(!isDesktopProfilOpen)}
                                    className="w-full flex mt-3 items-center justify-between px-3 py-3 text-sm text-gray-500 border-l-4 border-transparent hover:border-[#0057b8] hover:text-gray-800 transition"
                                >
                                    <span>{t('nav.companyProfile')}</span>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-300 ${isDesktopProfilOpen ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {/* Submenu Profil Perusahaan */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 bg-gray-50 ${isDesktopProfilOpen ? 'max-h-60' : 'max-h-0'
                                        }`}
                                >
                                    <a
                                        href="#"
                                        className="block pl-8 pr-3 py-2 text-sm text-gray-500 hover:text-gray-800 hover:border-l-4 hover:border-[#0057b8] transition"
                                    >
                                        {t('nav.overview')}
                                    </a>
                                    <a
                                        href="#"
                                        className="block pl-8 pr-3 py-2 text-sm text-gray-500 hover:text-gray-800 hover:border-l-4 hover:border-[#0057b8] transition"
                                    >
                                        {t('nav.history')}
                                    </a>
                                    <a
                                        href="#"
                                        className="block pl-8 pr-3 py-2 text-sm text-gray-500 hover:text-gray-800 hover:border-l-4 hover:border-[#0057b8] transition"
                                    >
                                        {t('nav.visionMission')}
                                    </a>
                                    <a
                                        href="#"
                                        className="block pl-8 pr-3 py-2 text-sm text-gray-500 hover:text-gray-800 hover:border-l-4 hover:border-[#0057b8] transition"
                                    >
                                        {t('nav.logoMeaning')}
                                    </a>
                                </div>
                            </div>

                            {/* Menu Lainnya */}
                            <a
                                href="#"
                                className="block px-3 py-3 text-sm text-gray-500 border-l-4 border-transparent hover:border-[#0057b8] hover:text-gray-800 transition"
                            >
                                {t('nav.orgStructure')}
                            </a>
                        
                        </div>
                    </li>

                    {/* Berita */}
                    <li>
                        <a href="/berita.html" className="hover:text-blue-500 transition">
                            {t('nav.news')}
                        </a>
                    </li>

                    {/* FAQ */}
                    <li>
                        <a href="/Faq.html" className="hover:text-blue-500 transition">
                            FAQ
                        </a>
                    </li>

                    {/* Karir */}
                    <li>
                        <a href="https://rekrutmen.asabri.co.id" className="hover:text-blue-500 transition">
                            {t('nav.career')}
                        </a>
                    </li>
                </ul>
            

        
                {/* RIGHT SIDE: SWITCH BAHASA + HAMBURGER */}
                <div className="flex items-center gap-4 md:mr-12">
                    {/* SWITCH BAHASA DESKTOP */}
                    <div className="hidden md:flex items-center gap-2 text-sm font-semibold">
                        <button
                            type="button"
                            onClick={() => setLang('id')}
                            aria-pressed={lang === 'id'}
                            className={`transition ${lang === 'id' ? 'opacity-100 underline underline-offset-4' : 'opacity-60 hover:opacity-100'}`}
                        >
                            ID
                        </button>
                        <span className="opacity-40">|</span>
                        <button
                            type="button"
                            onClick={() => setLang('en')}
                            aria-pressed={lang === 'en'}
                            className={`transition ${lang === 'en' ? 'opacity-100 underline underline-offset-4' : 'opacity-60 hover:opacity-100'}`}
                        >
                            EN
                        </button>
                    </div>

                {/* HAMBURGER BUTTON MOBILE */}
                <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 focus:outline-none"
                    aria-label={t('nav.toggleNav')}
                >
                    <span
                        className={`block w-7 h-0.5 bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                            }`}
                    ></span>
                    <span
                        className={`block w-7 h-0.5 bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : ''
                            }`}
                    ></span>
                    <span
                        className={`block w-7 h-0.5 bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                            }`}
                    ></span>
                </button>
                </div>
            </div>

            {/* MOBILE MENU PANEL */}
            <div
                className={`md:hidden absolute top-full left-0 w-full bg-white text-gray-800 shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen
                        ? 'max-h-[1000px] opacity-100 translate-y-0 visible'
                        : 'max-h-0 opacity-0 -translate-y-3 invisible'
                    }`}
            >
                <div className="px-6 py-5">
                    {/* Beranda */}
                    <a
                        href="/"
                        className="block py-3 text-sm border-b border-gray-100 hover:text-[#0057b8]"
                    >
                        {t('nav.home')}
                    </a>

                    {/* Tentang Kami Mobile */}
                    <div>
                        <button
                            type="button"
                            onClick={() => setIsMobileTentangOpen(!isMobileTentangOpen)}
                            className="w-full flex items-center justify-between py-3 text-sm border-b border-gray-100 hover:text-[#0057b8]"
                        >
                            <span>{t('nav.about')}</span>
                            <svg
                                className={`w-4 h-4 transition-transform duration-300 ${isMobileTentangOpen ? 'rotate-180' : ''
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {/* Dropdown Tentang Kami Mobile */}
                        <div
                            className={`pl-4 bg-gray-50 overflow-hidden transition-all duration-400 ease-in-out ${isMobileTentangOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            {/* Profil Perusahaan Mobile */}
                            <button
                                type="button"
                                onClick={() => setIsMobileProfilOpen(!isMobileProfilOpen)}
                                className="w-full flex items-center justify-between py-3 pr-3 text-sm text-gray-600"
                            >
                                <span>{t('nav.companyProfile')}</span>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-300 ${isMobileProfilOpen ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Submenu Profil Mobile */}
                            <div
                                className={`pl-4 overflow-hidden transition-all duration-400 ease-in-out ${isMobileProfilOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <a
                                    href="#"
                                    className="block py-2 text-sm text-gray-500 hover:text-[#0057b8]"
                                >
                                    {t('nav.overview')}
                                </a>
                                <a
                                    href="#"
                                    className="block py-2 text-sm text-gray-500 hover:text-[#0057b8]"
                                >
                                    {t('nav.history')}
                                </a>
                                <a
                                    href="#"
                                    className="block py-2 text-sm text-gray-500 hover:text-[#0057b8]"
                                >
                                    {t('nav.visionMission')}
                                </a>
                                <a
                                    href="#"
                                    className="block py-2 text-sm text-gray-500 hover:text-[#0057b8]"
                                >
                                    {t('nav.logoMeaning')}
                                </a>
                            </div>

                            {/* Menu Lainnya Mobile */}
                            <a href="#" className="block py-3 text-sm text-gray-600">
                                {t('nav.orgStructure')}
                            </a>
                        </div>
                    </div>

                    {/* Berita */}
                    <a
                        href="/berita.html"
                        className="block py-3 text-sm border-b border-gray-100 hover:text-[#0057b8]"
                    >
                        {t('nav.news')}
                    </a>

                    {/* FAQ */}
                    <a
                        href="/Faq.html"
                        className="block py-3 text-sm border-b border-gray-100 hover:text-[#0057b8]"
                    >
                        FAQ
                    </a>

                    {/* Karir */}
                    <a href="https://rekrutmen.asabri.co.id" className="block py-3 text-sm hover:text-[#0057b8]">
                        {t('nav.career')}
                    </a>

                    {/* SWITCH BAHASA MOBILE */}
                    <div className="flex items-center gap-4 pt-4 text-sm font-semibold">
                        <button
                            type="button"
                            onClick={() => setLang('id')}
                            aria-pressed={lang === 'id'}
                            className={lang === 'id' ? 'text-[#0057b8] underline underline-offset-4' : 'text-gray-400'}
                        >
                            ID
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                            type="button"
                            onClick={() => setLang('en')}
                            aria-pressed={lang === 'en'}
                            className={lang === 'en' ? 'text-[#0057b8] underline underline-offset-4' : 'text-gray-400'}
                        >
                            EN
                        </button>
                    </div>

                    
                </div>
                
            </div>

            
        </nav>
    );
}