(function ($, window, undefined) {
    'use strict';

    $(document).ready(function() {


        var images = $('img');

        images.each(function(i) {
            // console.log(images[i]);

            // Use a regular expression to trim everything before final dot
            // of the image src
            var extension = images[i].src.replace(/^.*\./, ''),
                $this = $(this);
            // console.log(extension);

            // this means that we can check if the image is svg, webp, or other

            if (extension === 'svg') {
                $this.addClass('image--svg');
            } else if (extension === 'webp') {
                $this.addClass('image--webp');
            } else {
                $this.addClass('image--normal');
            }


        });


    });

})(jQuery, this);
