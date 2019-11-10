import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi.js'

const SushiContainer = (props) => {
  return (
    <Fragment>
      <div className="belt">
        {
          props.allSushi.map( sushi => < Sushi sushi={sushi} key={sushi.id} eatSushi={(selectedSushi) => props.eatSushi(selectedSushi)}/>
          )}
        <MoreButton revolveSushi={() => props.revolveSushi()}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer