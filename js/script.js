/**
 * Pro upgrades (minimal):
 * 1) Smooth scroll for internal links and CTA buttons.
 * 2) Mobile menu toggle.
 * 3) Optional "close menu on click".
 */
(function(){
  function $(sel, root){ return (root || document).querySelector(sel); }
  function $all(sel, root){ return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function scrollToSelector(sel){
    var el = $(sel);
    if(!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Smooth scroll
  document.addEventListener("click", function(e){
    var t = e.target;
    if(!(t instanceof Element)) return;

    var btn = t.closest("[data-scroll]");
    if(btn){
      e.preventDefault();
      scrollToSelector(btn.getAttribute("data-scroll"));
      return;
    }

    var link = t.closest('a[href^="#"]');
    if(link){
      var href = link.getAttribute("href");
      if(href && href.length > 1){
        e.preventDefault();
        scrollToSelector(href);
      }
    }
  });

  // Mobile menu
  var menuBtn = $(".menu-btn");
  var mobileNav = $(".mobile-nav");
  if(menuBtn && mobileNav){
    menuBtn.addEventListener("click", function(){
      var expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!expanded));
      mobileNav.hidden = expanded;
    });

    $all("a", mobileNav).forEach(function(a){
      a.addEventListener("click", function(){
        menuBtn.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
      });
    });
  }
})();
