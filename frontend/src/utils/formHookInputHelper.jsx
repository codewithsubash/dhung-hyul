/**
 *
 * @param {*} refObject
 * @param {*} actualObject
 * @returns
 */
export const filterKeyValues = (refObject, actualObject) => {
  return Object.keys(actualObject).reduce((filteredObj, key) => {
    if (key in refObject) filteredObj[key] = actualObject[key];

    return filteredObj;
  }, {});
};

export const formHookInputHelper = ({ field, fieldState }) => {
  const { value, onChange = () => {} } = field;
  const { invalid, error } = fieldState;

  return {
    value,
    onChange,
    error: invalid,
    ...(!!error && { helperText: error?.message }),
  };
};
