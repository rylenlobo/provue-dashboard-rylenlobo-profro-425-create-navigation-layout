"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { PasswordInput } from "@/components/ui/forms/password-input";
import { ErrorLine } from "@/components/ui/forms/error-line";
import { useLogin } from "./hooks/useLogin";

const LoginScreen = () => {
  const {
    handleChange,
    handleBlur,
    isFormValid,
    isEmailError,
    isPasswordError,
    isErrorFromServer,
    email,
    password,
    emailTouched,
    passwordTouched,
    emailError,
    passwordError,
    isSubmitting,
    handleSubmitForm,
  } = useLogin();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="lg:px flex w-full max-w-[720px] flex-col items-center justify-center gap-6 p-4 md:px-0">
        {/* Heading */}
        <div className="flex w-full max-w-[360px] flex-col items-center justify-center">
          <div className="flex w-full items-center justify-center gap-2">
            <Image
              width={24}
              height={24}
              src="assets/svg/logo.svg"
              alt="logo"
            />
            <h5 className="text-h5 font-bold">Provue</h5>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-1">
            <h4 className="text-h4 font-bold">Dashboard Login</h4>
            <p className="text-p2 font-regular text-neutral-gray">
              Proceed with the registered email ID
            </p>
          </div>
        </div>
        {/* Body */}
        <form
          onSubmit={handleSubmitForm}
          className="flex w-full max-w-[336px] flex-col items-center justify-center gap-6"
        >
          <div className="flex w-full flex-col gap-4">
            {/* Email Input */}
            <div className="flex w-full flex-col gap-2">
              <Input
                className="max-h-[40px] max-w-[420px]"
                type="email"
                placeholder="testing@provue.com"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={isEmailError}
              />
              {emailTouched && emailError && <ErrorLine message={emailError} />}
            </div>
            {/* Password Input */}
            <div className="flex w-full flex-col gap-2">
              <PasswordInput
                className="max-h-[40px] max-w-[420px]"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={isPasswordError}
              />
              {passwordTouched && passwordError && (
                <ErrorLine message={passwordError} />
              )}
              {isErrorFromServer && <ErrorLine message={isErrorFromServer} />}
            </div>
          </div>
          {/* Submit Button */}
          <Button
            type="submit"
            className="max-h-[40px] w-full"
            variant="default"
            size="small"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
