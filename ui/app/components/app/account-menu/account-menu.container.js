import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import {
  toggleAccountMenu,
  showAccountDetail,
  selectApprovedAccount,
  hideSidebar,
  lockMetamask,
  hideWarning,
  showConfigPage,
  showInfoPage,
  showModal,
} from '../../../store/actions'
import { getMetaMaskAccounts, getActiveTab } from '../../../selectors/selectors'
import AccountMenu from './account-menu.component'

function mapStateToProps (state) {
  const { metamask: {
    selectedAddress, isAccountMenuOpen, accountrings, identities, isUnlocked,
  } } = state

  return {
    accounts: getMetaMaskAccounts(state),
    activeTab: getActiveTab(state),
    identities,
    isAccountMenuOpen,
    isUnlocked,
    keyrings: accountrings,
    selectedAddress,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    toggleAccountMenu: () => dispatch(toggleAccountMenu()),
    showAccountDetail: address => {
      dispatch(showAccountDetail(address))
      dispatch(hideSidebar())
      dispatch(toggleAccountMenu())
    },
    lockMetamask: () => {
      dispatch(lockMetamask())
      dispatch(hideWarning())
      dispatch(hideSidebar())
      dispatch(toggleAccountMenu())
    },
    showConfigPage: () => {
      dispatch(showConfigPage())
      dispatch(hideSidebar())
      dispatch(toggleAccountMenu())
    },
    showInfoPage: () => {
      dispatch(showInfoPage())
      dispatch(hideSidebar())
      dispatch(toggleAccountMenu())
    },
    showRemoveAccountConfirmationModal: identity => {
      return dispatch(showModal({ name: 'CONFIRM_REMOVE_ACCOUNT', identity }))
    },
    selectApprovedAccount: origin => {
      dispatch(selectApprovedAccount(origin))
    },
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AccountMenu)
