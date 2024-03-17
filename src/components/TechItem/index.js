import {Link} from 'react-router-dom'
import './index.css'

const TechItem = props => {
  const {details} = props
  const {id, name, logoUrl} = details
  return (
    <li className="list-item">
      <Link to={`/courses/${id}`}>
        <div className="imgAndHead">
          <img src={logoUrl} alt={name} className="imageLogo" />
          <p className="head">{name}</p>
        </div>
      </Link>
    </li>
  )
}
export default TechItem
