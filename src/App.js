import React, { useState, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';

// import components
import Header from './components/Header';

// import pages
import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'

import './scss/app.scss'

export const SearchContext = createContext('');

export default function App() {
	const [searchValue, setSearchValue] = useState('');

	return (
		<div className="wrapper">
			<SearchContext.Provider value={{ searchValue, setSearchValue }}>
				<Header />
				<div className="content">
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
			</SearchContext.Provider>
		</div>
	)
}
