import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TechItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, techObject: {}}

  componentDidMount() {
    this.renderTechUrlApi()
  }

  renderTechUrlApi = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      const objDetails = data.course_details
      const updatedObj = {
        id: objDetails.id,
        name: objDetails.name,
        imageUrl: objDetails.image_url,
        description: objDetails.description,
      }
      this.setState({
        techObject: updatedObj,
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
    const {techObject} = this.state
    const {name, imageUrl, description} = techObject
    return (
      <div className="success">
        <img src={imageUrl} alt={name} className="image" />
        <div className="nameAndDescription">
          <h1 className="heading">{name}</h1>
          <p className="describeText">{description}</p>
        </div>
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

export default TechItemDetails
