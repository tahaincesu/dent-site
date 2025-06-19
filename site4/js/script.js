// Mobil menü için burger menü fonksiyonları
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

if (burger && nav && navLinks.length > 0) {
    burger.addEventListener('click', () => {
        // Menüyü aç/kapat
        nav.classList.toggle('nav-active');
        
        // Link animasyonları
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger animasyonu
        burger.classList.toggle('toggle');
    });
}

// Sayfa yüklendiğinde header'ı şeffaf yap
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.backgroundColor = '#fff';
        }
    }
});

// Randevu formu gönderimi
const appointmentForm = document.getElementById('appointment-form');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Form verilerini al
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            date: document.getElementById('date').value,
            service: document.getElementById('service').value
        };
        
        // Form verilerini kontrol et
        if (!formData.name || !formData.phone || !formData.email || !formData.date || !formData.service) {
            alert('Lütfen tüm alanları doldurunuz.');
            return;
        }
        
        // Telefon numarası formatını kontrol et
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
            alert('Lütfen geçerli bir telefon numarası giriniz.');
            return;
        }
        
        // E-posta formatını kontrol et
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Lütfen geçerli bir e-posta adresi giriniz.');
            return;
        }
        
        // Randevu tarihini kontrol et
        const selectedDate = new Date(formData.date);
        const today = new Date();
        if (selectedDate < today) {
            alert('Lütfen gelecek bir tarih seçiniz.');
            return;
        }
        
        // Başarılı mesajı göster
        alert('Randevunuz başarıyla oluşturuldu. En kısa sürede sizinle iletişime geçeceğiz.');
        
        // Formu temizle
        appointmentForm.reset();
    });
}

// Smooth scroll için tüm linkleri seç
if (nav) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Mobil menüyü kapat
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                if (burger) burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
            
            // Hedef bölüme scroll
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Tedavi açıklamaları ve modal işlemleri
// Bu bölümden itibaren modal ve tedavi kartı ile ilgili tüm kodları kaldırıyorum. 

// Scroll ile reveal efektleri
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    for (const el of reveals) {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 80;
        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    }
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Dropdown menü mouseenter/mouseleave ile .open sınıfı
// Kapanma gecikmesi: 0.18 saniye (180ms) - aradaki boşlukta mouse tekrar gelirse kapanmasın
function setupDropdownOpenClass() {
    const dropdowns = document.querySelectorAll('.nav-links .dropdown');
    dropdowns.forEach(dropdown => {
        let closeTimeout;
        const menu = dropdown.querySelector('.dropdown-menu');
        const toggle = dropdown.querySelector('.dropdown-toggle');
        function openMenu() {
            clearTimeout(closeTimeout);
            dropdown.classList.add('open');
        }
        function closeMenu() {
            closeTimeout = setTimeout(() => {
                dropdown.classList.remove('open');
            }, 180); // 0.18 saniye gecikme
        }
        if (menu) {
            dropdown.addEventListener('mouseenter', openMenu);
            dropdown.addEventListener('mouseleave', closeMenu);
            menu.addEventListener('mouseenter', openMenu);
            menu.addEventListener('mouseleave', closeMenu);
        }
        if (toggle) {
            toggle.addEventListener('mouseenter', openMenu);
            toggle.addEventListener('mouseleave', closeMenu);
        }
    });
}
window.addEventListener('DOMContentLoaded', setupDropdownOpenClass);

// Modern mobil menü (gelişmiş: sadece ana menüler, tedavilere tıklayınca alt menü, geri butonu)
function setupModernMobileMenu() {
    const burger = document.querySelector('.burger');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const submenuToggle = document.querySelector('.submenu-toggle');
    const submenu = document.querySelector('.submenu');
    const mainLinks = document.querySelector('.main-links');
    // Hamburger menüye tıklayınca menü açılır
    if (burger && overlay && mobileMenu) {
        burger.addEventListener('click', () => {
            overlay.classList.add('active');
            document.body.classList.add('menu-open');
        });
    }
    // X'e veya overlay'e tıklayınca menü kapanır
    function closeMenu() {
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
        if (submenu) submenu.classList.remove('active');
        if (submenuToggle) submenuToggle.classList.remove('open');
        if (mainLinks) mainLinks.classList.remove('submenu-open');
        // Geri butonunu kaldır
        const backBtn = document.querySelector('.submenu-back');
        if (backBtn) backBtn.remove();
    }
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeMenu();
    });
    // Tedaviler'e tıklayınca sadece tedavi alt menüsü göster
    if (submenuToggle && submenu && mainLinks) {
        submenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            mainLinks.classList.add('submenu-open');
            submenu.classList.add('active');
            submenuToggle.classList.add('open');
            // Geri butonu ekle
            if (!document.querySelector('.submenu-back')) {
                const backBtn = document.createElement('button');
                backBtn.textContent = '← Geri';
                backBtn.className = 'submenu-back';
                backBtn.style.cssText = 'margin-bottom:1rem;font-size:1.1rem;background:none;border:none;color:#223046;font-weight:600;cursor:pointer;';
                submenu.parentNode.insertBefore(backBtn, submenu);
                backBtn.addEventListener('click', function() {
                    mainLinks.classList.remove('submenu-open');
                    submenu.classList.remove('active');
                    submenuToggle.classList.remove('open');
                    backBtn.remove();
                });
            }
        });
    }
    // Menüde bir linke tıklanınca menü kapanır
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}
window.addEventListener('DOMContentLoaded', setupModernMobileMenu); 