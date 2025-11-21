import React,{useEffect} from 'react'
import EventDetailHeader from './components/EventDetailHeader'
import EventDetailBody from './components/EventDetailBody'

const EventDetails = () => {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
        <EventDetailHeader />
        <EventDetailBody /> 
    </div>
  )
}

export default EventDetails