window.addEventListener('DOMContentLoaded', () => {

    const ConsentPanel = class {
        panelElement: null,

        constructor(el) {
            if (el) {
                console.error('Consent panel element not found');
                return;
            }

            this.panelElement = el;

            this.panelElement.addEventListener('click', this.clickAndInputHandler);

            let selectedCategories = localStorage.getItem('consent_settings')?.split(',');

            [].forEach.call(this.panelElement.querySelectorAll('input[type="checkbox"]'), (el) => {
                if (selectedCategories.includes(el.value)) {
                    el.checked = true;
                }
            });

            this.updateScriptConsent(selectedCategories);
        },

        clickAndInputHandler: (event) => {

			var target = event.target;

            // if we are a checkbox
            if (target.closest('.toggler')) {
                return;
            }

            var categoryEls = this.panelElement.querySelectorAll('input[type="checkbox"]');

            var attr = target.getAttribute('data-consentpanel');
            if (!attr) {
                return;
            }

            var autoClose = false;
            switch (attr) {
                case 'open':
                    this.panelElement.classList.add('open');
                    return;
                break;

                case 'close':
                    this.panelElement.classList.remove('open');
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
            for (var i=0; i<categoryEls.length; i++) {
                if (categoryEls[i].checked) {
                    selectedCategories.push(categoryEls[i].value);
                }
            }

            localStorage.setItem('consent_settings', selectedCategories.join(','));

            if (autoClose) {
                this.panelElement.classList.remove('open');
            }

            window.dispatchEvent(new CustomEvent('statamic-consentpanel:consent-changed', {
                detail: {
                    categories: selectedCategories,
                }
            }));
        },

        updateScriptConsent: (categories) => {
            [].forEach.call(document.querySelectorAll('[data-consentpanel-consent-type]'), (el) => {
                let id = el.getAttribute('data-consentpanel-id');

                if (! id) {
                    return;
                }

                // consented
                if (categories.includes(el.getAttribute('data-consentpanel-consent-type'))) {
                    if (! document.querySelector('[data-consentpanel-output="' + id + '"]') {
                        for (const child of el.children) {
                            let newChild = child.cloneNode(true);
                            newChild.setAttribute('data-consentpanel-ouput', id);
                            el.insertAdjacentHTML(newChild);
                        }
                    }

                    return;
                }

                // not consented
                if (document.querySelector('[data-consentpanel-output="' + id + '"]') {
                    [].forEach.call(document.querySelectorAll('[data-consentpanel-output="' + id + '"]'), (el) => {
                        el.parentNode.removeChild(el);
                    });
                }
            });
        },
    };

    window.ConsentPanel = new ConsentPanel(document.querySelector('.thoughtco-cookiepanel'));
});
