import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { ReactNode } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import Button from '../Button/Button';
import * as Yup from 'yup';
import { CheckOutlined } from '@ant-design/icons';

interface Props<T extends Yup.AnyObjectSchema, V> {
  values: V;
  onSubmit: (values: V) => void;
  validation: T;
  submitButtonText?: string;
  submitButtonIcon?: ReactNode;
  checkboxName?: string;
}

function BaseForm<T extends Yup.AnyObjectSchema, V extends FormikValues>({
  values,
  onSubmit,
  submitButtonText,
  checkboxName,
  submitButtonIcon,
  validation,
}: Props<T, V>) {
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
            {Object.keys(values).map((key) => {
              return (
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
              );
            })}
          </div>

          {checkboxName ? (
            <label className="flex items-center space-x-2 cursor-pointer">
              <Field
                type="checkbox"
                name={checkboxName}
                className="hidden peer"
                id={checkboxName}
              />
              <div className="w-5 h-5 flex items-center justify-center bg-black border border-gray-500 rounded-sm peer-checked:bg-yellow-500 peer-checked:border-yellow-500">
                <CheckOutlined className="text-black opacity-0 peer-checked:opacity-100" />
              </div>
              <span className="text-gray-300 text-lg">{checkboxName}</span>
            </label>
          ) : null}

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
