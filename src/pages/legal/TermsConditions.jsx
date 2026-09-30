import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsConditions() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-border shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Terms & Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Effective Date: 1 January 2026</p>
          <div className="space-y-6 text-sm">
            <section>
              <h2 className="text-lg font-semibold mb-2">1. Business Information</h2>
              <p>TimeGovern (ABN: [Your ABN]) is a business registered in Australia. We operate the website available at timegovern.com. For any questions regarding these Terms, contact us at <a href="mailto:legal@timegovern.com" className="text-primary hover:underline">legal@timegovern.com</a>.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">2. Acceptance of Terms</h2>
              <p>If you choose to use our website, we will regard that use as conclusive evidence of your agreement and acceptance that these terms govern your and TimeGovern's rights and obligations to each other.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">3. Use of the Website</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>You must be over 18 years of age to use this website.</li>
                <li>You may not distribute or commercially exploit the content without express written permission.</li>
                <li>You may not transmit or store content on any other website or electronic retrieval system.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">4. Australian Consumer Law Compliance</h2>
              <p>TimeGovern adheres to the Australian Consumer Law and the Competition and Consumer Act 2010 (Cth). Our liability for any breach of a term of this agreement is limited to the supplying of goods or services again, replacement of the goods, or payment of the cost of having goods or services supplied again.</p>
              <p className="mt-2">Consumer guarantees cannot be excluded, limited, or modified by contract. Any terms that suggest otherwise may be misleading or deceptive in breach of the ACL.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">5. Premium Services & Subscriptions</h2>
              <p>We may offer premium services, including but not limited to ad-free access, advanced time data, and PDF calendar downloads. By subscribing to a premium service, you agree to the following:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Payments are processed securely via third-party providers.</li>
                <li>Subscriptions renew automatically unless cancelled before the renewal date.</li>
                <li>You may cancel your subscription at any time. Access will continue until the end of the billing period.</li>
                <li>Refunds are provided where required by the Australian Consumer Law, including where the service is not as described or fails to meet consumer guarantees.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">6. Limitation of Liability</h2>
              <p>It is an essential pre-condition to you using our website that you agree and accept that TimeGovern is not legally responsible for any loss or damage you might suffer related to your use of the website. Your use of, or reliance on, any information or materials on this website is entirely at your own risk.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">7. Intellectual Property</h2>
              <p>All content on TimeGovern is protected by intellectual property and copyright laws. The service and its original content, features, and functionality are the exclusive property of TimeGovern and its licensors.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">8. Governing Law</h2>
              <p>These Terms are governed by and construed in accordance with the laws of Victoria, Australia. Any dispute arising out of or related to the information contained herein is subject to adjudication in the courts of Victoria, Australia.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">9. Changes to Terms</h2>
              <p>We may amend these Terms at any time by posting the amended terms on this site. Your continued use of the platform following the posting of revised Terms means that you accept and agree to the changes.</p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
