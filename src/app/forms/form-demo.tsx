"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, UserRound } from "lucide-react";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Textarea, toast } from "@/components/ui";
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage } from "@/components/forms";
import { Container } from "@/components/ui/layout";

const profileSchema = z.object({
  name: z.string().trim().min(2, "Name must contain at least 2 characters."),
  email: z.email("Enter a valid email address."),
  bio: z.string().max(240, "Bio must be 240 characters or fewer.").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function FormDemo() {
  const methods = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", email: "", bio: "" },
    mode: "onBlur",
  });

  const onSubmit = (values: ProfileFormValues) => {
    toast.success("Profile saved", { description: `${values.name} is ready to use.` });
  };

  return (
    <main><Container className="py-12"><div className="mx-auto max-w-2xl"><Badge variant="primary">React Hook Form + Zod</Badge><h1 className="mt-3 text-3xl font-bold tracking-tight">Production-style form primitives.</h1><p className="mt-2 text-muted-foreground">FormProvider, Controller fields, error messages and schema validation stay composable.</p><Card className="mt-8"><CardHeader><CardTitle>Profile</CardTitle><CardDescription>Validate the shape with Zod while keeping UI concerns inside reusable primitives.</CardDescription></CardHeader><CardContent>
      <Form methods={methods} onSubmit={onSubmit}>
        <FormField name="name" render={({ field, error }) => <div className="grid gap-1.5"><FormLabel htmlFor="name" required>Name</FormLabel><FormControl><Input {...field} placeholder="Ada Lovelace" leftIcon={<UserRound className="size-4" />} error={error} /></FormControl><FormMessage>{error}</FormMessage></div>} />
        <FormField name="email" render={({ field, error }) => <div className="grid gap-1.5"><FormLabel htmlFor="email" required>Email</FormLabel><FormControl><Input {...field} type="email" placeholder="ada@example.com" leftIcon={<Mail className="size-4" />} error={error} /></FormControl><FormDescription>We use this to identify the workspace member.</FormDescription><FormMessage>{error}</FormMessage></div>} />
        <FormField name="bio" render={({ field, error }) => <div className="grid gap-1.5"><FormLabel htmlFor="bio">Bio</FormLabel><FormControl><Textarea {...field} placeholder="Tell the team a little about yourself." maxLength={240} showCount error={error} /></FormControl><FormMessage>{error}</FormMessage></div>} />
        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end"><Button type="button" variant="outline" onClick={() => methods.reset()}>Reset</Button><Button type="submit" loading={methods.formState.isSubmitting}>Save profile</Button></div>
      </Form>
    </CardContent></Card></div></Container></main>
  );
}
