import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import withStyles from '@material-ui/core/styles/withStyles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TablePagination from '@material-ui/core/TablePagination'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Divider from '@material-ui/core/Divider'
import FlightDetails from './FlightDetails'
import FlightDeleteDialog from '../FlightDeleteDialog'
import {
  aircraft as aircraftShape,
  flight as flightShape,
  organization as organizationShape
} from '../../../../../../shapes'
import { formatDate, formatTime } from '../../../../../../util/dates'

const styles = theme => ({
  container: {
    marginTop: '1em'
  },
  flightHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '50%',
    flexShrink: 0
  },
  flightSecondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  bold: {
    fontWeight: 'bold'
  }
})

class FlightList extends React.Component {
  state = {
    expanded: null
  }

  handleExpansionPanelChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    })
  }

  render() {
    const {
      organization,
      aircraft,
      flights,
      flightDeleteDialog,
      pagination,
      classes,
      openFlightDeleteDialog,
      closeFlightDeleteDialog,
      deleteFlight,
      setFlightsPage
    } = this.props
    const { expanded } = this.state
    return (
      <div className={classes.container}>
        {flights.map(flight => {
          return (
            <ExpansionPanel
              key={flight.id}
              expanded={expanded === flight.id}
              onChange={this.handleExpansionPanelChange(flight.id)}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.flightHeading}>
                  <FormattedMessage
                    id="flightlist.flight.heading"
                    values={{
                      departureAerodrome: (
                        <span className={classes.bold}>
                          {flight.departureAerodrome.name}
                        </span>
                      ),
                      destinationAerodrome: (
                        <span className={classes.bold}>
                          {flight.destinationAerodrome.name}
                        </span>
                      ),
                      firstname: flight.pilot.firstname,
                      lastname: flight.pilot.lastname
                    }}
                  />
                </Typography>
                <Typography className={classes.flightSecondaryHeading}>
                  {formatDate(flight.blockOffTime)},{' '}
                  {formatTime(flight.blockOffTime)}-
                  {formatTime(flight.blockOnTime)}
                </Typography>
              </ExpansionPanelSummary>
              {expanded === flight.id && [
                <ExpansionPanelDetails key={`details-${flight.id}`}>
                  <FlightDetails aircraft={aircraft} flight={flight} />
                </ExpansionPanelDetails>,
                <Divider key={`divider-${flight.id}`} />,
                <ExpansionPanelActions key={`actions-${flight.id}`}>
                  <IconButton onClick={() => openFlightDeleteDialog(flight)}>
                    <DeleteIcon />
                  </IconButton>
                </ExpansionPanelActions>
              ]}
            </ExpansionPanel>
          )
        })}
        <TablePagination
          component="div"
          count={pagination.rowsCount}
          rowsPerPage={pagination.rowsPerPage}
          rowsPerPageOptions={[]}
          page={pagination.page}
          onChangePage={(event, page) => setFlightsPage(page)}
        />
        {flightDeleteDialog.open && (
          <FlightDeleteDialog
            organizationId={organization.id}
            aircraft={aircraft}
            flight={flightDeleteDialog.flight}
            submitted={flightDeleteDialog.submitted}
            onConfirm={() =>
              deleteFlight(
                organization.id,
                aircraft.id,
                flightDeleteDialog.flight.id
              )
            }
            onClose={closeFlightDeleteDialog}
          />
        )}
      </div>
    )
  }
}

FlightList.propTypes = {
  organization: organizationShape,
  aircraft: aircraftShape,
  flights: PropTypes.arrayOf(flightShape),
  flightDeleteDialog: PropTypes.shape({
    open: PropTypes.bool,
    submitted: PropTypes.bool,
    flight: flightShape
  }),
  pagination: PropTypes.shape({
    rowsCount: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
  }).isRequired,
  classes: PropTypes.object.isRequired,
  openFlightDeleteDialog: PropTypes.func.isRequired,
  closeFlightDeleteDialog: PropTypes.func.isRequired,
  deleteFlight: PropTypes.func.isRequired,
  setFlightsPage: PropTypes.func.isRequired
}

export default withStyles(styles)(FlightList)
