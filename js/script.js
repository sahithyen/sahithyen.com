(function() {
  var
    strangeOrbits = null,
    typewriter = null,
    introDiv = null,
    transitionDuration = 3000,
    holdDuration = 2000,
    slides = [{
      image: 'img/sahithyen.png',
      text: 'Hi, I\'m Sahithyen'
    }, {
      image: 'img/pentagon.png',
      text: 'The background animation is written by my hands'
    }, {
      image: 'img/code.png',
      text: 'I (like to) program a lot'
    }, {
      image: 'img/github.png',
      text: 'Visit my GitHub profile to see my projects'
    }, {
      image: 'img/wordpress.png',
      text: 'Or read my thaughts in my blog'
    }],
    displayedLetters = 0,
    currentSlide = 0,
    interval = 16;


  function init() {
    // Load images
    for (var i = 0; i < slides.length; i++) {
      new Image().src = slides[i].image;
    }

    // Initialize StrangeOrbits and let it run
    window.addEventListener('touchmove', function(event) {
      event.preventDefault();
    });
    strangeOrbits = new StrangeOrbits(
      document.querySelector('.strangeorbits'), {
        color: 'orange'
      });
    strangeOrbits.start();

    // Initialize realistic-typewriter.js
    var typewriterP = document.querySelector('.typewriter');
    typewriter = typewriterStandalone(typewriterP)
      .withAccuracy(99)
      .withMinimumSpeed(8)
      .withMaximumSpeed(16)
      .build();

    // Addon for realistic-typewriter.js (Written by myself)
    typewriter.deleteChars = function(num) {
      for (var i = 0; i < num; i++) {
        this
          .waitRange(20, 30)
          .delete();
      }
      return this;
    }.bind(typewriter);

    // Layout
    introDiv = document.querySelector('.intro');
    adjustLayout();
    window.addEventListener('resize', adjustLayout);

    // Get the loop running
    loop();
  }

  function adjustLayout() {
    introDiv.style.marginTop = -introDiv.offsetHeight / 2 + 'px';
    strangeOrbits.options.pointDensity = 10 / window.innerWidth;
  }

  function loop() {
    slide = slides[currentSlide];

    strangeOrbits.showFigure(slide.image, transitionDuration);

    slideLock = true;
    typewriter
      .deleteChars(displayedLetters)
      .wait(500)
      .type(slide.text)
      .wait(holdDuration, loop);

    displayedLetters = slide.text.length;

    currentSlide = currentSlide < slides.length - 1 ?
      currentSlide + 1 :
      0;
  }

  document.addEventListener('DOMContentLoaded', init(), false);
})();
