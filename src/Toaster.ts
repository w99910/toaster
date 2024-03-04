import anime from 'animejs/lib/anime.es.js';

export const info = `<svg class="w-full h-full " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>`

export const error = `<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`

export const success = `<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>`

export const warning = `<svg class='w-full h-full' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`


let instance;

export default class Toaster {
    protected element: HTMLElement;
    protected messageElement: HTMLElement;
    protected iconElement: HTMLElement;

    constructor(element: HTMLElement) {
        this.element = element;
        instance = this;
        this.prepareToast();
    }

    protected config = {
        success: {
            icon: success,
            bgColor: '#57cc99',
            textColor: '#333333'
        },
        warning: {
            icon: warning,
            bgColor: '#ffd166',
            textColor: '#1e1e1e'
        },
        error: {
            icon: error,
            bgColor: '#e56b6f',
            textColor: '#f6f6f6'
        },
        info: {
            icon: info,
            bgColor: '#4361ee',
            textColor: '#ffffff'
        }
    };

    public setConfigOfType(type: String, config: Object) {
        if (!this.config.hasOwnProperty(type as PropertyKey)) {
            return false;
        }
        Object.keys(config).forEach((key) => {
            if (this.config[type as PropertyKey].hasOwnProperty(key as PropertyKey)) {
                this.config[type as PropertyKey][key] = config[key];
            }
        })
        return this;
    }

    protected setStylesToParent() {
        const setStyleIfNotSet = (attribute, value) => {
            if (!this.element.style[attribute]) {
                this.element.style[attribute] = value;
            }
        }
        setStyleIfNotSet('position', 'fixed');
        setStyleIfNotSet('top', '2vh');
        setStyleIfNotSet('right', '1vw');
        setStyleIfNotSet('zIndex', '9999');
        setStyleIfNotSet('borderRadius', '5px');
        setStyleIfNotSet('padding', '10px');
        setStyleIfNotSet('transform', 'translateX(30%)');
        setStyleIfNotSet('opacity', '0');
        setStyleIfNotSet('boxShadow', '0 0 10px rgba(0,0,0,0.2)');
        setStyleIfNotSet('display', 'flex');
        setStyleIfNotSet('alignItems', 'center');
        setStyleIfNotSet('color', 'white');
        setStyleIfNotSet('border', '0.2px solid white');
    }

    protected prepareIconElement() {
        this.iconElement = document.createElement('div');
        this.iconElement.style.padding = '5px';
        this.iconElement.style.width = '2rem';
        this.iconElement.style.height = '2rem';
        this.element.appendChild(this.iconElement);
    }

    protected prepareMessageElement() {
        this.messageElement = document.createElement('div');
        this.messageElement.style.padding = '5px';
        this.element.appendChild(this.messageElement);
    }

    protected prepareToast() {
        this.setStylesToParent();
        this.prepareIconElement();
        this.prepareMessageElement();
    }

    protected appendRelatedIcon(type) {
        if (!type) type = 'info';
        this.element.style.backgroundColor = this.config[type].bgColor;
        this.element.style.color = this.config[type].textColor;
        this.iconElement.innerHTML = this.config[type].icon;
    }

    static toast(message, type, duration = 2000) {
        if (!instance) {
            throw new Error('Toaster not initialized');
        }
        instance.messageElement.innerText = message;
        instance.appendRelatedIcon(type);
        instance.element.style.zIndex = 2147484002;
        anime({
            targets: instance.element,
            translateX: 0,
            opacity: 1,
            easing: 'easeOutExpo',
            complete: function (anim) {
                anime({
                    targets: instance.element,
                    translateX: '30%',
                    easing: 'easeOutExpo',
                    opacity: 0,
                    duration: 800,
                    delay: duration, // in milliseconds,
                    complete: function () {
                        instance.element.style.zIndex = -1;
                    }
                });
            }
        });
    }
}
