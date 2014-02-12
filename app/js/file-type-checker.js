/*global Modernizr */
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


        function imgSwapper(test,fallback,imgContainerClass) {

            var imgCC = (typeof imgContainerClass !== 'undefined') ? imgContainerClass : 'image-replacement',
                imagesContainer = $('p.'+ imgCC),
                image = $(document.createElement( 'img' ));



            for (var i = imagesContainer.length; i--;) {

                // check to see if test is supported by browser
                if (Modernizr[test]) {
                    // if does, show supported image
                    image.attr('src',imagesContainer.data(test));
                    imagesContainer.append( image );
                } else {
                    // otherwise display fallback image
                    image.attr('src',imagesContainer.data(fallback));
                    imagesContainer.append( image );
                }
            }
        }


        (function(){

            var supportCheckList = [
                    'svg',
                    'webp'
                ],
                supportCheckListLength = supportCheckList.length;



            for (var i = supportCheckListLength; i--;) {

                var list = supportCheckList;
                if ( Modernizr[list[i]] ) {
                    console.log('Browser support for ' + list[i]);
                } else {
                    console.log('No browser support for ' + list[i]);
                }
            }






            imgSwapper('svg','png');

            imgSwapper('webp','jpg', 'swap-webp' );





        })();



    });




})(jQuery, this);

// Modernizr.load([{
//     if ( Modernizr.svg ) {
//         console.log('browser support for SVG');
//     } else {
//         console.log('no browser support for SVG');
//     }
// });
