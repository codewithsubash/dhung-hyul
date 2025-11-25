import React from 'react'
import IntroCard from '../components/IntroCard'
import GalleryBody from './GalleryBody'
import EndingCard from '../components/EndingCard'

const GalleryScreen = () => {
  return (
    <div>
        <IntroCard title="Gallery" />
        <GalleryBody />
        <EndingCard title="Gallery" />
    </div>
  )
}

export default GalleryScreen