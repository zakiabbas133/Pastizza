export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  rating?: number;
  category?: string;
}

export interface ContactFormResult {
  success: boolean;
  message: string;
}

export async function submitContactForm(data: ContactFormData): Promise<ContactFormResult> {
  // Simulated API call — replace with real endpoint later
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (!data.name || !data.email || !data.message) {
    return { success: false, message: 'Please fill in all required fields.' };
  }

  console.info('[ContactService] Form submission:', data);

  return {
    success: true,
    message: 'Thank you for your feedback. We truly appreciate you taking the time to help us improve.',
  };
}
