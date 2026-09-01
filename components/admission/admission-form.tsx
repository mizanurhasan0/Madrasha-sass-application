"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PublicServiceLayout } from "@/components/public/public-service-layout";
import { InfoCard } from "@/components/public/info-card";
import { StepIndicator } from "@/components/admission/step-indicator";
import {
  GuardianStep,
  ProgramStep,
  ReviewStep,
  StudentInfoStep,
} from "@/components/admission/admission-form-fields";
import { Button } from "@/components/ui/button";
import { classes } from "@/data/academic";
import { admissionService } from "@/services/admission.service";
import {
  ADMISSION_FIELDS_BY_STEP,
  ADMISSION_STEPS,
  admissionSchema,
  type AdmissionFormValues,
} from "@/lib/admission/constants";

export function AdmissionForm() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [applicationNo, setApplicationNo] = useState<string | null>(null);

  const form = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionSchema),
    defaultValues: { gender: "male" },
  });

  const values = form.watch();
  const programName = classes.find((c) => c.id === values.classId)?.name;

  const nextStep = async () => {
    if (await form.trigger(ADMISSION_FIELDS_BY_STEP[step])) {
      setStep((s) => Math.min(s + 1, ADMISSION_STEPS.length - 1));
    }
  };

  const onSubmit = async (data: AdmissionFormValues) => {
    setSubmitting(true);
    const res = await admissionService.submitApplication(data);
    setSubmitting(false);
    if (res.success) {
      setApplicationNo(res.data.applicationNo);
      toast.success("Application submitted successfully");
    } else {
      toast.error("Failed to submit application");
    }
  };

  if (applicationNo) {
    return (
      <PublicServiceLayout
        eyebrow="Admission"
        title="Application Submitted"
        description="Save your application ID to track status."
        maxWidth="md"
      >
        <InfoCard className="text-center">
          <CheckCircle2 className="mx-auto size-12 text-status-success" />
          <p className="mt-6 font-mono text-2xl font-bold text-primary">{applicationNo}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button render={<Link href={`/admission/status?id=${applicationNo}`} />}>
              Track Status
            </Button>
            <Button variant="outline" render={<Link href="/" />}>
              Back to Home
            </Button>
          </div>
        </InfoCard>
      </PublicServiceLayout>
    );
  }

  const stepContent = [
    <StudentInfoStep key="student" form={form} values={values} />,
    <ProgramStep key="program" form={form} values={values} />,
    <GuardianStep key="guardian" form={form} />,
    <ReviewStep key="review" values={values} programName={programName} />,
  ][step];

  return (
    <PublicServiceLayout
      eyebrow="Admission"
      title="Apply Online"
      description="Complete the form below to apply for the 2025–2026 academic session."
    >
      <StepIndicator steps={ADMISSION_STEPS} current={step} />
      <InfoCard>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {stepContent}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              disabled={step === 0}
              onClick={() => setStep((s) => s - 1)}
            >
              Back
            </Button>
            {step < ADMISSION_STEPS.length - 1 ? (
              <Button type="button" onClick={nextStep}>
                Continue
              </Button>
            ) : (
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 size-4 animate-spin" />}
                Submit Application
              </Button>
            )}
          </div>
        </form>
      </InfoCard>
    </PublicServiceLayout>
  );
}
