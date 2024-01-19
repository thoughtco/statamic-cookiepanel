window.addEventListener('DOMContentLoaded', () => {

    const ConsentPanel = class {
        constructor(el) {
            if (! el) {
                console.error('Consent panel element not found');
                return;
            }

            this.panelElement = el;

            this.panelElement.addEventListener('click', this.clickAndInputHandler.bind(this));

            let selectedCategories = localStorage.getItem('consent_settings')?.split(',');

            [].forEach.call(this.panelElement.querySelectorAll('input[type="checkbox"]'), (el) => {
                if (selectedCategories && selectedCategories.includes(el.value)) {
                    el.checked = true;
                }
            });

            if (! selectedCategories) {
                this.panelElement.classList.add('open');
            }

            if (selectedCategories && ! selectedCategories.includes('functional')) {
                selectedCategories.push('functional');
            }

            this.updateScriptConsent(selectedCategories);
        }

        clickAndInputHandler (event) {
            let categoryEls = this.panelElement.querySelectorAll('input[type="checkbox"]');

            let attr = event.target.getAttribute('data-consentpanel');
            if (!attr) {
                return;
            }

            let autoClose = false;
            switch (attr) {
                case 'open':
                    this.panelElement.classList.add('open');
                    return;
                break;

                case 'close':
                    this.panelElement.classList.remove('open');
                break;

                case 'reject':
                    for (let i=0; i<categoryEls.length; i++) {
                        categoryEls[i].checked = false;
                    }

                    autoClose = true;
                break;

                case 'accept':
                    for (let i=0; i<categoryEls.length; i++) {
                        categoryEls[i].checked = true;
                    }

                    autoClose = true;
                break;
            }

            let selectedCategories = [];
            for (let i=0; i<categoryEls.length; i++) {
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
        }

        updateScriptConsent (categories) {
            [].forEach.call(document.querySelectorAll('[data-consentpanel-type]'), (el) => {
                let id = el.getAttribute('data-consentpanel-id');

                if (! id) {
                    return;
                }

                // consented
                if (categories.includes(el.getAttribute('data-consentpanel-type'))) {
                    if (! document.querySelector('[data-consentpanel-output="' + id + '"]')) {
                        let div = document.createElement('div');
                        div.innerHTML = el.innerHTML;

                        let fragment = document.createDocumentFragment();

                        for (const child of div.children) {
                            let newChild = document.createRange().createContextualFragment(child.outerHTML);
                            fragment.appendChild(newChild);
                        }

                        for (const child of fragment.children) {
                            child.setAttribute('data-consentpanel-ouput', id);
                        }

                        el.parentNode.appendChild(fragment);
                    }

                    return;
                }

                // not consented
                if (document.querySelector('[data-consentpanel-output="' + id + '"]')) {
                    [].forEach.call(document.querySelectorAll('[data-consentpanel-output="' + id + '"]'), (el) => {
                        el.parentNode.removeChild(el);
                    });
                }
            });
        }
    };

    window.ConsentPanel = new ConsentPanel(document.querySelector('.thoughtco-cookiepanel'));
});
