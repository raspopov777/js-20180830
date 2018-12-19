import Component from '../component.js';

export default class PhoneSearch extends Component {
    constructor({ element }) {
        super({ element });
        this._render();

        this.inputHandlerWithDelay = super.throttle(function(data) {
            this.emit('searchInput', data)
        }.bind(this), 200);

        this._on('input', 'search', (event) => {
            this.inputHandlerWithDelay(event.target.value);
        })
    }

    _render() {
        this._element.innerHTML = `
      <p>
        Search:
        <input data-element="search" type="text">
      </p>
    `;
    }
}