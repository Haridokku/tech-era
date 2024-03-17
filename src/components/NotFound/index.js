import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="notFoundContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="notFoundImage"
      />
      <h1 className="head">Page Not Found</h1>
      <p className="describe">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
