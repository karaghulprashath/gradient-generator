export const metadata = {
  title: 'Privacy Policy - Ultimate CSS Gradient Generator',
  description: 'Privacy Policy for the Ultimate CSS Gradient Generator tool',
}

export default function PrivacyPolicy() {
  return (
    <main className="container mx-auto px-4 py-8 prose prose-sm max-w-none">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <section>
        <h2>Information Collection and Use</h2>
        <p>
          We collect information that you voluntarily provide when using our gradient generator tool. This includes:
        </p>
        <ul>
          <li>Browser type and version</li>
          <li>Usage data and preferences</li>
          <li>Gradient configurations you create</li>
        </ul>
      </section>

      <section>
        <h2>Data Storage</h2>
        <p>
          Your gradient configurations and preferences are stored locally in your browser&apos;s storage. We do not
          transmit or store this data on our servers.
        </p>
      </section>

      <section>
        <h2>Cookies and Tracking</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on our website and hold certain
          information. Cookies are files with small amounts of data.
        </p>
      </section>

      <section>
        <h2>Third-Party Services</h2>
        <p>
          We may employ third-party companies and individuals for:
        </p>
        <ul>
          <li>Analytics services</li>
          <li>Advertising services</li>
          <li>Hosting and maintenance</li>
        </ul>
      </section>

      <section>
        <h2>Security</h2>
        <p>
          We value your trust in providing us your information, thus we strive to use commercially
          acceptable means of protecting it. But remember that no method of transmission over
          the internet, or method of electronic storage is 100% secure and reliable.
        </p>
      </section>

      <section>
        <h2>Children&apos;s Privacy</h2>
        <p>
          Our services are not intended for use by children under the age of 13. We do not knowingly
          collect personal information from children under 13.
        </p>
      </section>

      <section>
        <h2>Changes to This Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by
          posting the new Privacy Policy on this page. Changes are effective immediately after they are
          posted on this page.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
          <a href="mailto:support@example.com" className="ml-1">support@example.com</a>
        </p>
      </section>
    </main>
  )
} 