import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RoundsMode from './RoundsMode.js';
import RoundsTable from './RoundsTable.js';
import RoundForm from './RoundForm.js';
import FloatingButton from './FloatingButton.js'
import BadgesInfoFloatingButton from './BadgesInfoFloatingButton.js';
import firstRound from '../images/firstRound.png'
import secondRound from '../images/secondRound.png'
import thirdRound from '../images/thirdRound.png'

class RoundsPage extends React.Component {
    constructor(props) {
        super(props);
        //this.checkBadges();
        this.state = {
            mode: RoundsMode.ROUNDSTABLE,
            deleteId: -1,
            editId: -1,
            badgeNum: -1
        };
       // var numStrokes = this.props.getNumStrokes();
        //alert(this.props.numStrokes);
    }

    setMode = (newMode) => {
        this.setState({ mode: newMode });
    }

    initiateEditRound = (val) => {
        this.setState({
            editId: val,
            mode: RoundsMode.EDITROUND
        },
            this.props.toggleModalOpen);
        this.props.passEditId(val);
    }

    initiateDeleteRound = (val) => {
        this.props.deleteRound(val);
        this.setState({ deleteId: val })
        //() => alert("Confirm delete!"));
    }

    checkBadges = () => {
        //alert(this.props.rounds.length == 1);
        if(this.props.rounds.length == 1){
            this.setState({badgeNum: 1});
        }
        else if(this.props.rounds.length == 2){
            this.setState({badgeNum: 2});
        }
        else if(this.props.rounds.length == 3){
            this.setState({badgeNum: 3});
        }
        alert(this.state.badgeNum);
    }
    render() {
        switch (this.state.mode) {
            case RoundsMode.ROUNDSTABLE:
                return (                 
                    <>
                        <RoundsTable rounds={this.props.rounds}
                            initiateDeleteRound={this.initiateDeleteRound}
                            deleteRound={this.props.deleteRound}
                            deleteId={this.state.deleteId}
                            initiateEditRound={this.initiateEditRound}
                            updateRound={this.props.updateRound}
                            setMode={this.setMode}
                            toggleModalOpen={this.props.toggleModalOpen}
                            menuOpen={this.props.menuOpen} />
                              <h3> Your badge(s): </h3>
                              <div>
                {this.props.rounds.length == 1 ? <img src={firstRound} className='badgeImg' /> : null}
                {this.props.rounds.length == 2 ? <img src={secondRound} className='badgeImg' /> : null}
                {this.props.rounds.length == 3 ? <img src={thirdRound} className='badgeImg' /> : null}
                </div>
                        <BadgesInfoFloatingButton />
                        <FloatingButton
                            icon="calendar"
                            label={"Log Round"}
                            menuOpen={this.props.menuOpen}
                            action={() => this.setState({ mode: RoundsMode.LOGROUND },
                                this.props.toggleModalOpen)} />
                    </>
                );
            case RoundsMode.LOGROUND:
                return (
                    <RoundForm
                        rounds= {this.props.rounds} 
                        mode={this.state.mode}
                        roundData={null}
                        saveRound={this.props.addRound}
                        setMode={this.setMode}
                        toggleModalOpen={this.props.toggleModalOpen} />
                );
            case RoundsMode.EDITROUND:
                return (
                    <RoundForm mode={this.state.mode}
                        editId={this.state.editId}
                        roundData={this.props.rounds[this.state.editId]}
                        saveRound={this.props.updateRound}
                        setMode={this.setMode}
                        toggleModalOpen={this.props.toggleModalOpen} />
                );
        }
    }

}

export default RoundsPage;