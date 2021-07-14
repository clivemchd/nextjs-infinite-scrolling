/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import InfiniteScrolling from '../components/InfiniteScrolling/InfiniteScrolling'
import { fetchAPI } from '../components/fetchAPI/fetchAPI'

export default function Home({ data }) {

  return (
    <div>
			<InfiniteScrolling dataArrayList={data} dataDisplayLimit={10}>
				{({ modifiedDataArrayList }) => {
					return modifiedDataArrayList.length > 0 && modifiedDataArrayList.map((elem, index) => {
						return (
							<div key={index} id={`content`} style={{ color:`white`, border: `1px solid white`, margin: `1%`, padding: `1%` }}>
								<img src={elem.url} alt={'photo'} height="60px" width="80%" />
								<h5>{elem.id} - {elem.title}</h5>
							</div>
						)
					})}
				}
			</InfiniteScrolling>
		</div>
  )
}

Home.getInitialProps = () => {
	return fetchAPI()
	.then((res) => {
		return { data : res }
	})
} 
