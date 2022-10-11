import { useContext, useEffect, useState } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'
import NotificationContext from '../../store/notification-context'

function Comments(props) {
  const { eventId } = props
  const notificationCtx = useContext(NotificationContext)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (showComments) {
      setLoading(true)
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments)
          setLoading(false)
        })
    }
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  async function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Sending comment...',
      message: 'Your comment is currently being stored.',
      status: 'pending',
    })

    try {
      const response = await fetch(`/api/comments/${eventId}`, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const result = await response.json()
      console.log(result)

      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Your comment was saved.',
        status: 'success',
      })
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Error!',
        message: error.message || 'Something went wrong!',
        status: 'error',
      })
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !loading && <CommentList items={comments} />}
      {showComments && loading && <p>Loading...</p>}
    </section>
  )
}

export default Comments
