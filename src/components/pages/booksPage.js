import React, {Component} from 'react';
import ItemList from '../../components/itemList';
import ItemDetails, {Field} from '../../components/itemDetails';
import ErrorMessage from '../../components/errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../../components/rowBlock';



export default class BooksPage extends Component {

    state = {
        selectedBook: 2,
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
            selectedBook: id
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
            getData={this.gotService.getAllBooks}
            renderItem={({name, publisher}) => `${name} | (${publisher})`}
            />
        )

        const itemDetails = (
            <ItemDetails 
                itemId={this.state.selectedBook}
                itemType={'book'}
                >
                <Field field={'released'} label={'Released'}/>
                <Field field={'numberOfPages'} label={'Pages'}/>
                <Field field={'publisher'} label={'Publisher'}/>
            </ItemDetails>
        )
        
        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}
