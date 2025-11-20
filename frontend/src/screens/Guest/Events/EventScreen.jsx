import React from 'react'
import EventHeader from './EventHeader'
import EventSection from './EventSection'
import LatestEventSection from './LatestEventSection'

const EventScreen = () => {
  return (
    <div>
      <EventHeader />
      <EventSection />
      <LatestEventSection />
    </div>
  )
}

export default EventScreen