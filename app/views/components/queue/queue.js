import React from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

import IconButton from '@components/icon-button'
import FormattedTime from '@components/formatted-time'
import Artwork from '@components/artwork'

import './queue.styl'

class Queue extends React.Component {
  _handleClick (event, trackId) {
    const { showContext } = this.props
    showContext({
      id: 'track',
      trackId,
      clickX: event.clientX,
      clickY: event.clientY
    })
  }

  render () {
    const {
      contextMenuTrackId,
      isQueueVisible,
      isPlaying,
      isLoading,
      tracks,
      track,
      playQueueTrack,
      pause,
      play,
      clearQueue,
      reorderQueue
    } = this.props

    if (!isQueueVisible) {
      return <div className='player__queue' />
    }
    const selectedTrackId = track.id

    const SortableItem = SortableElement(({ track, queueIndex }) => {
      const isSelected = track.id === selectedTrackId
      const isTrackPlaying = isSelected && isPlaying
      const isTrackLoading = isSelected && isLoading
      const playTrack = isSelected ? play : playQueueTrack.bind(null, queueIndex)

      const classNames = ['queue__track']
      if (contextMenuTrackId === track.id) classNames.push('context-menu-visible')

      let artwork = track.thumbnail
      if (artwork && !track.haveTrack) {
        artwork += '?localOnly=true'
      }

      return (
        <article className={classNames.join(' ')}>
          <Artwork className='queue__track-play' url={artwork} background>
            <IconButton
              icon={isTrackPlaying ? 'pause' : 'play'}
              label={isTrackPlaying ? 'Pause' : 'Play'}
              isLoading={isTrackLoading}
              onClick={isTrackPlaying ? pause : playTrack}
            />
          </Artwork>
          <div className='queue__track-body'>
            <div className={`queue__track-title ${track.isLocal ? 'available' : ''}`}>{track.name}</div>
            <div className='queue__track-artist'>{track.artist}</div>
          </div>
          <IconButton
            label='more'
            className='queue__track-more'
            onClick={(event) => this._handleClick(event, track.id)}
            icon='more'
          />
          <small className='queue__track-duration'>
            <FormattedTime value={track.duration} unit={'ms'} />
          </small>
        </article>
      )
    })

    const SortableList = SortableContainer(({ items }) => {
      return (
        <div>
          {items.map((track, index) => (
            <SortableItem key={`item-${track.id}-${index}`} index={index} queueIndex={index} track={track} />
          ))}
        </div>
      )
    })

    return (
      <div className='player__queue visible'>
        <div className='player__queue-content'>
          <div className='player__queue-main'>
            <Artwork className='player__queue-artwork' url={track.thumbnail} background />
          </div>
          <div className='player__queue-side'>
            <div className='player__queue-header'>
              <div className='player__queue-header-title'>Queue</div>
              <IconButton
                label='clear queue'
                className='player__queue-clear'
                disabled={!tracks.size}
                onClick={clearQueue}
                icon='remove' />
            </div>
            <div className='player__queue-tracks'>
              <SortableList
                items={tracks}
                onSortEnd={reorderQueue}
                helperClass='sortable__helper' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Queue