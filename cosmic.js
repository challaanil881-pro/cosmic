
// header -----------------------------------------------------------------------------------------------------

 (function() {
      'use strict';

      // ----- DOM refs -----
      const header = document.getElementById('mainHeader');
      const hamburger = document.getElementById('hamburgerBtn');
      const mobileMenu = document.getElementById('mobileMenu');

      // desktop dropdown
      const eventsToggle = document.getElementById('eventsToggle');
      const eventsSub = document.getElementById('eventsSub');

      // mobile dropdown
      const mobileEventsToggle = document.getElementById('mobileEventsToggle');
      const mobileEventsSub = document.getElementById('mobileEventsSub');

      // all nav links (desktop + mobile) that have href starting with #
      const allNavLinks = document.querySelectorAll('a[href^="#"]');

      // ----- smooth scroll function -----
      function smoothScroll(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = header.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }

      // ----- close all dropdowns -----
      function closeAll() {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        eventsSub.classList.remove('show');
        eventsToggle.classList.remove('active');
        mobileEventsSub.classList.remove('open');
        mobileEventsToggle.classList.remove('active');
      }

      // ----- attach click to all nav links for smooth scroll -----
      allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          if (targetId && targetId.startsWith('#')) {
            smoothScroll(targetId);
            closeAll(); // close mobile menu and dropdowns
          }
        });
      });

      // ----- toggle desktop dropdown -----
      eventsToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = eventsSub.classList.contains('show');
        document.querySelectorAll('.dropdown-content.show').forEach(el => {
          if (el !== eventsSub) el.classList.remove('show');
        });
        document.querySelectorAll('.dropbtn.active').forEach(el => {
          if (el !== eventsToggle) el.classList.remove('active');
        });
        eventsSub.classList.toggle('show');
        eventsToggle.classList.toggle('active');
      });

      // close desktop dropdown on outside click
      document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
          eventsSub.classList.remove('show');
          eventsToggle.classList.remove('active');
        }
      });

      // ----- mobile dropdown toggle -----
      mobileEventsToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileEventsSub.classList.toggle('open');
        mobileEventsToggle.classList.toggle('active');
      });

      // ----- hamburger toggle -----
      hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = mobileMenu.classList.contains('open');
        if (isOpen) {
          mobileMenu.classList.remove('open');
          hamburger.classList.remove('active');
        } else {
          mobileMenu.classList.add('open');
          hamburger.classList.add('active');
          eventsSub.classList.remove('show');
          eventsToggle.classList.remove('active');
        }
      });

      // close mobile when clicking outside
      document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('open') && !e.target.closest('.mobile-menu') && !e.target.closest('.hamburger')) {
          mobileMenu.classList.remove('open');
          hamburger.classList.remove('active');
        }
      });

      // ----- scroll hide/show header (advanced) -----
      let lastScroll = 0;
      let ticking = false;

      function handleScroll() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > lastScroll && currentScroll > 80) {
          header.classList.add('hide');
        } else {
          header.classList.remove('hide');
        }
        lastScroll = currentScroll;
        ticking = false;
      }

      window.addEventListener('scroll', function() {
        if (!ticking) {
          window.requestAnimationFrame(function() {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      });

      console.log('✅ Header ready · Click any nav item → smooth scroll to section');
    })();


//  visiion & misiion -------------------------------------------------------------------------------------------------------
 (function() {
    const items = document.querySelectorAll('.animate-item');
    if (items.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
      });
      items.forEach(item => observer.observe(item));
    }
  })();

//   founder desk .......................................................................................................................................

(function() {
    'use strict';

    // ============================================
    // 1. PARTICLE SYSTEM
    // ============================================
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId = null;

    function resizeCanvas() {
      const wrapper = document.getElementById('founderWrapper');
      canvas.width = wrapper.offsetWidth;
      canvas.height = wrapper.offsetHeight;
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${this.opacity})`;
        ctx.fill();
      }
    }

    function initParticles() {
      const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      // draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(167, 139, 250, ${0.04 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(animateParticles);
    }

    // ============================================
    // 2. TYPING EFFECT
    // ============================================
    const typingText = "A vision that transforms ideas into institutions, and dreams into sustainable realities.";
    const typedOutput = document.getElementById('typedOutput');
    let charIndex = 0;
    let isTyping = true;

    function typeText() {
      if (charIndex < typingText.length) {
        typedOutput.textContent += typingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 25 + Math.random() * 15);
      }
    }

    // ============================================
    // 3. SCROLL REVEAL WITH OBSERVER
    // ============================================
    function initScrollReveal() {
      const items = document.querySelectorAll('.msg-text, .expert-item, .founder-quote');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.getAttribute('data-delay')) || 0;
            setTimeout(() => {
              el.classList.add('visible');
            }, delay);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      });

      items.forEach(item => observer.observe(item));
    }

    // ============================================
    // 4. PARALLAX MOUSE EFFECT ON IMAGE
    // ============================================
    function initParallax() {
      const frame = document.getElementById('imageFrame');
      const img = frame.querySelector('img');

      frame.addEventListener('mousemove', (e) => {
        const rect = frame.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        img.style.transform = `scale(1.04) translate(${x * 12}px, ${y * 12}px)`;
      });

      frame.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1) translate(0, 0)';
      });
    }

    // ============================================
    // 5. SMOOTH GLOW ON SCROLL
    // ============================================
    function initScrollGlow() {
      const container = document.querySelector('.founder-container');
      window.addEventListener('scroll', () => {
        const rect = container.getBoundingClientRect();
        const progress = 1 - Math.min(1, Math.max(0, rect.top / window.innerHeight));
        container.style.boxShadow = `0 30px 80px rgba(0, 0, 0, ${0.3 + progress * 0.2})`;
      }, { passive: true });
    }

    // ============================================
    // 6. INIT
    // ============================================
    function init() {
      resizeCanvas();
      initParticles();
      animateParticles();

      // Start typing after particles load
      setTimeout(typeText, 800);

      initScrollReveal();
      initParallax();
      initScrollGlow();

      // handle resize
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          resizeCanvas();
          initParticles();
        }, 200);
      });
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }

  })();

//   services------------------------------------------------------------------------------------------------------

(function() {
    'use strict';

    // ============================================
    // 1. TYPING EFFECT
    // ============================================
    const typingText = "Transforming ideas into impactful solutions across every sector.";
    const typedOutput = document.getElementById('typedOutput');
    let charIndex = 0;

    function typeText() {
      if (charIndex < typingText.length) {
        typedOutput.textContent += typingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 20 + Math.random() * 15);
      }
    }

    // ============================================
    // 2. SCROLL REVEAL WITH STAGGER
    // ============================================
    function initScrollReveal() {
      const cards = document.querySelectorAll('.service-card');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.getAttribute('data-delay')) || 0;
            setTimeout(() => {
              el.classList.add('visible');
            }, delay);
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
      });

      cards.forEach(card => observer.observe(card));
    }

    // ============================================
    // 3. 3D TILT EFFECT ON CARDS
    // ============================================
    function initTiltEffect() {
      const cards = document.querySelectorAll('.service-card');

      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          const rotateX = y * -8;
          const rotateY = x * 8;

          card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.01)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });
      });
    }

    // ============================================
    // 4. PARALLAX FLOATING ICONS (subtle)
    // ============================================
    function initFloatingIcons() {
      const icons = document.querySelectorAll('.card-icon');
      icons.forEach((icon, index) => {
        const speed = 0.5 + (index % 3) * 0.2;
        let floatY = 0;
        let direction = 1;

        setInterval(() => {
          floatY += direction * 0.15 * speed;
          if (Math.abs(floatY) > 4) direction *= -1;
          icon.style.transform = `translateY(${floatY}px) scale(1.05)`;
        }, 50 + index * 10);
      });
    }

    // ============================================
    // 5. INIT
    // ============================================
    function init() {
      // Start typing after a moment
      setTimeout(typeText, 600);

      initScrollReveal();
      initTiltEffect();
      initFloatingIcons();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }

  })();

  // projects----------------------------------------------------------------------------------------------------------------

   (function() {
      // advanced interaction: click on badge changes text & color with animation
      const badge = document.getElementById('clickableBadge');
      const badgeText = document.getElementById('badgeText');
      const visionBlock = document.getElementById('visionBlock');

      if (badge && badgeText) {
        let clickCount = 0;
        const messages = [
          '✨ mother’s love in every lesson',
          '🌱 nurturing curiosity daily',
          '💫 wisdom wrapped in care',
          '🌸 joyful learning forever',
          '❤️ you are cherished'
        ];

        badge.addEventListener('click', function(e) {
          e.stopPropagation();
          clickCount = (clickCount + 1) % messages.length;
          badgeText.textContent = messages[clickCount];
          // subtle animation on vision block
          if (visionBlock) {
            visionBlock.style.transition = '0.2s';
            visionBlock.style.transform = 'scale(0.99)';
            visionBlock.style.background = '#f0ebe4';
            setTimeout(() => {
              visionBlock.style.transform = 'scale(1)';
              visionBlock.style.background = 'linear-gradient(135deg, #f0ebe4 0%, #faf5ef 100%)';
            }, 150);
          }
          // pulse effect on badge
          badge.style.transition = '0.15s';
          badge.style.transform = 'scale(0.96)';
          setTimeout(() => { badge.style.transform = 'scale(1)'; }, 150);
        });
      }

      // extra: dynamic hover effect on feature items (already via css)
      // add a small "glow" on any .feature-item (already done)
      // also make all .pill-list items interactive (just for delight)
      const pills = document.querySelectorAll('.pill-list span');
      pills.forEach((pill, index) => {
        pill.addEventListener('mouseenter', function() {
          this.style.backgroundColor = '#d4a37330';
          this.style.borderColor = '#d4a373';
        });
        pill.addEventListener('mouseleave', function() {
          this.style.backgroundColor = 'rgba(212, 163, 115, 0.12)';
          this.style.borderColor = 'rgba(212, 163, 115, 0.2)';
        });
      });

      // make the whole card responsive & dynamic (already done)
      console.log('✨ Cosmic Online Tutorial Lab · motherly design');
    })();

    // cosmic studio====-------------------------------------------------------------------------------------------------------------------------------------

     (function() {
      // ----- DYNAMIC TEXT ROTATOR (advanced) -----
      const wordEl = document.getElementById('dynamicWord');
      if (wordEl) {
        const words = ['achievement', 'excellence', 'creativity', 'confidence', 'opportunity', 'mastery', 'expression', 'brilliance'];
        let idx = 0;
        setInterval(() => {
          idx = (idx + 1) % words.length;
          wordEl.textContent = words[idx];
          wordEl.style.transition = '0.15s';
          wordEl.style.transform = 'scale(1.2)';
          wordEl.style.filter = 'drop-shadow(0 0 40px rgba(242, 201, 76, 0.6))';
          setTimeout(() => {
            wordEl.style.transform = 'scale(1)';
            wordEl.style.filter = 'drop-shadow(0 0 20px rgba(242, 201, 76, 0.15))';
          }, 180);
        }, 4000);

        // click on word to manually rotate
        wordEl.addEventListener('click', function(e) {
          e.stopPropagation();
          idx = (idx + 1) % words.length;
          this.textContent = words[idx];
          this.style.transition = '0.1s';
          this.style.transform = 'scale(1.3)';
          this.style.filter = 'drop-shadow(0 0 60px rgba(242, 201, 76, 0.7))';
          setTimeout(() => {
            this.style.transform = 'scale(1)';
            this.style.filter = 'drop-shadow(0 0 20px rgba(242, 201, 76, 0.15))';
          }, 200);
        });
      }

      // ----- generate stars (advanced) -----
      const starField = document.getElementById('starField');
      if (starField) {
        for (let i = 0; i < 65; i++) {
          const star = document.createElement('div');
          star.className = 'star';
          const size = Math.random() * 3 + 1.5;
          star.style.setProperty('--size', size + 'px');
          star.style.left = Math.random() * 100 + '%';
          star.style.top = Math.random() * 100 + '%';
          star.style.setProperty('--dur', (Math.random() * 4 + 2) + 's');
          star.style.animationDelay = (Math.random() * 4) + 's';
          starField.appendChild(star);
        }
      }

      console.log('✨ Cosmic Studio · animated with love');
    })();

    // events  ------------------------------------------------------------------------------------------------------------------------------

     (function() {
            const cards = document.querySelectorAll('.event-card');
            cards.forEach((card) => {
                card.addEventListener('click', function(e) {
                    if (window.getSelection().toString().length > 0) return;
                    this.style.transition = 'box-shadow 0.15s, transform 0.15s';
                    this.style.boxShadow = '0 0 0 5px rgba(180, 139, 122, 0.3), 0 25px 40px -12px rgba(60,30,10,0.25)';
                    this.style.transform = 'scale(0.99)';
                    setTimeout(() => {
                        this.style.boxShadow = '';
                        this.style.transform = '';
                    }, 280);
                });
            });
            console.log('✨ Cosmic Events · Natya Kala · Mayuri · 108 Shiva');
        })();

        // cosmic methodology-------------------------------------------------------------------------------------------------------------------------------

        (function() {
      // subtle animation: add a small pulse to icons on hover (already in css)
      // but also we want to add a dynamic "wow" effect: random spark on gallery items
      const items = document.querySelectorAll('.gallery-item, .process-step, .achievement-tags span');
      items.forEach(el => {
        el.addEventListener('mouseenter', function(e) {
          this.style.transition = 'all 0.2s ease';
        });
      });

      // extra: simulate a "cosmic" particle on click (just for delight)
      const app = document.querySelector('.cosmic-app');
      if (app) {
        app.addEventListener('click', function(e) {
          // tiny spark effect: no heavy dom, just a small style blink
          const target = e.target.closest('.process-step, .gallery-item, .story-box, .testimonial-box, .achievement-tags span');
          if (target) {
            target.style.boxShadow = '0 0 0 4px rgba(180, 130, 90, 0.3)';
            setTimeout(() => { target.style.boxShadow = ''; }, 300);
          }
        });
      }
    })();

    // csr------------------------------------------------------------------------------------------------------------------------------------------------------------------

    (function() {
    // ---- advanced tilt on cards (3D follow) ----
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        this.style.transform = `perspective(600px) rotateY(${x*12}deg) rotateX(${y*-10}deg) translateY(-8px) scale(1.02)`;
      });
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });

    // ---- pill click burst effect ----
    document.querySelectorAll('.pill, .social-cluster a, .float-card li, .contact-line').forEach(el => {
      el.addEventListener('click', function() {
        this.style.transition = 'all 0.12s';
        this.style.boxShadow = '0 0 0 6px rgba(100, 180, 255, 0.25)';
        setTimeout(() => { this.style.boxShadow = ''; }, 300);
      });
    });

    // ---- hyper-head spark ----
    document.querySelectorAll('.hyper-head').forEach(h => {
      h.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.01)';
        setTimeout(() => this.style.transform = '', 300);
      });
    });
  })();

  // footer ----------------------------------------------------------------------------------------------------------------------------------

  (function() {
      // subtle click feedback on items
      const items = document.querySelectorAll('.footer-col li, .contact-item, .brand-social a');
      items.forEach(el => {
        el.addEventListener('click', function(e) {
          this.style.transition = 'all 0.1s';
          this.style.boxShadow = '0 0 0 4px rgba(100, 180, 255, 0.15)';
          setTimeout(() => { this.style.boxShadow = ''; }, 250);
        });
      });
    })();