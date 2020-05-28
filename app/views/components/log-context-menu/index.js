import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { loglistActions } from '@core/loglists'
import { logActions } from '@core/logs'
import {
  contextMenuActions,
  getContextMenuLog
} from '@core/context-menu'
import LogContextMenu from './log-context-menu'

const mapStateToProps = createSelector(
  getContextMenuLog,
  (log) => ({ log })
)

const mapDispatchToProps = {
  unlinkLog: loglistActions.unlinkLog,
  connect: logActions.connectLog,
  disconnect: logActions.disconnectLog,
  hide: contextMenuActions.hide
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogContextMenu)
