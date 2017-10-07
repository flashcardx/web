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
        return newState;
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
        deckIds.forEach(deckId=>{
                if(state[deckId])//if deck was deleted will be undefined
                    decks.push(state[deckId]);
        });
        return decks;
    },
    getCards: (state, parentId)=>{
        if(!parentId){
            return null;
        }
    }


}
