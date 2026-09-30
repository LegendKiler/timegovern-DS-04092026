import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-border shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Effective Date: 1 January 2026</p>
          <div className="space-y-6 text-sm">
            <section>
              <h2 className="text-lg font-semibold mb-2">1. Australian Privacy Principles</h2>
              <p>TimeGovern respects the privacy and confidentiality of the information provided by you and adheres to the Australian Privacy Principles (APPs) as set out in the Privacy Act 1988 (Cth) [citation:14][citation:3].</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">2. Collection of Personal Information</h2>
              <p>We may collect the following types of personal information:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Data associated with your account, such as name, address, email address, and payment information [citation:1]</li>
                <li>Data about your usage of our website, such as IP address, geographical information, and what pages you viewed [citation:1]</li>
                <li>Data you provide when you subscribe to our emails or newsletters [citation:1]</li>
                <li>Data you submit via correspondence, such as when you email us with questions [citation:1]</li>
              </ul>
              <p className="mt-2">We will provide notification of collection that specifies the purposes for which the information is collected and any consequences if the information is not collected [citation:3].</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">3. Use and Disclosure</h2>
              <p>We only use or disclose personal information for the purpose for which it was collected unless you have consented to another purpose, or the use or disclosure is required or authorised by law [citation:3].</p>
              <p className="mt-2">We will not use or disclose personal information for direct marketing unless you would reasonably expect us to, and we provide a simple means for you to opt-out [citation:8].</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">4. Security</h2>
              <p>We take all reasonable steps to protect your personal data and keep your information secure. However, no security measure is foolproof, and we cannot guarantee complete security of any information you transmit to us [citation:1].</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">5. Access and Correction</h2>
              <p>You may request access to the personal information we hold about you and seek correction of such information. Our privacy policy contains information about how you may access and correct your personal information [citation:3].</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">6. Complaints</h2>
              <p>If you believe we have breached the Australian Privacy Principles, you may lodge a complaint. We will investigate and respond to your complaint within 30 days. If you are not satisfied with our response, you may contact the Office of the Australian Information Commissioner (OAIC) [citation:3].</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">7. Overseas Disclosure</h2>
              <p>If we disclose personal information to overseas recipients, we will take reasonable steps to ensure the recipient does not breach the Australian Privacy Principles [citation:3].</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">8. Data Retention</h2>
              <p>We retain personal data as long as it is needed to conduct our legitimate business purposes or to comply with our legal obligations, or until you ask us to delete your data [citation:1].</p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
