var top_amount_px = 60;
var offset = -1;
var scrollSpeed = 300;

$(document).ready(function() {
    smoothScrollInit();
    keepAtTop();
});

function getScrollTop() {
    if (typeof window.pageYOffset !== 'undefined' ) {
      // Most browsers
      return window.pageYOffset;
    }

    var d = document.documentElement;
    if (d.clientHeight) {
      // IE in standards mode
      return d.scrollTop;
    }

    // IE in quirks mode
    return document.body.scrollTop;
}

function updatePos() {
    var element = document.getElementById('navbar'),
    scroll = getScrollTop();

    if (scroll <= top_amount_px - offset) {
      element.style.top = top_amount_px+"px";
    }
    else {
      element.style.top = (scroll+offset)+"px";
    }
};

function keepAtTop() {
    updatePos();
    window.onscroll = updatePos;
}

function smoothScrollInit(scrollSpeed) {
    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
            ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $("html, body").animate({
                    // Checking offset top because of margins and navbar
                    scrollTop: target.offset().top <= 10 ? 0 : target.offset().top - 80
                },
                {
                duration: scrollSpeed,
                progress: updatePos,
                queue: false
                },
                function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    }
                }
                );
            }
        }
    });
  }