import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhonesFilter from './components/phones-filter.js';
import ShoppingCart from './components/shopping-cart.js';

import PhoneService from './phone-service.js';

export default class PhonesPage {
    constructor ({element}) {
        this._element = element;

        this._render();

        this._initCatalog();
        this._initViewer();
        this._initShoppingCart();
        this._initFilters();
    }

    _render() {
        this._element.innerHTML = `
            <div class="container-fluid">
            <div class="row">
          
              <!--Sidebar-->
              <div class="col-md-2">
                <section>
                  <div data-component="phones-filter"></div>
                </section>
          
                <section>
                  <div data-component="shopping-cart"></div>
                </section>
              </div>
          
              <!--Main content-->
              <div class="col-md-10">
                <div data-component="phone-catalog"></div>
                <div data-component="phone-viewer" class="js-hidden"></div>
              </div>
            </div>
          </div>
        `;
    }

    _initCatalog() {
        this._catalog = new PhoneCatalog({
            element: document.querySelector('[data-component="phone-catalog"]'),
            phones: PhoneService.getPhones()
        });

        this._catalog.subscribe('phoneSelected', (phoneId) => {
            let phoneDetails = PhoneService.getPhone(phoneId);
            this._catalog.hide();
            this._viewer.show(phoneDetails);
        });

        this._catalog.subscribe('add', (phoneId) => {
            this._shoppingCart.addItem(phoneId);
        });
    }

    _initViewer() {
        this._viewer = new PhoneViewer({
            element: document.querySelector('[data-component="phone-viewer"]')
        });

        this._viewer.subscribe('back', () => {
            this._viewer.hide();
            this._catalog.show();
        });

        this._viewer.subscribe('add', (phoneId) => {
            this._shoppingCart.addItem(phoneId);
        })
    }

    _initShoppingCart() {
        this._shoppingCart = new ShoppingCart({
            element: this._element.querySelector('[data-component="shopping-cart"]'),
        });
    }

    _initFilters() {
        this._filter = new PhonesFilter({
            element: this._element.querySelector('[data-component="phones-filter"]'),
        });
    }
}
