import { PostFormData } from '@/types';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styled from '@mui/material/styles/styled';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';

//region Styled Components

const SStack = styled(Stack)({
  gap: '1rem',
  paddingTop: '1rem'
});

//endregion

/**
 * Validation schema for the PostForm component.
 * Ensures that the title and body fields are required.
 */
const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  body: Yup.string().required('Body is required')
});

/**
 * Props for the PostForm component.
 * @property {PostFormData} initialValues - The initial values for the form.
 * @property {(values: PostFormData) => void} onSubmit - The handler for form submission.
 */
interface PostFormProps {
  initialValues: PostFormData;
  onSubmit: (values: PostFormData) => void;
}

export const PostForm: FC<PostFormProps> = ({ initialValues, onSubmit }: PostFormProps): JSX.Element => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <SStack>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          fullWidth
          id="body"
          name="body"
          label="Body"
          multiline
          rows={4}
          value={formik.values.body}
          onChange={formik.handleChange}
          error={formik.touched.body && Boolean(formik.errors.body)}
          helperText={formik.touched.body && formik.errors.body}
        />
        <Button variant="contained" color="info" fullWidth type="submit">
          Submit
        </Button>
      </SStack>
    </form>
  );
};
