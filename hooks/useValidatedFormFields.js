import { useCallback, useState } from 'react';

export const FORM_FIELD_ERROR_TYPE = Object.freeze({
  PATTERN_MISMATCH: 'patternMismatch',
  TOO_LONG: 'tooLong',
  TOO_SHORT: 'tooShort',
  TYPE_MISMATCH: 'typeMismatch',
  VALUE_MISSING: 'valueMissing',
});

const getValidationResult = (field, fieldErrorTypes, validity=null) => {
  const validationResult = {};
  if(!validity) {
    fieldErrorTypes.forEach((errorType) => validationResult[errorType] = false);
    validationResult[FORM_FIELD_ERROR_TYPE.VALUE_MISSING] = true;
    return validationResult;
  }
  fieldErrorTypes.forEach((errorType) => validationResult[errorType] = validity[errorType]);
  return validationResult;
};

const useValidatedFormFields = (initialValues, errorMessages) => {
  const fieldNames = Object.keys(initialValues);
  const initialValidationResults = {};
  fieldNames.forEach(fieldName => {
    initialValidationResults[fieldName] = getValidationResult(fieldName, Object.keys(errorMessages[fieldName]));
  });
  
  const [fieldValues, setFieldValues] = useState(initialValues);

  const [validationResults, setValidationResults] = useState(initialValidationResults);

  const getErrorMessageWithHighPriorityFromValidationResults = useCallback(() => {
    for (const field in validationResults) {
      const validationResult = validationResults[field];
      for(const errorType in validationResult) {
        if(validationResult[errorType]) {
          return {
            field,
            errorMessage: errorMessages[field][errorType]
          };
        }
      }
    }
    return null;
  }, [errorMessages, validationResults]);
  
  const onFieldValueChanged = useCallback(e => {
    const {name: fieldName, value, validity} = e.target;
    setFieldValues({
      ...fieldValues,
      [fieldName]: value
    });
    setValidationResults({
      ...validationResults,
      [fieldName]: getValidationResult(fieldName, Object.keys(errorMessages[fieldName]), validity)
    });
  }, [errorMessages, fieldValues, validationResults]);

  return { fieldValues, onFieldValueChanged, getErrorMessageWithHighPriorityFromValidationResults };
};

export default useValidatedFormFields;
