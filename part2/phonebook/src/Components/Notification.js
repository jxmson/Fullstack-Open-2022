const Notification = ({ message, notificationColor }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={notificationColor}>
        {message}
      </div>
    )
  }

  export default Notification;