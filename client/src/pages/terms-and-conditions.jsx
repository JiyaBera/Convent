const TermsAndConditions = () => {
  return (
    <div className="py-8 lg:py-12 bg-primaryBg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-bold text-center text-fontprimary lg:text-4xl">
          Terms and Conditions
        </h2>
        <p className="mb-8 text-lg text-fontsecondary text-center">
          By applying to events on <span className="text-brand font-semibold">Convent</span>, you agree to the following terms and conditions.
        </p>
        <div className="bg-ex2 shadow rounded-lg p-6 lg:p-10">
          <p className="mb-6 text-sm text-fontprimary">Last Updated: 2024</p>
          <ol className="list-decimal space-y-6 pl-4 text-fontprimary">
            <li>
              <h3 className="font-semibold text-xl">Acceptance of Terms</h3>
              <p className="mt-2">
                By creating an account, browsing, or attending events through Convent, you agree to these Terms and Conditions, as well as our Privacy Policy. If you do not agree, please discontinue use of our website.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-xl">User Accounts</h3>
              <ol className="list-alpha pl-5 mt-2 space-y-2">
                <li>
                  <strong>Registration:</strong> You must provide accurate and complete information during the registration process. You are responsible for maintaining the confidentiality of your account credentials.
                </li>
                <li>
                  <strong>Eligibility:</strong> You must be at least 18 years old to create an account and use our services.
                </li>
                <li>
                  <strong>Account Security:</strong> You are responsible for all activities under your account. Notify us immediately if you suspect any unauthorized use of your account.
                </li>
              </ol>
            </li>
            <li>
              <h3 className="font-semibold text-xl">Event Participation</h3>
              <ol className="list-alpha pl-5 mt-2 space-y-2">
                <li>
                  <strong>Event Registration:</strong> Some events may require payment or registration. By registering, you agree to abide by the event-specific rules and guidelines.
                </li>
                <li>
                  <strong>Event Content:</strong> Convent is not responsible for the accuracy, safety, or legality of events posted by third-party organizers.
                </li>
              </ol>
            </li>
            <li>
              <h3 className="font-semibold text-xl">User Conduct</h3>
              <ol className="list-alpha pl-5 mt-2 space-y-2">
                <li>
                  <strong>Prohibited Activities:</strong> You agree not to misuse our platform, including but not limited to:
                  <ol className="list-roman pl-5 mt-1 space-y-1">
                    <li>Impersonating others or providing false information.</li>
                    <li>Posting offensive, harmful, or illegal content.</li>
                    <li>Attempting to hack, disrupt, or manipulate the site’s functionality.</li>
                  </ol>
                </li>
                <li>
                  <strong>Content Ownership:</strong> You retain ownership of the content you post but grant Convent a license to use, display, and distribute such content in connection with our services.
                </li>
              </ol>
            </li>
            <li>
              <h3 className="font-semibold text-xl">Payments and Fees</h3>
              <ol className="list-alpha pl-5 mt-2 space-y-2">
                <li>
                  <strong>Payment Processing:</strong> Payments for paid events are processed through a third-party payment gateway. By making a payment, you agree to the terms and conditions of the payment provider.
                </li>
                <li>
                  <strong>Service Fees:</strong> Convent may charge service fees for certain events or premium features. Any applicable fees will be clearly disclosed prior to purchase.
                </li>
              </ol>
            </li>
            <li>
              <h3 className="font-semibold text-xl">Privacy</h3>
              <p className="mt-2">
                Your privacy is important to us. Please review our [Privacy Policy] to understand how we collect, use, and protect your personal information.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-xl">Limitation of Liability</h3>
              <p className="mt-2">
                Convent is not liable for any direct, indirect, incidental, or consequential damages arising from your use of our platform, including but not limited to event cancellations, loss of data, or financial losses.
              </p>
            </li>
            
            <li>
              <h3 className="font-semibold text-xl">Modifications</h3>
              <p className="mt-2">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on our website. Continued use of the platform constitutes acceptance of the updated terms.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-xl">Termination</h3>
              <p className="mt-2">
                We reserve the right to terminate or suspend your account at any time for any reason, including but not limited to violations of these Terms and Conditions.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-xl">Contact Information</h3>
              <p className="mt-2">
                For any questions or concerns regarding these Terms and Conditions, please contact us at convent@gmail.com .
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;