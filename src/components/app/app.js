import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import {BooksPage, CharacterPage, HousesPage} from '../pages'
import {BrowserRouter as Router, Route} from 'react-router-dom';
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

    render() {

     
        const {error, showRandomChar} = this.state

        if(error) {
            return <ErrorMessage/>
        }

        const charBlock = showRandomChar ? <RandomChar timeInterval={5000}/> : null
        
        return (
            <Router>
                <div className="app">
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

                        <Route path='/' exact component={CharacterPage}/>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousesPage}/>
                        <Route path='/books' exact component={BooksPage}/>
                        
                    </Container>
                </div>
            </Router>
        );
    }

};

