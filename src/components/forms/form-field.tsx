"use client";

import type { ReactNode } from "react";
import { Controller, useFormContext, type ControllerRenderProps, type FieldPath, type FieldValues } from "react-hook-form";
import { cn } from "@/lib/cn";

export function FormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  name,
  render,
}: {
  name: TName;
  render: (props: { field: ControllerRenderProps<TFieldValues, TName>; error?: string }) => ReactNode;
}) {
  const { control } = useFormContext<TFieldValues>();
  return <Controller control={control} name={name} render={({ field, fieldState }) => <>{render({ field, error: fieldState.error?.message })}</>} />;
}

export function FormLabel({ className, htmlFor, required, children }: { className?: string; htmlFor?: string; required?: boolean; children: ReactNode }) {
  return <label htmlFor={htmlFor} className={cn("text-sm font-medium", className)}>{children}{required ? <span className="ml-1 text-destructive" aria-hidden="true">*</span> : null}</label>;
}

export function FormControl({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function FormDescription({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn("text-xs text-muted-foreground", className)}>{children}</p>;
}

export function FormMessage({ className, children }: { className?: string; children?: ReactNode }) {
  if (!children) return null;
  return <p role="alert" className={cn("text-xs text-destructive", className)}>{children}</p>;
}
