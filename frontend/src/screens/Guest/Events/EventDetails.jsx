import React,{useEffect} from 'react'
import EventDetailBody from './components/EventDetailBody'
import IntroCard from '../components/IntroCard'
import EndingCard from '../components/EndingCard';

const EventDetails = () => {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
        <IntroCard title="Event Details" />
        <EventDetailBody /> 
        <EndingCard title="Event Details" />
    </div>
  )
}

export default EventDetails