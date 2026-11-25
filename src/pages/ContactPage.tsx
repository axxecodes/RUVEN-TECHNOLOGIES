import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Copy,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { buildWhatsAppUrl, SITE_CONFIG } from '../config/site';
import { ServiceId } from '../data/content';

interface ContactPageProps {
  preselectedService?: ServiceId | null;
}

interface FormValues {
  name: string;
  businessName: string;
  email: string;
  whatsapp: string;
  websiteOrSocial: string;
  need: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const NEED_OPTIONS: { value: string; label: string }[] = [
  { value: 'ugc-creative', label: 'UGC & Creative Advertising' },
  { value: 'paid-social', label: 'Paid Social & Customer Acquisition (Meta / TikTok)' },
  { value: 'whatsapp-automation', label: 'WhatsApp Automation & Cart Recovery' },
  { value: 'growth-systems', label: 'Full Growth Strategy & Conversion System' },
  { value: 'general', label: 'Not sure yet — let us diagnose together' },
];

export const ContactPage: React.FC<ContactPageProps> = ({ preselectedService }) => {
  const [values, setValues] = useState<FormValues>({
    name: '',
    businessName: '',
    email: '',
    whatsapp: '',
    websiteOrSocial: '',
    need: preselectedService ?? 'growth-systems',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'no-backend' | 'error'>(
    'idle'
  );
  const [serverError, setServerError] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [copiedBrief, setCopiedBrief] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setValues((prev) => ({ ...prev, need: preselectedService }));
    }
  }, [preselectedService]);

  const validate = (data: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!data.name.trim() || data.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name.';
    }

    if (!data.businessName.trim()) {
      nextErrors.businessName = 'Please enter your business or brand name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    const digitsOnly = data.whatsapp.replace(/[^\d]/g, '');
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      nextErrors.whatsapp = 'Enter a valid WhatsApp number with country code (e.g. +234...).';
    }

    if (data.websiteOrSocial.trim()) {
      const val = data.websiteOrSocial.trim();
      const looksLikeUrlOrHandle =
        val.startsWith('@') ||
        /^https?:\/\/.+\..+/i.test(val) ||
        /^[a-z0-9.-]+\.[a-z]{2,}/i.test(val);
      if (!looksLikeUrlOrHandle) {
        nextErrors.websiteOrSocial = 'Enter a valid website URL or @handle.';
      }
    }

    if (!data.need) {
      nextErrors.need = 'Select what your business needs help with.';
    }

    if (!data.message.trim() || data.message.trim().length < 15) {
      nextErrors.message = 'Share a few details (at least 15 characters) about your goals.';
    }

    return nextErrors;
  };

  const formatInquiryText = (): string => {
    const selectedLabel =
      NEED_OPTIONS.find((item) => item.value === values.need)?.label ?? values.need;
    return [
      'New RUVEN Inquiry',
      `Name: ${values.name.trim()}`,
      `Business: ${values.businessName.trim()}`,
      `Email: ${values.email.trim()}`,
      `WhatsApp: ${values.whatsapp.trim()}`,
      `Website/Social: ${values.websiteOrSocial.trim() || 'Not provided'}`,
      `Focus: ${selectedLabel}`,
      `Message: ${values.message.trim()}`,
    ].join('\n');
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
    if (status !== 'idle') {
      setStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('error');
      return;
    }

    if (!SITE_CONFIG.contactEndpoint) {
      setStatus('no-backend');
      return;
    }

    setStatus('submitting');
    try {
      const selectedLabel =
        NEED_OPTIONS.find((item) => item.value === values.need)?.label ?? values.need;

      const payload = SITE_CONFIG.contactEndpoint.includes('web3forms.com')
        ? {
            access_key: SITE_CONFIG.web3formsAccessKey,
            subject: `New RUVEN Inquiry — ${values.businessName.trim()}`,
            from_name: 'RUVEN Website',
            name: values.name.trim(),
            business_name: values.businessName.trim(),
            email: values.email.trim(),
            whatsapp: values.whatsapp.trim(),
            website_or_social: values.websiteOrSocial.trim() || 'Not provided',
            service_focus: selectedLabel,
            message: values.message.trim(),
          }
        : values;

      const response = await fetch(SITE_CONFIG.contactEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || result.success === false) {
        throw new Error(
          result.message || `Submission returned status ${response.status}`
        );
      }

      setSubmittedName(values.name.trim());
      setValues({
        name: '',
        businessName: '',
        email: '',
        whatsapp: '',
        websiteOrSocial: '',
        need: preselectedService ?? 'growth-systems',
        message: '',
      });
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setServerError(
        err instanceof Error
          ? err.message
          : 'Unable to submit your inquiry right now. Please try WhatsApp or direct email.'
      );
    }
  };

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(formatInquiryText());
      setCopiedBrief(true);
      window.setTimeout(() => setCopiedBrief(false), 2500);
    } catch {
      setCopiedBrief(false);
    }
  };

  const mailtoHref = `mailto:${SITE_CONFIG.contact.email}?subject=${encodeURIComponent(
    `RUVEN Inquiry — ${values.businessName || 'New Project'}`
  )}&body=${encodeURIComponent(formatInquiryText())}`;

  const whatsappHref = buildWhatsAppUrl(
    values.name
      ? formatInquiryText()
      : 'Hi RUVEN, I would like to discuss customer acquisition and growth for my business.'
  );

  return (
    <div>
      {/* Header */}
      <section className="bg-[#0B0C0E] text-[#F4F2EC] architectural-grid-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-16 md:pt-24 md:pb-20">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-medium text-[#C8FF2E]">
              Contact
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.04] text-balance">
              Let&apos;s talk about what&apos;s next.
            </h1>
            <p className="text-lg text-[#A5AAB4] leading-relaxed">
              Tell us a little about your business, what you&apos;re trying to grow, and where
              your current customer journey slows down.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="bg-[#F4F2EC] text-[#0B0C0E]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-[#FAF9F5] border border-[#0B0C0E]/15 rounded-sm p-6 sm:p-8 md:p-10">
              {!SITE_CONFIG.contactEndpoint && (
                <div className="mb-8 p-4 bg-[#0B0C0E] text-[#F4F2EC] rounded-sm border border-[#0B0C0E] text-xs leading-relaxed flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-[#C8FF2E] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="font-semibold text-[#C8FF2E]">Integration Notice:</span>{' '}
                    Form validation runs locally, and no backend email delivery endpoint is
                    configured yet. Set{' '}
                    <code className="font-mono text-[#C8FF2E]">VITE_CONTACT_ENDPOINT</code> in your
                    environment (or <code className="font-mono text-[#C8FF2E]">contactEndpoint</code>{' '}
                    in <code className="font-mono">src/config/site.ts</code>) to connect Formspree,
                    Resend, or a custom API route.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-[#474B54] mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={values.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Adaeze Okafor"
                      aria-invalid={Boolean(errors.name)}
                      className={`w-full min-h-[46px] px-3.5 bg-white border rounded-sm text-sm text-[#0B0C0E] placeholder:text-[#474B54]/50 ${
                        errors.name
                          ? 'border-red-600'
                          : 'border-[#0B0C0E]/20 focus:border-[#0B0C0E]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-700">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-business"
                      className="block text-xs font-medium text-[#474B54] mb-2"
                    >
                      Business Name *
                    </label>
                    <input
                      id="contact-business"
                      type="text"
                      value={values.businessName}
                      onChange={(e) => handleChange('businessName', e.target.value)}
                      placeholder="Kora Skin Co."
                      aria-invalid={Boolean(errors.businessName)}
                      className={`w-full min-h-[46px] px-3.5 bg-white border rounded-sm text-sm text-[#0B0C0E] placeholder:text-[#474B54]/50 ${
                        errors.businessName
                          ? 'border-red-600'
                          : 'border-[#0B0C0E]/20 focus:border-[#0B0C0E]'
                      }`}
                    />
                    {errors.businessName && (
                      <p className="mt-1.5 text-xs text-red-700">{errors.businessName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-[#474B54] mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={values.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="you@brand.com"
                      aria-invalid={Boolean(errors.email)}
                      className={`w-full min-h-[46px] px-3.5 bg-white border rounded-sm text-sm text-[#0B0C0E] placeholder:text-[#474B54]/50 ${
                        errors.email
                          ? 'border-red-600'
                          : 'border-[#0B0C0E]/20 focus:border-[#0B0C0E]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-700">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-whatsapp"
                      className="block text-xs font-medium text-[#474B54] mb-2"
                    >
                      WhatsApp Number *
                    </label>
                    <input
                      id="contact-whatsapp"
                      type="tel"
                      value={values.whatsapp}
                      onChange={(e) => handleChange('whatsapp', e.target.value)}
                      placeholder="+234 800 000 0000"
                      aria-invalid={Boolean(errors.whatsapp)}
                      className={`w-full min-h-[46px] px-3.5 bg-white border rounded-sm text-sm text-[#0B0C0E] placeholder:text-[#474B54]/50 ${
                        errors.whatsapp
                          ? 'border-red-600'
                          : 'border-[#0B0C0E]/20 focus:border-[#0B0C0E]'
                      }`}
                    />
                    {errors.whatsapp && (
                      <p className="mt-1.5 text-xs text-red-700">{errors.whatsapp}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-website"
                    className="block text-xs font-medium text-[#474B54] mb-2"
                  >
                    Website or Social Media Link
                  </label>
                  <input
                    id="contact-website"
                    type="text"
                    value={values.websiteOrSocial}
                    onChange={(e) => handleChange('websiteOrSocial', e.target.value)}
                    placeholder="https://yourstore.com or @yourbrand"
                    aria-invalid={Boolean(errors.websiteOrSocial)}
                    className={`w-full min-h-[46px] px-3.5 bg-white border rounded-sm text-sm text-[#0B0C0E] placeholder:text-[#474B54]/50 ${
                      errors.websiteOrSocial
                        ? 'border-red-600'
                        : 'border-[#0B0C0E]/20 focus:border-[#0B0C0E]'
                    }`}
                  />
                  {errors.websiteOrSocial && (
                    <p className="mt-1.5 text-xs text-red-700">{errors.websiteOrSocial}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-need"
                    className="block text-xs font-medium text-[#474B54] mb-2"
                  >
                    What does your business need help with? *
                  </label>
                  <select
                    id="contact-need"
                    value={values.need}
                    onChange={(e) => handleChange('need', e.target.value)}
                    className="w-full min-h-[46px] px-3.5 bg-white border border-[#0B0C0E]/20 focus:border-[#0B0C0E] rounded-sm text-sm text-[#0B0C0E]"
                  >
                    {NEED_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-[#474B54] mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={values.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell us what you sell, what channels you run today, and where sales tend to stall."
                    aria-invalid={Boolean(errors.message)}
                    className={`w-full p-3.5 bg-white border rounded-sm text-sm text-[#0B0C0E] placeholder:text-[#474B54]/50 ${
                      errors.message
                        ? 'border-red-600'
                        : 'border-[#0B0C0E]/20 focus:border-[#0B0C0E]'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-700">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[50px] px-7 bg-[#0B0C0E] text-[#F4F2EC] hover:bg-[#181B20] disabled:opacity-60 font-semibold text-sm rounded-sm transition-colors duration-150"
                >
                  <span>{status === 'submitting' ? 'Sending...' : 'Send Inquiry'}</span>
                </button>

                {status === 'error' && (
                  <div
                    role="alert"
                    className="p-4 bg-red-50 border border-red-200 rounded-sm text-sm text-red-900 flex items-start gap-2.5"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-700" aria-hidden="true" />
                    <span>
                      {serverError || 'Please review the highlighted fields before continuing.'}
                    </span>
                  </div>
                )}

                {status === 'sent' && (
                  <div
                    role="status"
                    className="p-4 bg-[#0B0C0E] text-[#F4F2EC] border border-[#C8FF2E] rounded-sm text-sm flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#C8FF2E] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-[#C8FF2E]">Inquiry sent.</p>
                      <p className="text-[#A5AAB4] mt-1">
                        Thanks, {submittedName}. Your message has been delivered to RUVEN.
                      </p>
                    </div>
                  </div>
                )}

                {status === 'no-backend' && (
                  <div
                    role="status"
                    className="p-5 bg-[#0B0C0E] text-[#F4F2EC] border border-[#C8FF2E]/70 rounded-sm space-y-4"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-[#C8FF2E] shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="space-y-1 text-sm">
                        <p className="font-semibold text-[#C8FF2E]">
                          Form validated — backend endpoint not connected yet.
                        </p>
                        <p className="text-[#A5AAB4] leading-relaxed">
                          Nothing was submitted to a fake server. Connect{' '}
                          <code className="font-mono text-[#F4F2EC]">VITE_CONTACT_ENDPOINT</code>{' '}
                          to enable direct delivery, or send your validated inquiry immediately
                          using one of the options below:
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      <button
                        type="button"
                        onClick={handleCopyBrief}
                        className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#181B20] border border-white/15 hover:border-[#C8FF2E] rounded-sm text-xs font-medium text-[#F4F2EC]"
                      >
                        <Copy className="w-3.5 h-3.5 text-[#C8FF2E]" aria-hidden="true" />
                        <span>{copiedBrief ? 'Copied Brief' : 'Copy Inquiry Text'}</span>
                      </button>

                      <a
                        href={mailtoHref}
                        className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#181B20] border border-white/15 hover:border-[#C8FF2E] rounded-sm text-xs font-medium text-[#F4F2EC]"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#C8FF2E]" aria-hidden="true" />
                        <span>Open Email Client</span>
                      </a>

                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#C8FF2E] text-[#0B0C0E] rounded-sm text-xs font-semibold"
                      >
                        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Send via WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Direct WhatsApp & Next Steps Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-7 md:p-8 bg-[#0B0C0E] text-[#F4F2EC] rounded-sm border border-[#0B0C0E] space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-[#C8FF2E]">
                    Prefer WhatsApp?
                  </p>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Start a direct conversation.
                  </h2>
                  <p className="text-sm text-[#A5AAB4] leading-relaxed">
                    If you want to talk through your creative, ad spend, or WhatsApp sales flow
                    without filling out a form, message us directly.
                  </p>
                </div>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-between min-h-[52px] px-5 bg-[#C8FF2E] text-[#0B0C0E] font-semibold text-sm rounded-sm hover:bg-[#D6FF5C] transition-colors duration-150"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Message RUVEN on WhatsApp</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs text-[#A5AAB4]">
                  <div>
                    <span className="block text-[#A5AAB4]/80 mb-0.5">Direct Email</span>
                    <a
                      href={`mailto:${SITE_CONFIG.contact.email}`}
                      className="text-sm text-[#F4F2EC] hover:text-[#C8FF2E] transition-colors break-all"
                    >
                      {SITE_CONFIG.contact.email}
                    </a>
                  </div>
                  <p className="font-mono text-[11px] text-[#A5AAB4]">
                    WhatsApp{' '}
                    {SITE_CONFIG.contact.isWhatsappPlaceholder ? 'placeholder' : 'number'}:{' '}
                    {SITE_CONFIG.contact.whatsappDisplay}
                  </p>
                </div>
              </div>

              <div className="p-7 md:p-8 bg-[#FAF9F5] border border-[#0B0C0E]/15 rounded-sm space-y-5">
                <h3 className="text-xs font-medium text-[#474B54]">
                  What Happens Next
                </h3>
                <ol className="space-y-4 text-sm text-[#474B54]">
                  <li className="flex gap-3">
                    <span className="font-mono tabular-nums text-xs text-[#0B0C0E] font-semibold">
                      01.
                    </span>
                    <span>
                      We review your current creative, ad channels, and how inquiries are handled
                      today.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono tabular-nums text-xs text-[#0B0C0E] font-semibold">
                      02.
                    </span>
                    <span>
                      We come back with practical observations on where attention is leaking and
                      which system fits your stage.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono tabular-nums text-xs text-[#0B0C0E] font-semibold">
                      03.
                    </span>
                    <span>
                      If it makes sense for both sides, we map out scope, creative cadence, and
                      automation setup.
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
