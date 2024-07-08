import PropTypes from 'prop-types'

const Card = ({image}) => {
  return (
    <div>
      <img src={image} alt="" />
    </div>
  )
}

Card.propTypes = {
  image: PropTypes.string.isRequired
}

export default Card;