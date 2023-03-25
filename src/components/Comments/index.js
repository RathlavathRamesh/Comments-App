import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const deleteUrl =
  'https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png '
const likeUrl =
  'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
const likedUrl =
  'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

// Write your code here
class Comments extends Component {
  state = {
    commentCount: 0,
    name: '',
    comment: ' ',
    initialList: [],
  }

  getName = event => {
    this.setState({name: event.target.value})
  }

  getComment = event => {
    this.setState({comment: event.target.value})
  }

  onDelete = id => {
    const {initialList} = this.state
    const filtered = initialList.filter(each => each.id !== id)
    this.setState(prev => ({
      initialList: filtered,
      commentCount: prev.commentCount - 1,
    }))
  }

  onSubmit = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const Duration = formatDistanceToNow(new Date())
    const colorIndex = Math.ceil(Math.random() * 6)
    const color = initialContainerBackgroundClassNames[colorIndex]
    console.log(color)
    const newItem = {
      id: uuidv4(),
      name,
      comment,
      deleteurl: deleteUrl,
      date: Duration,
      like: likeUrl,
      liked: likedUrl,
      color,
      isLiked: false,
    }
    this.setState(prev => ({
      initialList: [...prev.initialList, newItem],
      commentCount: prev.commentCount + 1,
      name: ' ',
      comment: ' ',
    }))
  }

  changeLike = id => {
    this.setState(prevState => ({
      initialList: prevState.initialList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isLiked: !eachItem.isLiked}
        }
        return eachItem
      }),
    }))
  }

  render() {
    const {initialList, commentCount, name, comment} = this.state
    return (
      <form className="CommentsApp">
        <div className="CommentCard">
          <div className="thCard">
            <h1 className="cmtheading">Comments</h1>
            <p htmlFor="input" className="para">
              Say Something About 4.O Technologies
            </p>
            <input
              value={name}
              className="incard"
              placeholder=" Your Name"
              onChange={this.getName}
            />
            <textarea
              rows={8}
              cols={45}
              className="araElement"
              onChange={this.getComment}
              value={comment}
              type="textarea"
              placeholder="Your Comment"
            />
            <button type="submit" className="addbutn" onClick={this.onSubmit}>
              Add Comment
            </button>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="bgImage"
          />
        </div>
        <hr />
        <div className="commentcount">
          <button className="but" type="button">
            {commentCount}
          </button>
          <p className="cmt">Comments</p>
        </div>
        <ul>
          {initialList.map(each => (
            <CommentItem
              info={each}
              key={each.id}
              deletefun={this.onDelete}
              changeLikeIcon={this.changeLike}
            />
          ))}
        </ul>
      </form>
    )
  }
}
export default Comments
