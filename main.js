/* ===================================================
   La Mandarina — main.js
   Restaurant Schoperia La Mandarina · San Joaquin
   =================================================== */

document.addEventListener('DOMContentLoaded', function () {

                            // === 1. MENU HAMBURGUESA (MOBILE) ===
                            var navToggle = document.getElementById('navToggle');
     var navLinks = document.getElementById('navLinks');

                            if (navToggle && navLinks) {
                                   navToggle.addEventListener('click', function (e) {
                                            e.stopPropagation();
                                            var isOpen = navLinks.classList.toggle('open');
                                            navToggle.textContent = isOpen ? 'X' : '=';
                                            navToggle.setAttribute('aria-expanded', isOpen);
                                            document.body.style.overflow = isOpen ? 'hidden' : '';
                                   });

       navLinks.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', function () {
                           navLinks.classList.remove('open');
                           navToggle.textContent = '=';
                           navToggle.setAttribute('aria-expanded', false);
                           document.body.style.overflow = '';
                });
       });

       document.addEventListener('click', function (e) {
                if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                           navLinks.classList.remove('open');
                           navToggle.textContent = '=';
                           navToggle.setAttribute('aria-expanded', false);
                           document.body.style.overflow = '';
                }
       });

       document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && navLinks.classList.contains('open')) {
                           navLinks.classList.remove('open');
                           navToggle.textContent = '=';
                           navToggle.setAttribute('aria-expanded', false);
                           document.body.style.overflow = '';
                           navToggle.focus();
                }
       });

       var touchStartX = 0;
                                   document.addEventListener('touchstart', function (e) {
                                            touchStartX = e.changedTouches[0].clientX;
                                   }, { passive: true });
                                   document.addEventListener('touchend', function (e) {
                                            var touchEndX = e.changedTouches[0].clientX;
                                            if (touchStartX - touchEndX > 50 && navLinks.classList.contains('open')) {
                                                       navLinks.classList.remove('open');
                                                       navToggle.textContent = '=';
                                                       navToggle.setAttribute('aria-expanded', false);
                                                       document.body.style.overflow = '';
                                            }
                                   }, { passive: true });
                            }

                            // === 2. SCROLL SUAVE ===
                            document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
                                   anchor.addEventListener('click', function (e) {
                                            var targetId = this.getAttribute('href').slice(1);
                                            if (!targetId) return;
                                            var target = document.getElementById(targetId);
                                            if (target) {
                                                       e.preventDefault();
                                                       var navHeight = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 0;
                                                       var targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;
                                                       window.scrollTo({ top: targetPos, behavior: 'smooth' });
                                            }
                                   });
                            });

                            // === 3. NAV ACTIVO EN SCROLL ===
                            var sections = document.querySelectorAll('section[id]');
     var navLinksList = document.querySelectorAll('.nav-links a[href^="#"]');

                            function updateActiveNav() {
                                   var navHeight = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 0;
                                   var scrollPos = window.pageYOffset + navHeight + 20;
                                   var currentId = '';
                                   sections.forEach(function (section) {
                                            if (section.offsetTop <= scrollPos) currentId = section.id;
                                   });
                                   navLinksList.forEach(function (link) {
                                            link.classList.remove('nav-active');
                                            if (link.getAttribute('href') === '#' + currentId) link.classList.add('nav-active');
                                   });
                            }

                            window.addEventListener('scroll', updateActiveNav, { passive: true });
     updateActiveNav();

                            // === 4. NAV EFECTO AL SCROLL ===
                            var nav = document.querySelector('nav');
     if (nav) {
            function updateNavScroll() {
                     if (window.pageYOffset > 50) {
                                nav.style.background = 'rgba(44, 20, 0, 0.98)';
                                nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.6)';
                     } else {
                                nav.style.background = '';
                                nav.style.boxShadow = '';
                     }
            }
            window.addEventListener('scroll', updateNavScroll, { passive: true });
            updateNavScroll();
     }

                            // === 5. ANIMACION DE CARDS AL SCROLL ===
                            if ('IntersectionObserver' in window) {
                                   var observer = new IntersectionObserver(function (entries) {
                                            entries.forEach(function (entry) {
                                                       if (entry.isIntersecting) {
                                                                    entry.target.style.opacity = '1';
                                                                    entry.target.style.transform = 'translateY(0)';
                                                       }
                                            });
                                   }, { threshold: 0.1 });

       var cards = document.querySelectorAll('.carne-card, .res-card, .amb-car');
                                   cards.forEach(function (card) {
                                            card.style.opacity = '0';
                                            card.style.transform = 'translateY(20px)';
                                            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                                            observer.observe(card);
                                   });
                            }

                            // === 6. LAZY LOADING ===
                            document.querySelectorAll('img:not([loading])').forEach(function (img) {
                                   img.setAttribute('loading', 'lazy');
                            });

});
