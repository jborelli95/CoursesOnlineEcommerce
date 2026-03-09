/*!(function (o) {
  'use strict';
  o(document).ready(function () {
    var r = document.querySelector('.rbt-progress-parent path'),
      n = r.getTotalLength();
    ((r.style.transition = r.style.WebkitTransition = 'none'),
      (r.style.strokeDasharray = n + ' ' + n),
      (r.style.strokeDashoffset = n),
      r.getBoundingClientRect(),
      (r.style.transition = r.style.WebkitTransition = 'stroke-dashoffset 10ms linear'));
    function t() {
      var t = o(window).scrollTop(),
        e = o(document).height() - o(window).height();
      r.style.strokeDashoffset = n - (t * n) / e;
    }
    (t(), o(window).scroll(t));
    (jQuery(window).on('scroll', function () {
      50 < jQuery(this).scrollTop()
        ? jQuery('.rbt-progress-parent').addClass('rbt-backto-top-active')
        : jQuery('.rbt-progress-parent').removeClass('rbt-backto-top-active');
    }),
      jQuery('.rbt-progress-parent').on('click', function (t) {
        return (t.preventDefault(), jQuery('html, body').animate({ scrollTop: 0 }, 550), !1);
      }));
  });
})(jQuery);
*/
!function(o) {
  "use strict";
  o(document).ready(function() {

    var r = document.querySelector(".rbt-progress-parent path");

    // FIX: validar que exista el elemento
    if (!r) return;

    var n = r.getTotalLength();

    r.style.transition = r.style.WebkitTransition = "none";
    r.style.strokeDasharray = n + " " + n;
    r.style.strokeDashoffset = n;
    r.getBoundingClientRect();
    r.style.transition = r.style.WebkitTransition = "stroke-dashoffset 10ms linear";

    function t() {
      var scrollTop = o(window).scrollTop();
      var height = o(document).height() - o(window).height();
      r.style.strokeDashoffset = n - scrollTop * n / height;
    }

    t();
    o(window).scroll(t);

    jQuery(window).on("scroll", function() {
      if (jQuery(this).scrollTop() > 50) {
        jQuery(".rbt-progress-parent").addClass("rbt-backto-top-active");
      } else {
        jQuery(".rbt-progress-parent").removeClass("rbt-backto-top-active");
      }
    });

    jQuery(".rbt-progress-parent").on("click", function(e) {
      e.preventDefault();
      jQuery("html, body").animate({ scrollTop: 0 }, 550);
      return false;
    });

  });
}(jQuery);