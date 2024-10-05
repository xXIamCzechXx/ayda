import { Controller } from '@hotwired/stimulus';

/*
 * Dark mode Controller
 * Switches classic mode to dark and reverse
 */
export default class extends Controller
{
    connect() {
        this.initDesign(); // Checks if DarkMode is implicitly switched to true

        const iconNavbarSidenav = document.getElementById('iconNavbarSidenav'); // Quick Sidenav access button in navbar
        const iconSidenav = document.getElementById('iconSidenav'); // Cross icon in Sidenav
        if (iconNavbarSidenav) {
            iconNavbarSidenav.addEventListener("click", this.toggleSidenav);
        }
        if (iconSidenav) {
            iconSidenav.addEventListener("click", this.toggleSidenav);
        }

        $(window).on('resize', (event) => {
            this.sidenavTypeOnResize(); // Deactivate sidenav type buttons on resize and small screens
            this.navbarColorOnResize(); // Resize navbar color depends on configurator active type of sidenav
        });

        $(window).on('load', (event) => {
            this.sidenavTypeOnResize();
            this.navbarColorOnResize();
        });

        this.initDesktopSidenavToggler(); // Click to minimize the sidebar or reverse to normal
    }

    /**
     * Initializes the desktop side navigation toggler. This method sets up an
     * event handler on the side navigation toggler element to show or hide
     * the side navigation bar based on its current state. It also triggers
     *
     * @return {void}
     */
    initDesktopSidenavToggler() {
        if (document.querySelector('.sidenav-toggler')) {
            let sidenavToggler = document.getElementsByClassName('sidenav-toggler')[0];
            let sidenavShow = document.getElementsByClassName('g-sidenav-show')[0];
            let toggleNavbarMinimize = document.getElementById('navbarMinimize');

            if (sidenavShow) {
                sidenavToggler.onclick = function() {
                    if (!sidenavShow.classList.contains('g-sidenav-hidden')) {
                        sidenavShow.classList.remove('g-sidenav-pinned');
                        sidenavShow.classList.add('g-sidenav-hidden');
                        if (toggleNavbarMinimize) {
                            toggleNavbarMinimize.click();
                            toggleNavbarMinimize.setAttribute("checked", "true");
                        }
                    } else {
                        sidenavShow.classList.remove('g-sidenav-hidden');
                        sidenavShow.classList.add('g-sidenav-pinned');
                        if (toggleNavbarMinimize) {
                            toggleNavbarMinimize.click();
                            toggleNavbarMinimize.removeAttribute("checked");
                        }
                    }
                }
            }
        }
    }

    /**
     * Activates the currently selected item in the sidebar.
     * This method simulates a click event on the element within the #sidebarType element that has the 'active' class
     *
     * @return {void} No return value.
     */
    initSidebar() {
        $('#sidebarType .active').trigger('click');
    }

    /**
     * Updates the design of the application based on the dark mode setting.
     * Checks the value of the data-darkmode attribute on the element with the ID 'dark-mode-checkbox'.
     **/
    initDesign() {
        if ($('#dark-mode-checkbox').attr('data-darkmode') === 'true') {
            this.darkMode('dark');
        } else {
            this.initSidebar();
        }
    }

    /**
     * Toggles the visibility state of the sidenav by adding or removing
     * necessary CSS classes to the body and sidenav elements.
     *
     * @return {void}
     */
    toggleSidenav() {
        let body = document.getElementsByTagName('body')[0];
        let className = 'g-sidenav-pinned';
        const sidenav = document.getElementById('sidenav-main');
        const iconSidenav = document.getElementById('iconSidenav');

        if (body.classList.contains(className)) {
            body.classList.remove(className);
            setTimeout(function() {
                sidenav.classList.remove('bg-white');
            }, 100);
            sidenav.classList.remove('bg-transparent');

        } else {
            body.classList.add(className);
            sidenav.classList.remove('bg-transparent');
            iconSidenav.classList.remove('d-none');
        }
    }

    /**
     * Updates the sidebar elements' disabled state based on the window's width.
     * Adds the 'disabled' class to elements with an onclick attribute of "sidebarType(this)"
     * if the window's inner width is less than 1200 pixels. Otherwise, removes the 'disabled' class.
     *
     * @return {void}
     * DM Works
     */
    sidenavTypeOnResize() {
        let elements = document.querySelectorAll('[data-action="click->configuration#sidebarType"]');
        if (window.innerWidth < 1200) {
            elements.forEach(function(el) {
                el.classList.add('disabled');
            });
        } else {
            elements.forEach(function(el) {
                el.classList.remove('disabled');
            });
        }
    }

    /**
     * Adjusts the color of the navbar based on the window resize event.
     * This method applies specific CSS classes to the sidenav, ensuring
     * that the appropriate background color is set depending on the window width
     * and certain button attributes.
     *
     * @return {void}
     */
    navbarColorOnResize() {
        let referenceButton = document.querySelector('[data-action="click->configuration#sidebarType"].active');
        const sidenav = document.getElementById('sidenav-main');

        if (sidenav) {
            if (window.innerWidth > 1200) {
                if (!document.querySelector('body').classList.contains('dark-version')) {
                    sidenav.classList.remove('bg-white');
                } else {
                    sidenav.classList.remove('bg-dark');
                }

                if (referenceButton.classList.contains('active') && referenceButton.getAttribute('data-class') === 'bg-transparent') {
                    sidenav.classList.add('bg-transparent');
                } else if (referenceButton.classList.contains('active') && referenceButton.getAttribute('data-class') === 'bg-white') {
                    sidenav.classList.add('bg-white');
                } else if (referenceButton.classList.contains('active') && referenceButton.getAttribute('data-class') === 'bg-dark') {
                    sidenav.classList.add('bg-dark');
                }
            } else {
                sidenav.classList.remove('bg-transparent');
                if (!document.querySelector('body').classList.contains('dark-version')) {
                    sidenav.classList.add('bg-white');
                } else {
                    sidenav.classList.add('bg-dark');
                }
            }
        }
    }

    /**
     * Saves the given mode and its associated value to the server.
     *
     * @param {string} mode - The mode to be saved.
     * @param {any} value - The value associated with the mode.
     * @return {Promise<void>} Returns a promise that resolves once the mode has been saved and processed.
     */
    saveMode(mode, value) {
        fetch('/user/mode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify({
                mode: mode,
                value: value,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Turbo.visit(window.location.href); // Reload to apply changes
                }
            });
    }

    /**
     * Handles the sidebar type change based on the given event.
     * Updates the sidebar appearance and relevant elements' styles accordingly.
     *
     * @param {Event} event - The event triggered on sidebar type change.
     * @return {void}
     */
    sidebarType(event) {
        let parent = event.currentTarget.parentElement.children;
        let color = event.currentTarget.getAttribute("data-class");
        let type = event.currentTarget.getAttribute("data-type");
        let body = document.querySelector("body");
        let bodyWhite = document.querySelector("body:not(.dark-version)");
        let bodyDark = body.classList.contains('dark-version');
        let colors = [];

        this.saveMode('setAppSidebarType', type); // TODO::When load DOM, then dont change it

        for (let i = 0; i < parent.length; i++) {
            parent[i].classList.remove('active');
            colors.push(parent[i].getAttribute('data-class'));
        }

        if (!event.currentTarget.classList.contains('active')) {
            event.currentTarget.classList.add('active');
        } else {
            event.currentTarget.classList.remove('active');
        }
        let sidebar = document.querySelector('.sidenav');
        for (let i = 0; i < colors.length; i++) {
            sidebar.classList.remove(colors[i]);
        }

        sidebar.classList.add(color);

        // Remove text-white/text-dark classes
        if (color === 'bg-transparent' || color === 'bg-white') {
            let textWhites = document.querySelectorAll('.sidenav .text-white');
            for (let i = 0; i < textWhites.length; i++) {
                textWhites[i].classList.remove('text-white');
                textWhites[i].classList.add('text-dark');
            }
        } else {
            let textDarks = document.querySelectorAll('.sidenav .text-dark');
            for (let i = 0; i < textDarks.length; i++) {
                textDarks[i].classList.add('text-white');
                textDarks[i].classList.remove('text-dark');
            }
        }
        if (color === 'bg-transparent' && bodyDark) {
            let textDarks = document.querySelectorAll('.navbar-brand .text-dark');
            for (let i = 0; i < textDarks.length; i++) {
                textDarks[i].classList.add('text-white');
                textDarks[i].classList.remove('text-dark');
            }
        }
        if ((color === 'bg-transparent' || color === 'bg-white') && bodyWhite) {
            let navbarBrand = document.querySelector('.navbar-brand-img');
            let navbarBrandImg = navbarBrand.src;

            if (navbarBrandImg.includes('logo-ct.svg')) {
                navbarBrand.src = navbarBrandImg.replace("logo-ct", "logo-ct-dark");;
            }
        } else {
            let navbarBrand = document.querySelector('.navbar-brand-img');
            let navbarBrandImg = navbarBrand.src;
            if (navbarBrandImg.includes('logo-ct-dark.svg')) {
                navbarBrand.src = navbarBrandImg.replace("logo-ct-dark", "logo-ct");
            }
        }
        if (color === 'bg-white' && bodyDark) {
            let navbarBrand = document.querySelector('.navbar-brand-img');
            let navbarBrandImg = navbarBrand.src;

            if (navbarBrandImg.includes('logo-ct.svg')) {
                navbarBrand.src = navbarBrandImg.replace("logo-ct", "logo-ct-dark");
            }
        }
    }

    /**
     * Toggles the sidebar's minimized state based on the event's target attribute.
     *
     * @param {Event} event - The event object triggered by the action.
     * @return {void}
     */
    navbarMinimize(event) {
        let sidenavShow = document.getElementsByClassName('g-sidenav-show')[0];

        if (!event.currentTarget.getAttribute("checked")) {
            this.saveMode('setAppSidebarSpread', true);
            sidenavShow.classList.remove('g-sidenav-pinned');
            sidenavShow.classList.add('g-sidenav-hidden');
            event.currentTarget.setAttribute("checked", "true");
        } else {
            this.saveMode('setAppSidebarSpread', false);
            sidenavShow.classList.remove('g-sidenav-hidden');
            sidenavShow.classList.add('g-sidenav-pinned');
            event.currentTarget.removeAttribute("checked");
        }
    }

    /**
     * Method that switches the dark mode
     */
    darkMode(manualChange = null) {
        const body = document.getElementsByTagName('body')[0];
        const hr = document.querySelectorAll('div:not(.sidenav) > hr');
        const hr_card = document.querySelectorAll('div:not(.bg-gradient-dark) hr');
        const text_btn = document.querySelectorAll('button:not(.btn) > .text-dark');
        const text_span = document.querySelectorAll('span.text-dark, .breadcrumb .text-dark');
        const text_span_white = document.querySelectorAll('span.text-white, .breadcrumb .text-white');
        const text_strong = document.querySelectorAll('strong.text-dark');
        const text_strong_white = document.querySelectorAll('strong.text-white');
        const text_nav_link = document.querySelectorAll('a.nav-link.text-dark');
        const text_nav_link_white = document.querySelectorAll('a.nav-link.text-white');
        const secondary = document.querySelectorAll('.text-secondary');
        const bg_gray_100 = document.querySelectorAll('.bg-gray-100');
        const bg_gray_600 = document.querySelectorAll('.bg-gray-600');
        const btn_text_dark = document.querySelectorAll('.btn.btn-link.text-dark, .material-icons.text-dark');
        const btn_text_white = document.querySelectorAll('.btn.btn-link.text-white, .material-icons.text-white');
        const card_border = document.querySelectorAll('.card.border');
        const card_border_dark = document.querySelectorAll('.card.border.border-dark');
        const mainContent_blur = document.querySelectorAll('.main-content .container-fluid .card');
        const svg = document.querySelectorAll('g');

        if (!this.element.getAttribute('checked') || manualChange === 'dark') {
            if (manualChange instanceof MouseEvent) {
                this.saveMode('setAppDesign', 'dark');
            }
            body.classList.add('dark-version');
            for (let i = 0; i < hr.length; i++) {
                if (hr[i].classList.contains('dark')) {
                    hr[i].classList.remove('dark');
                    hr[i].classList.add('light');
                }
            }
            for (let i = 0; i < mainContent_blur.length; i++) {
                if (mainContent_blur[i].classList.contains('blur')) {
                    mainContent_blur[i].classList.remove('blur', 'shadow-blur');
                }
            }
            for (let i = 0; i < hr_card.length; i++) {
                if (hr_card[i].classList.contains('dark')) {
                    hr_card[i].classList.remove('dark');
                    hr_card[i].classList.add('light');
                }
            }
            for (let i = 0; i < text_btn.length; i++) {
                if (text_btn[i].classList.contains('text-dark')) {
                    text_btn[i].classList.remove('text-dark');
                    text_btn[i].classList.add('text-white');
                }
            }
            for (let i = 0; i < text_span.length; i++) {
                if (text_span[i].classList.contains('text-dark')) {
                    text_span[i].classList.remove('text-dark');
                    text_span[i].classList.add('text-white');
                }
            }
            for (let i = 0; i < text_strong.length; i++) {
                if (text_strong[i].classList.contains('text-dark')) {
                    text_strong[i].classList.remove('text-dark');
                    text_strong[i].classList.add('text-white');
                }
            }
            for (let i = 0; i < text_nav_link.length; i++) {
                if (text_nav_link[i].classList.contains('text-dark')) {
                    text_nav_link[i].classList.remove('text-dark');
                    text_nav_link[i].classList.add('text-white');
                }
            }
            for (let i = 0; i < secondary.length; i++) {
                if (secondary[i].classList.contains('text-secondary')) {
                    secondary[i].classList.remove('text-secondary');
                    secondary[i].classList.add('text-white');
                    secondary[i].classList.add('opacity-8');
                }
            }
            for (let i = 0; i < bg_gray_100.length; i++) {
                if (bg_gray_100[i].classList.contains('bg-gray-100')) {
                    bg_gray_100[i].classList.remove('bg-gray-100');
                    bg_gray_100[i].classList.add('bg-gray-600');
                }
            }
            for (let i = 0; i < btn_text_dark.length; i++) {
                btn_text_dark[i].classList.remove('text-dark');
                btn_text_dark[i].classList.add('text-white');
            }
            for (let i = 0; i < svg.length; i++) {
                if (svg[i].hasAttribute('fill')) {
                    svg[i].setAttribute('fill', '#fff');
                }
            }
            for (let i = 0; i < card_border.length; i++) {
                card_border[i].classList.add('border-dark');
            }
            this.element.setAttribute('checked', 'true');
        } else {
            if (manualChange instanceof MouseEvent) {
                this.saveMode('setAppDesign', 'light');
            }
            body.classList.remove('dark-version');
            for (let i = 0; i < hr.length; i++) {
                if (hr[i].classList.contains('light')) {
                    hr[i].classList.add('dark');
                    hr[i].classList.remove('light');
                }
            }
            for (let i = 0; i < hr_card.length; i++) {
                if (hr_card[i].classList.contains('light')) {
                    hr_card[i].classList.add('dark');
                    hr_card[i].classList.remove('light');
                }
            }
            for (let i = 0; i < mainContent_blur.length; i++) {
                mainContent_blur[i].classList.add('blur', 'shadow-blur');
            }
            for (let i = 0; i < text_btn.length; i++) {
                if (text_btn[i].classList.contains('text-white')) {
                    text_btn[i].classList.remove('text-white');
                    text_btn[i].classList.add('text-dark');
                }
            }
            for (let i = 0; i < text_span_white.length; i++) {
                if (text_span_white[i].classList.contains('text-white') && !text_span_white[i].closest('.sidenav') && !text_span_white[i].closest('.card.bg-gradient-dark')) {
                    text_span_white[i].classList.remove('text-white');
                    text_span_white[i].classList.add('text-dark');
                }
            }
            for (let i = 0; i < text_strong_white.length; i++) {
                if (text_strong_white[i].classList.contains('text-white')) {
                    text_strong_white[i].classList.remove('text-white');
                    text_strong_white[i].classList.add('text-dark');
                }
            }
            for (let i = 0; i < text_nav_link_white.length; i++) {
                if (text_nav_link_white[i].classList.contains('text-white') && !text_nav_link_white[i].closest('.sidenav')) {
                    text_nav_link_white[i].classList.remove('text-white');
                    text_nav_link_white[i].classList.add('text-dark');
                }
            }
            for (let i = 0; i < secondary.length; i++) {
                if (secondary[i].classList.contains('text-white')) {
                    secondary[i].classList.remove('text-white');
                    secondary[i].classList.remove('opacity-8');
                    secondary[i].classList.add('text-dark');
                }
            }
            for (let i = 0; i < bg_gray_600.length; i++) {
                if (bg_gray_600[i].classList.contains('bg-gray-600')) {
                    bg_gray_600[i].classList.remove('bg-gray-600');
                    bg_gray_600[i].classList.add('bg-gray-100');
                }
            }
            for (let i = 0; i < svg.length; i++) {
                if (svg[i].hasAttribute('fill')) {
                    svg[i].setAttribute('fill', '#252f40');
                }
            }
            for (let i = 0; i < btn_text_white.length; i++) {
                if (!btn_text_white[i].closest('.card.bg-gradient-dark')) {
                    btn_text_white[i].classList.remove('text-white');
                    btn_text_white[i].classList.add('text-dark');
                }
            }
            for (let i = 0; i < card_border_dark.length; i++) {
                card_border_dark[i].classList.remove('border-dark');
            }
            this.element.removeAttribute("checked");
        }
        this.initSidebar();
    };
}