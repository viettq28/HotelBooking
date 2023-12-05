import classes from './Tag.module.css'

const Tag = ({id, content, handleClickContent, handleClickX}) => {
  return <div id={id} className={classes['container']}>
    <div onClick={handleClickContent}>{content}</div>
    <i className={`fa-solid fa-xmark ${classes['x-mark']}`} onClick={handleClickX}></i>
  </div>
};
export default Tag