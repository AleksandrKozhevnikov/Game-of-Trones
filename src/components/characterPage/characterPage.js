import React, {Component} from 'react';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import ErrorMessage from '../errorMessage';
import './characterPage.css';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';



export default class CharacterPage extends Component {

    state = {
        selectedChar: 130,
        error: false
    }

    gotService = new GotService();

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }


    render() {
        const {error} = this.state;

        if(error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList 
            onItemSelected={this.onItemSelected}
            getData={this.gotService.getAllCharacters}
            renderItem={({name, born}) => `${name} | (${born})`}
            />
        )

        const charDetails = (
            <CharDetails charId={this.state.selectedChar}>
                <Field field={'gender'} label={'Gender'}/>
                <Field field={'born'} label={'Born'}/>
                <Field field={'died'} label={'Died'}/>
                <Field field={'culture'} label={'Culture'}/>
            </CharDetails>
        )
        
        return (
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}
