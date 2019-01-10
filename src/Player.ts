
import { IProjectCard } from "./cards/IProjectCard";
import { CorporationCard } from "./CorporationCard";
import { CardDiscount } from "./CardDiscount";
import { Tags } from "./cards/Tags";
import { PlayerInput } from "./PlayerInput";

const utilities = require("./utilities");

export class Player {
    public id: string = utilities.generateUUID();

    public corporationCardsDealt: Array<CorporationCard> = [];
    public corporationCard: CorporationCard | undefined = undefined;

    public megaCredits: number = 0;
    public megaCreditProduction: number = 0;
    public steel: number = 0;
    public titanium: number = 0;
    public energy: number = 0;
    public steelProduction: number = 0;
    public titaniumProduction: number = 0;
    public energyProduction: number = 0;
    public heat: number = 0;
    public heatProduction: number = 0;
    public onCardSelected: Function | undefined;
    public plants: number = 0;
    public plantProduction: number = 0;
    public cardsInHand: Array<IProjectCard> = [];
    public playedCards: Array<IProjectCard> = [];
    public color: string | undefined;
    private cardDiscounts: Array<CardDiscount> = [];
    public terraformRating: number = 20;
    public victoryPoints: number = 0;
    public addAnimalsToCard(card: IProjectCard, count: number): void {
        if (card.animals === undefined) {
            card.animals = 0;
        }
        card.animals += count;
    }
    public addCardDiscount(discount: CardDiscount): void {
        this.cardDiscounts.push(discount);
    }
    public removeCardDiscount(discount: CardDiscount): void {
        for (var i = 0; i < this.cardDiscounts.length; i++) {
            if (this.cardDiscounts[i] === discount) {
                this.cardDiscounts.splice(i, 1);
                return;
            }
        }
        throw "Did not find card discount.";
    }
    public getTagCount(tag: Tags): number {
        let tagCount = 0;
        this.playedCards.forEach((card: IProjectCard) => {
            tagCount += card.tags.filter((cardTag) => cardTag === tag).length;
        });
        tagCount += this.corporationCard.tags.filter((cardTag) => cardTag === tag).length;
        return tagCount;
    }
    public getCard(cardName: string): IProjectCard {
        const foundCards = this.cardsInHand.filter((card) => card.name === cardName);
        if (foundCards.length === 0) {
            throw "Card not found";
        }
        return foundCards[0];
    }
    public cardPlayedEvents: Array<Function> = [];
    public addCardPlayedHandler(handler: Function): void {
        this.cardPlayedEvents.push(handler);
    } 

    private waitingFor?: PlayerInput;

    public setWaitingFor(input: PlayerInput | undefined, inputHandler?: Function): void {
        if (input === undefined) {
            this.waitingFor = undefined;
            return;
        }
        if (this.waitingFor !== undefined) {
            throw "Already waiting on input from player";
        }
        this.waitingFor = input;
    }

}
