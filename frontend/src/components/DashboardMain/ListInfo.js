import { useState, useContext } from 'react';
import useHttp from '../../hooks/useHttp';
import DataBankContext from '../../context/DataBankContext';
import { Link } from 'react-router-dom';
import Label from '../../UI/Label';
import transformData from '../../utils/transformData';
import formValidator from '../../utils/formValidator';
import classes from './ListInfo.module.css';

const ListInfo = ({ title, listType, section, data }) => {
  const [selection, setSelection] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState({});
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const { reloadBank, urls } = useContext(DataBankContext);
  const { sendRequest } = useHttp();

  const transformedData = transformData(data, section);
  const theads = Object.keys(transformedData[0]).map((key) => key);
  const ids = transformedData.map((elm) => '' + elm.ID);

  const handleCheck = (e) => {
    if (e.target.closest('.checkbox')) {
      if (e.target.closest('#checkAll')) {
        if (isCheckedAll) {
          setIsCheckedAll(false);
          setSelection([]);
        } else {
          setIsCheckedAll(true);
          setSelection(ids);
        }
      } else {
        if (!selection.includes('' + e.target.value)) {
          setSelection([...selection, e.target.value]);
        } else {
          const newSelection = selection.filter(
            (id) => '' + id !== '' + e.target.value
          );
          setSelection(newSelection);
          setIsCheckedAll(false);
        }
      }
    }
  };
  const handleDelete = (e) => {
    const willDelete = window.confirm(
      `Are you sure you want to delete this ${section.match(/(.*)s$/)[1]}?`
    );
    if (willDelete) {
      const id = e.target.dataset.deleteValue;
      const applyData = () => {
        reloadBank(section);
      };
      sendRequest(`${urls[section]}/${id}`, applyData, { method: 'DELETE' }, (err) => {
        alert(err)
      });
    }
  };
  const handleDeleteMultiple = (e) => {
    const willDelete = window.confirm(
      `Are you sure you want to delete all selected ${section}?`
    );
    if (willDelete) {
      const applyData = () => {
        reloadBank(section);
        setIsCheckedAll(false);
        setSelection([]);
      };
      sendRequest(urls[section], applyData, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selection),
      }, (err) => {
        alert(err)
      });
    }
  };
  const handleEdit = (e) => {
    const key = e.target.dataset.editValue;
    const newEditValue = theads.reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});
    setEditValue(newEditValue);
    setIsEditing(key);
  };
  const handleCancel = (e) => {
    if (isEditing && e.target?.dataset?.cancelValue === isEditing) {
      setIsEditing(false);
      setEditValue({});
    }
  };
  const handleChangeUpdateValue = (e) => {
    const key = e.target.dataset.key;
    setEditValue((prev) => {
      return { ...prev, [key]: e.target.value };
    });
  };
  const handleEditOK = (e) => {
    const reTransformedData = transformData([editValue], `re-${section}`)[0];
    const validators = { numberTypeFields: ['maxPeople', 'price'] };
    const updatedValue = {};
    const executors = {
      notInput: (fields) => {
        Object.entries(reTransformedData).forEach(
          ([key, val]) => !fields.includes(key) && (updatedValue[key] = val)
        );
      },
    };
    const err = formValidator(reTransformedData, validators, executors);
    if (err) {
      alert(err);
      return;
    };
    const applyData = () => {
      reloadBank(section);
      setIsEditing(false);
    }
    sendRequest(`${urls[section]}/${isEditing}`, applyData, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedValue),
    })
  };

  return (
    <div className={classes['container']} onClick={handleCancel}>
      <div className="d-flex justify-content-between">
        <p>{title}</p>
        <div className="d-flex gap-1">
          {listType === 'update' && (
            <Link to="?method=update&isUpdating=true">
              <Label title="add new" />
            </Link>
          )}
          {selection.length > 0 && (
            <Label title="delete selected" handler={handleDeleteMultiple} />
          )}
        </div>
      </div>
      <table onClick={handleCheck}>
        <thead>
          <tr>
            <th className={classes['checkbox-cell']}>
              <input
                id="checkAll"
                className="checkbox"
                type="checkbox"
                checked={isCheckedAll}
                readOnly={true}
              />
            </th>
            {theads.map((head) => {
              return <th key={head}>{head}</th>;
            })}
            {listType === 'update' && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {transformedData.map((row) => {
            return (
              <tr key={row.ID} id={row.ID}>
                <td className={classes['checkbox-cell']}>
                  <input
                    className="checkbox"
                    type="checkbox"
                    value={row.ID}
                    checked={selection.includes('' + row.ID)}
                    readOnly={true}
                  />
                </td>
                {Object.entries(row).map(([key, value]) => {
                  if (key === 'Status')
                    return (
                      <td key={key}>
                        <Label value={value} title={value} />
                      </td>
                    );
                  return (
                    <td
                      key={key}
                      className={value.length > 50 ? classes['limit'] : ''}
                    >
                      {listType === 'update' &&
                      isEditing === row.ID &&
                      key !== 'ID' ? (
                        <textarea
                          data-key={key}
                          className={classes['input-text']}
                          defaultValue={value}
                          onChange={handleChangeUpdateValue}
                        />
                      ) : (
                        value
                      )}
                    </td>
                  );
                })}
                {listType === 'update' &&
                  (isEditing !== row.ID ? (
                    <td>
                      <Label
                        title="edit"
                        dataSet={{ 'edit-value': row.ID }}
                        handler={handleEdit}
                      />
                      <Label
                        title="delete"
                        dataSet={{ 'delete-value': row.ID }}
                        handler={handleDelete}
                      />
                    </td>
                  ) : (
                    <td>
                      <Label
                        title="ok"
                        dataSet={{ 'ok-value': row.ID }}
                        handler={handleEditOK}
                      />
                      <Label
                        title="cancel"
                        dataSet={{ 'cancel-value': row.ID }}
                        handler={handleCancel}
                      />
                    </td>
                  ))}
              </tr>
            );
          })}
          <tr>
            <td colSpan="999" className="pt-5 pb-4"></td>
          </tr>
          <tr>
            <td colSpan="999" className="py-2 px-3 text-end">
              1-8 of 8
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default ListInfo;
