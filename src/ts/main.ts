import "./app-thirdparty";
import {Card} from "./Card";

$(document).ready(function () {
    function shuffle(array: string[]): string[] {
        return array
            .map((a) => ({sort: Math.random(), value: a}))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value);
    }

    let icons = ['fa-apple', 'fa-docker', 'fa-ebay', 'fa-discord',
        'fa-d-and-d', 'fa-d-and-d-beyond', 'fa-critical-role', 'fa-github',
        'fa-linux', 'fa-jenkins', 'fa-pied-piper-alt', 'fa-yandex'];

    icons = shuffle(icons).slice(0, 8);

    let length = icons.length;
    for (let i = 0; i < length; i++) {
        icons.push(icons[i]);
    }

    icons = shuffle(icons);

    let lastCard:Card = null;

    for (let i = 0; i < icons.length; i++) {
        let card = new Card(icons[i], document, function (card) {
            if (!lastCard) {
                lastCard = card;
                return;
            }
            if (lastCard.icon==card.icon&&lastCard.id!=card.id) {
                card.hideCard();
                lastCard.hideCard();
                return;
            }
            card.flipCardSilently();
            lastCard.flipCardSilently();
            lastCard = null;
        }, i);
    }
});