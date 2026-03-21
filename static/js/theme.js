document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check local storage or system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.documentElement.classList.remove('dark');
        if(themeIcon) {
            themeIcon.className = 'ph-fill ph-moon text-lg';
            themeToggleBtn.classList.remove('text-yellow-400');
            themeToggleBtn.classList.remove('border-navy-600');
            themeToggleBtn.classList.add('text-indigo-400');
            themeToggleBtn.classList.add('border-indigo-200');
            themeToggleBtn.classList.add('bg-indigo-50');
        }
    } else {
        // Default to dark
        document.documentElement.classList.add('dark');
        if(themeIcon) {
            themeIcon.className = 'ph-fill ph-sun text-lg';
            themeToggleBtn.classList.add('text-yellow-400');
            themeToggleBtn.classList.remove('text-indigo-400');
        }
    }

    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                themeIcon.className = 'ph-fill ph-moon text-lg';
                themeToggleBtn.classList.remove('text-yellow-400');
                themeToggleBtn.classList.remove('border-navy-600');
                themeToggleBtn.classList.add('text-indigo-400');
                themeToggleBtn.classList.add('border-indigo-200');
                themeToggleBtn.classList.add('bg-indigo-50');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                themeIcon.className = 'ph-fill ph-sun text-lg';
                themeToggleBtn.classList.add('text-yellow-400');
                themeToggleBtn.classList.add('border-navy-600');
                themeToggleBtn.classList.remove('text-indigo-400');
                themeToggleBtn.classList.remove('border-indigo-200');
                themeToggleBtn.classList.remove('bg-indigo-50');
            }
        });
    }
});
