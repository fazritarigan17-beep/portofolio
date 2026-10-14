// ==========================================================================
// Portfolio Interactivity & Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. DOM Elements
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailAddress = document.getElementById('email-address');
    const toastNotify = document.getElementById('toast-notify');
    const toastNotifyText = document.getElementById('toast-notify-text');
    const contactForm = document.getElementById('contact-form');
    const formToast = document.getElementById('form-toast');
    const submitBtn = document.getElementById('submit-btn');
    const backToTopBtn = document.getElementById('back-to-top');

    // 3. Navbar scroll effect
    const handleScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section spy
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Show/hide back to top button
        if (window.scrollY > 400) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0.5';
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // 4. Mobile Menu Toggle
    let isMenuOpen = false;
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.remove('hidden');
                menuToggle.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
            } else {
                mobileMenu.classList.add('hidden');
                menuToggle.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
            }
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });

        // Close menu on link click
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenu.classList.add('hidden');
                menuToggle.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            });
        });
    }

    // 5. Project Filtering
    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filter === 'all' || cardCategory === filter) {
                        card.classList.remove('hidden');
                        card.style.animation = 'fadeIn 0.4s ease forwards';
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // 6. Copy Email with Toast Feedback
    function showToast(message, isSuccess = true) {
        if (!toastNotify) return;
        toastNotifyText.textContent = message;
        toastNotify.style.backgroundColor = isSuccess ? '#4f46e5' : '#ef4444';
        toastNotify.style.opacity = '1';
        toastNotify.style.transform = 'translateY(0)';

        setTimeout(() => {
            toastNotify.style.opacity = '0';
            toastNotify.style.transform = 'translateY(20px)';
        }, 3000);
    }

    if (copyEmailBtn && emailAddress) {
        copyEmailBtn.addEventListener('click', () => {
            const email = emailAddress.textContent.trim();
            navigator.clipboard.writeText(email)
                .then(() => {
                    showToast('Alamat email berhasil disalin ke clipboard!');
                })
                .catch(() => {
                    showToast('Gagal menyalin email. Silakan salin manual.', false);
                });
        });
    }

    // 7. Contact Form Simulation
    if (contactForm && formToast) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                formToast.className = 'mt-4 p-4 rounded-xl text-sm bg-rose-500/10 border border-rose-500/30 text-rose-300 block';
                formToast.textContent = 'Harap lengkapi semua kolom formulir.';
                return;
            }

            // Button loading state
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Mengirim pesan...</span>
            `;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;

                formToast.className = 'mt-4 p-4 rounded-xl text-sm bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 block';
                formToast.innerHTML = `
                    <strong>Pesan Terkirim!</strong> Terima kasih ${name}, pesan Anda telah diterima. Saya akan segera menghubungi Anda melalui ${email}.
                `;

                contactForm.reset();

                // Re-render icons if needed
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }

                setTimeout(() => {
                    formToast.classList.add('hidden');
                }, 6000);
            }, 1200);
        });
    }

    // 8. Back to Top Click
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Keyframe for simple fade in
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
