"use client";

import { FormProvider, type FieldValues, type SubmitHandler, type UseFormReturn } from "react-hook-form";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface FormProps<TFieldValues extends FieldValues> {
  methods: UseFormReturn<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  className?: string;
  children: ReactNode;
}

export function Form<TFieldValues extends FieldValues>({ methods, onSubmit, className, children }: FormProps<TFieldValues>) {
  return <FormProvider {...methods}><form className={cn("grid gap-5", className)} onSubmit={methods.handleSubmit(onSubmit)}>{children}</form></FormProvider>;
}
