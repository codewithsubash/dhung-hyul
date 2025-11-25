import React from 'react'
import GetInvolved from './GetInvolved'
import ImpactSection from '../Home/ImpactSection'
import IntroCard from '../components/IntroCard'
import EndingCard from '../components/EndingCard'
const GetInvolvedScreen = () => {
  return (
    <div>
        <IntroCard title="Get Involved" />
        <GetInvolved />
        <ImpactSection />
        <EndingCard title="Get Involved" />
        
    </div>
  )
}

export default GetInvolvedScreen