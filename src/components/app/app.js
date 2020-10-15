import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';
import './app.css'


export default class App extends Component  {
    gotService = new GotService();

    state = {
        showRandomChar: true,
        error: false
    }
    
    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    
    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            } 
        })
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {

     
        const {error, showRandomChar} = this.state

        if(error) {
            return <ErrorMessage/>
        }

        const charBlock = showRandomChar ? <RandomChar/> : null
        
        return (
            <>
                <Container>
                    <Header />
                </Container>
                <button
                    className="toggle-btn"
                    onClick={this.toggleRandomChar}>Toggle random character
                </button>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {charBlock}
                        </Col>
                    </Row>
                    <CharacterPage/>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllBooks}
                                renderItem={({name, publisher}) => `${name} | (${publisher})`}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllHouses}
                                renderItem={({name, words}) => `${name} | (${words})`} 
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row> 
                </Container>
            </>
        );
    }

};

