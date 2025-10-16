import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Cody Ogden',
  description: 'Privacy Policy for cal.codyogden.com',
}

export default function PrivacyPage() {
  return (
    <main>
      <main>
        <h1>Privacy Policy</h1>

        <p><b>Effective Date:</b> October 15, 2025</p>

        <p>This app is intended for limited use by the developer across personal and organizational Google accounts.</p>

        <p>The app uses Google APIs to access and manage calendar events and meeting links as part of its core functionality.</p>

        <p>User data (such as calendar event details and meeting links) is accessed and stored securely by the app for the purpose of managing scheduling and related services. No data is shared with third parties.</p>

        <p>All data access is limited to authorized Google accounts and used only as necessary to provide core functionality.</p>

        <p>If you have any questions about this Privacy Policy, contact: cal@cal.codyogden.com</p>
      </main>
    </main>
  );
}

