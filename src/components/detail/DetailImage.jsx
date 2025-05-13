import css from './Detail.module.css'

const DetailImage = ({ common }) => {
  return (
    <div className={css.imgwrap}>
      <img src={common.firstimage} alt={common.title} />
    </div>
  )
}

export default DetailImage
