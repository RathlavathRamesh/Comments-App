// Write your code here
import {Component} from 'react'
import './index.css'

class CommentItem extends Component {
  render() {
    const {info, deletefun, changeLikeIcon} = this.props
    const {
      name,
      comment,
      like,
      deleteurl,
      color,
      date,
      isLiked,
      liked,
      id,
    } = info
    const prof = name[0].toUpperCase()
    console.log(isLiked)
    const likeimg = isLiked ? liked : like
    const colors = isLiked ? 'style' : 'none'
    const ondelete = () => {
      deletefun(id)
    }
    const changeLikebtn = () => {
      console.log(changeLikeIcon)
      changeLikeIcon(id)
    }

    return (
      <li className="item">
        <div className="proandname">
          <p className={`profile ${color}`}>{prof}</p>
          <h1 className="nameheadng">{name}</h1>
          <p className="date">{date}</p>
        </div>
        <p className="date">{comment}</p>
        <div className="imgs">
          <div className="likeContainer">
            <img src={likeimg} alt="like" className="image" />
            <button
              className={`likebtn ${colors}`}
              type="button"
              onClick={changeLikebtn}
            >
              Like
            </button>
          </div>
          <button
            data-testid="delete"
            className="deletebtn"
            type="button"
            onClick={ondelete}
          >
            <img src={deleteurl} alt="delete" className="image" />
          </button>
        </div>
      </li>
    )
  }
}
export default CommentItem
