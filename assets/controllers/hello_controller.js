import { Controller } from '@hotwired/stimulus';
import flatpickr from "flatpickr";

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
        this.prepareMenu(); // Collapse current menu when it's located inside parent menu
        this.prepareSelect2(); // Set all inputs with class select2 to nice select
        this.prepareChoices();
        this.prepareDate();

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

        // ⬇ Toasts
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

        // Display flash messages as toast notifications
        toastElList.forEach(toastEl => {
            let message = toastEl.getAttribute('data-alert');
            if (message) {
                let toastToTrigger = document.getElementById(message);
                if (toastToTrigger) {
                    let toast = bootstrap.Toast.getInstance(toastToTrigger);
                    toast.show();
                }
            }
        });
        // ⬆ Toasts

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
        const form = document.getElementById('password-form');
        const password = document.getElementById('password_newPassword');
        const password2 = document.getElementById('password_repeatPassword');

        // Show input error messages
        function showError(input, message) {
            const formControl = input.parentElement;
            // formControl.className = 'input-group input-group-outline is-invalid is-filled'; ⬅ Old way
            formControl.classList.remove('is-valid');
            formControl.classList.add('is-invalid');
            const small = formControl.querySelector('small');
            if (small) {
                small.innerText = message;
            }
        }

        // show success colour
        function showSucces(input) {
            const formControl = input.parentElement;
            // formControl.className = 'input-group input-group-outline is-valid is-filled'; ⬅ Old way
            formControl.classList.remove('is-invalid');
            formControl.classList.add('is-valid');
        }

        // checkRequired fields
        function checkRequired(inputArr) {
            let valid = true;
            inputArr.forEach(function(input) {
                if (input.value.trim() === '') {
                    showError(input, `${getFieldName(input)} is required`);
                    valid = false;
                } else {
                    showSucces(input);
                }
            });

            return valid;
        }

        // check input Length
        function checkLength(input, min, max) {
            if (input.value.length < min) {
                showError(input, `${getFieldName(input)} must be at least ${min} characters`);
                return false;
            } else if (input.value.length > max) {
                showError(input, `${getFieldName(input)} must be les than ${max} characters`);
                return false;
            }

            showSucces(input);
            return true;
        }

        // get FieldName
        function getFieldName(input) {
            return input.id.charAt(0).toUpperCase() + input.id.slice(1);
        }

        // check passwords match
        function checkPasswordMatch(input1, input2) {
            if (input1.value !== input2.value) {
                showError(input2, 'Passwords do not match');
                return false;
            }

            return true;
        }

        // Event Listeners
        if (form) {
            form.addEventListener('submit', function(e) {
                let validForm = true;
                if(!checkRequired([password, password2])) {
                    validForm = false;
                }
                if(!checkLength(password, 6, 25)) {
                    validForm = false;
                }
                if(!checkPasswordMatch(password, password2)) {
                    validForm = false;
                }
                console.log(validForm);
                if (!validForm) {
                    e.preventDefault();
                }
            });
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

    /**
     * Prepares choices by selecting all elements with the class
     * '.choices-single' and creating a new instance of the
     * 'Choices' class for each element.
     *
     * @return {void}
     */
    prepareChoices() {
        let singleChoices = document.querySelectorAll('.single-choices');
        singleChoices.forEach(function(element) {
            new Choices(element);
        });

        let multipleChoices = document.querySelectorAll('.multiple-choices');
        multipleChoices.forEach(function(element) {
            new Choices(element, {
                removeItemButton: true
            });
        });

        /* If you want to ues separated dates, then year-choices is ready and from material-dashboard->settings.html copy for days and months */
        let yearChoices = document.querySelectorAll('.year-choices');
        yearChoices.forEach(function(year) {
            setTimeout(function() {
                const example = new Choices(year, {
                    maxItemCount: 10,
                });
            }, 1);

            const currentYear = new Date().getFullYear();
            for (let y = 1900; y <= currentYear; y++) {
                let optn = document.createElement("OPTION");
                optn.text = y;
                optn.value = y;

                if (y === currentYear) {
                    optn.selected = true;
                }

                year.options.add(optn);
            }
        });
    }

    prepareDate() {
        let dates = document.querySelectorAll('.date-input');
        dates.forEach(function(date) {
            date.flatpickr();
        });
    }
}