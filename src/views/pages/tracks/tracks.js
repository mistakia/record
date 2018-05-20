import React from 'react'
import { connect } from 'react-redux'

import { tracklistActions } from '@core/tracklists'
import Tracklist from '@components/Tracklist'
import PageLayout from '@layouts/page'

export class TracksPage extends React.Component {
  componentWillMount () {
    // '/me' or proper orbitdb address
    const { logId } = this.props.match.params
    this.props.loadTracks(logId)
  }

  render () {
    const head = (
      <h1>Tracks</h1>
    )

    const body = (
      <Tracklist />
    )

    return (
      <PageLayout head={head} body={body} />
    )
  }
}

const mapDispatchToProps = {
  loadTracks: tracklistActions.loadTracks
}

export default connect(
  null,
  mapDispatchToProps
)(TracksPage)