"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContractorRegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);

  const handleIdCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setSubmitMessage("Please upload an image file (JPG, PNG, etc.)");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitMessage("Image must be less than 5MB");
        return;
      }

      setIdCardFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdCardPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setSubmitMessage("");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitMessage("");

    // Validate ID card upload
    if (!idCardFile) {
      setSubmitMessage("Please upload a photo of your driver's license or ID card");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData(e.target as HTMLFormElement);

      const userData = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        contractorType: formData.get("contractorType") as string,
        company: formData.get("company") as string || "Independent Worker",
        experience: formData.get("experience") as string,
        serviceAreas: formData.get("serviceAreas") as string,
        availability: formData.get("availability") as string,
        licenseNumber: formData.get("licenseNumber") as string || "Not applicable",
        insurance: formData.get("insurance") as string || "Will discuss",
        references: formData.get("references") as string || "Available upon request",
        specialties: Array.from(formData.getAll("specialties")).join(", ") || "General labor",
        additionalInfo: formData.get("additionalInfo") as string,
        idCardUploaded: idCardFile ? "Yes - " + idCardFile.name : "No",
        idCardSize: idCardFile ? (idCardFile.size / 1024).toFixed(2) + " KB" : "N/A"
      };

      if (!userData.firstName || !userData.lastName || !userData.phone || !userData.contractorType) {
        setSubmitMessage("Please fill in the required fields (Name, Phone, and Worker Type).");
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/notify-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userType: "contractor",
          userData: userData
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage("🎉 Application submitted successfully! We'll review your information and contact you within 24-48 hours to discuss opportunities.");
        (e.target as HTMLFormElement).reset();
        setIdCardFile(null);
        setIdCardPreview(null);
      } else {
        setSubmitMessage("There was an error submitting your application. Please try again or call us directly at (555) 123-4567");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setSubmitMessage("There was an error submitting your application. Please try again or call us directly at (555) 123-4567");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            ← Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🔨</span>
            </div>
            <span className="text-2xl font-bold text-slate-900">Join Our Team</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Worker Application</h1>
          <p className="text-slate-600">We welcome all skilled workers - experience and reliability matter most</p>
        </div>

        <div className="bg-white shadow-lg border-0 rounded-lg">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-center">Apply to Work With Us</h2>
            <p className="text-center text-slate-600">Simple application - we value skills and work ethic over paperwork</p>
          </div>
          <div className="p-6">
            {submitMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm">{submitMessage}</p>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                  👤 Basic Information <span className="text-red-500 ml-1">*</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">First Name <span className="text-red-500">*</span></label>
                    <input id="firstName" name="firstName" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">Last Name <span className="text-red-500">*</span></label>
                    <input id="lastName" name="lastName" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Smith" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone Number <span className="text-red-500">*</span></label>
                  <input id="phone" name="phone" type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="(555) 123-4567" required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email (Optional)</label>
                  <input id="email" name="email" type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="your-email@example.com (if you have one)" />
                  <p className="text-xs text-slate-500">Email helps us send updates, but phone contact is fine too</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="serviceAreas" className="text-sm font-medium">Where can you work? <span className="text-red-500">*</span></label>
                  <input id="serviceAreas" name="serviceAreas" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Houston, TX and surrounding areas" required />
                </div>
              </div>

              <hr />

              {/* ID Verification Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                  🪪 Identity Verification <span className="text-red-500 ml-1">*</span>
                </h3>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900 font-medium mb-2">📸 Upload Photo ID Required</p>
                  <p className="text-xs text-blue-800">
                    Please upload a clear photo of ONE of the following documents:
                  </p>
                  <ul className="text-xs text-blue-800 mt-2 space-y-1 ml-4">
                    <li>• Driver's License (front and back)</li>
                    <li>• State ID Card</li>
                    <li>• U.S. Passport</li>
                    <li>• Passport Card</li>
                    <li>• Permanent Resident Card (Green Card)</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <label htmlFor="idCard" className="text-sm font-medium">
                    Upload Photo ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="idCard"
                    accept="image/*"
                    onChange={handleIdCardUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    required
                  />
                  <p className="text-xs text-slate-500">
                    Accepted formats: JPG, PNG, HEIC. Maximum size: 5MB
                  </p>
                </div>

                {idCardPreview && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-green-600">✓ ID Uploaded Successfully</p>
                    <div className="border-2 border-green-200 rounded-lg p-2 bg-green-50">
                      <img
                        src={idCardPreview}
                        alt="ID Card Preview"
                        className="max-w-full h-auto max-h-64 mx-auto rounded"
                      />
                      <p className="text-xs text-center text-green-700 mt-2">
                        {idCardFile?.name} ({(idCardFile!.size / 1024).toFixed(1)} KB)
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIdCardFile(null);
                        setIdCardPreview(null);
                        const fileInput = document.getElementById('idCard') as HTMLInputElement;
                        if (fileInput) fileInput.value = '';
                      }}
                      className="text-sm text-red-600 hover:text-red-700 underline"
                    >
                      Remove and upload different ID
                    </button>
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-xs text-amber-900">
                    <strong>🔒 Privacy & Security:</strong> Your ID is only used for verification purposes.
                    We protect your personal information and comply with all privacy laws. Your photo ID will be
                    securely stored and only accessed by authorized personnel for verification.
                  </p>
                </div>
              </div>

              <hr />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                  💼 Work Experience
                </h3>

                <div className="space-y-2">
                  <label htmlFor="contractorType" className="text-sm font-medium">What type of worker are you? <span className="text-red-500">*</span></label>
                  <select id="contractorType" name="contractorType" className="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                    <option value="">Select your situation</option>
                    <option value="licensed-contractor">Licensed Contractor</option>
                    <option value="experienced-unlicensed">Experienced Worker (No License)</option>
                    <option value="handyman">Handyman/General Labor</option>
                    <option value="apprentice">Apprentice/Learning</option>
                    <option value="helper">Construction Helper</option>
                    <option value="specialist">Specialist (Specific Skills)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">Company Name (Optional)</label>
                  <input id="company" name="company" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Leave blank if you work independently" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="experience" className="text-sm font-medium">Years of Experience</label>
                    <select id="experience" name="experience" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Select experience</option>
                      <option value="new">New to construction</option>
                      <option value="1-2">1-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="availability" className="text-sm font-medium">Availability</label>
                    <select id="availability" name="availability" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Select availability</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="weekends">Weekends only</option>
                      <option value="flexible">Flexible schedule</option>
                      <option value="project-based">Project-based</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">What kind of work can you do? (Check all that apply)</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      "General Labor", "Demolition", "Framing", "Drywall", "Painting", "Flooring",
                      "Tile Work", "Basic Plumbing", "Basic Electrical", "Landscaping", "Cleanup", "Heavy Lifting"
                    ].map((specialty) => (
                      <label key={specialty} className="flex items-center space-x-2">
                        <input type="checkbox" name="specialties" value={specialty} className="w-4 h-4" />
                        <span className="text-sm text-slate-600">{specialty}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <hr />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Additional Information (Optional)</h3>

                <div className="space-y-2">
                  <label htmlFor="licenseNumber" className="text-sm font-medium">License Number</label>
                  <input id="licenseNumber" name="licenseNumber" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="TX-123456789" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="insurance" className="text-sm font-medium">Insurance/Documentation</label>
                  <textarea id="insurance" name="insurance" rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Describe any insurance, certifications, or documentation you have (or write 'None' - that's okay!)"></textarea>
                </div>

                <div className="space-y-2">
                  <label htmlFor="references" className="text-sm font-medium">References/Previous Work</label>
                  <textarea id="references" name="references" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Names and phone numbers of people who can vouch for your work (previous employers, clients, etc.)"></textarea>
                </div>

                <div className="space-y-2">
                  <label htmlFor="additionalInfo" className="text-sm font-medium">Anything else you want us to know?</label>
                  <textarea id="additionalInfo" name="additionalInfo" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Tell us about your skills, what you're looking for, your situation, etc."></textarea>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms" className="w-4 h-4" required />
                <label htmlFor="terms" className="text-sm text-slate-600">
                  I understand that Flipco Capital will review my application and contact me about opportunities.
                  All work is paid fairly and on time. <span className="text-red-500">*</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Submitting Application..." : "Submit Application"}
              </button>
            </form>

            <hr className="my-6" />

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">💡 What We Look For:</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• <strong>Reliability</strong> - Show up on time, do what you say</li>
                <li>• <strong>Work ethic</strong> - Take pride in your work</li>
                <li>• <strong>Willingness to learn</strong> - We teach what you need to know</li>
                <li>• <strong>Safety conscious</strong> - Keep yourself and others safe</li>
                <li>• <strong>Team player</strong> - Work well with others</li>
              </ul>
              <p className="text-xs text-green-700 mt-3">
                <strong>Note:</strong> We comply with all employment laws and pay fair wages.
                Documentation requirements vary by position and local regulations.
              </p>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-slate-600">
                Already applied?{" "}
                <Link href="/contractor-login" className="text-green-600 hover:text-green-700 font-medium">
                  Check your application status
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            Questions? Call or text us at (555) 123-4567 or email contractors@flipcocapital.com
          </p>
        </div>
      </div>
    </div>
  );
}
