const CLASS_HIDDEN = 'js-hidden';

export default class Component {
    constructor({ element }) {
        this._element = element;
    }

    hide() {
        this._element.classList.add(CLASS_HIDDEN);
    }

    show() {
        this._element.classList.remove(CLASS_HIDDEN);
    }

    subscribe (eventName, callback) {
        this._element.addEventListener(eventName, (event) => {
            callback(event.detail);
        });
    }

    emit(eventName, eventData) {
        const event = new CustomEvent(eventName, {
            detail: eventData
        });

        this._element.dispatchEvent(event);
    }

    _on(eventName, elementName, callback) {
        this._element.addEventListener(eventName, (event) => {
            let delegateTarget = event.target.closest(`[data-element="${elementName}"]`);

            if(!delegateTarget) {
                return;
            }

            callback(event);
        })
    }

    throttle(f, delay) {
        let timer = null;
        let chachedArgs = null;
        let chachedContext = null;

        return function wrapper(...args) {

            if (timer) {
                chachedArgs = args;
                chachedContext = self;

                return;
            }

            timer = setTimeout(function () {
                timer = null;

                if(chachedArgs && chachedContext) {
                    wrapper.apply(chachedContext, chachedArgs);
                    chachedArgs = null;
                    chachedContext = null;
                }
            }, delay);

            return f.apply(this, args);
        }
    }
}