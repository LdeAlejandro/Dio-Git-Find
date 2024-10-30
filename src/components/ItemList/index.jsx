import './styles.css'

const ItemList = ({title, description}) => {
  return (
    <div className='item-list'>
        <strong>{title}</strong>
        <p>{description} </p>
    
    </div>
  )
}

export default ItemList