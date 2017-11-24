import _ from "lodash";

/*
    HOW USER DECK STRUCTURE LOOKS LIKE I THE REDUX STORE?

    STATE = {
        CHILDREN:[ID1,ID2], //ID OF DECKS AT ROOT
        ID1:{
            NAME: "xxzx",
            DESCRIPTION:"EDRDR",
            LANG="ES",//AND ALL DECK INFO
            CARDS:{
                IDCARD1:{...},
                IDCARD2:{...}
            },
            CHILDREN:[ID3]
        },
        ID2:{
            ...
        },
        ID3:{
            ...
        }
    }
*/

function insertDecks(state, decks, parentId){
        var newState = {...state};
        if(!parentId){
            if(!newState.children)
                newState.children = [];
        }
        else{
            if(!newState[parentId].children)
                newState[parentId].children = [];
        }
        decks.forEach(deck=>{
                newState[deck._id] = deck;
                newState[deck._id].children = [];
                if(!parentId){
                    if(newState.children.indexOf(deck._id) === -1)
                        newState.children.push(deck._id);
                }
                else if(newState[parentId].children.indexOf(deck._id) === -1)
                        newState[parentId].children.push(deck._id); 
            });
        return newState;
};

function insertNewDeck(state, deck, parentId){
        var newState = {};
        if(!parentId)
            state.children.unshift(deck._id);
        else 
            state[parentId].children.unshift(deck._id);
        newState[deck._id] = deck;
        return {...newState, ...state};
};

function replaceDeck(state, deck, parentId){
        var newState = {...state};
        newState[deck._id] = deck;
        return newState;
};

function deleteDeck(state, deckId){
        // deck is not deleted fron children array, the component should
        // re fetch the parent decks before diplaying them
        var newState = {...state};
        delete newState[deckId];
        return newState;
};

function deleteFlashcard(state, deckId, flashcardId){
        var newState = {...state};
        delete newState[deckId].cards[flashcardId];
        return newState;
};
    
 function getDecks(state, parentId){
        var decks = [];
        var deckIds;
        if(!parentId)
            deckIds = state.children;
        else
            deckIds = state[parentId].children;
        if(!deckIds)
            return [];
        deckIds.forEach(deckId=>{
                if(state[deckId])//if deck was deleted will be undefined
                    decks.push(state[deckId]);
        });
        return decks;
};
   
function getCards(state, deckId){
        if(!deckId || !state[deckId].cards){
            return [];
        }
        var cards = []
        _.forEach(state[deckId].cards, card=>{
            cards.push(card);
        });
        return cards;
};
  
function insertNewCard(state, card, deckId){
        if(!deckId){
            return state;
        }
        var newState = _.clone(state);
        if(!newState[deckId].cards)
            newState[deckId].cards = {};
        var newCards = {};
        newCards[card._id] = card;
        newState[deckId].cards = {
            ...newCards, ...newState[deckId].cards
        }        
        return newState;
};

function replaceCard(state, card, deckId){
        if(!deckId){
            return state;
        }
        var newState = _.clone(state);
        newState[deckId].cards[card._id] = card;
        return newState;
};
    
function insertMoreCards(state, cards, deckId){
        if(!cards)
            return state;
        if(!deckId){
            return state;
        }
        var newState = _.clone(state);
        if(!newState[deckId].cards)
            newState[deckId].cards = {};
        cards.forEach(card=>{
            newState[deckId].cards[card._id] = card;
        });
        return newState;
};

function getLang(decks, deckId){
        return decks[deckId].lang;
};

function moveCard(state, cardId, oldDeckId, newDeckId){
        var card = state[oldDeckId].cards[cardId];
        delete state[oldDeckId].cards[cardId];
        card.deckId = newDeckId;
        return insertNewCard(state, card, newDeckId);
}





export default {
    insertDecks: insertDecks,
    insertNewDeck: insertNewDeck,
    replaceDeck: replaceDeck,
    deleteDeck: deleteDeck,
    deleteFlashcard: deleteFlashcard,
    getDecks: getDecks,
    getCards: getCards,
    insertNewCard: insertNewCard,
    replaceCard: replaceCard,
    insertMoreCards: insertMoreCards,
    getLang: getLang,
    moveCard: moveCard
}
