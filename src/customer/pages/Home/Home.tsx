import React from 'react'
import RecycleProductsCategory from './RecycleProductCategory/RecycleProductCategory'
import CategoryGrid from './CategoryGrid/CategoryGrid'
import Deal from './Deal/Deal'

const Home = () => {
  return (
    <>
        <div className='spayce-y-5 lg:space-y-10 relative pb-20'>
            <RecycleProductsCategory />
            <CategoryGrid />
            <Deal />
        </div>
    </>
  )
}

export default Home