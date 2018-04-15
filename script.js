$(document).ready(function() {
    smoothScrollInit(300);
    keepAtTop('navbar', 100, -1);
});

function keepAtTop(elementId, amount, offset) {
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
        var element = document.getElementById(elementId),
        scroll = getScrollTop();

        if (scroll <= amount - offset) {
          element.style.top = amount+"px";
        }
        else {
          element.style.top = (scroll+offset)+"px";
        }
    };

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
                    // Checking offset top because of jumbotron's margin
                    scrollTop: target.offset().top <= 100 ? 0 : target.offset().top
                },
                {
                duration: scrollSpeed,
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