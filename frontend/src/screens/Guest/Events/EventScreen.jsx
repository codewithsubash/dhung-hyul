import React from 'react'
import EventSection from './EventSection'
import LatestEventSection from './LatestEventSection'
import IntroCard from '../components/IntroCard'
import EndingCard from '../components/EndingCard'

const EventScreen = () => {
  return (
    <div>
      <IntroCard title="Events" />
      <EventSection />
      <LatestEventSection />
      <EndingCard title="Events" />
    </div>
  )
}

export default EventScreen