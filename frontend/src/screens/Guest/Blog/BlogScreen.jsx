import React from 'react'
import BlogHeader from './BlogHeader'
import BlogCardSection from './BlogCardSection'
import BlogFooter from './BlogFooter'

const BlogScreen = () => {
  return (
    <div className='overflow-hidden'>
      
      <BlogHeader />
      <BlogCardSection />
      <BlogFooter />
    </div>
  )
}

export default BlogScreen