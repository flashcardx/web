import _ from "lodash";
import React from "react";

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

export default {
        insertDecks: (state, decks, parentId)=>{
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
                    if(newState.children.indexOf(deck._id) == -1)
                        newState.children.push(deck._id);
                }
                else if(newState[parentId].children.indexOf(deck._id) == -1)
                        newState[parentId].children.push(deck._id); 
            });
            console.log("after insert decks, state is: ", newState);
        return newState;
    },
    insertNewDeck: (state, deck, parentId)=>{
        var newState = {};
        if(!parentId)
            state.children.unshift(deck._id);
        else 
            state[parentId].children.unshift(deck._id);
        newState[deck._id] = deck;
        return {...newState, ...state};
    },
    deleteDeck:(state, deckId)=>{
    // deck is not deleted fron children array, the component should
    // re fetch the parent decks before diplaying them
    var newState = {...state};
    delete newState[deckId];
    return newState;
    },
    getDecks:(state, parentId)=>{
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
    },
    getCards: (state, deckId)=>{
        console.log("state: ", state);
        if(!deckId || !state[deckId].cards){
            return [];
        }
        var cards = []
        _.forEach(state[deckId].cards, card=>{
            cards.push(card);
        });
        console.log("cards: ", cards);
        return cards;
    },
    insertNewCard: (state, card, deckId)=>{
        if(!deckId){
            console.error("insert new card didn't get deckId");    
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
    },
    insertMoreCards: (state, cards, deckId)=>{
        if(!cards)
            return state;
        if(!deckId){
            console.error("insert new cards didn't get deckId");    
            return state;
        }
        var newState = _.clone(state);
        if(!newState[deckId].cards)
            newState[deckId].cards = {};
        cards.forEach(card=>{
            newState[deckId].cards[card._id] = card;
        });
        return newState;
    }


}
