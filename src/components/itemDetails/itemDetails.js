import React, {Component} from 'react';
import './itemDetails.css';
import gotService from '../../services/gotService';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
}

export default class ItemDetails extends Component {
    
    gotService = new gotService();

    state = {
        item: null
    }

    componentDidMount() {
        this.updateItem()
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }
    updateItem() {

        const {itemId, itemType} = this.props;

        if(!itemId) {
            return;
        }

        if (itemType === 'character') {
            this.gotService.getCharacter(itemId)
            .then((item) => {
                this.setState({item})
            })
        }

        if (itemType === 'book') {
            this.gotService.getBook(itemId)
            .then((item) => {
                this.setState({item})
            })
        }

        if (itemType === 'house') {
            this.gotService.getHouse(itemId)
            .then((item) => {
                this.setState({item})
            })
        }

        
    }
    render() {
      
        if (!this.state.item) {
            return <span className="select_error">Please, select item in the list</span>
        }

        const {item} = this.state
        const {name} = item

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
    }
}