import { useFormik } from 'formik';

interface Props {
  values: Record<string, string>;
  onSubmit: () => void;
  submitButtonText?: string;
}

function BaseForm({ values, onSubmit, submitButtonText }: Props) {
  const formik = useFormik({
    initialValues: values,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
      {Object.keys(values).map((key) => (
        <input
          key={key}
          placeholder={key}
          className="w-full p-2 bg-black text-white border border-gray-600 rounded-md outline-none focus:border-gray-400"
        />
      ))}

      <button>{submitButtonText || 'Submit'}</button>
    </form>
  );
}

export default BaseForm;
