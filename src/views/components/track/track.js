import React from 'react'

import IconButton from '@components/icon-button'
import FormattedTime from '@components/formatted-time'
import Tags from '@components/tags'

import './track.styl'

class Track extends React.Component {
  render () {
    const { isPlaying, isSelected, pause, play, track } = this.props

    if (!track) {
      return null
    }

    return (
      <article className='track'>
        <div className='track__play'>
          <IconButton
            icon={isPlaying ? 'pause' : 'play'}
            label={isPlaying ? 'Pause' : 'Play'}
            onClick={isPlaying ? pause : play}
          />
          <img src={track.thumbnail} />
        </div>
        <div className='track__body'>
          <div className='track__title'>{track.title}</div>
          <small className='track__duration'>
            <FormattedTime value={track.duration} unit={'ms'} />
          </small>
        </div>
        <Tags track={track} />
      </article>
    )
  }
}

export default Track
