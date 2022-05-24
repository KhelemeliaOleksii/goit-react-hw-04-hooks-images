import { useState } from "react";
import PropTypes from 'prop-types'

import styles from './SearchBar.module.css'

const Searchbar = ({ onSubmit }) => {
    const [searchValue, setSearchValue] = useState('');

    const reset = () => {
        setSearchValue('');
    }
    const onChangeHandler = ({ target }) => {
        setSearchValue(target.value);
    }
    const onSubmitHandler = (event) => {
        //prevent default actions
        event.preventDefault();
        //bubble props
        onSubmit(searchValue);
        //reset state
        reset();
    }
    return (
        <header className={styles.Searchbar}>
            <form className={styles.SearchForm} onSubmit={onSubmitHandler}>
                <button type="submit" className="button">
                    <span className="button-label">Search</span>
                </button>

                <input
                    className="input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={searchValue}
                    onChange={onChangeHandler}
                />
            </form>
        </header>
    )
}
Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}


export default Searchbar;