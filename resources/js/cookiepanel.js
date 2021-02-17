(function(){

    // Detect if user is on IE browser
    var isIE = !!window.MSInputMethodContext && !!document.documentMode;

    // ie requires promise + fetch polyfills
    if (isIE) {
        var promiseScript = document.createElement("script");
        promiseScript.type = "text/javascript";
        promiseScript.src =
            "https://cdn.jsdelivr.net/npm/promise-polyfill@8.1.3/dist/polyfill.min.js";

        var fetchScript = document.createElement("script");
        fetchScript.type = "text/javascript";
        fetchScript.src =
            "https://cdn.jsdelivr.net/npm/whatwg-fetch@3.4.0/dist/fetch.umd.min.js";

        document.head.appendChild(promiseScript);
        document.head.appendChild(fetchScript);
    }

    var cookiePanel;
    if (cookiePanel = document.querySelector('.thoughtco-cookiepanel')) {

        var clickAndInputHandler = function(event) {

			var target = event.target;
            var categoryEls = cookiePanel.querySelectorAll('input[type="checkbox"]');

            var attr = target.getAttribute('data-cookiepanel');
            if (!attr)
                return;

            var autoClose = false;
            switch (attr) {
                case 'open':
                    cookiePanel.classList.add('open');
                    return;
                break;

                case 'close':
                    cookiePanel.classList.remove('open');
                    return;
                break;

                case 'reject':
                    for (var i=0; i<categoryEls.length; i++)
                        categoryEls[i].checked = false;

                    autoClose = true;
                break;

                case 'accept':
                    for (var i=0; i<categoryEls.length; i++)
                        categoryEls[i].checked = true;

                    autoClose = true;
                break;
            }

            var selectedCategories = [];
            for (var i=0; i<categoryEls.length; i++)
                if (categoryEls[i].checked)
                    selectedCategories.push(categoryEls[i].value);

            var data = new FormData();
            data.append('_token', cookiePanel.querySelector('[name="_token"]').value);
            data.append('categories', selectedCategories.join(','));

            fetch('/!/statamic-cookiepanel', {
                method: 'POST',
    		    body: data,
    		    headers: {
    		        'X-Requested-With': 'XMLHttpRequest'
    		    },
            });

            if (autoClose)
                cookiePanel.classList.remove('open');

        };

        cookiePanel.addEventListener('click', clickAndInputHandler);
    }

}());
