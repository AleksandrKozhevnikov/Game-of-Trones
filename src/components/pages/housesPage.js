import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';



export default class HousesPage extends Component {

    state = {
        selectedHouse: 2,
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
            selectedHouse: id
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
            getData={this.gotService.getAllHouses}
            renderItem={({name, region}) => `${name} | (${region})`}
            />
        )

        const itemDetails = (
            <ItemDetails 
                itemId={this.state.selectedHouse}
                itemType={'house'}
                >
                <Field field={'region'} label={'Region'}/>
                <Field field={'words'} label={'Words'}/>
                <Field field={'titles'} label={'Titles'}/>
                <Field field={'ancestralWeapons'} label={'ancestraWeapons'}/>
                
            </ItemDetails>
        )
        
        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}
