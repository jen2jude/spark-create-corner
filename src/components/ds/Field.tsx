import type { ReactNode, SelectHTMLAttributes } from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type BaseFieldProps = {
  label: string;
  hint?: string | undefined;
  error?: string | undefined;
  required?: boolean | undefined;
  className?: string | undefined;
};

function FieldShell({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
}: BaseFieldProps & { id: string; children: ReactNode }) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="text-xs font-medium text-foreground">
        {label}
        {required ? <span className="ml-1 text-accent">*</span> : null}
      </Label>
      {children}
      {hint && !error ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      {error ? (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Labelled text input. Always labelled, always describes its own errors. */
export function TextField({
  label,
  hint,
  error,
  required,
  className,
  multiline,
  ...props
}: BaseFieldProps &
  React.InputHTMLAttributes<HTMLInputElement> & { multiline?: boolean | undefined }) {
  const id = useId();
  const describedBy = error ?? hint ? `${id}-desc` : undefined;
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      {multiline ? (
        <Textarea
          id={id}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          required={required}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <Input
          id={id}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          required={required}
          {...props}
        />
      )}
    </FieldShell>
  );
}

/** Labelled native select — the simple dropdown for forms. */
export function SelectField({
  label,
  hint,
  error,
  required,
  className,
  options,
  ...props
}: BaseFieldProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: ReadonlyArray<{ value: string; label: string }>;
  }) {
  const id = useId();
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <select
        id={id}
        aria-invalid={!!error}
        required={required}
        className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground"
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
