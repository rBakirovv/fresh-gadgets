import Link from "next/link";
import React from "react";
import SearchForm from "../UI/SearchForm/SearchForm";
import styles from './Header.module.scss';

function Header() {
  return (
    <section className={styles['header']}>
      <Link href='/' passHref>
        <a className={styles['header__icon-container']}>
          <img src='./icons/notebook.png' className={styles['header__icon']} alt="icon" />
          <h4 className={styles['header__icon-title']}>Fresh<br />Gadgets</h4>
        </a>
      </Link>
      <SearchForm />
      <Link href='/' passHref>
        <a className={styles['header__cart']}>
          <div className={styles['header__cart-icon']}></div>
          Корзина
        </a>
      </Link>
      <div className={styles['header__burger']}></div>
    </section>
  )
}

export default Header;