(function () {
  var home = document.querySelector('.concept-home');
  if (!home) return;

  var articleGrid = home.querySelector('[data-article-grid]');
  var articleCards = Array.prototype.slice.call(home.querySelectorAll('[data-article-card]'));
  var slides = Array.prototype.slice.call(home.querySelectorAll('[data-slide]'));
  var currentLabel = home.querySelector('[data-slide-current]');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var currentSlide = 0;

  articleCards.forEach(function (card) {
    function activate() {
      if (articleGrid) articleGrid.classList.add('has-keyboard-focus');
      articleCards.forEach(function (item) {
        item.classList.toggle('is-active', item === card);
      });
    }

    card.addEventListener('focus', activate);
    card.addEventListener('pointerenter', activate);
  });

  if (articleGrid) {
    articleGrid.addEventListener('focusout', function (event) {
      if (!articleGrid.contains(event.relatedTarget)) {
        articleGrid.classList.remove('has-keyboard-focus');
      }
    });
  }

  function showSlide(index, direction) {
    if (!slides.length) return;

    var previous = slides[currentSlide];
    currentSlide = (index + slides.length) % slides.length;
    var next = slides[currentSlide];

    if (previous === next) return;

    if (window.gsap && !reducedMotion) {
      window.gsap.to(previous, {
        opacity: 0,
        x: direction * -30,
        duration: 0.28,
        onComplete: function () {
          previous.hidden = true;
          previous.classList.remove('is-current');
          next.hidden = false;
          next.classList.add('is-current');
          window.gsap.fromTo(next, { opacity: 0, x: direction * 30 }, { opacity: 1, x: 0, duration: 0.42, ease: 'power2.out' });
        }
      });
    } else {
      previous.hidden = true;
      previous.classList.remove('is-current');
      next.hidden = false;
      next.classList.add('is-current');
    }

    if (currentLabel) {
      currentLabel.textContent = String(currentSlide + 1).padStart(2, '0');
    }
  }

  var nextButton = home.querySelector('[data-slide-next]');
  var previousButton = home.querySelector('[data-slide-prev]');

  if (nextButton) nextButton.addEventListener('click', function () { showSlide(currentSlide + 1, 1); });
  if (previousButton) previousButton.addEventListener('click', function () { showSlide(currentSlide - 1, -1); });

  if (!window.gsap || !window.ScrollTrigger || reducedMotion) return;

  window.gsap.registerPlugin(window.ScrollTrigger);

  window.gsap.to('.concept-hero h1', {
    y: -54,
    opacity: 0.22,
    ease: 'none',
    scrollTrigger: {
      trigger: '.concept-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  window.gsap.utils.toArray('.concept-reveal-image').forEach(function (image) {
    window.gsap.fromTo(image,
      { scale: 0.84, opacity: 0.24 },
      {
        scale: 1,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: image,
          start: 'top 92%',
          end: 'center 58%',
          scrub: true
        }
      }
    );
  });

  window.gsap.utils.toArray('.concept-project-card').forEach(function (card, index, cards) {
    window.gsap.fromTo(card,
      { y: 110, scale: 0.94, opacity: 0.35 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top 94%',
          end: 'top 20%',
          scrub: true,
          invalidateOnRefresh: true
        }
      }
    );

    if (index < cards.length - 1) {
      window.gsap.to(card, {
        scale: 0.96,
        opacity: 0.62,
        ease: 'none',
        scrollTrigger: {
          trigger: cards[index + 1],
          start: 'top 78%',
          end: 'top 18%',
          scrub: true
        }
      });
    }
  });

  if (window.matchMedia('(min-width: 1101px)').matches) {
    window.ScrollTrigger.create({
      trigger: '.concept-projects-stage',
      start: 'top 96px',
      end: 'bottom bottom',
      pin: '.concept-projects-intro',
      pinSpacing: false
    });
  }
})();
