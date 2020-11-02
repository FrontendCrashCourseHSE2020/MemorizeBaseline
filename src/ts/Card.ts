import "../styles/card.less";

let fileContent: string = require('raw-loader!../html/card.html').default;

export class Card {

    icon: string;

    showFront: boolean = true;

    element: JQuery<HTMLElement>;

    callback: (card: Card) => void;

    removed: boolean = false;

    constructor(icon: string,
                document: Document,
                callback: (card: Card) => void) {
        this.icon = icon;
        this.callback = callback;

        this.element = $(fileContent);

        this.element.addClass("show-front");

        this.element.find("i").addClass(icon);

        this.element.click(() => {
            if (this.removed) {
                return;
            }

            this.flipCard();
        });

        let gameField = $(document).find("#game-field");
        gameField.append(this.element);
    }

    flipCard() {
        this.showFront = !this.showFront;

        if (this.showFront) {
            this.element.addClass("show-front");
        } else {
            this.element.removeClass("show-front");
        }

        setTimeout(() => {
            this.callback(this);
        }, 500);
    }

    remove() {
        this.removed = true;
        this.element.removeClass("show-front");
        this.element.addClass("removed")
    }

    hide() {
        this.showFront = true;
        this.element.addClass("show-front");
    }

}
