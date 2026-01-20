import { ArrowLeft, Lock, Shield, Eye, Server } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-gray-300 font-sans">
      
      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        <Link href="/" className="flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors w-fit mb-8">
          <ArrowLeft size={20} /> Return to Hub
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-sm text-emerald-500 font-mono mb-12">LAST UPDATED: {new Date().toLocaleDateString()}</p>

          <div className="space-y-12 leading-relaxed">
            
            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Shield className="text-lime-500" /> 1. Introduction
              </h2>
              <p>
                Finnitrex Solutions Ltd ("we", "us", or "our") respects your privacy and is committed to protecting your personal data. 
                This privacy policy will inform you as to how we look after your personal data when you visit our website (finnitrex.com) 
                or use our services, and tells you about your privacy rights and how the law protects you.
              </p>
              <p>
                We operate from <strong>483 Green Lanes, London, N13 4BS</strong>. We are the controller and responsible for your personal data.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Eye className="text-lime-500" /> 2. Data We Collect
              </h2>
              <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
              <ul className="list-disc pl-6 space-y-2 marker:text-lime-500">
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, and operating system.</li>
                <li><strong>Usage Data:</strong> includes information about how you use our website and services.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Server className="text-lime-500" /> 3. How We Use Your Data
              </h2>
              <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2 marker:text-lime-500">
                <li>To register you as a new customer or project partner.</li>
                <li>To process and deliver your order including: Manage payments, fees and charges.</li>
                <li>To manage our relationship with you which will include: Notifying you about changes to our terms or privacy policy.</li>
                <li>To administer and protect our business and this website (including troubleshooting, data analysis, testing, system maintenance, support, reporting and hosting of data).</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Lock className="text-lime-500" /> 4. Data Security
              </h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. 
                In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white">5. Your Legal Rights</h2>
              <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
              <ul className="list-disc pl-6 space-y-2 marker:text-lime-500">
                <li>Request access to your personal data.</li>
                <li>Request correction of your personal data.</li>
                <li>Request erasure of your personal data.</li>
                <li>Object to processing of your personal data.</li>
                <li>Request restriction of processing your personal data.</li>
                <li>Request transfer of your personal data.</li>
                <li>Right to withdraw consent.</li>
              </ul>
            </section>

            {/* Contact Info Footer */}
            <div className="border-t border-gray-800 pt-8 mt-12">
              <h3 className="text-white font-bold mb-4">Contact Us regarding GDPR</h3>
              <p>If you have any questions about this privacy policy or our privacy practices, please contact us:</p>
              <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-800 inline-block">
                <p className="text-white"><strong>Finnitrex Solutions Ltd</strong></p>
                <p>483 Green Lanes</p>
                <p>London, N13 4BS</p>
                <p>United Kingdom</p>
                <p className="mt-4 text-lime-400 font-mono">+44 7521 511800</p>
                <p className="text-lime-400 font-mono">info@finnitrex.com</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
