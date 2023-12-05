import classes from './Label.module.css'

const Label = ({title, dataSet, handler}) => {
  const getDataSet = dataSet ? Object.entries(dataSet).reduce((acc, [dataSetName, dataSetVal]) => {
    acc[`data-${dataSetName}`] = dataSetVal;
    return acc;
  }, {}) : {};
  const className = (() => {
    switch (title) {
      case 'cancel':
      case 'delete':
      case 'delete selected':
        return 'delete';
      case 'edit':
      case 'add new':
      case 'ok':
        return 'update';
      default: return `status-${title}`
    }
  })();

  return <div className={`rounded p-1 ${classes[className]}`} onClick={handler} {...getDataSet} >
    {title.replace(/(^[a-z]|\s[a-z])/g, char => char.toUpperCase())}
  </div>
};
export default Label