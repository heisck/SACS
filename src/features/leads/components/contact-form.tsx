"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input, Select, Textarea } from "@/components/ui/input";
import { contactSchema, type ContactInput } from "@/features/leads/schemas/contact";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { degree: "undecided" }
  });

  const onSubmit = handleSubmit(async (values) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values)
    });
    if (!res.ok) {
      setError("root", {
        message: "Something went wrong. Please try again or email us."
      });
      return;
    }
    reset({ degree: "undecided" });
  });

  if (isSubmitSuccessful) {
    return (
      <div className="flex flex-col items-start gap-3 border border-line bg-surface p-8">
        <CircleCheck className="text-success" size={28} />
        <h2 className="font-display text-2xl">Thank you — we&apos;ll be in touch.</h2>
        <p className="text-pretty text-ink-soft">
          A SACS counsellor will reach out within one business day to schedule your
          consultation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <Field id="name" label="Full name" error={errors.name?.message}>
        <Input
          id="name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="Email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
        <Field id="phone" label="Phone" optional error={errors.phone?.message}>
          <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
        </Field>
      </div>

      <Field
        id="degree"
        label="What are you applying for?"
        error={errors.degree?.message}
      >
        <Select id="degree" {...register("degree")}>
          <option value="masters">Master&apos;s degree</option>
          <option value="phd">PhD</option>
          <option value="undecided">Not sure yet</option>
        </Select>
      </Field>

      <Field id="message" label="How can we help?" error={errors.message?.message}>
        <Textarea
          id="message"
          aria-invalid={!!errors.message}
          placeholder="Tell us about your goals, field of study, and timeline."
          {...register("message")}
        />
      </Field>

      {errors.root ? (
        <p className="text-sm text-danger">{errors.root.message}</p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? "Sending…" : "Request consultation"}
      </Button>
    </form>
  );
}
