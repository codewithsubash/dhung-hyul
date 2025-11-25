import React from 'react'
import BlogCardSection from './BlogCardSection'
import IntroCard from '../components/IntroCard'
import EndingCard from '../components/EndingCard'

const BlogScreen = () => {
  return (
    <div className='overflow-hidden'>
      
      <IntroCard title="Blog" />
      <BlogCardSection />
      <EndingCard title="Blog" />
    </div>
  )
}

export default BlogScreen