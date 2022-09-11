import { useState, useEffect, useContext } from 'react'
import axios from 'axios';

// store
import { useSelector } from 'react-redux';

import { SearchContext } from '../App';

import { Sort } from '../components/Sort'
import { Categories } from '../components/Categories'
import { PizzaBlock } from '../components/PizzaBlock'
import PizzaBlockSkeleton from '../components/PizzaBlock/PizzaBlockSkeleton'
import Pagination from '../components/Pagination'

export default function Home() {
	const categoryIndex = useSelector((state) => state.category.index);
	const sortTypeMode = useSelector((state) => state.sort.sortType.mode);
	const currentPage = useSelector((state) => state.page.pageIndex);

	const { searchValue } = useContext(SearchContext);

	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {

		setIsLoading(true);

		const category = categoryIndex > 0 ? `&category=${categoryIndex}` : '';
		const sorted = `&sortBy=${sortTypeMode.replace("-", "")}`;
		const order = `&order=${sortTypeMode.includes('-') ? 'asc' : 'desc'}`;

		axios.get(`https://62ea2bcaad295463258626d6.mockapi.io/pizzas?page=${currentPage}&limit=4${category}${sorted}${order}&search=${searchValue}`)
			.then((res) => {
				setItems(res.data)
				setIsLoading(false)
			});
		window.scrollTo(0, 0);
	}, [categoryIndex, sortTypeMode, currentPage, searchValue]);

	return (
		<div className='container'>
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(4)].map((_, index) => <PizzaBlockSkeleton
						key={index} />
					) : items.map(
						obj => <PizzaBlock
							key={obj.id}
							{...obj} />
					)}
			</div>
			<Pagination />
		</div>
	)
}
