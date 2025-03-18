export const metadata = {
  title: 'Privacy Policy - Ultimate CSS Gradient Generator',
  description: 'Privacy Policy for the Ultimate CSS Gradient Generator tool',
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <p className="mb-4">
            Thank you for using the Ultimate CSS Gradient Generator. This Privacy Policy outlines how we collect, use, and protect your information when you use our website.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">Information We Collect</h2>
          
          <h3 className="text-lg font-medium mt-4 mb-2">Information You Provide</h3>
          <p className="mb-4">
            The Ultimate CSS Gradient Generator is designed to function without requiring you to create an account or provide personal information. All gradient configurations are stored locally in your browser using localStorage.
          </p>
          
          <h3 className="text-lg font-medium mt-4 mb-2">Automatically Collected Information</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Usage Data: We may collect anonymous information about how you interact with our website, such as pages visited and features used.</li>
            <li>Device Information: We collect information about your device, including browser type, operating system, and screen resolution to optimize your experience.</li>
            <li>Cookies: We use cookies to enhance your experience. You can control cookies through your browser settings.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
          <p className="mb-4">We use the collected information to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide, maintain, and improve our service</li>
            <li>Analyze usage patterns to enhance user experience</li>
            <li>Fix bugs and troubleshoot issues</li>
            <li>Prevent fraud and abuse</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">Data Sharing and Disclosure</h2>
          <p className="mb-4">
            We do not sell or rent your personal information to third parties. We may share anonymous, aggregated information with analytics providers to help us improve our service.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">Data Security</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">Third-Party Services</h2>
          <p className="mb-4">
            Our website may contain links to third-party websites or services that are not owned or controlled by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">Children Privacy</h2>
          <p className="mb-4">
            Our service is not directed to anyone under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the `last updated` date.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at:<br />
            <a href="mailto:chordragon@duck.com" className="text-primary hover:underline">chordragon@duck.com</a>
          </p>
        </div>
      </div>
    </main>
  )
} 