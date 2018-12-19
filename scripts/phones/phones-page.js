import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhonesSort from './components/phones-sort.js';
import PhonesSearch from './components/phones-search.js';
import ShoppingCart from './components/shopping-cart.js';

import PhoneService from './phone-service.js';

export default class PhonesPage {
    constructor({element}) {
        this._element = element;

        this._render();

        this._initCatalog();
        this._initViewer();
        this._initShoppingCart();
        this._initSort();
        this._initSearch();
    }

    _render() {
        this._element.innerHTML = `
            <div class="container-fluid">
            <div class="row">
          
              <!--Sidebar-->
              <div class="col-md-2">
                <section>
                  <div data-component="phones-search"></div>
                  <div data-component="phones-filter"></div>
                </section>
          
                <section>
                  <div data-component="shopping-cart"></div>
                </section>
              </div>
          
              <!--Main content-->
              <div class="col-md-10">
                <div data-component="phone-catalog" class="js-hidden"></div>
                <div data-component="phone-viewer" class="js-hidden"></div>
              </div>
            </div>
          </div>
        `;
    }

    _loadPhonesFromServer() {
        PhoneService.getPhones()
            .then((phones) => {
            this._catalog.show(phones)
        });
    }

    _initCatalog() {
        this._catalog = new PhoneCatalog({
            element: document.querySelector('[data-component="phone-catalog"]')
        });

        this._loadPhonesFromServer();

        this._catalog.subscribe('phoneSelected', (phoneId) => {
            PhoneService.getPhone(phoneId).then((phoneDetails) => {
                this._catalog.hide();
                this._viewer.show(phoneDetails);
            })
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
            this._loadPhonesFromServer();
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

    _initSort() {
        this._filter = new PhonesSort({
            element: this._element.querySelector('[data-component="phones-filter"]'),
        });

        this._filter.subscribe('sortChanged', (option) => {
            PhoneService._sortPhones(option).then((sortedPhones) => {
                this._catalog.show(sortedPhones);
            });
        })
    }

    _initSearch() {
        this._search = new PhonesSearch({
            element: this._element.querySelector('[data-component="phones-search"]'),
        });

        this._search.subscribe('searchInput', (inputValue) => {
            PhoneService._filterPhones(inputValue).then((filteredPhones) => {
                this._catalog.show(filteredPhones);
            });
        })
    }
}
