import { useState } from 'react';
import Tag from './Tag';
import Select from './Select';
import classes from './BigText.module.css';

const getOptions = (data, exception) => {
  return data
    .filter((e) => !exception.includes(e._id))
    .reduce((acc, elm) => {
      acc[elm._id] = elm.title;
      return acc;
    }, {});
};

const BigText = ({ title, name, setFormValue, transformPrePost, data }) => {
  const [values, setValues] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);

  const handleChange = (e) => {
    const notSelectValues = values.filter((value) => value !== isSelecting);
    const newValues = [...notSelectValues, e.target.value];
    setValues(newValues);
    setFormValue((prev) => {
      return { ...prev, [name]: newValues.map((val) => transformPrePost(val)) };
    });
  };
  const handleBlur = () => {
    setIsSelecting(false);
  };
  const handleChangeTagContent = (e) => {
    setIsSelecting(e.target.parentNode.id);
  };
  const handleDeleteTag = (e) => {
    const newValues = values.filter(
      (value) => value !== e.target.parentNode.id
    );
    setValues(newValues);
    setFormValue((prev) => {
      return { ...prev, [name]: newValues.map((val) => transformPrePost(val)) };
    });
  };

  return (
    <div className={classes['field']}>
      <label>{title}</label>
      <div className={classes['big-text']}>
        {values.map((val) =>
          !(isSelecting === val) ? (
            <Tag
              key={`tag-${val}`}
              id={val}
              content={data.find((e) => '' + e._id === '' + val).title}
              handleClickContent={handleChangeTagContent}
              handleClickX={handleDeleteTag}
            />
          ) : (
            <Select
              key={`select-${val}`}
              options={getOptions(
                data,
                values.filter((value) => value !== val)
              )}
              defaultValue={val}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          )
        )}
        <Select
          key={values.length}
          defaultValue=""
          placeholder="Add New Room"
          options={getOptions(data, values)}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <input type="hidden" name={name} value={values} />
      </div>
    </div>
  );
};

export default BigText;
