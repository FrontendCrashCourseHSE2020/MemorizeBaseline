import "../styles/card.less";

let fileContent: string = require('raw-loader!../html/card.html').default;

export class Card {

    icon: string;

    id: number;

    showFront: boolean = true;

    element: JQuery<HTMLElement>;

    callback: (card: Card) => void;

    constructor(icon: string,
                document: Document,
                callback: (card: Card) => void,
                id: number) {

        this.icon = icon;
        this.callback = callback;
        this.id = id;

        this.element = $(fileContent);

        this.element.addClass("show-front");

        this.element.find("i").addClass(icon);

        this.element.click(() => {
            this.flipCard();
        });

        let gameField = $(document).find("#game-field");
        gameField.append(this.element);
    }

    hideCard() {
        this.element.addClass("hidden");
    }

    flipCard() {
        this.showFront = !this.showFront;
        this.callback(this);

        if (this.showFront) {
            this.element.addClass("show-front");
        } else {
            this.element.removeClass("show-front");
        }
    }
    flipCardSilently() {
        this.showFront = !this.showFront;
        if (this.showFront) {
            this.element.addClass("show-front");
        } else {
            this.element.removeClass("show-front");
        }
    }
}