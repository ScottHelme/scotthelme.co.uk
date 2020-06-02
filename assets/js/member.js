        // Parse the URL parameter
        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        // Give the parameter a variable name
        var action = getParameterByName('action');
        var stripe = getParameterByName('stripe');

        $(document).ready(function () {
            if (action == 'subscribe') {
                $('body').addClass("subscribe-success");
            }
            if (action == 'signup') {
                window.location = 'https://scotthelme.ghost.io/signup/?action=checkout';
            }
            if (action == 'checkout') {
                $('body').addClass("signup-success");
            }
            if (action == 'signin') {
                $('body').addClass("signin-success");
            }
            if (stripe == 'success') {
                $('body').addClass("checkout-success");
            }
            if (stripe == 'billing-update-success') {
                $('body').addClass("billing-success");
            }
            if (stripe == 'billing-update-cancel') {
                $('body').addClass("billing-cancel");
            }

            $('.notification-close').click(function () {
                $(this).parent().addClass('closed');
                var uri = window.location.toString();
                if (uri.indexOf("?") > 0) {
                    var clean_uri = uri.substring(0, uri.indexOf("?"));
                    window.history.replaceState({}, document.title, clean_uri);
                }
            });

            // Reset form on opening subscription overlay
            $('.subscribe-button').click(function() {
                $('.subscribe-overlay form').removeClass();
                $('.subscribe-email').val('');
            });

            // Account navigation menu
            $('.account-menu-avatar').click(function(event) {
                $(this).toggleClass('active');
                event.stopPropagation();
            });

            $('.account-menu-dropdown').click(function(event) {
                event.stopPropagation();
            });

            $('body').click(function () {
                $('.account-menu-avatar').removeClass('active');
            });
        });