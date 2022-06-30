// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails

  const image = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="list-container">
      <div className="title-starred-container">
        <div className="container">
          <p className="title-for">{title}</p>
          <button
            type="button"
            testid="star"
            onClick={onClickStar}
            className="star-btn"
          >
            <img src={image} alt="star" className="star" />
          </button>
        </div>
        <p className="date-appoint">Date: {date}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
