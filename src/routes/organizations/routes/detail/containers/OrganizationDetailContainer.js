import { compose } from 'redux'
import { connect } from 'react-redux'
import OrganizationDetail from '../components/OrganizationDetail'
import { getOrganization } from '../../../../../util/getFromState'
import { fetchAircrafts } from '../../../module'

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { organizationId }
    }
  } = ownProps

  return {
    organization: getOrganization(state, organizationId),
    aircrafts: state.firestore.ordered.organizationAircrafts
  }
}

const mapActionCreators = {
  fetchAircrafts
}

export default compose(
  connect(
    mapStateToProps,
    mapActionCreators
  )
)(OrganizationDetail)
