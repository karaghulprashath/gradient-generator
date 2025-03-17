export const metadata = {
  title: 'Terms of Service - Ultimate CSS Gradient Generator',
  description: 'Terms of Service for the Ultimate CSS Gradient Generator tool',
}

export default function TermsOfService() {
  return (
    <main className="container mx-auto px-4 py-8 prose prose-sm max-w-none">
      <h1>Terms of Service</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <section>
        <h2>Agreement to Terms</h2>
        <p>
          By accessing and using the Ultimate CSS Gradient Generator (&quot;the Service&quot;), you agree
          to be bound by these Terms of Service (&quot;Terms&quot;).
        </p>
      </section>

      <section>
        <h2>Intellectual Property</h2>
        <p>
          The Service and its original content, features, and functionality are owned by
          Ultimate CSS Gradient Generator and are protected by international copyright,
          trademark, patent, trade secret, and other intellectual property laws.
        </p>
      </section>

      <section>
        <h2>User Content</h2>
        <p>
          When you create, share, or post any content through the Service, you retain your
          intellectual property rights. However, by using our Service, you grant us a license
          to use, modify, publicly perform, publicly display, reproduce, and distribute such content.
        </p>
      </section>

      <section>
        <h2>Prohibited Uses</h2>
        <p>
          You agree not to use the Service:
        </p>
        <ul>
          <li>In any way that violates any applicable law or regulation</li>
          <li>To transmit any harmful or malicious code</li>
          <li>To attempt to interfere with the proper functioning of the Service</li>
        </ul>
      </section>

      <section>
        <h2>Limitation of Liability</h2>
        <p>
          In no event shall Ultimate CSS Gradient Generator, nor its directors, employees,
          partners, agents, suppliers, or affiliates, be liable for any indirect, incidental,
          special, consequential, or punitive damages.
        </p>
      </section>

      <section>
        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms at any time. If a revision is
          material, we will provide at least 30 days&apos; notice prior to any new terms taking effect.
        </p>
      </section>

      <section>
        <h2>Termination</h2>
        <p>
          We may terminate or suspend your access to the Service immediately, without prior
          notice or liability, for any reason whatsoever.
        </p>
      </section>

      <section>
        <h2>Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of
          the jurisdiction in which the Service operates.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
          <a href="mailto:support@example.com" className="ml-1">support@example.com</a>
        </p>
      </section>
    </main>
  )
} 