import { Controller } from '@hotwired/stimulus';

/*
 * This is an example Stimulus controller!
 *
 * Any element with a data-controller="hello" attribute will cause
 * this controller to be executed. The name "hello" comes from the filename:
 * hello_controller.js -> "hello"
 *
 * Delete this file or adapt it for your use!
 */
export default class extends Controller
{
    connect() {
        this.prepareMenu(); // Collapse current menu when its located inside parent menu
        this.prepareSelect2(); // Set all inputs with class select2 to nice select

        if (document.getElementById('choices-language')) {
            let language = document.getElementById('choices-language');
            const example = new Choices(language);
            console.log(example);
        }

        (function() {
            let isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

            if (isWindows) {
                // if we are on windows OS we activate the perfectScrollbar function
                if (document.getElementsByClassName('main-content')[0]) {
                    let mainpanel = document.querySelector('.main-content');
                    let ps = new PerfectScrollbar(mainpanel);
                }

                if (document.getElementsByClassName('sidenav')[0]) {
                    let sidebar = document.querySelector('.sidenav');
                    let ps1 = new PerfectScrollbar(sidebar);
                }

                if (document.getElementsByClassName('navbar-collapse')[0]) {
                    let fixedplugin = document.querySelector('.navbar:not(.navbar-expand-lg) .navbar-collapse');
                    let ps2 = new PerfectScrollbar(fixedplugin);
                }

                if (document.getElementsByClassName('fixed-plugin')[0]) {
                    let fixedplugin = document.querySelector('.fixed-plugin');
                    let ps3 = new PerfectScrollbar(fixedplugin);
                }
            }
        })();

        // Verify navbar blur on scroll
        if (document.getElementById('navbarBlur')) {
            navbarBlurOnScroll('navbarBlur');
        }

        // initialization of Popovers
        let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
        let popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl)
        })

        // initialization of Tooltips
        let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        let tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })

        // initialization of Toasts
        document.addEventListener("DOMContentLoaded", function() {
            let toastElList = [].slice.call(document.querySelectorAll(".toast"));

            let toastList = toastElList.map(function(toastEl) {
                return new bootstrap.Toast(toastEl);
            });

            let toastButtonList = [].slice.call(document.querySelectorAll(".toast-btn"));

            toastButtonList.map(function(toastButtonEl) {
                toastButtonEl.addEventListener("click", function() {
                    let toastToTrigger = document.getElementById(toastButtonEl.dataset.target);

                    if (toastToTrigger) {
                        let toast = bootstrap.Toast.getInstance(toastToTrigger);
                        toast.show();
                    }
                });
            });
        });

        // Widget Calendar
        if (document.querySelector('[data-toggle="widget-calendar"]')) {
            let calendarEl = document.querySelector('[data-toggle="widget-calendar"]');
            let today = new Date();
            let mYear = today.getFullYear();
            let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let mDay = weekday[today.getDay()];

            let m = today.getMonth();
            let d = today.getDate();
            document.getElementsByClassName('widget-calendar-year')[0].innerHTML = mYear;
            document.getElementsByClassName('widget-calendar-day')[0].innerHTML = mDay;

            let calendar = new FullCalendar.Calendar(calendarEl, {
                contentHeight: 'auto',
                initialView: 'dayGridMonth',
                selectable: true,
                initialDate: '2020-12-01',
                editable: true,
                headerToolbar: false,
                events: [{
                    title: 'Call with Dave',
                    start: '2020-11-18',
                    end: '2020-11-18',
                    className: 'bg-gradient-danger'
                },

                    {
                        title: 'Lunch meeting',
                        start: '2020-11-21',
                        end: '2020-11-22',
                        className: 'bg-gradient-warning'
                    },

                    {
                        title: 'All day conference',
                        start: '2020-11-29',
                        end: '2020-11-29',
                        className: 'bg-gradient-success'
                    },

                    {
                        title: 'Meeting with Mary',
                        start: '2020-12-01',
                        end: '2020-12-01',
                        className: 'bg-gradient-info'
                    },

                    {
                        title: 'Winter Hackaton',
                        start: '2020-12-03',
                        end: '2020-12-03',
                        className: 'bg-gradient-danger'
                    },

                    {
                        title: 'Digital event',
                        start: '2020-12-07',
                        end: '2020-12-09',
                        className: 'bg-gradient-warning'
                    },

                    {
                        title: 'Marketing event',
                        start: '2020-12-10',
                        end: '2020-12-10',
                        className: 'bg-gradient-primary'
                    },

                    {
                        title: 'Dinner with Family',
                        start: '2020-12-19',
                        end: '2020-12-19',
                        className: 'bg-gradient-danger'
                    },

                    {
                        title: 'Black Friday',
                        start: '2020-12-23',
                        end: '2020-12-23',
                        className: 'bg-gradient-info'
                    },

                    {
                        title: 'Cyber Week',
                        start: '2020-12-02',
                        end: '2020-12-02',
                        className: 'bg-gradient-warning'
                    },

                ]
            });
            calendar.render();
        }

        // when input is focused add focused class for style
        function focused(el) {
            if (el.parentElement.classList.contains('input-group')) {
                el.parentElement.classList.add('focused');
            }
        }

        // when input is focused remove focused class for style
        function defocused(el) {
            if (el.parentElement.classList.contains('input-group')) {
                el.parentElement.classList.remove('focused');
            }
        }

        // helper for adding on all elements multiple attributes
        function setAttributes(el, options) {
            Object.keys(options).forEach(function(attr) {
                el.setAttribute(attr, options[attr]);
            })
        }

        // adding on inputs attributes for calling the focused and defocused functions
        if (document.querySelectorAll('.input-group').length != 0) {
            let allInputs = document.querySelectorAll('input.form-control');
            allInputs.forEach(el => setAttributes(el, {
                "onfocus": "focused(this)",
                "onfocusout": "defocused(this)"
            }));
        }

        // Multi Level Dropdown
        function dropDown(a) {
            if (!document.querySelector('.dropdown-hover')) {
                event.stopPropagation();
                event.preventDefault();
                let multilevel = a.parentElement.parentElement.children;

                for (let i = 0; i < multilevel.length; i++) {
                    if (multilevel[i].lastElementChild != a.parentElement.lastElementChild) {
                        multilevel[i].lastElementChild.classList.remove('show');
                    }
                }

                if (!a.nextElementSibling.classList.contains("show")) {
                    a.nextElementSibling.classList.add("show");
                } else {
                    a.nextElementSibling.classList.remove("show");
                }
            }
        }

        // Fixed Plugin
        if (document.querySelector('.fixed-plugin')) {
            let fixedPlugin = document.querySelector('.fixed-plugin');
            let fixedPluginButton = document.querySelector('.fixed-plugin-button');
            let fixedPluginButtonNav = document.querySelector('.fixed-plugin-button-nav');
            let fixedPluginCard = document.querySelector('.fixed-plugin .card');
            let fixedPluginCloseButton = document.querySelectorAll('.fixed-plugin-close-button');
            let navbar = document.getElementById('navbarBlur');
            let buttonNavbarFixed = document.getElementById('navbarFixed');

            if (fixedPluginButton) {
                fixedPluginButton.onclick = function() {
                    if (!fixedPlugin.classList.contains('show')) {
                        fixedPlugin.classList.add('show');
                    } else {
                        fixedPlugin.classList.remove('show');
                    }
                }
            }

            if (fixedPluginButtonNav) {
                fixedPluginButtonNav.onclick = function() {
                    if (!fixedPlugin.classList.contains('show')) {
                        fixedPlugin.classList.add('show');
                    } else {
                        fixedPlugin.classList.remove('show');
                    }
                }
            }

            fixedPluginCloseButton.forEach(function(el) {
                el.onclick = function() {
                    fixedPlugin.classList.remove('show');
                }
            })

            document.querySelector('body').onclick = function(e) {
                if (e.target != fixedPluginButton && e.target != fixedPluginButtonNav && e.target.closest('.fixed-plugin .card') != fixedPluginCard) {
                    fixedPlugin.classList.remove('show');
                }
            }

            if (navbar) {
                if (navbar.getAttribute('data-scroll') == 'true' && buttonNavbarFixed) {
                    buttonNavbarFixed.setAttribute("checked", "true");
                }
            }

        }

        // Navbar blur on scroll
        function navbarBlurOnScroll(id) {
            const navbar = document.getElementById(id);
            let navbarScrollActive = navbar ? navbar.getAttribute("data-scroll") : false;
            let scrollDistance = 5;
            let classes = ['blur', 'shadow-blur', 'left-auto'];
            let toggleClasses = ['shadow-none'];

            if (navbarScrollActive == 'true') {
                window.onscroll = debounce(function() {
                    if (window.scrollY > scrollDistance) {
                        blurNavbar();
                    } else {
                        transparentNavbar();
                    }
                }, 10);
            } else {
                window.onscroll = debounce(function() {
                    transparentNavbar();
                }, 10);
            }

            let isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

            if (isWindows) {
                let content = document.querySelector('.main-content');
                if (navbarScrollActive == 'true') {
                    content.addEventListener('ps-scroll-y', debounce(function() {
                        if (content.scrollTop > scrollDistance) {
                            blurNavbar();
                        } else {
                            transparentNavbar();
                        }
                    }, 10));
                } else {
                    content.addEventListener('ps-scroll-y', debounce(function() {
                        transparentNavbar();
                    }, 10));
                }
            }

            function blurNavbar() {
                navbar.classList.add(...classes)
                navbar.classList.remove(...toggleClasses)

                toggleNavLinksColor('blur');
            }

            function transparentNavbar() {
                navbar.classList.remove(...classes)
                navbar.classList.add(...toggleClasses)

                toggleNavLinksColor('transparent');
            }

            function toggleNavLinksColor(type) {
                let navLinks = document.querySelectorAll('.navbar-main .nav-link')
                let navLinksToggler = document.querySelectorAll('.navbar-main .sidenav-toggler-line')

                if (type === "blur") {
                    navLinks.forEach(element => {
                        element.classList.remove('text-body')
                    });

                    navLinksToggler.forEach(element => {
                        element.classList.add('bg-dark')
                    });
                } else if (type === "transparent") {
                    navLinks.forEach(element => {
                        element.classList.add('text-body')
                    });

                    navLinksToggler.forEach(element => {
                        element.classList.remove('bg-dark')
                    });
                }
            }
        }

        // Debounce Function
        // Returns a function, that, as long as it continues to be invoked, will not
        // be triggered. The function will be called after it stops being called for
        // N milliseconds. If `immediate` is passed, trigger the function on the
        // leading edge, instead of the trailing.
        function debounce(func, wait, immediate) {
            let timeout;
            return function() {
                let context = this,
                    args = arguments;
                let later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                }
                let callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            }
        }

        // Tabs navigation
        let total = document.querySelectorAll('.nav-pills');

        function initNavs() {
            total.forEach(function(item, i) {
                let moving_div = document.createElement('div');
                let li_active = item.querySelector(".nav-link.active");
                let tab = li_active.cloneNode();
                tab.innerHTML = "-";

                moving_div.classList.add('moving-tab', 'position-absolute', 'nav-link');
                moving_div.appendChild(tab);
                item.appendChild(moving_div);

                let list_length = item.getElementsByTagName("li").length;

                moving_div.style.padding = '0px';
                moving_div.style.transition = '.5s ease';

                let li = item.querySelector(".nav-link.active").parentElement;

                if (li) {
                    let nodes = Array.from(li.closest('ul').children); // get array
                    let index = nodes.indexOf(li) + 1;

                    let sum = 0;
                    if (item.classList.contains('flex-column')) {
                        for (let j = 1; j <= nodes.indexOf(li); j++) {
                            sum += item.querySelector('li:nth-child(' + j + ')').offsetHeight;
                        }
                        moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';
                        moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';
                        moving_div.style.height = item.querySelector('li:nth-child(' + j + ')').offsetHeight;
                    } else {
                        for (let j = 1; j <= nodes.indexOf(li); j++) {
                            sum += item.querySelector('li:nth-child(' + j + ')').offsetWidth;
                        }
                        moving_div.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
                        moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';
                    }
                }

                item.onmouseover = function(event) {
                    let target = getEventTarget(event);
                    let li = target.closest('li'); // get reference
                    if (li) {
                        let nodes = Array.from(li.closest('ul').children); // get array
                        let index = nodes.indexOf(li) + 1;
                        item.querySelector('li:nth-child(' + index + ') .nav-link').onclick = function() {
                            moving_div = item.querySelector('.moving-tab');
                            let sum = 0;
                            if (item.classList.contains('flex-column')) {
                                for (let j = 1; j <= nodes.indexOf(li); j++) {
                                    sum += item.querySelector('li:nth-child(' + j + ')').offsetHeight;
                                }
                                moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';
                                moving_div.style.height = item.querySelector('li:nth-child(' + j + ')').offsetHeight;
                            } else {
                                for (let j = 1; j <= nodes.indexOf(li); j++) {
                                    sum += item.querySelector('li:nth-child(' + j + ')').offsetWidth;
                                }
                                moving_div.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
                                moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';
                            }
                        }
                    }
                }
            });
        }

        setTimeout(function() {
            initNavs();
        }, 100);

        // Tabs navigation resize
        window.addEventListener('resize', function(event) {
            total.forEach(function(item, i) {
                item.querySelector('.moving-tab').remove();
                let moving_div = document.createElement('div');
                let tab = item.querySelector(".nav-link.active").cloneNode();
                tab.innerHTML = "-";

                moving_div.classList.add('moving-tab', 'position-absolute', 'nav-link');
                moving_div.appendChild(tab);

                item.appendChild(moving_div);

                moving_div.style.padding = '0px';
                moving_div.style.transition = '.5s ease';

                let li = item.querySelector(".nav-link.active").parentElement;

                if (li) {
                    let nodes = Array.from(li.closest('ul').children); // get array
                    let index = nodes.indexOf(li) + 1;

                    let sum = 0;
                    if (item.classList.contains('flex-column')) {
                        for (let j = 1; j <= nodes.indexOf(li); j++) {
                            sum += item.querySelector('li:nth-child(' + j + ')').offsetHeight;
                        }
                        moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';
                        moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';
                        moving_div.style.height = item.querySelector('li:nth-child(' + j + ')').offsetHeight;
                    } else {
                        for (let j = 1; j <= nodes.indexOf(li); j++) {
                            sum += item.querySelector('li:nth-child(' + j + ')').offsetWidth;
                        }
                        moving_div.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
                        moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';

                    }
                }
            });

            if (window.innerWidth < 991) {
                total.forEach(function(item, i) {
                    if (!item.classList.contains('flex-column')) {
                        item.classList.remove('flex-row');
                        item.classList.add('flex-column', 'on-resize');
                        let li = item.querySelector(".nav-link.active").parentElement;
                        let nodes = Array.from(li.closest('ul').children); // get array
                        let index = nodes.indexOf(li) + 1;
                        let sum = 0;
                        for (let j = 1; j <= nodes.indexOf(li); j++) {
                            sum += item.querySelector('li:nth-child(' + j + ')').offsetHeight;
                        }
                        let moving_div = document.querySelector('.moving-tab');
                        moving_div.style.width = item.querySelector('li:nth-child(1)').offsetWidth + 'px';
                        moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';

                    }
                });
            } else {
                total.forEach(function(item, i) {
                    if (item.classList.contains('on-resize')) {
                        item.classList.remove('flex-column', 'on-resize');
                        item.classList.add('flex-row');
                        let li = item.querySelector(".nav-link.active").parentElement;
                        let nodes = Array.from(li.closest('ul').children); // get array
                        let index = nodes.indexOf(li) + 1;
                        let sum = 0;
                        for (let j = 1; j <= nodes.indexOf(li); j++) {
                            sum += item.querySelector('li:nth-child(' + j + ')').offsetWidth;
                        }
                        let moving_div = document.querySelector('.moving-tab');
                        moving_div.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
                        moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';
                    }
                })
            }
        });

        // Function to remove flex row on mobile devices
        if (window.innerWidth < 991) {
            total.forEach(function(item, i) {
                if (item.classList.contains('flex-row')) {
                    item.classList.remove('flex-row');
                    item.classList.add('flex-column', 'on-resize');
                }
            });
        }

        function getEventTarget(e) {
            e = e || window.event;
            return e.target || e.srcElement;
        }
        // End tabs navigation

        // click to minimize the sidebar or reverse to normal
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

        // Toggle Sidenav
        const iconNavbarSidenav = document.getElementById('iconNavbarSidenav');
        const iconSidenav = document.getElementById('iconSidenav');
        const sidenav = document.getElementById('sidenav-main');
        let body = document.getElementsByTagName('body')[0];
        let className = 'g-sidenav-pinned';

        if (iconNavbarSidenav) {
            iconNavbarSidenav.addEventListener("click", toggleSidenav);
        }

        if (iconSidenav) {
            iconSidenav.addEventListener("click", toggleSidenav);
        }

        function toggleSidenav() {
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

        // Resize navbar color depends on configurator active type of sidenav
        let referenceButtons = document.querySelector('[data-class]');
        window.addEventListener("resize", navbarColorOnResize);
        function navbarColorOnResize() {
            if (sidenav) {
                if (window.innerWidth > 1200) {
                    if (referenceButtons.classList.contains('active') && referenceButtons.getAttribute('data-class') === 'bg-transparent') {
                        sidenav.classList.remove('bg-white');
                    } else {
                        if (!document.querySelector('body').classList.contains('dark-version')) {
                            sidenav.classList.add('bg-white');
                        }
                    }
                } else {
                    sidenav.classList.remove('bg-transparent');
                }
            }
        }

        // Deactivate sidenav type buttons on resize and small screens
        window.addEventListener("resize", sidenavTypeOnResize);
        window.addEventListener("load", sidenavTypeOnResize);

        function sidenavTypeOnResize() {
            let elements = document.querySelectorAll('[onclick="sidebarType(this)"]');
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

        // Notification function
        function notify(el) {
            let body = document.querySelector('body');
            let alert = document.createElement('div');
            alert.classList.add('alert', 'position-absolute', 'top-0', 'border-0', 'text-white', 'w-50', 'end-0', 'start-0', 'mt-2', 'mx-auto', 'py-2');
            alert.classList.add('alert-' + el.getAttribute('data-type'));
            alert.style.transform = 'translate3d(0px, 0px, 0px)'
            alert.style.opacity = '0';
            alert.style.transition = '.35s ease';
            alert.style.zIndex = '9999';
            setTimeout(function() {
                alert.style.transform = 'translate3d(0px, 20px, 0px)';
                alert.style.setProperty("opacity", "1", "important");
            }, 100);

            alert.innerHTML = '<div class="d-flex mb-1">' +
                '<div class="alert-icon me-1">' +
                '<i class="' + el.getAttribute('data-icon') + ' mt-1"></i>' +
                '</div>' +
                '<span class="alert-text"><strong>' + el.getAttribute('data-title') + '</strong></span>' +
                '</div>' +
                '<span class="text-sm">' + el.getAttribute('data-content') + '</span>';

            body.appendChild(alert);
            setTimeout(function() {
                alert.style.transform = 'translate3d(0px, 0px, 0px)'
                alert.style.setProperty("opacity", "0", "important");
            }, 4000);
            setTimeout(function() {
                el.parentElement.querySelector('.alert').remove();
            }, 4500);
        }

        // Material Design Input function
        let inputs = document.querySelectorAll('input');

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].hasAttribute('value') || inputs[i].val !== '') {
                inputs[i].parentElement.classList.add('is-filled');
            }
            inputs[i].addEventListener('focus', function(e) {
                this.parentElement.classList.add('is-focused');
            }, false);

            inputs[i].onkeyup = function(e) {
                if (this.value != "") {
                    this.parentElement.classList.add('is-filled');
                } else {
                    this.parentElement.classList.remove('is-filled');
                }
            };

            inputs[i].addEventListener('focusout', function(e) {
                if (this.value != "") {
                    this.parentElement.classList.add('is-filled');
                }
                this.parentElement.classList.remove('is-focused');
            }, false);
        }

        // Ripple Effect
        let ripples = document.querySelectorAll('.btn');

        for (let i = 0; i < ripples.length; i++) {
            ripples[i].addEventListener('click', function(e) {
                let targetEl = e.target;
                let rippleDiv = targetEl.querySelector('.ripple');

                rippleDiv = document.createElement('span');
                rippleDiv.classList.add('ripple');
                rippleDiv.style.width = rippleDiv.style.height = Math.max(targetEl.offsetWidth, targetEl.offsetHeight) + 'px';
                targetEl.appendChild(rippleDiv);

                rippleDiv.style.left = (e.offsetX - rippleDiv.offsetWidth / 2) + 'px';
                rippleDiv.style.top = (e.offsetY - rippleDiv.offsetHeight / 2) + 'px';
                rippleDiv.classList.add('ripple');
                setTimeout(function() {
                    rippleDiv.parentElement.removeChild(rippleDiv);
                }, 600);
            }, false);
        }

        // flatpickr init
        if (document.querySelector('.datepicker')) {
            flatpickr('.datepicker', {
                mode: "range"
            });
        }

        // validation
        const form = document.getElementById('form');
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const password2 = document.getElementById('confirm_password');

        // Show input error messages
        function showError(input, message) {
            const formControl = input.parentElement;
            formControl.className = 'input-group input-group-outline my-5 is-invalid is-filled';
            const small = formControl.querySelector('small');
            small.innerText = message;
        }

        // show success colour
        function showSucces(input) {
            const formControl = input.parentElement;
            formControl.className = 'input-group input-group-outline my-5 is-valid is-filled';
        }

        // check email is valid
        function checkEmail(input) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(input.value.trim())) {
                showSucces(input)
            } else {
                showError(input, 'Email is not invalid');
            }
        }

        // checkRequired fields
        function checkRequired(inputArr) {
            inputArr.forEach(function(input) {
                if (input.value.trim() === '') {
                    showError(input, `${getFieldName(input)} is required`)
                } else {
                    showSucces(input);
                }
            });
        }

        // check input Length
        function checkLength(input, min, max) {
            if (input.value.length < min) {
                showError(input, `${getFieldName(input)} must be at least ${min} characters`);
            } else if (input.value.length > max) {
                showError(input, `${getFieldName(input)} must be les than ${max} characters`);
            } else {
                showSucces(input);
            }
        }

        // get FieldName
        function getFieldName(input) {
            return input.id.charAt(0).toUpperCase() + input.id.slice(1);
        }

        // check passwords match
        function checkPasswordMatch(input1, input2) {
            if (input1.value !== input2.value) {
                showError(input2, 'Passwords do not match');
            }
        }


        // Event Listeners TODO::Form doesnt exists, uncomment after it works
        // form.addEventListener('submit', function(e) {
        //   e.preventDefault();
        //   checkRequired([username, email, password, password2]);
        //   checkLength(username, 3, 15);
        //   checkLength(password, 6, 25);
        //   checkEmail(email);
        //   checkPasswordMatch(password, password2);
        // });

        let material = {
            initFullCalendar: function() {
                document.addEventListener('DOMContentLoaded', function() {
                    let calendarEl = document.getElementById('fullCalendar');
                    let today = new Date();
                    let y = today.getFullYear();
                    let m = today.getMonth();
                    let d = today.getDate();
                    let calendar = new FullCalendar.Calendar(calendarEl, {
                        initialView: 'dayGridMonth',
                        selectable: true,
                        headerToolbar: {
                            left: 'title',
                            center: 'dayGridMonth,timeGridWeek,timeGridDay',
                            right: 'prev,next today'
                        },
                        select: function(info) {
                            // on select we show the Sweet Alert modal with an input
                            Swal.fire({
                                title: 'Create an Event',
                                html: '<div class="form-group">' +
                                    '<input class="form-control text-default" placeholder="Event Title" id="input-field">' +
                                    '</div>',
                                showCancelButton: true,
                                customClass: {
                                    confirmButton: 'btn btn-primary',
                                    cancelButton: 'btn btn-danger'
                                },
                                buttonsStyling: false
                            }).then(function(result) {
                                let eventData;
                                let event_title = document.getElementById('input-field').value;
                                if (event_title) {
                                    eventData = {
                                        title: event_title,
                                        start: info.startStr,
                                        end: info.endStr
                                    };
                                    calendar.addEvent(eventData);
                                }
                            });
                        },
                        editable: true,
                        // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
                        events: [{
                            title: 'All Day Event',
                            start: new Date(y, m, 1),
                            className: 'event-default'
                        },
                            {
                                id: 999,
                                title: 'Repeating Event',
                                start: new Date(y, m, d - 4, 6, 0),
                                allDay: false,
                                className: 'event-rose'
                            },
                            {
                                id: 999,
                                title: 'Repeating Event',
                                start: new Date(y, m, d + 3, 6, 0),
                                allDay: false,
                                className: 'event-rose'
                            },
                            {
                                title: 'Meeting',
                                start: new Date(y, m, d - 1, 10, 30),
                                allDay: false,
                                className: 'event-green'
                            },
                            {
                                title: 'Lunch',
                                start: new Date(y, m, d + 7, 12, 0),
                                end: new Date(y, m, d + 7, 14, 0),
                                allDay: false,
                                className: 'event-red'
                            },
                            {
                                title: 'Md-pro Launch',
                                start: new Date(y, m, d - 2, 12, 0),
                                allDay: true,
                                className: 'event-azure'
                            },
                            {
                                title: 'Birthday Party',
                                start: new Date(y, m, d + 1, 19, 0),
                                end: new Date(y, m, d + 1, 22, 30),
                                allDay: false,
                                className: 'event-azure'
                            },
                            {
                                title: 'Click for Creative Tim',
                                start: new Date(y, m, 21),
                                end: new Date(y, m, 22),
                                url: 'http://www.creative-tim.com/',
                                className: 'event-orange'
                            },
                            {
                                title: 'Click for Google',
                                start: new Date(y, m, 23),
                                end: new Date(y, m, 23),
                                url: 'http://www.creative-tim.com/',
                                className: 'event-orange'
                            }
                        ]
                    });
                    calendar.render();
                });
            },
            datatableSimple: function() {
                let columnDefs = [{
                    field: 'athlete',
                    minWidth: 150,
                    sortable: true,
                    filter: true
                },
                    {
                        field: 'age',
                        maxWidth: 90,
                        sortable: true,
                        filter: true
                    },
                    {
                        field: 'country',
                        minWidth: 150,
                        sortable: true,
                        filter: true
                    },
                    {
                        field: 'year',
                        maxWidth: 90,
                        sortable: true,
                        filter: true
                    },
                    {
                        field: 'date',
                        minWidth: 150,
                        sortable: true,
                        filter: true
                    },
                    {
                        field: 'sport',
                        minWidth: 150,
                        sortable: true,
                        filter: true
                    },
                    {
                        field: 'gold'
                    },
                    {
                        field: 'silver'
                    },
                    {
                        field: 'bronze'
                    },
                    {
                        field: 'total'
                    },
                ];

                // specify the data
                let rowData = [{
                    "athlete": "Ronald Valencia",
                    "age": 23,
                    "country": "United States",
                    "year": 2008,
                    "date": "24/08/2008",
                    "sport": "Swimming",
                    "gold": 8,
                    "silver": 0,
                    "bronze": 0,
                    "total": 8
                },
                    {
                        "athlete": "Lorand Frentz",
                        "age": 19,
                        "country": "United States",
                        "year": 2004,
                        "date": "29/08/2004",
                        "sport": "Swimming",
                        "gold": 6,
                        "silver": 0,
                        "bronze": 2,
                        "total": 8
                    },
                    {
                        "athlete": "Michael Phelps",
                        "age": 27,
                        "country": "United States",
                        "year": 2012,
                        "date": "12/08/2012",
                        "sport": "Swimming",
                        "gold": 4,
                        "silver": 2,
                        "bronze": 0,
                        "total": 6
                    },
                    {
                        "athlete": "Natalie Coughlin",
                        "age": 25,
                        "country": "United States",
                        "year": 2008,
                        "date": "24/08/2008",
                        "sport": "Swimming",
                        "gold": 1,
                        "silver": 2,
                        "bronze": 3,
                        "total": 6
                    },
                    {
                        "athlete": "Aleksey Nemov",
                        "age": 24,
                        "country": "Russia",
                        "year": 2000,
                        "date": "01/10/2000",
                        "sport": "Gymnastics",
                        "gold": 2,
                        "silver": 1,
                        "bronze": 3,
                        "total": 6
                    },
                    {
                        "athlete": "Alicia Coutts",
                        "age": 24,
                        "country": "Australia",
                        "year": 2012,
                        "date": "12/08/2012",
                        "sport": "Swimming",
                        "gold": 1,
                        "silver": 3,
                        "bronze": 1,
                        "total": 5
                    },
                    {
                        "athlete": "Missy Franklin",
                        "age": 17,
                        "country": "United States",
                        "year": 2012,
                        "date": "12/08/2012",
                        "sport": "Swimming",
                        "gold": 4,
                        "silver": 0,
                        "bronze": 1,
                        "total": 5
                    },
                    {
                        "athlete": "Ryan Lochte",
                        "age": 27,
                        "country": "United States",
                        "year": 2012,
                        "date": "12/08/2012",
                        "sport": "Swimming",
                        "gold": 2,
                        "silver": 2,
                        "bronze": 1,
                        "total": 5
                    },
                    {
                        "athlete": "Allison Schmitt",
                        "age": 22,
                        "country": "United States",
                        "year": 2012,
                        "date": "12/08/2012",
                        "sport": "Swimming",
                        "gold": 3,
                        "silver": 1,
                        "bronze": 1,
                        "total": 5
                    },
                    {
                        "athlete": "Natalie Coughlin",
                        "age": 21,
                        "country": "United States",
                        "year": 2004,
                        "date": "29/08/2004",
                        "sport": "Swimming",
                        "gold": 2,
                        "silver": 2,
                        "bronze": 1,
                        "total": 5
                    },
                    {
                        "athlete": "Ian Thorpe",
                        "age": 17,
                        "country": "Australia",
                        "year": 2000,
                        "date": "01/10/2000",
                        "sport": "Swimming",
                        "gold": 3,
                        "silver": 2,
                        "bronze": 0,
                        "total": 5
                    },
                    {
                        "athlete": "Dara Torres",
                        "age": 33,
                        "country": "United States",
                        "year": 2000,
                        "date": "01/10/2000",
                        "sport": "Swimming",
                        "gold": 2,
                        "silver": 0,
                        "bronze": 3,
                        "total": 5
                    },
                    {
                        "athlete": "Cindy Klassen",
                        "age": 26,
                        "country": "Canada",
                        "year": 2006,
                        "date": "26/02/2006",
                        "sport": "Speed Skating",
                        "gold": 1,
                        "silver": 2,
                        "bronze": 2,
                        "total": 5
                    },
                    {
                        "athlete": "Nastia Liukin",
                        "age": 18,
                        "country": "United States",
                        "year": 2008,
                        "date": "24/08/2008",
                        "sport": "Gymnastics",
                        "gold": 1,
                        "silver": 3,
                        "bronze": 1,
                        "total": 5
                    },
                    {
                        "athlete": "Marit Bjørgen",
                        "age": 29,
                        "country": "Norway",
                        "year": 2010,
                        "date": "28/02/2010",
                        "sport": "Cross Country Skiing",
                        "gold": 3,
                        "silver": 1,
                        "bronze": 1,
                        "total": 5
                    },
                    {
                        "athlete": "Sun Yang",
                        "age": 20,
                        "country": "China",
                        "year": 2012,
                        "date": "12/08/2012",
                        "sport": "Swimming",
                        "gold": 2,
                        "silver": 1,
                        "bronze": 1,
                        "total": 4
                    }
                ];

                // let the grid know which columns and what data to use
                let gridOptions = {
                    columnDefs: columnDefs,
                    rowSelection: 'multiple',
                    rowMultiSelectWithClick: true,
                    rowData: rowData
                };

                // setup the grid after the page has finished loading
                document.addEventListener('DOMContentLoaded', function() {
                    let gridDiv = document.querySelector('#datatableSimple');
                    new agGrid.Grid(gridDiv, gridOptions);
                });
            },
            initVectorMap: function() {
                am4core.ready(function() {

                    // Themes begin
                    am4core.useTheme(am4themes_animated);
                    // Themes end

                    // Create map instance
                    let chart = am4core.create("chartdiv", am4maps.MapChart);

                    // Set map definition
                    chart.geodata = am4geodata_worldLow;

                    // Set projection
                    chart.projection = new am4maps.projections.Miller();

                    // Create map polygon series
                    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

                    // Exclude Antartica
                    polygonSeries.exclude = ["AQ"];

                    // Make map load polygon (like country names) data from GeoJSON
                    polygonSeries.useGeodata = true;

                    // Configure series
                    let polygonTemplate = polygonSeries.mapPolygons.template;
                    polygonTemplate.tooltipText = "{name}";
                    polygonTemplate.polygon.fillOpacity = 0.6;


                    // Create hover state and set alternative fill color
                    let hs = polygonTemplate.states.create("hover");
                    hs.properties.fill = chart.colors.getIndex(0);

                    // Add image series
                    let imageSeries = chart.series.push(new am4maps.MapImageSeries());
                    imageSeries.mapImages.template.propertyFields.longitude = "longitude";
                    imageSeries.mapImages.template.propertyFields.latitude = "latitude";
                    imageSeries.mapImages.template.tooltipText = "{title}";
                    imageSeries.mapImages.template.propertyFields.url = "url";

                    let circle = imageSeries.mapImages.template.createChild(am4core.Circle);
                    circle.radius = 3;
                    circle.propertyFields.fill = "color";

                    let circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
                    circle2.radius = 3;
                    circle2.propertyFields.fill = "color";


                    circle2.events.on("inited", function(event) {
                        animateBullet(event.target);
                    })


                    function animateBullet(circle) {
                        let animation = circle.animate([{
                            property: "scale",
                            from: 1,
                            to: 5
                        }, {
                            property: "opacity",
                            from: 1,
                            to: 0
                        }], 1000, am4core.ease.circleOut);
                        animation.events.on("animationended", function(event) {
                            animateBullet(event.target.object);
                        })
                    }

                    let colorSet = new am4core.ColorSet();

                    imageSeries.data = [{
                        "title": "Brussels",
                        "latitude": 50.8371,
                        "longitude": 4.3676,
                        "color": colorSet.next()
                    }, {
                        "title": "Copenhagen",
                        "latitude": 55.6763,
                        "longitude": 12.5681,
                        "color": colorSet.next()
                    }, {
                        "title": "Paris",
                        "latitude": 48.8567,
                        "longitude": 2.3510,
                        "color": colorSet.next()
                    }, {
                        "title": "Reykjavik",
                        "latitude": 64.1353,
                        "longitude": -21.8952,
                        "color": colorSet.next()
                    }, {
                        "title": "Moscow",
                        "latitude": 55.7558,
                        "longitude": 37.6176,
                        "color": colorSet.next()
                    }, {
                        "title": "Madrid",
                        "latitude": 40.4167,
                        "longitude": -3.7033,
                        "color": colorSet.next()
                    }, {
                        "title": "London",
                        "latitude": 51.5002,
                        "longitude": -0.1262,
                        "url": "http://www.google.co.uk",
                        "color": colorSet.next()
                    }, {
                        "title": "Peking",
                        "latitude": 39.9056,
                        "longitude": 116.3958,
                        "color": colorSet.next()
                    }, {
                        "title": "New Delhi",
                        "latitude": 28.6353,
                        "longitude": 77.2250,
                        "color": colorSet.next()
                    }, {
                        "title": "Tokyo",
                        "latitude": 35.6785,
                        "longitude": 139.6823,
                        "url": "http://www.google.co.jp",
                        "color": colorSet.next()
                    }, {
                        "title": "Ankara",
                        "latitude": 39.9439,
                        "longitude": 32.8560,
                        "color": colorSet.next()
                    }, {
                        "title": "Buenos Aires",
                        "latitude": -34.6118,
                        "longitude": -58.4173,
                        "color": colorSet.next()
                    }, {
                        "title": "Brasilia",
                        "latitude": -15.7801,
                        "longitude": -47.9292,
                        "color": colorSet.next()
                    }, {
                        "title": "Ottawa",
                        "latitude": 45.4235,
                        "longitude": -75.6979,
                        "color": colorSet.next()
                    }, {
                        "title": "Washington",
                        "latitude": 38.8921,
                        "longitude": -77.0241,
                        "color": colorSet.next()
                    }, {
                        "title": "Kinshasa",
                        "latitude": -4.3369,
                        "longitude": 15.3271,
                        "color": colorSet.next()
                    }, {
                        "title": "Cairo",
                        "latitude": 30.0571,
                        "longitude": 31.2272,
                        "color": colorSet.next()
                    }, {
                        "title": "Pretoria",
                        "latitude": -25.7463,
                        "longitude": 28.1876,
                        "color": colorSet.next()
                    }];
                }); // end am4core.ready()
            },

            // Sweet Alerts
            showSwal: function(type) {
                if (type == 'basic') {
                    const swalBasic = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn bg-gradient-info'
                        }
                    });
                    swalBasic.fire({
                        title: 'Sweet!'
                    })

                } else if (type == 'title-and-text') {
                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn bg-gradient-success',
                            cancelButton: 'btn bg-gradient-danger'
                        }
                    });
                    swalWithBootstrapButtons.fire({
                        title: 'Sweet!',
                        text: 'Modal with a custom image.',
                        imageUrl: 'https://unsplash.it/400/200',
                        imageWidth: 400,
                        imageAlt: 'Custom image',
                    })

                } else if (type == 'success-message') {

                    Swal.fire(
                        'Good job!',
                        'You clicked the button!',
                        'success'
                    )

                } else if (type == 'warning-message-and-confirmation') {
                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn bg-gradient-success',
                            cancelButton: 'btn bg-gradient-danger'
                        },
                        buttonsStyling: false
                    })

                    swalWithBootstrapButtons.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, delete it!',
                        cancelButtonText: 'No, cancel!',
                        reverseButtons: true
                    }).then((result) => {
                        if (result.value) {
                            swalWithBootstrapButtons.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        } else if (
                            /* Read more about handling dismissals below */
                            result.dismiss === Swal.DismissReason.cancel
                        ) {
                            swalWithBootstrapButtons.fire(
                                'Cancelled',
                                'Your imaginary file is safe :)',
                                'error'
                            )
                        }
                    })
                } else if (type == 'warning-message-and-cancel') {
                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn bg-gradient-success',
                            cancelButton: 'btn bg-gradient-danger'
                        },
                        buttonsStyling: false
                    })
                    swalWithBootstrapButtons.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
                } else if (type == 'custom-html') {
                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn bg-gradient-success',
                            cancelButton: 'btn bg-gradient-danger'
                        },
                        buttonsStyling: false
                    })
                    swalWithBootstrapButtons.fire({
                        title: '<strong>HTML <u>example</u></strong>',
                        icon: 'info',
                        html: 'You can use <b>bold text</b>, ' +
                            '<a href="//sweetalert2.github.io">links</a> ' +
                            'and other HTML tags',
                        showCloseButton: true,
                        showCancelButton: true,
                        focusConfirm: false,
                        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
                        confirmButtonAriaLabel: 'Thumbs up, great!',
                        cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
                        cancelButtonAriaLabel: 'Thumbs down'
                    })
                } else if (type == 'rtl-language') {
                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn bg-gradient-success',
                            cancelButton: 'btn bg-gradient-danger'
                        },
                        buttonsStyling: false
                    })
                    swalWithBootstrapButtons.fire({
                        title: 'هل تريد الاستمرار؟',
                        icon: 'question',
                        iconHtml: '؟',
                        confirmButtonText: 'نعم',
                        cancelButtonText: 'لا',
                        showCancelButton: true,
                        showCloseButton: true
                    })
                } else if (type == 'auto-close') {
                    let timerInterval
                    Swal.fire({
                        title: 'Auto close alert!',
                        html: 'I will close in <b></b> milliseconds.',
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            timerInterval = setInterval(() => {
                                const content = Swal.getHtmlContainer()
                                if (content) {
                                    const b = content.querySelector('b')
                                    if (b) {
                                        b.textContent = Swal.getTimerLeft()
                                    }
                                }
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {}
                    })

                } else if (type == 'input-field') {

                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn bg-gradient-success',
                            cancelButton: 'btn bg-gradient-danger'
                        },
                        buttonsStyling: false
                    })
                    swalWithBootstrapButtons.fire({
                        title: 'Submit your Github username',
                        input: 'text',
                        inputAttributes: {
                            autocapitalize: 'off'
                        },
                        showCancelButton: true,
                        confirmButtonText: 'Look up',
                        showLoaderOnConfirm: true,
                        preConfirm: (login) => {
                            return fetch(`//api.github.com/users/${login}`)
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(response.statusText)
                                    }
                                    return response.json()
                                })
                                .catch(error => {
                                    Swal.showValidationMessage(
                                        `Request failed: ${error}`
                                    )
                                })
                        },
                        allowOutsideClick: () => !Swal.isLoading()
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: `${result.value.login}'s avatar`,
                                imageUrl: result.value.avatar_url
                            })
                        }
                    })
                }
            }
        }
    }

    sidebarType() {
        let parent = event.currentTarget.parentElement.children;
        let color = event.currentTarget.getAttribute("data-class");
        let body = document.querySelector("body");
        let bodyWhite = document.querySelector("body:not(.dark-version)");
        let bodyDark = body.classList.contains('dark-version');
        let colors = [];

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

            if (navbarBrandImg.includes('logo-ct.png')) {
                navbarBrand.src = navbarBrandImg.replace("logo-ct", "logo-ct-dark");;
            }
        } else {
            let navbarBrand = document.querySelector('.navbar-brand-img');
            let navbarBrandImg = navbarBrand.src;
            if (navbarBrandImg.includes('logo-ct-dark.png')) {
                navbarBrand.src = navbarBrandImg.replace("logo-ct-dark", "logo-ct");
            }
        }

        if (color === 'bg-white' && bodyDark) {
            let navbarBrand = document.querySelector('.navbar-brand-img');
            let navbarBrandImg = navbarBrand.src;

            if (navbarBrandImg.includes('logo-ct.png')) {
                navbarBrand.src = navbarBrandImg.replace("logo-ct", "logo-ct-dark");
            }
        }
    }

    // Set Navbar Minimized
    navbarMinimize(event) {
        let sidenavShow = document.getElementsByClassName('g-sidenav-show')[0];

        if (!event.currentTarget.getAttribute("checked")) {
            sidenavShow.classList.remove('g-sidenav-pinned');
            sidenavShow.classList.add('g-sidenav-hidden');
            event.currentTarget.setAttribute("checked", "true");
        } else {
            sidenavShow.classList.remove('g-sidenav-hidden');
            sidenavShow.classList.add('g-sidenav-pinned');
            event.currentTarget.removeAttribute("checked");
        }
    }

    /**
     * Toggles the "show" class on the next sibling element of the current target element.
     *
     * @return {void}
     */
    toggle() {
        event.preventDefault();
        $(event.currentTarget.nextElementSibling).toggleClass('show');
    }

    /**
     * Prepares the menu by applying necessary CSS classes to show the active links and their parent menus.
     *
     * @return {void} - This method does not return a value.
     */
    prepareMenu() {
        let activeLink = $('.nav-item.current');
        if (activeLink !== null && activeLink.closest('.collapse') !== null) {
            let parent = activeLink.closest('.collapse');
            parent.addClass('show');
            if (parent.closest() !== null) {
                parent.closest().addClass('show');
            }
        }
    }

    /**
     * Initializes the Select2 library for all elements with the class "select2".
     * This method should be called after the elements have been rendered in the DOM.
     *
     * @return {void} This method does not return a value.
     */
    prepareSelect2() {
        $('.select2').select2();
    }
}