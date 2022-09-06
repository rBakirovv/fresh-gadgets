import React from "react";
import styles from './SearchForm.module.scss';

function SearchForm() {

  //<div className={styles['serach-form__loupe']}></div>
  
  return (
    <form className={styles['serach-form']}>
      <input
        placeholder='Найти...'
        type='text'
        id='search'
        name='search'
        className={styles['serach-form__input']} />
    </form>
  )
}

export default SearchForm;