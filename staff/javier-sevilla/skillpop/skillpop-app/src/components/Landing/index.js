import React from 'react'
import './index.sass'
import AdsSearch from '../AdsSearch'
// import { Link } from 'react-router-dom'

export default function({ onSearch, onLogin, onRegister, onLogout, ads, adDetail, onProfile }) {
    return      <section className="search">
        <div className="search__header">
            <nav>
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul className="menu">
                        {/* <li><Link className="menu__item" to="/login">Login</Link></li>
                        <li><Link className="menu__item" to="/register">Register</Link></li> */}
                        <li><a className="menu__item" onClick={event => {
                             event.preventDefault()

                              onLogin()
                        }}>Log in</a></li>
                        <li><a className="menu__item" onClick={event => {
                             event.preventDefault()

                              onRegister()
                        }}>Register</a></li>
                        <li><a className="menu__item" onClick={event => {
                             event.preventDefault()

                              onLogout()
                        }}>Logout</a></li>
                        <li><a className="menu__item" onClick={event => {
                             event.preventDefault()

                              onProfile()
                        }}>My Profile</a></li>
                    </ul>
                </div>
            </nav>
            <form className="search__form" onSubmit={event => {
                event.preventDefault()

                    const query = event.target.query.value
                

                    onSearch(query)
                }}>
                <input className="search__criteria" type="text" name="query" placeholder="criteria"/>
                <button className="search__submit">🔍</button>
            </form>
            <img className="search__logo" src="./images/sklogo.png" alt=""/>
        </div>
        <div className="title__landing">
            <h2>Productos cerca de ti</h2>
        </div>
        <AdsSearch ads={ads} adDetail={adDetail} /> 
    </section>
}
