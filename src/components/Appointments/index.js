// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentLists: [],
    isActiveFilter: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentLists: prevState.appointmentLists.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isActiveFilter} = this.state
    this.setState({isActiveFilter: !isActiveFilter})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentLists: [...prevState.appointmentLists, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentList = () => {
    const {appointmentLists, isActiveFilter} = this.state

    if (isActiveFilter) {
      return appointmentLists.filter(eachItem => eachItem.isStarred === true)
    }
    return appointmentLists
  }

  render() {
    const {titleInput, dateInput, isActiveFilter} = this.state
    const firstClassName = isActiveFilter ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentList = this.getFilteredAppointmentList()

    return (
      <div className="appointment-container">
        <div className="appointment-card">
          <div className="container-form">
            <form className="form-container" onSubmit={this.onAddAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="title" className="title">
                TITLE
              </label>
              <input
                type="text"
                placeholder="Title"
                id="title"
                className="inputText"
                value={titleInput}
                onChange={this.onChangeTitleInput}
              />
              <label htmlFor="date" className="title">
                DATE
              </label>
              <input
                type="date"
                id="date"
                className="inputText"
                value={dateInput}
                onChange={this.onChangeDateInput}
              />
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="hrLine" />
          <div className="appointment-board">
            <h1 className="heading">Appointments</h1>
            <button
              type="button"
              className={`starred-btn ${firstClassName}`}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list-container">
            {filteredAppointmentList.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                appointmentDetails={eachItem}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
