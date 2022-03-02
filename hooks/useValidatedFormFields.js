import { useCallback, useRef, useState } from 'react';

export const FORM_FIELD_ERROR_TYPE = Object.freeze({
  PATTERN_MISMATCH: 'patternMismatch',
  TOO_LONG: 'tooLong',
  TOO_SHORT: 'tooShort',
  TYPE_MISMATCH: 'typeMismatch',
  VALUE_MISSING: 'valueMissing',
});

function getInitialValidationResults(errorMessages) {
  const validationResults = {};
  for(const validatedFieldName in errorMessages) {
    const fieldValidationResult = {};
    for(const errorType in errorMessages[validatedFieldName]) {
      fieldValidationResult[errorType] = false;
    }
    validationResults[validatedFieldName] = fieldValidationResult;
  }

  return validationResults;
}

function getFieldValidationResultFromValidity(validity, fieldErrorMessages) {
  const validationResult = {};
  for (const errorType in fieldErrorMessages) {
    if(errorType in validity) {
      validationResult[errorType] = validity[errorType];
    }
  }
  
  return validationResult;
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

function getAdditionalFieldValidationResult(additionalValidationsArrayForField, fieldValues) {
  const result = {};
  for(const { errorType, isValid } of additionalValidationsArrayForField) {
    result[errorType] = !isValid(fieldValues);
  }
  
  return result;
}

const useValidatedFormFields = (initialValues, errorMessages, additionalValidations = {}) => {
  const validatedFieldNames = Object.keys(errorMessages);
  const additionalValidationsArray = getAdditionalValidationsArray(additionalValidations);
  
  const [fieldValues, setFieldValues] = useState(initialValues);
  const fieldValidationResults = useRef(getInitialValidationResults(errorMessages));

  const getFieldError = useCallback(fieldName => {
    if(!validatedFieldNames.includes(fieldName)) {
      return [];
    }

    return Object.entries(fieldValidationResults.current[fieldName])
      .filter(([, isError]) => isError)
      .map(([errorType]) => ({errorType, errorMessage: errorMessages[fieldName][errorType]}));
  }, [validatedFieldNames, errorMessages]);

  const getMainFieldError = useCallback(() => {
    const fieldName = validatedFieldNames.find(validatedFieldName => getFieldError(validatedFieldName).length > 0);
    if(!fieldName) {
      return {};
    }

    return ({
      fieldName,
      fieldError: getFieldError(fieldName)
    });
  }, [getFieldError, validatedFieldNames]);
  
  const onFieldValueChanged = useCallback(e => {
    const { name: fieldName, value, validity } = e.target;
    const currentFieldValues = {
      ...fieldValues,
      [fieldName]: value
    }
    setFieldValues(currentFieldValues);
    
    if(validatedFieldNames.includes(fieldName)) {
      fieldValidationResults.current[fieldName] = {
        ...fieldValidationResults.current[fieldName],
        ...getFieldValidationResultFromValidity(validity, errorMessages[fieldName]),
        ...getAdditionalFieldValidationResult(
          additionalValidationsArray.filter(additionalValidation => additionalValidation.fieldName === fieldName),
          currentFieldValues
        )
      };
    }
  }, [additionalValidationsArray, errorMessages, fieldValues, validatedFieldNames]);

  const onFormSubmitted = useCallback((onValidationSucceeded, onValidationFailed) => {
    return e => {
      e.preventDefault();
      
      const { elements } = e.target;
      for(const validatedFieldName of validatedFieldNames) {
        fieldValidationResults.current[validatedFieldName] = {
          ...fieldValidationResults.current[validatedFieldName],
          ...getFieldValidationResultFromValidity(elements[validatedFieldName].validity, errorMessages[validatedFieldName]),
          ...getAdditionalFieldValidationResult(
            additionalValidationsArray.filter(additionalValidation => additionalValidation.fieldName === validatedFieldName),
            fieldValues
          )
        }
      }

      const mainFieldError = getMainFieldError();
      if(mainFieldError.fieldName && mainFieldError.fieldError) {
        onValidationFailed(mainFieldError);
      } else {
        onValidationSucceeded(fieldValues);
      }
    }
  }, [additionalValidationsArray, errorMessages, fieldValues, getMainFieldError, validatedFieldNames]);

  return { fieldValues, onFieldValueChanged, onFormSubmitted, getFieldError, getMainFieldError };
};

export default useValidatedFormFields;
