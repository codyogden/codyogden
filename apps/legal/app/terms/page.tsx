import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for cal.codyogden.com',
}

export default function TermsPage() {
  return (
    <main>
      <main>
        <h1>Terms of Service</h1>

        <p><b>Effective Date:</b> October 15, 2025</p>

        <p>This app is intended for limited use by the developer across personal and organizational Google accounts.</p>

        <p>By using this app, you acknowledge and agree to the following:</p>

        <ul>
          <li>This app is provided "as is" with no warranties or guarantees.</li>
          <li>The developer is not liable for any damages or losses resulting from use of the app.</li>
          <li>The app may use Google APIs to access user data within authorized Google accounts.</li>
          <li>No user support is provided, and access may be revoked or discontinued at any time.</li>
        </ul>

        <p>If you have any questions about these Terms, contact: cal@cal.codyogden.com</p>
      </main>
    </main>
  );
}

