import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import queryString from 'query-string'
import { shell } from 'electron'

import { tracklistActions, getCurrentTracklistLog } from '@core/tracklists'
import { logActions } from '@core/logs'
import { taglistActions } from '@core/taglists'
import { getHelp, helpActions } from '@core/help'
import Icon from '@components/icon'
import Tracklist from '@components/tracklist'
import PageLayout from '@layouts/page'
import { WIKI_URL } from '@core/constants'

export class TracksPage extends React.Component {
  constructor (props) {
    super(props)
    this._load()
  }

  componentDidUpdate (prevProps) {
    const location = JSON.stringify(this.props.location)
    const prevLocation = JSON.stringify(prevProps.location)
    if (location !== prevLocation) {
      this._load()
    }
  }

  _load () {
    const { tags, query, addresses, sort, order } = queryString.parse(this.props.location.search)
    this.props.loadTracks({
      path: this.props.location.pathname,
      addresses: (addresses && !Array.isArray(addresses)) ? [addresses] : (addresses || []),
      sort,
      order,
      tags: (tags && !Array.isArray(tags)) ? [tags] : (tags || []),
      query
    })
    this.props.loadTags(addresses)
  }

  render () {
    const { log, isTracksHelpVisible, toggleTracksHelp, loadNextTracks } = this.props

    const help = (
      <div>
        <div className='page__help-row'>
          <div className='page__help-lead'>Here you will see all tracks, from all libraries.</div>
        </div>
        <div className='page__help-row'>
          <Icon name='star-solid' />
          <div>Add tracks from other libraries to your own.</div>
        </div>
        <div className='page__help-row'>
          <Icon name='add' />
          <div>Add tracks from your computer and from the internet.</div>
        </div>
        <div className='page__help-row'>
          <Icon name='website' />
          <div>Add tracks from other websites using the chrome extension.</div>
        </div>
        <a onClick={shell.openExternal.bind(null, WIKI_URL)} className='button button__text page__help-link'>Learn more</a>
      </div>
    )

    const body = <Tracklist showAdd loadNext={loadNextTracks} log={log} />

    return (
      <PageLayout
        help={isTracksHelpVisible && help}
        onHelpClose={toggleTracksHelp}
        title='Tracks'
        body={body} />
    )
  }
}

const mapStateToProps = createSelector(
  getCurrentTracklistLog,
  getHelp,
  (log, help) => ({
    log,
    isTracksHelpVisible: help.isTracksHelpVisible
  })
)

const mapDispatchToProps = {
  loadTracks: tracklistActions.loadTracks,
  loadNextTracks: tracklistActions.loadNextTracks,
  loadLog: logActions.loadLog,
  loadTags: taglistActions.loadTags,
  toggleTracksHelp: helpActions.toggleTracksHelp
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TracksPage)
