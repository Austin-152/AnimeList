import Navbar from "@/components/nav";
import Footer from "@/components/footer";
import "tailwindcss/tailwind.css";
import React, { useState } from 'react';

interface ReportForm {
  type: string;
  title: string;
  description: string;
  url?: string;
  email?: string;
  priority: string;
}

export default function Report() {
  const [formData, setFormData] = useState<ReportForm>({
    type: '',
    title: '',
    description: '',
    url: '',
    email: '',
    priority: 'medium',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with your actual API call
      // const response = await fetch('/api/report', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubmitted(true);
      setLoading(false);
    } catch (err) {
      setError('Failed to submit report. Please try again.');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <Navbar />
        <div className="flex items-center justify-center px-4 py-16">
          <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">✅</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Report Submitted Successfully!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for helping us improve. We'll review your report and take appropriate action.
            </p>
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-8">
              <p className="text-sm text-gray-700">
                <strong>What happens next?</strong><br />
                Our team will review your report within 24-48 hours. If we need more information, we'll contact you via email.
              </p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  type: '',
                  title: '',
                  description: '',
                  url: '',
                  email: '',
                  priority: 'medium',
                });
              }}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
            >
              Submit Another Report
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navbar />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-16 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-4">🚨</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Report an Issue</h1>
          <p className="text-lg md:text-xl text-orange-100 max-w-2xl mx-auto">
            Help us improve by reporting bugs, broken links, inappropriate content, or suggesting new features.
          </p>
        </div>
      </section>

      {/* Report Types Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-2">🐛</div>
            <h3 className="font-bold text-gray-800">Bug Report</h3>
            <p className="text-sm text-gray-600 mt-2">Technical issues</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-2">🔗</div>
            <h3 className="font-bold text-gray-800">Broken Link</h3>
            <p className="text-sm text-gray-600 mt-2">Non-working videos</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-2">⚠️</div>
            <h3 className="font-bold text-gray-800">Content Issue</h3>
            <p className="text-sm text-gray-600 mt-2">Inappropriate content</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-2">💡</div>
            <h3 className="font-bold text-gray-800">Suggestion</h3>
            <p className="text-sm text-gray-600 mt-2">Feature requests</p>
          </div>
        </div>
      </section>

      {/* Report Form Section */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Submit a Report</h2>
          <p className="text-gray-600 mb-8">Please provide as much detail as possible to help us address your concern.</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Report Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Report Type <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
              >
                <option value="">Select a type...</option>
                <option value="bug">🐛 Bug Report</option>
                <option value="broken-link">🔗 Broken Link</option>
                <option value="content">⚠️ Content Issue</option>
                <option value="suggestion">💡 Suggestion</option>
                <option value="other">📝 Other</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Priority Level
              </label>
              <div className="flex gap-3">
                {[
                  { value: 'low', label: 'Low', color: 'bg-blue-100 text-blue-700 border-blue-300' },
                  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
                  { value: 'high', label: 'High', color: 'bg-red-100 text-red-700 border-red-300' },
                ].map((priority) => (
                  <button
                    key={priority.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority: priority.value })}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold border-2 transition-all ${
                      formData.priority === priority.value
                        ? priority.color
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {priority.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Brief summary of the issue..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Please provide detailed information about the issue..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Related URL (Optional)
              </label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://example.com/page"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email (Optional)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
              />
              <p className="text-sm text-gray-500 mt-2">We'll only use this to follow up on your report.</p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform ${
                  loading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white hover:shadow-lg hover:scale-105'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Submitting...
                  </span>
                ) : (
                  'Submit Report'
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>ℹ️</span> Important Information
            </h3>
            <ul className="space-y-3 text-orange-100">
              <li className="flex items-start gap-2">
                <span className="text-xl">•</span>
                <span>All reports are reviewed by our moderation team within 24-48 hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl">•</span>
                <span>Please be respectful and provide accurate information.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl">•</span>
                <span>False reports may result in account restrictions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl">•</span>
                <span>For urgent issues, please include your email for faster follow-up.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
    // Fetch any necessary data here
    // const res = await fetch('https://api.example.com/data');
    // const data = await res.json();

    return {
        props: {
            // data,
        },
        revalidate: 10, // Revalidate every 10 seconds (optional)
    };
}
