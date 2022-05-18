import { Component } from "react";
import PropTypes from 'prop-types'

import styles from './SearchBar.module.css'

export default class Searchbar extends Component {
    state = {
        searchValue: '',
    }
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    }
    reset() {
        this.setState({ searchValue: '' })
    }
    onChangeHandler = (event) => {
        this.setState({
            searchValue: event.target.value,
        })
    }
    onSubmitHandler = (event) => {
        //prevent default actions
        event.preventDefault();

        //bubble props
        this.props.onSubmit(this.state);

        //reset state
        this.reset();
    }
    render() {
        return (
            <header className={styles.Searchbar}>
                <form className={styles.SearchForm} onSubmit={this.onSubmitHandler}>
                    <button type="submit" className="button">
                        <span className="button-label">Search</span>
                    </button>

                    <input
                        className="input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.searchValue}
                        onChange={this.onChangeHandler}
                    />
                </form>
            </header>
        )
    }
}