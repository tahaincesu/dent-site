document.addEventListener('DOMContentLoaded', () => {
    // Mobil menü açma/kapama
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    burger.addEventListener('click', () => {
        mobileMenu.style.display = 'block';
    });

    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
    });

    // Mobil menü dışına tıklama
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.style.display = 'none';
        }
    });
});
