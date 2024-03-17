import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import TechItem from '../TechItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TechEra extends Component {
  state = {apiStatus: apiStatusConstants.initial, techList: []}

  componentDidMount() {
    this.renderTechUrlApi()
  }

  renderTechUrlApi = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      const updatedList = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({
        techList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loaderContainer" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height={20} width={20} />
    </div>
  )

  renderFailureView = () => {
    const getApi = () => {
      this.renderTechUrlApi()
    }
    return (
      <div className="loaderContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="image"
        />
        <h1 className="heading">Oops! Something Went Wrong</h1>
        <p className="describe">
          We cannot seem to find the page you are looking for
        </p>
        <button type="button" className="getRetryBtn" onClick={getApi}>
          Retry
        </button>
      </div>
    )
  }

  renderSuccessView = () => {
    const {techList} = this.state
    return (
      <div className="successContainer">
        <h1 className="heading">Courses</h1>
        <ul className="unorderedList">
          {techList.map(each => (
            <TechItem key={each.id} details={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.in_progress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="appContainer">
        <Header />
        {this.renderApiStatus()}
      </div>
    )
  }
}

export default TechEra
