import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { ReactNode } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import Button from '../Button/Button';
import * as Yup from 'yup';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';

interface Props<V extends FormikValues> {
  values: V;
  onSubmit: (values: V) => void;
  validation: Yup.ObjectSchema<any>;
  submitButtonText?: string;
  submitButtonIcon?: ReactNode;
  checkboxName?: string;
}

function BaseForm<V extends FormikValues>({
  values,
  onSubmit,
  submitButtonText,
  checkboxName,
  submitButtonIcon,
  validation,
}: Props<V>) {
  const { currentTheme } = useTheme();

  return (
    <Formik
      initialValues={{ ...values }}
      validationSchema={validation}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            {Object.keys(values).map((key) => (
              <div key={key}>
                <Field
                  name={key}
                  placeholder={key}
                  className="w-full p-2 rounded-md outline-none"
                  style={{
                    color: currentTheme.text.neutral,
                    backgroundColor: currentTheme.interface.secondaryColor,
                    border: `1px solid ${currentTheme.interface.tertiaryColor}`,
                  }}
                />
                {errors[key] && touched[key] ? (
                  <ErrorMessage
                    name={key}
                    component="div"
                    className="text-red-500"
                  />
                ) : null}
              </div>
            ))}
          </div>

          {checkboxName ? <CustomCheckbox label={checkboxName} /> : null}

          <Button
            text={submitButtonText || 'Submit'}
            action={() => console.log('Submitted!')}
            fill
            icon={submitButtonIcon}
          />
        </Form>
      )}
    </Formik>
  );
}

export default BaseForm;
