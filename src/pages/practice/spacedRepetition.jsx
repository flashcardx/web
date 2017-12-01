import React, {Component} from "react";
import Radium from "radium";
import config from "../../api_config";
import Page from "../../components/page.jsx";
import WhiteBar from "../../components/util/whiteBar.jsx";
import { Link } from 'react-router-dom';
import {getDeckName} from "../../actions/deck";
import {fetchSpacedRepetitionCards, rankCard} from "../../actions/practice";
import {successAlertGame, infoAlertGame, errorAlertGame} from "../../actions/alerts";
import {connect} from "react-redux";
import CircularProgress from 'material-ui/CircularProgress';
import _ from "lodash"
import Flashcard from "../../components/flashcard.jsx"
import Speaker from "../../components/util/speaker.jsx";
import Transition from 'react-transition-group/Transition';
import Fade from "../../components/util/fadeContent.jsx";
const WIN_SOUND_URL = config.urlSoundWin,
      LOSE_SOUND_URL = config.urlSoundLose,
      HIT_TRANSITION_TIME=500;

/*stage: 0 //loading, need to get more cards
  stage: 1 //show card without title
  stage: 2 //show result, real card(if user failed the answer), lasts until user clicks on continue
*/ 
class SpacedRepetition extends Component{
    
    constructor(props){
        super(props);
        this.state = {hit:null, playWin:false, playLose:false, deckName:"Cargando...", stage:0, points:0, cards:[], cardNameInput: ""};
        this.replaceDeckName = this.replaceDeckName.bind(this);
        this.getCards = this.getCards.bind(this);
        this.renderNextCard = this.renderNextCard.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.submitName = this.submitName.bind(this);
        this.showAnswer = this.showAnswer.bind(this);
        this.loadNextCard = this.loadNextCard.bind(this);
        this.playLose = this.playLose.bind(this);
        this.playWin = this.playWin.bind(this);
        this.renderSound = this.renderSound.bind(this);
    }

    componentDidMount(){
        this.replaceDeckName();
        this.getCards();
    }

    getCards(){
        var deckId;
        if(this.props.match.params.deckId !== "all")
            deckId = this.props.match.params.deckId;
        this.props.fetchSpacedRepetitionCards(deckId);
    }

    replaceDeckName(){
        if(this.props.match.params.deckId === "all")
            return this.setState({deckName:"Todos"});
        this.props.getDeckName(this.props.match.params.deckId);
    }

    showAnswer(){
        this.setState({stage:2});
    }

    playWin(){
        this.setState({playWin:true});
    }

    playLose(){
        this.setState({playLose:true});
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.deckName && nextProps.deckName !== this.state.deckName)
            this.setState({deckName: nextProps.deckName});
        if(nextProps.cards !== this.props.cards)
            this.setState({stage:1, cards: nextProps.cards});
        if(nextProps.cardRank !== this.props.cardRank){
            var newPoints = this.state.points + nextProps.cardRank.points;
            if(nextProps.cardRank.hit){
                this.setState({hit:nextProps.cardRank.hit});
                setTimeout(() => {
                    this.setState({points: newPoints});
                }, HIT_TRANSITION_TIME);
            }
            else
                this.setState({points: newPoints});
            switch (nextProps.cardRank.rank) {
                    case 5:  this.props.successAlertGame("Excelente");
                             this.playWin();
                             return this.loadNextCard();
                    case 3: this.props.infoAlertGame("Muy cerca");
                            this.playLose();
                            return this.showAnswer();
                    case 1: this.props.errorAlertGame("Incorrecto");
                            this.playLose();
                            return this.showAnswer();
                default:
                    return console.error("invalid rank: ", nextProps.cardRank.rank);
            }
        }
    }

    submitName(){
        const card = this.state.cards[0];
        this.props.rankCard(card._id, this.state.cardNameInput);
    }

    onNameChange(event){
        const newName = event.target.value
        this.setState({cardNameInput: newName}, ()=>{
        const card = this.state.cards[0];
        if(newName.toLowerCase() === card.name.toLowerCase())
            this.submitName();
        })
    }

    renderNextCard(practiceMode){
        const card = this.state.cards[0];
        if(practiceMode)
            return <Flashcard bigLoading={this.props.bigLoading} submitName={this.submitName} key={card._id} practice-stage={1} onNameChange={this.onNameChange} nameImput={this.state.cardNameInput} card={card}/>
        else
            return <Flashcard lang={card.deckId.lang} key={card._id} practice-stage={2} onContinue={this.loadNextCard} card={card}/>
    }

    loadNextCard(){
        var newCards = this.state.cards.slice();
        newCards.shift();
        if(_.isEmpty(newCards))
            this.setState({cards: newCards, stage:0, cardNameInput:""});
        else
             this.setState({cards: newCards, stage:1, cardNameInput:""});
    }

    renderSound(){
        if(this.state.playLose)
            return <Speaker
                        play={true}
                        src={LOSE_SOUND_URL}
                        onEnded={()=>this.setState({playLose:false})}
                    />
        if(this.state.playWin)
            return <Speaker
                        play={true}
                        src={WIN_SOUND_URL}
                        onEnded={()=>this.setState({playWin:false})}
                    />
        return  null;
    }

    render(){
        var hit;
        const sound = this.renderSound();
        var body = null;
        if(this.state.stage === 0){
            this.getCards();
            body =  <div className="row"><div  style={{textAlign: "center"}} className="col"><CircularProgress style={{margin:"auto"}} size={130} thickness={7} /></div></div>
        }
        else if(this.state.stage === 1){
            if(this.state.hit){
                setTimeout(() => {
                    this.setState({hit:null});
                }, 2400);
            }
            if(_.isEmpty(this.state.cards))
            body = <h2>En este momento no tenes fichas por practicar! vuelve en otro momento</h2>    
            else 
            body = <div className="row"><div  style={{textAlign: "center"}} className="col">{this.renderNextCard(true)}</div></div>;
        }
        else if(this.state.stage === 2){
            body = <div className="row"><div  style={{textAlign: "center"}} className="col">{this.renderNextCard(false)}</div></div>
        }
        return(
            <Page noWrap name="practice">
                 <WhiteBar>
                        <span className="col">Método: Repeticion espaceada <Link to="/practice"><i className="fa fa-pencil" aria-hidden="true"></i></Link></span>
                        <span className="col">Mazo: {this.state.deckName} <Link to="/practice/spaced-repetition"><i className="fa fa-pencil" aria-hidden="true"></i></Link></span>
                        <span style={{color:"#e5c100", fontWeight:"bold"}} className="col">
                            {this.state.points} Puntos 
                            <span style={{color:"red", fontWeight:"bold"}}>
                                <Fade inProp={this.state.hit!=null} duration={HIT_TRANSITION_TIME}>
                                    X{this.props.cardRank.hit} !
                                </Fade>
                            </span>
                        </span>
                </WhiteBar>
                <div className="container">
                  {sound}
                  {body}
                </div>
            </Page>
        )
    }
}

function mapStateToProps(state){
    return {
        deckName: state.deckName,
        cards: state.cardsToPractice,
        cardRank: state.practiceCardRank,
        bigLoading: state.bigLoading
    }
}

export default connect(mapStateToProps, {getDeckName, fetchSpacedRepetitionCards, rankCard, successAlertGame, infoAlertGame, errorAlertGame})(Radium(SpacedRepetition));