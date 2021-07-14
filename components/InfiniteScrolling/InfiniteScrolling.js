/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { realFetchAPI } from '../fetchAPI/fetchAPI';

const InfiniteScrolling = ({
  dataArrayList,
  children,
  observerOptions,
  dataDisplayLimit
}) => {
	
	const [callback, setCallback] = useState({});
	const [itemList, setItemList] = useState([]);
	const [skip, setSkip] = useState(0);
	const [limit, setLimit] = useState(dataDisplayLimit);
	const [loaderElem, setLoaderElem] = useState(null)
	let observer = useRef()

	const setItems = (skipCount, limitCount) => {
    const tempItemList = [...itemList]
    for (let index = skipCount; index < limitCount; index++) {
      tempItemList.push(dataArrayList[index])
    }
    setItemList(tempItemList)
  }

	useEffect(() => {
		setItems(skip, limit)
	}, [skip, limit])

	useEffect(() => {
		observer.current = new IntersectionObserver(([entry]) => { setCallback(entry) }, 
		{ rootMargin: '1px', threshold : 1 })
		const currentElem = loaderElem;
		const currentObserver = observer.current;
		
		if(currentElem){
			currentObserver.observe(currentElem);
		}

		return () => {
			if(currentElem){
				currentObserver.unobserve(currentElem);
			}
		}
	}, [loaderElem])

	useEffect(() => {
		if(callback && callback.isIntersecting){
			const newPage = skip + dataDisplayLimit;
			const newLimit = newPage + dataDisplayLimit;
			console.log('limt ', newLimit, dataArrayList.length)
			if(newLimit <= dataArrayList.length){
				setSkip(newPage);
				setLimit(newLimit);
			}
		}
	}, [callback])

	return (
		<div>
			<div className="infinite-scrolling">{children({ modifiedDataArrayList : itemList })}</div>
			<div ref={setLoaderElem}></div>
		</div>
	)
}

export default InfiniteScrolling
