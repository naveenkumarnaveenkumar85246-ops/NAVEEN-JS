document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark / light theme toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    if (themeToggleBtn && themeIcon) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = htmlElement.classList.toggle('dark');
            themeIcon.classList.toggle('fa-moon', isDark);
            themeIcon.classList.toggle('fa-sun', !isDark);
            themeToggleBtn.setAttribute('aria-pressed', String(isDark));
        });
    }

    // 2. Mobile navigation menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpening = mobileMenu.classList.toggle('hidden') === false;
            mobileMenuBtn.setAttribute('aria-expanded', String(isOpening));
        });

        mobileLinks.forEach((link) => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 3. Toast notification
    let toastTimer;
    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toast-message');
        if (!toast || !toastMsg) return;

        toastMsg.textContent = message;
        toast.classList.remove('translate-y-20', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');

        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-20', 'opacity-0');
        }, 3000);
    }

    // 4. Copy email and phone number
    async function copyToClipboard(text, message) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                const temporaryInput = document.createElement('textarea');
                temporaryInput.value = text;
                temporaryInput.setAttribute('readonly', '');
                temporaryInput.style.position = 'absolute';
                temporaryInput.style.left = '-9999px';
                document.body.appendChild(temporaryInput);
                temporaryInput.select();
                const copied = document.execCommand('copy');
                document.body.removeChild(temporaryInput);
                if (!copied) throw new Error('Copy command was unsuccessful');
            }
            showToast(message);
        } catch (error) {
            showToast('Unable to copy. Please select and copy manually.');
            console.error('Clipboard error:', error);
        }
    }

    const copyEmailBtn = document.getElementById('copy-email-btn');
    const copyPhoneBtn = document.getElementById('copy-phone-btn');

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            copyToClipboard('naveenkumarnaveenkumar85246@gmail.com', 'Email copied to clipboard!');
        });
    }

    if (copyPhoneBtn) {
        copyPhoneBtn.addEventListener('click', () => {
            copyToClipboard('+91 8489105518', 'Phone number copied to clipboard!');
        });
    }

    // 5. Contact form: opens the visitor's email application.
    // A backend service is required to send messages directly from the website.
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('form-name')?.value.trim() || '';
            const email = document.getElementById('form-email')?.value.trim() || '';
            const subject = document.getElementById('form-subject')?.value.trim() || '';
            const message = document.getElementById('form-message')?.value.trim() || '';

            const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
            const mailtoUrl = `mailto:naveenkumarnaveenkumar85246@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            showToast('Opening your email application...');
            window.location.href = mailtoUrl;
        });
    }

    // 6. Interactive skill filters
    const tabButtons = document.querySelectorAll('.tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            tabButtons.forEach((tab) => {
                const selected = tab === button;
                tab.classList.toggle('bg-brand-600', selected);
                tab.classList.toggle('text-white', selected);
                tab.classList.toggle('bg-slate-100', !selected);
                tab.classList.toggle('dark:bg-slate-800', !selected);
                tab.classList.toggle('text-slate-600', !selected);
                tab.classList.toggle('dark:text-slate-300', !selected);
            });

            skillCards.forEach((card) => {
                const shouldShow = category === 'all' || card.getAttribute('data-category') === category;
                card.style.display = shouldShow ? '' : 'none';
            });
        });
    });
});
