import { useFormik } from 'formik';
import { ReactNode } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import Button from '../Button/Button';

interface Props {
  values: Record<string, string>;
  onSubmit: () => void;
  submitButtonText?: string;
  additionalContent?: ReactNode;
}

function BaseForm({
  values,
  onSubmit,
  submitButtonText,
  additionalContent,
}: Props) {
  const formik = useFormik({
    initialValues: values,
    onSubmit,
  });

  const { currentTheme } = useTheme();

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        {Object.keys(values).map((key) => (
          <input
            key={key}
            placeholder={key}
            className="w-full p-2 rounded-md outline-none"
            style={{
              color: currentTheme.text.neutral,
              backgroundColor: currentTheme.interface.secondaryColor,
              border: `1px solid ${currentTheme.interface.tertiaryColor}`,
            }}
          />
        ))}
      </div>

      {additionalContent && additionalContent}

      <Button
        text={submitButtonText || 'Submit'}
        action={() => console.log('Submitted!')}
        fill
      />
    </form>
  );
}

export default BaseForm;
