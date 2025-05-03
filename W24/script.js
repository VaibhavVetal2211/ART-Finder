$(document).ready(function() {
    // Add smooth scroll behavior
    $('html, body').css({
        'scroll-behavior': 'smooth'
    });

    // Animate movie cards on page load
    $('.movie-card').each(function(index) {
        $(this).css({
            'opacity': '0',
            'transform': 'translateY(20px)'
        }).delay(index * 200).animate({
            'opacity': '1',
            'transform': 'translateY(0)'
        }, 800);
    });

    // Add hover effect for movie posters
    $('.movie-card').hover(
        function() {
            $(this).find('.movie-poster img').css('transform', 'scale(1.05)');
        },
        function() {
            $(this).find('.movie-poster img').css('transform', 'scale(1)');
        }
    );

    // Add click effect to show/hide review
    $('.movie-info h2').click(function() {
        $(this).closest('.movie-card').find('.review').slideToggle(300);
    });

    // Add smooth scroll to top button
    $('<button>')
        .addClass('scroll-top')
        .text('↑')
        .css({
            'position': 'fixed',
            'bottom': '20px',
            'right': '20px',
            'background': '#2c3e50',
            'color': 'white',
            'border': 'none',
            'border-radius': '50%',
            'width': '40px',
            'height': '40px',
            'font-size': '20px',
            'cursor': 'pointer',
            'display': 'none',
            'z-index': '1000'
        })
        .appendTo('body')
        .click(function() {
            $('html, body').animate({scrollTop: 0}, 800);
        });

    // Show/hide scroll to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.scroll-top').fadeIn();
        } else {
            $('.scroll-top').fadeOut();
        }
    });
}); 