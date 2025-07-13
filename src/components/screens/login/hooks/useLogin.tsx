import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { setDataInCookies } from "@/utils/cookie-util";
import { routes } from "@/lib/routes";
import { loginUser } from "@/api/auth";

interface LoginFormValues {
  email: string;
  password: string;
}

//Initial Values State
const initialValues = {
  email: "",
  password: "",
};

//Validation Schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

/**
 * useLogin - Custom React hook for managing the login form logic.
 *
 * This hook encapsulates all state, validation, and submission logic for a login form,
 * including integration with Formik for form state management and Yup for validation.
 * It handles user input, validation, error reporting, and authentication via the loginUser API.
 * On successful login, it stores authentication tokens in cookies and redirects to the dashboard.
 *
 * @returns {object} An object containing:
 *   - formik: The Formik instance for advanced usage.
 *   - handleChange: Input change handler that also clears server errors.
 *   - handleBlur: Input blur handler.
 *   - handleSubmitForm: Form submit handler.
 *   - isSubmitting: Boolean indicating if the form is submitting.
 *   - email: Current email input value.
 *   - password: Current password input value.
 *   - emailTouched: Boolean indicating if the email field has been touched.
 *   - passwordTouched: Boolean indicating if the password field has been touched.
 *   - isFormValid: Boolean indicating if the form is valid and ready to submit.
 *   - isEmailError: Boolean indicating if the email field has a validation error.
 *   - isPasswordError: Boolean indicating if the password field has a validation error.
 *   - isErrorFromServer: Error message from the server, if any.
 *   - emailError: Email field error message, if any.
 *   - passwordError: Password field error message, if any.
 *
 * Usage:
 * ```js
 * const {
 *   handleChange, handleBlur, handleSubmitForm, isSubmitting,
 *   email, password, emailTouched, passwordTouched,
 *   isFormValid, isEmailError, isPasswordError, isErrorFromServer,
 *   emailError, passwordError
 * } = useLogin();
 * ```
 */
export const useLogin = () => {
  const router = useRouter();

  const formik = useFormik<LoginFormValues>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    validateOnChange: false,
    validateOnBlur: false,
  });

  //State Values
  const email = formik.values.email;
  const password = formik.values.password;

  //State Touched
  const emailTouched = formik.touched.email;
  const passwordTouched = formik.touched.password;

  //State Submitting
  const isSubmitting = formik.isSubmitting;

  //State Errors
  const emailError = formik.errors.email;
  const passwordError = formik.errors.password;

  //Handle Submit
  async function handleSubmit(
    values: LoginFormValues,
    { setStatus }: FormikHelpers<LoginFormValues>,
  ) {
    try {
      const data = await loginUser(values.email, values.password);

      if (!data.success) {
        setStatus(data.error || "Authentication failed");
        return;
      }

      // Store tokens in cookies
      setDataInCookies("access_token", data.access_token);
      setDataInCookies("refresh_token", data.refresh_token);
      router.push(routes.DASHBOARD);
    } catch (err: any) {
      const errorMessage = err?.message || "Something went wrong";
      setStatus(errorMessage);
    }
  }

  //Handlers
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    formik.setStatus("");
    formik.handleChange(e);
  }
  const handleBlur = formik.handleBlur;
  const handleSubmitForm = formik.handleSubmit;

  //Validate Errors
  const isFormValid =
    formik.values.email &&
    formik.values.password &&
    !formik.errors.email &&
    !formik.errors.password;

  const isEmailError = formik.touched.email && Boolean(formik.errors.email);
  const isPasswordError =
    formik.touched.password && Boolean(formik.errors.password);
  const isErrorFromServer = formik.status;

  return {
    formik,
    handleChange,
    handleBlur,
    handleSubmitForm,
    isSubmitting,
    email,
    password,
    emailTouched,
    passwordTouched,
    isFormValid,
    isEmailError,
    isPasswordError,
    isErrorFromServer,
    emailError,
    passwordError,
  };
};
