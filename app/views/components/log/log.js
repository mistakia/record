import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import TimeAgo from 'timeago-react'

import history from '@core/history'
import Button from '@components/button'
import Icon from '@components/icon'
import IconButton from '@components/icon-button'
import Progress from '@components/progress'

import './log.styl'

const Log = ({
  connect,
  disconnect,
  logName,
  logLocation,
  logBio,
  log,
  type,
  unlink,
  style
}) => {
  const peers = log.peers.size
  const loading = log.isBuildingIndex || log.isProcessingIndex
  const showEdit = log.isMe || log.isLinked
  const noPropagation = e => e.stopPropagation()

  const handleSyncClick = (e) => {
    e.stopPropagation()
    log.isReplicating
      ? disconnect(log.address, log.id)
      : connect(log.address, log.id)
  }

  const linkAction = (
    <Link
      className='button'
      onClick={noPropagation}
      to={`/link-log${log.address}?alias=${log.name || log.alias || ''}`}>
      save
    </Link>
  )

  const unlinkAction = (
    <Button onClick={unlink} isLoading={log.isUpdating}>unsave</Button>
  )

  const editLog = (
    <Link
      className='button__icon button log__edit-title'
      to={`/link-log${log.address}?isLinked=true&alias=${log.alias || log.name || ''}`}
      onClick={noPropagation}><Icon name='edit' /></Link>
  )

  const editSelf = (
    <Link
      className='button__icon button log__edit-title' to='/edit-about'
      onClick={noPropagation}>
      <Icon name='edit' /></Link>
  )

  const logAction = (log.isLinked
    ? unlinkAction
    : linkAction
  )

  const connectionStatusAction = (
    <IconButton
      label='status'
      isLoading={log.isUpdating}
      className={`${log.isReplicating ? 'spin' : ''}`}
      onClick={handleSyncClick}
      icon={log.isReplicating ? 'sync' : 'sync-disabled'} />
  )

  const viewUser = () => {
    history.push(`/tracks${log.address}`)
  }

  return (
    <article
      className={`log log__${type}`}
      style={style}
      onClick={type !== 'profile' ? viewUser : null}>
      <div className='log__main'>
        <div className='log__avatar'>
          <img src={log.avatar} />
        </div>
        <div className={`log__title ${(peers || log.isMe) ? 'log__connected' : 'log__disconnected'}`}>
          {logName}
          {log.isMe && <small>Owner</small>}
        </div>
        <div className='log__actions'>
          <div>
            {showEdit && (log.isMe ? editSelf : editLog)}
          </div>
          <div>
            {!log.isMe && connectionStatusAction}
          </div>
          {(!log.isMe && type === 'profile') && <div>{logAction}</div>}
        </div>
      </div>
      {type === 'profile' && <div className='log__menu menu'>
        <NavLink activeClassName='active' to={`/tracks${log.address}`}>Tracks</NavLink>
        <NavLink activeClassName='active' to={`/logs${log.address}`}>Libraries</NavLink>
      </div>}
      <div className='log__side'>
        <div>
          {log.latestHeadTimestamp && <TimeAgo datetime={log.latestHeadTimestamp} />}
        </div>
        <div data-label='entries'>
          {log.length !== log.max && <Progress progress={(log.length / log.max) * 100} />}
          {log.length === log.max
            ? log.max
            : (
              `${log.length}/${log.max}`
            )}
        </div>
        {type === 'profile' && <div className={loading ? 'blink' : ''} data-label='tracks'>{log.trackCount}</div>}
        {type === 'profile' && <div className={loading ? 'blink' : ''} data-label='libraries'>{log.logCount}</div>}
      </div>
    </article>
  )
}

export default Log
