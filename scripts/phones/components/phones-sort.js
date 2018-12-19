import Component from '../component.js';

export default class PhoneSort extends Component {
    constructor({ element }) {
        super({ element });
        this._render();

        this._on('change', 'sort-select', (event) => {
            var target = event.target;
            this.emit('sortChanged', target.options[target.selectedIndex].value)
        })
    }

    _render() {
        this._element.innerHTML = `
      <p>
        Sort by:
        <select data-element="sort-select">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    `;
    }
}