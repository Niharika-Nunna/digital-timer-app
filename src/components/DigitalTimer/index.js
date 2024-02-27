import {Component} from 'react'
import './index.css'

const initialState = {
  timeInMinutes: 25,
  timeInSeconds: 0,
  isRunning: false,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  onIncrement = () => {
    this.setState(prevState => ({timeInMinutes: prevState.timeInMinutes + 1}))
  }

  onDecrement = () => {
    const {timeInMinutes} = this.state

    if (timeInMinutes > 1) {
      this.setState(prevState => ({timeInMinutes: prevState.timeInMinutes - 1}))
    }
  }

  renderTimerLimitController = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const isButtonDisabled = timeInSeconds > 0
    return (
      <div>
        <p className="description">Set Timer limit</p>
        <div className="limit-container">
          <button
            className="limit-button"
            disabled={isButtonDisabled}
            onClick={this.onDecrement}
            type="button"
          >
            -
          </button>
          <p className="count">{timeInMinutes}</p>
          <button
            className="limit-button"
            onClick={this.onIncrement}
            disabled={isButtonDisabled}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onReset = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementSeconds = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const isCompleted = timeInSeconds === timeInMinutes * 60

    if (isCompleted) {
      this.clearTimerInterval()
      this.setState({isRunning: false})
    } else {
      this.setState(prevState => ({timeInSeconds: prevState.timeInSeconds + 1}))
    }
  }

  onStartButton = () => {
    const {timeInMinutes, timeInSeconds, isRunning} = this.state
    const isCompleted = timeInSeconds === timeInMinutes * 60

    if (isCompleted) {
      this.setState({timeInSeconds: 0})
    }
    if (isRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementSeconds, 1000)
    }
    this.setState(prevState => ({isRunning: !prevState.isRunning}))
  }

  renderTimerController = () => {
    const {isRunning} = this.state
    const imgUrl = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altText = isRunning ? 'pause icon' : 'play icon'

    return (
      <div className="start-reset-container">
        <button className="button" type="button" onClick={this.onStartButton}>
          <img src={imgUrl} className="button-image" alt={altText} />
          <p className="button-label">{isRunning ? 'Pause' : 'Start'}</p>
        </button>
        <button className="button" type="button" onClick={this.onReset}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            className="button-image"
            alt="reset icon"
          />
          <p className="button-label">Reset</p>
        </button>
      </div>
    )
  }

  getTime = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const remaningSeconds = timeInMinutes * 60 - timeInSeconds
    const minutes = Math.floor(remaningSeconds / 60)
    const seconds = Math.floor(remaningSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isRunning} = this.state
    const labelText = isRunning ? 'Running' : 'Paused'

    return (
      <div className="bg-container">
        <div className="responsive-container">
          <h1 className="heading">Digital Timer</h1>
          <div className="card-container">
            <div className="digital-timer-container">
              <div className="timer-status-container">
                <h1 className="time">{this.getTime()}</h1>
                <p className="status">{labelText}</p>
              </div>
            </div>
            <div className="timer-buttons-container">
              {this.renderTimerController()}
              {this.renderTimerLimitController()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
