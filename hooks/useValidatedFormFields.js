import { useCallback, useState } from 'react';

export const FORM_FIELD_ERROR_TYPE = Object.freeze({
  PATTERN_MISMATCH: 'patternMismatch',
  TOO_LONG: 'tooLong',
  TOO_SHORT: 'tooShort',
  TYPE_MISMATCH: 'typeMismatch',
  VALUE_MISSING: 'valueMissing',
});

function getInitialValidationResults(errorMessages) {
  const fieldNames = Object.keys(errorMessages);

  return Object.fromEntries(fieldNames.map(fieldName => {
    const errorTypes = Object.keys(errorMessages[fieldName] ?? {});
    const validationResult = Object.fromEntries(errorTypes.map(errorType => [errorType, false]));
    
    return [fieldName, validationResult];
  }));
}

function getValidationResultFromValidity(validity, fieldErrorMessages) {
  const errorTypes = Object.keys(fieldErrorMessages);
  const validationResult = {};
  for (const errorType of errorTypes) {
    if(errorType in validity) {
      validationResult[errorType] = validity[errorType];
    }
  }
  
  return validationResult;
}

function getFieldErrorType(fieldValidationResult) {
  const fieldErrorTypes = Object.keys(fieldValidationResult);
  return fieldErrorTypes.find(fieldErrorType => fieldValidationResult[fieldErrorType]) ?? '';
}

function getAdditionalValidationsArray(additionalValidations) {
  const array = [];
  for(const fieldName in additionalValidations) {
    for(const errorType in additionalValidations[fieldName]) {
      array.push({
        fieldName, errorType, isValid: additionalValidations[fieldName][errorType]
      });
    }
  }
  return array;
}

function mergeValidationResults(prevValidationResults, validationResults) {
  const result = {...prevValidationResults};
  for(const fieldName in validationResults) {
    result[fieldName] = {...prevValidationResults[fieldName], ...validationResults[fieldName]}
  }
  return result;
}

function getAdditionalValidationResults(additionalValidationsArray, fieldValues) {
  const additionalValidationsResult = {};
  for(const { fieldName, errorType, isValid } of additionalValidationsArray) {
    const result = !isValid(fieldValues);
    if(fieldName in additionalValidationsResult) {
      additionalValidationsResult[fieldName][errorType] = result;
    } else {
      additionalValidationsResult[fieldName] = {
        [errorType]: result
      }
    }
  }
  return additionalValidationsResult;
}

const useValidatedFormFields = (initialValues, errorMessages, additionalValidations) => {
  const validatedFieldNames = Object.keys(errorMessages);
  const additionalValidationsArray = getAdditionalValidationsArray(additionalValidations);
  
  const [fieldValues, setFieldValues] = useState(initialValues);

  const [validationResults, setValidationResults] = useState(getInitialValidationResults(errorMessages));

  const onFieldValueChanged = useCallback(e => {
    const { name: fieldName, value, validity } = e.target;
    const currentFieldValues = {
      ...fieldValues,
      [fieldName]: value
    }
    setFieldValues(currentFieldValues);
    
    if(validatedFieldNames.includes(fieldName)) {
      const currentValidationResults = {
        ...validationResults,
        [fieldName]: {
          ...validationResults[fieldName],
          ...getValidationResultFromValidity(validity, errorMessages[fieldName])
        }
      };
      const additionalValidationsResults = getAdditionalValidationResults(
        additionalValidationsArray.filter(additionalValidation => additionalValidation.fieldName === fieldName),
        currentFieldValues
      );
      setValidationResults(mergeValidationResults(currentValidationResults, additionalValidationsResults));
    }
    
  }, [additionalValidationsArray, errorMessages, fieldValues, validatedFieldNames, validationResults]);

  const onFormSubmitted = useCallback((onValidationSucceeded, onValidationFailed) => {
    return e => {
      e.preventDefault();
      
      const { elements } = e.target;
      let currentValidationResults = Object.fromEntries(validatedFieldNames.map(fieldName => [
        fieldName,
        getValidationResultFromValidity(elements[fieldName].validity, errorMessages[fieldName])
      ]));
      const additionalValidationsResults = getAdditionalValidationResults(additionalValidationsArray, fieldValues);
      currentValidationResults = mergeValidationResults(currentValidationResults, additionalValidationsResults);
      setValidationResults(currentValidationResults);

      const fieldErrorWithHighPriority = validatedFieldNames
        .map(validatedFieldName => ({
          fieldName: validatedFieldName,
          errorType: getFieldErrorType(currentValidationResults[validatedFieldName])
        }))
        .find(fieldError => fieldError.errorType !== '');
      
      if(!fieldErrorWithHighPriority) {
        onValidationSucceeded(fieldValues);
      } else {
        const { fieldName, errorType } = fieldErrorWithHighPriority;
        onValidationFailed({
          ...fieldErrorWithHighPriority,
          errorMessage: errorMessages[fieldName][errorType]
        });
      }
    }
  }, [additionalValidationsArray, errorMessages, fieldValues, validatedFieldNames]);

  const getFieldErrorMessage = useCallback(fieldName => {
    if(!validatedFieldNames.includes(fieldName)) {
      return '';
    }

    const fieldErrorType = getFieldErrorType(validationResults[fieldName]);
    if(!fieldErrorType) {
      return '';
    }

    return errorMessages[fieldName][fieldErrorType];
  }, [validatedFieldNames, validationResults, errorMessages]);

  return { fieldValues, onFieldValueChanged, onFormSubmitted, getFieldErrorMessage };
};

export default useValidatedFormFields;
