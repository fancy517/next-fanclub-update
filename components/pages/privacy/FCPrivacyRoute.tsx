import '@/styles/pages/privacy.scss'

type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCPrivacyRoute({
  children,
  className,
  ...rest
}: Props) {
  return (
    <div id="m_privacy_route">
      <div className="page-content">
        <div className="current-page-wrapper">
          <div className="current-page">
            <span>Privacy Policy</span>
          </div>
        </div>
        <p>Last Updated: February 26, 2022</p>
        <p className="bold">Introduction</p>
        <p>
          Select Media, LLC is the owner and operator of{' '}
          <a href="https://fansly.com/">www.fansly.com</a> and all affiliated
          websites and mobile versions (the “Site” or we, us, our, ours, etc.).
          We respect your privacy and are committed to protecting it through
          this Privacy Policy (the “Policy”). This Policy describes the types of
          personal information we may collect from you, the user, (you, your,
          yours, etc.) or that you may provide to us when you use the services
          offered by us on the Site (the “Services”), and our practices for
          collecting, using, keeping, protecting, and disclosing your personal
          information.
        </p>
        <p>
          Please read this Policy carefully to understand our practices
          regarding your personal information and how we will treat it. If you
          do not agree with this Policy, your sole choice is to leave the Site.
          By accessing or using the Site, you agree to this Policy and consent
          to our collection, use, disclosure, retention, and protection of your
          information as described in this Policy.
        </p>
        <p>
          We reserve the right to revise, amend, or modify this Policy at any
          time and in any manner. We will consider your continued use of the
          Site after we make changes to this Policy as your acceptance of the
          changes, so you must periodically revisit this Policy and check the
          “Last Updated” date above. If changed, this Policy has been updated or
          edited, and the updated or edited version supersedes any prior
          versions immediately upon posting.
        </p>
        <p className="bold margin-top-3">
          1. How old do you have to be to use the Services?
        </p>
        <p>
          We prohibit anyone under the age of eighteen (18) from accessing the
          Site or using the Services. We do not knowingly market to or collect
          or solicit any information from or about anyone under the age of
          eighteen (18). If you are under the age of eighteen (18), you must not
          submit information to us and must immediately leave the Site. If we
          learn that we have collected information from or about a person under
          the age of eighteen (18), we will delete that information as quickly
          as possible. If you believe that we might have such information,
          please contact us at{' '}
          <a href="mailto:privacy@fansly.com">privacy@fansly.com</a>.
        </p>
        <p className="bold margin-top-3">
          2. What types of information do we collect about you?
        </p>
        <p>
          We may collect several types of “personal information” from and about
          users of the Site, including any information that personally
          identifies you or that could be reasonable linked to you or your
          household, including your name; alias; username or other unique
          personal identifier, and password; postal, billing, and shipping
          address; email address; IP address; telephone number; social security
          number; driver’s license, passport, or other identification card
          number; credit card or banking information; order history; personal
          property records; biometric information; characteristics of protected
          classifications; and inferences drawn from any of this information
          about your preferences, characteristics, psychological trends,
          predispositions, behavior, attitudes, intelligence, abilities, or
          aptitudes. However, this Policy does not apply to personal information
          that has been de-identified or that is otherwise publicly available.
        </p>
        <p>
          We, or our contractors, may collect, store, and/or maintain biometric
          information including, but not limited to, a retina or iris scan,
          fingerprint, voiceprint, or scan of hand or face geometry, from any
          content or verification documents you provide to us or upload to the
          Site.
        </p>
        <p className="bold margin-top-3">
          3. How do we collect your personal information?
        </p>
        <p>
          We collect your personal information directly from you when you
          provide it to us, such as through:
        </p>
        <ul>
          <li>The account registration process;</li>
          <li>Your profile information or other posts;</li>
          <li>Your purchases and other financial transactions;</li>
          <li>Your search queries;</li>
          <li>Your linked social media accounts;</li>
          <li>Your responses to any surveys we ask you to complete; and</li>
          <li>
            Your other communications and interactions with us, whether by
            contact form, phone, mail, email, text, or other means, including on
            third-party social media platforms.
          </li>
        </ul>
        <p>
          We also collect your personal information automatically from your
          computer device or mobile phone and through cookies, web beacons, and
          other tracking technologies.
        </p>
        <p>
          This Policy does not apply to information collected by us offline or
          through any other means, or by any third party that is linked to or
          accessible through the Site.
        </p>
        <p className="bold margin-top-3">
          4. Do third parties collect my personal information on the Site?
        </p>
        <p>
          Third parties including users, advertisers, content or application
          providers, and third-party plug-ins may provide materials to the site
          which use cookies, web beacons, or other tracking technologies to
          collect your personal information, including information about your
          online activities over time and across different websites and other
          online services. Those third parties may use this information to
          provide you with interest-based (behavioral) advertising or other
          targeted content. We do not control third-party tracking technologies
          or how third parties use them. Your use of third-party plug-ins are
          governed by the user terms and privacy policy of the third party that
          provided that plug-in. If you have any questions about an
          advertisement or plug-in, you should contact the responsible provider
          directly.
        </p>
        <p>
          Please be aware that we do not operate, control, or endorse
          third-party websites that may be linked on the Site, nor are we
          responsible for the content or privacy practices of third-party
          websites. We disclaim any responsibility for your personal information
          on third-party websites, and we do not make any warranties or
          representations that any third-party website (or even this Site) will
          function without error or interruption, that defects will be
          corrected, or that any third-party websites or their servers are free
          of viruses or other problems that may harm your computer. We encourage
          you to be aware when you leave the Site and to read the privacy
          policies of any third-party website that collects your personal
          information.
        </p>
        <p className="bold margin-top-3">
          5. How do we use your personal information?
        </p>
        <p>We may use your personal information:</p>
        <ul>
          <li>
            To provide you with access to the Site and use of the Services;
          </li>
          <li>
            To speed up the Services, such as by automatically updating your
            account information;
          </li>
          <li>To recognize you when you return to the Services;</li>
          <li>
            To personalize the Services according to your preferences and
            individual interests;
          </li>
          <li>To notify you about changes to the Services and our policies;</li>
          <li>
            To carry out our obligations and enforce our rights arising from any
            contracts between you and us, including this Policy and our{' '}
            <a href="https://fansly.com/tos">Terms of Service</a>;
          </li>
          <li>
            To monitor and analyze traffic and usage trends related to the
            Services;
          </li>
          <li>To verify the integrity and security of the Services;</li>
          <li>To improve the Services and provide customer service;</li>
          <li>
            To investigate and prevent unauthorized or prohibited uses of the
            Services;
          </li>
          <li>For marketing or advertising purposes; and</li>
          <li>For any other purpose with your consent.</li>
        </ul>
        <p className="bold margin-top-3">
          6. Do we share your personal information with third parties?
        </p>
        <p>
          We may share publicly available information and de-identified
          information with third parties without restriction. However, we may
          only disclose your personal information to:
        </p>
        <ul>
          <li>
            Our subsidiaries, affiliates, contractors, service providers, and
            other third parties as necessary to provide the Services to you;
          </li>
          <li>
            Potential buyers or other successors in the event of a merger, joint
            venture, assignment, divestiture, restructuring, reorganization,
            dissolution, or other sale or transfer of assets including
            bankruptcy, liquidation, or similar proceeding;
          </li>
          <li>
            Law enforcement authorities, government agencies, and private
            litigants, such as in response to lawful criminal, civil, or
            administrative process or discovery requests, subpoenas, court
            orders, writs, or reasonable requests of authorities or persons with
            the reasonable power to obtain such process;
          </li>
          <li>
            Any other party as necessary to identify, contact, or bring legal
            action against someone who may be violating our policies;
          </li>
          <li>
            Any other party as necessary to protect the rights, property, or
            safety of us, our users, or the general public, including but not
            limited to disclosures for the purposes of fraud protection and
            credit risk reduction; and
          </li>
          <li>Any other party with your consent.</li>
        </ul>
        <p className="bold margin-top-3">
          7. What choices do you have over your personal information?
        </p>
        <p>
          We strive to provide you with choices about the personal information
          you provide directly to us. You can always delete or restrict any
          personal information that you provided directly to us. In the case of
          personal information contained in your content, you may (i) change the
          privacy settings associated with the content and/or your account, or
          (ii) delete the content containing the personal information from your
          profile. In all other cases, we will delete any personal information
          that you have provided directly to us, if you request to permanently
          delete your account. However, we may retain your personal information
          for any use set forth herein. Further, we may refuse to accommodate
          any change if we believe doing so would violate any law or legal
          requirement or cause the information to be incorrect.
        </p>
        <p>
          We also strive to provide you with choices about the personal
          information that we collect from you automatically. You may refuse to
          accept cookies by activating the appropriate setting on your browser.
          To learn how you can manage your other cookies, visit{' '}
          <a href="https://www.allaboutcookies.org/manage-cookies/">
            www.allaboutcookies.org/manage-cookies/
          </a>
          . However, if you select this setting you may be unable to access
          certain parts of the Site. Unless you have adjusted your browser
          setting so that it will refuse cookies, we will issue cookies when you
          access the Site.
        </p>
        <p>
          Do Not Track (“<strong>DNT</strong>”) is a privacy preference that you
          can set in your browser. DNT is a way for you to inform websites and
          services that you do not want certain information about your browser
          history collected over time and across websites or online services.
          However, we do not recognize or respond to any DNT signals as the
          Internet industry works toward defining exactly what DNT means, what
          it means to comply with DNT, and a common approach to responding to
          DNT. For more information, visit www.allaboutdnt.com.
        </p>
        <p>
          We do not control third parties’ collection or use of your personal
          information to serve interest-based advertising. However, these third
          parties may provide you with ways to choose not to have your
          information collected or used in this way.
        </p>
        <p className="bold margin-top-3">
          8. How long do we retain your personal information?
        </p>
        <p>
          Except as otherwise permitted or required by applicable law or
          regulation, we will retain your personal information only for as long
          as necessary to fulfill any use of your personal information set forth
          herein. However, we reserve the right to retain publicly available
          information and de-identified information for any legitimate business
          purpose without further notice to you or your consent.
        </p>
        <p className="bold margin-top-3">
          9. Is my personal information secure?
        </p>
        <p>
          We are committed to data security, and we have implemented measures
          designed to secure your personal information from accidental loss and
          from unauthorized access, use, change, and disclosure. All information
          you provide to us is stored on our secure servers behind firewalls.
          However, you understand and agree that the transmission of your
          personal information over the Internet is not completely secure. While
          we do our best to protect your personal information, we cannot
          guarantee the security of your personal information transmitted
          through the Site. Any transmission of personal information is at your
          own risk. We are not responsible for circumvention of any privacy
          settings or security measures used by the Site.
        </p>
        <p className="bold margin-top-3">10. No Third-Party Rights</p>
        <p>
          This Policy does not create rights enforceable by third parties or
          require disclosure of any personal information relating to users of
          the Services.
        </p>
        <p className="bold margin-top-3">11. International Users</p>
        <p>
          This Policy is intended to cover collection of personal information
          within our home jurisdiction. Some countries may require stricter
          privacy policies than those described in this Policy. If you are
          accessing the Site from a foreign country, you understand and agree
          that your personal information may be transferred to, stored, and
          processed in our home jurisdiction or the jurisdiction of the third
          parties described herein, and that the data protection and other laws
          of our home jurisdiction or the jurisdiction of such third parties
          might not be as comprehensive as those in your country.
        </p>
        <p className="bold margin-top-3">12. State Privacy Rights</p>
        <ul>
          <li>
            <span className="bold">Nevada:</span> We do not meet the triggers of
            Nevada Revised Statute Chapter 603A. While we do not sell your
            personal information, Nevada residents may submit an opt-out request
            to <a href="mailto:privacy@fansly.com">privacy@fansly.com</a> which
            we will honor if we sell your personal information at a future date.
          </li>
          <li>
            <span className="bold">Colorado:</span> We do not meet the triggers
            of Colorado Privacy Act.
          </li>
          <li>
            <span className="bold">Virginia:</span> If you are a resident of
            Virginia, you may exercise certain privacy rights, twice per year,
            by submitting a request to{' '}
            <a href="mailto:privacy@fansly.com">privacy@fansly.com</a>. You may
            always access, correct, and/or delete certain personal information
            by logging into your account and accessing, correcting, or deleting
            your content and other profile information. If we deny your request,
            you may submit an appeal to{' '}
            <a href="mailto:privacy@fansly.com">privacy@fansly.com</a>.
          </li>
          <li>
            <span className="bold">Your California Privacy Rights:</span> We do
            not meet the triggers of California Civil Code §1798.83, because we
            do not disclose personal information to third parties for direct
            marketing purposes. However, we comply with the California Consumer
            Privacy Act of 2018 (“CCPA”). The below privacy notice for
            California residents supplements the information contained above and
            applies solely to all visitors, users, and others who reside in
            California. We adopt this notice to comply with the CCPA and any
            terms defined in the CCPA have the same meaning when used herein.
          </li>
        </ul>
        <p className="bold margin-top-3">Information We Collect</p>
        <p>
          Our Site collects information that identifies, relates to, describes,
          references, is reasonably capable of being associated with, or could
          reasonably be linked, directly or indirectly, with a particular
          consumer, household, or device (“<strong>personal information</strong>
          ”). Personal information does not include:
        </p>
        <ul>
          <li>Publicly available information from government records.</li>
          <li>Deidentified or aggregated consumer information.</li>
          <li>
            Information excluded from the CCPA’s scope, like:{' '}
            <ul>
              <li>
                health or medical information covered by the Health Insurance
                Portability and Accountability Act of 1996 (HIPAA) and the
                California Confidentiality of Medical Information Act (CMIA) or
                clinical trial data; and
              </li>
              <li>
                personal information covered by certain sector-specific privacy
                laws, including the Fair Credit Reporting Act (FCRA), the
                Gramm-Leach-Bliley Act (GLBA) or California Financial
                Information Privacy Act (FIPA), and the Driver’s Privacy
                Protection Act of 1994.
              </li>
            </ul>
          </li>
        </ul>
        <p>
          In particular, our Site has collected the following categories of
          personal information from its consumers within the last twelve (12)
          months:
        </p>
        <table>
          <tbody>
            <tr>
              <td>
                <p className="bold">Category</p>
              </td>
              <td>
                <p className="bold">Examples</p>
              </td>
              <td>
                <p className="bold">Collected</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>A. Identifiers.</p>
              </td>
              <td>
                <p>
                  A real name, alias, postal address, unique personal
                  identifier, online identifier, Internet Protocol address,
                  email address, account name, Social Security number, driver’s
                  license number, passport number, or other similar identifiers.
                </p>
              </td>
              <td>
                <p>YES</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  B. Personal information categories listed in the California
                  Customer Records statute (Cal. Civ. Code § 1798.80(e)).
                </p>
              </td>
              <td>
                <p>
                  A name, signature, Social Security number, physical
                  characteristics or description, address, telephone number,
                  passport number, driver’s license or state identification card
                  number, insurance policy number, education, employment,
                  employment history, bank account number, credit card number,
                  debit card number, or any other financial information, medical
                  information, or health insurance information.
                </p>
              </td>
              <td>
                <p>YES</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  C. Protected classification characteristics under California
                  or federal law.
                </p>
              </td>
              <td>
                <p>
                  Age (40 years or older), race, color, ancestry, national
                  origin, citizenship, religion or creed, marital status,
                  medical condition, physical or mental disability, sex
                  (including gender, gender identity, gender expression,
                  pregnancy or childbirth and related medical conditions),
                  sexual orientation, veteran or military status, genetic
                  information (including familial genetic information).
                </p>
              </td>
              <td>
                <p>YES</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>D. Commercial information.</p>
              </td>
              <td>
                <p>
                  Records of personal property, products or services purchased,
                  obtained, or considered, or other purchasing or consuming
                  histories or tendencies.
                </p>
              </td>
              <td>
                <p>YES</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>E. Biometric information.</p>
              </td>
              <td>
                <p>
                  Genetic, physiological, behavioral, and biological
                  characteristics, or activity patterns used to extract a
                  template or other identifier or identifying information, such
                  as, fingerprints, faceprints, and voiceprints, iris or retina
                  scans, keystroke, gait, or other physical patterns, and sleep,
                  health, or exercise data.
                </p>
              </td>
              <td>
                <p>YES</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>F. Internet or other similar network activity.</p>
              </td>
              <td>
                <p>
                  Browsing history, search history, information on a consumer’s
                  interaction with a website, application, or advertisement.
                </p>
              </td>
              <td>
                <p>YES</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>G. Geolocation data.</p>
              </td>
              <td>
                <p>Physical location or movements.</p>
              </td>
              <td>
                <p>NO</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>H. Sensory data.</p>
              </td>
              <td>
                <p>
                  Audio, electronic, visual, thermal, olfactory, or similar
                  information.
                </p>
              </td>
              <td>
                <p>NO</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>I. Professional or employment-related information.</p>
              </td>
              <td>
                <p>Current or past job history or performance evaluations.</p>
              </td>
              <td>
                <p>NO</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  J. Non-public education information (per the Family
                  Educational Rights and Privacy Act (20 U.S.C. Section 1232g,
                  34 C.F.R. Part 99)).
                </p>
              </td>
              <td>
                <p>
                  Education records directly related to a student maintained by
                  an educational institution or party acting on its behalf, such
                  as grades, transcripts, class lists, student schedules,
                  student identification codes, student financial information,
                  or student disciplinary records.
                </p>
              </td>
              <td>
                <p>NO</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>K. Inferences drawn from other personal information.</p>
              </td>
              <td>
                <p>
                  Profile reflecting a person’s preferences, characteristics,
                  psychological trends, predispositions, behavior, attitudes,
                  intelligence, abilities, and aptitudes.
                </p>
              </td>
              <td>
                <p>YES</p>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          Our Website obtains the categories of personal information listed
          above from the following categories of sources:
        </p>
        <ul>
          <li>
            Directly from you. For example, from forms you complete or products
            and services you purchase.
          </li>
          <li>
            Indirectly from you. For example, from observing your actions on our
            Site.
          </li>
          <li>Third parties, for example, our business partners.</li>
        </ul>
        <p className="bold margin-top-3">Use of Personal Information</p>
        <p>
          We may use or disclose the personal information we collect for one or
          more of the following purposes:
        </p>
        <ul>
          <li>
            To fulfill or meet the reason you provided the information. For
            example, if you share your name and contact information to ask a
            question about our products or services, we will use that personal
            information to respond to your inquiry. If you provide your personal
            information to purchase a product or service, we will use that
            information to process your payment. We may also save your
            information to facilitate new product orders.
          </li>
          <li>
            To provide, support, personalize, and develop our Website, products,
            and services.
          </li>
          <li>
            To create, maintain, customize, and secure your account with us.
          </li>
          <li>
            To process your requests, purchases, transactions, and payments and
            prevent transactional fraud.
          </li>
          <li>
            To provide you with support and to respond to your inquiries,
            including to investigate and address your concerns and monitor and
            improve our responses.
          </li>
          <li>
            To personalize your Website experience and to deliver content and
            product and service offerings relevant to your interests, including
            targeted offers and ads through our Website, third-party sites, and
            via email or text message (with your consent, where required by
            law).
          </li>
          <li>
            To help maintain the safety, security, and integrity of our Website,
            products and services, databases and other technology assets, and
            business.
          </li>
          <li>
            For testing, research, analysis, and product development, including
            to develop and improve our Website, products, and services.
          </li>
          <li>
            To respond to law enforcement requests and as required by applicable
            law, court order, or governmental regulations.
          </li>
          <li>
            As described to you when collecting your personal information or as
            otherwise stated in the CCPA.
          </li>
          <li>
            To evaluate or conduct a merger, divestiture, restructuring,
            reorganization, dissolution, or other sale or transfer of some or
            all of our assets, whether as a going concern or as part of
            bankruptcy, liquidation, or similar proceeding, in which personal
            information held by us about our Website users is among the assets
            transferred.
          </li>
          <li>To verify your identity.</li>
        </ul>
        <p>
          We will not collect additional categories of personal information or
          use the personal information we collected for materially different,
          unrelated, or incompatible purposes without providing you notice.
        </p>
        <p className="bold margin-top-3">Sharing Personal Information</p>
        <p>
          We may disclose your personal information to a third party for a
          business purpose. When we disclose personal information for a business
          purpose, we enter a contract that describes the purpose and requires
          the recipient to both keep that personal information confidential and
          not use it for any purpose except performing the contract.
        </p>
        <p>
          We share your personal information with the following categories of
          third parties:
        </p>
        <ul>
          <li>Service providers.</li>
          <li>Internet cookie data recipients, like Google Analytics.</li>
        </ul>
        <p className="bold margin-top-3">
          Disclosures of Personal Information for a Business Purpose
        </p>
        <p>
          In the preceding twelve (12) months, Company has disclosed the
          following categories of personal information for a business purpose:
        </p>
        <p>Category A: Identifiers.</p>
        <p>
          Category B: California Customer Records personal information
          categories.
        </p>
        <p>Category F: Internet or other similar network activity.</p>
        <p>
          We disclose your personal information for a business purpose to the
          following categories of third parties:
        </p>
        <ul>
          <li>Service providers.</li>
          <li>Internet cookie data recipients, like Google Analytics.</li>
        </ul>
        <p className="bold margin-top-3">Sales of Personal Information</p>
        <p>
          In the preceding twelve (12) months, Company had not sold personal
          information.
        </p>
        <p className="bold margin-top-3">Your Rights and Choices</p>
        <p>
          The CCPA provides consumers (California residents) with specific
          rights regarding their personal information. This section describes
          your CCPA rights and explains how to exercise those rights.
        </p>
        <p className="bold margin-top-3">
          Access to Specific Information and Data Portability Rights
        </p>
        <p>
          You have the right to request that we disclose certain information to
          you about our collection and use of your personal information over the
          past twelve (12) months. Once we receive and confirm your verifiable
          consumer request (see Exercising Access, Data Portability, and
          Deletion 0), we will disclose to you:
        </p>
        <ul>
          <li>
            The categories of personal information we collected about you.
          </li>
          <li>
            The categories of sources for the personal information we collected
            about you.
          </li>
          <li>
            Our business or commercial purpose for collecting or selling that
            personal information.
          </li>
          <li>
            The categories of third parties with whom we share that personal
            information.
          </li>
          <li>
            The specific pieces of personal information we collected about you
            (also called a data portability request).
          </li>
          <li>
            If we sold or disclosed your personal information for a business
            purpose, two separate lists disclosing:{' '}
            <ul>
              <li>
                sales, identifying the personal information categories that each
                category of recipient purchased; and
              </li>
              <li>
                disclosures for a business purpose, identifying the personal
                information categories that each category of recipient obtained.
              </li>
            </ul>
          </li>
        </ul>
        <p className="bold margin-top-3">Deletion Request Rights</p>
        <p>
          You have the right to request that we delete any of your personal
          information that we collected from you and retained, subject to
          certain exceptions. Once we receive and confirm your verifiable
          consumer request (see Exercising Access, Data Portability, and
          Deletion Rights), we will delete (and direct our service providers to
          delete) your personal information from our records, unless an
          exception applies.
        </p>
        <p>
          We may deny your deletion request if retaining the information is
          necessary for us or our service providers to:
        </p>
        <ol>
          <li>
            Complete the transaction for which we collected the personal
            information, provide a good or service that you requested, take
            actions reasonably anticipated within the context of our ongoing
            business relationship with you, fulfill the terms of a written
            warranty or product recall conducted in accordance with federal law,
            or otherwise perform our contract with you.
          </li>
          <li>
            Detect security incidents, protect against malicious, deceptive,
            fraudulent, or illegal activity, or prosecute those responsible for
            such activities.
          </li>
          <li>
            Debug products to identify and repair errors that impair existing
            intended functionality.
          </li>
          <li>
            Exercise free speech, ensure the right of another consumer to
            exercise their free speech rights, or exercise another right
            provided for by law.
          </li>
          <li>
            Comply with the California Electronic Communications Privacy Act
            (Cal. Penal Code § 1546 et. seq.).
          </li>
          <li>
            Engage in public or peer-reviewed scientific, historical, or
            statistical research in the public interest that adheres to all
            other applicable ethics and privacy laws, when the information’s
            deletion may likely render impossible or seriously impair the
            research’s achievement, if you previously provided informed consent.
          </li>
          <li>
            Enable solely internal uses that are reasonably aligned with
            consumer expectations based on your relationship with us.
          </li>
          <li>Comply with a legal obligation.</li>
          <li>
            Make other internal and lawful uses of that information that are
            compatible with the context in which you provided it.
          </li>
        </ol>
        <p className="bold margin-top-3">
          Exercising Access, Data Portability, and Deletion Rights
        </p>
        <p>
          To exercise the access, data portability, and deletion rights
          described above, please submit a verifiable consumer request to us at
          either: <br />
          <span>
            <a href="mailto:privacy@fansly.com">privacy@fansly.com</a>
          </span>
          <br />
          <span>
            <a href="https://fansly.com/">www.fansly.com</a>
          </span>
        </p>
        <p>
          Only you, or someone legally authorized to act on your behalf, may
          make a verifiable consumer request related to your personal
          information. You may also make a verifiable consumer request on behalf
          of your minor child.
        </p>
        <p>
          You may only make a verifiable consumer request for access or data
          portability twice within a 12-month period. The verifiable consumer
          request must:
        </p>
        <ul>
          <li>
            Provide sufficient information that allows us to reasonably verify
            you are the person about whom we collected personal information or
            an authorized representative.
          </li>
          <li>
            Describe your request with sufficient detail that allows us to
            properly understand, evaluate, and respond to it.
          </li>
        </ul>
        <p>
          We cannot respond to your request or provide you with personal
          information if we cannot verify your identity or authority to make the
          request and confirm the personal information relates to you.
        </p>
        <p>
          Making a verifiable consumer request does not require you to create an
          account with us.
        </p>
        <p>
          We will only use personal information provided in a verifiable
          consumer request to verify the requestor’s identity or authority to
          make the request.
        </p>
        <p className="bold margin-top-3">Response Timing and Format</p>
        <p>
          We endeavor to respond to a verifiable consumer request within
          forty-five (45) days of its receipt. If we require more time (up to 45
          days), we will inform you of the reason and extension period in
          writing.
        </p>
        <p>
          If you have an account with us, we will deliver our written response
          to that account. If you do not have an account with us, we will
          deliver our written response by mail or electronically, at your
          option.
        </p>
        <p>
          Any disclosures we provide will only cover the twelve (12) month
          period preceding the verifiable consumer request’s receipt. The
          response we provide will also explain the reasons we cannot comply
          with a request, if applicable. For data portability requests, we will
          select a format to provide your personal information that is readily
          useable and should allow you to transmit the information from one
          entity to another entity without hindrance.
        </p>
        <p>
          We do not charge a fee to process or respond to your verifiable
          consumer request unless it is excessive, repetitive, or manifestly
          unfounded. If we determine that the request warrants a fee, we will
          tell you why we made that decision and provide you with a cost
          estimate before completing your request.
        </p>
        <p className="bold margin-top-3">Non-Discrimination</p>
        <p>
          We will not discriminate against you for exercising any of your CCPA
          rights. Unless permitted by the CCPA, we will not:
        </p>
        <ul>
          <li>Deny you goods or services.</li>
          <li>
            Charge you different prices or rates for goods or services,
            including through granting discounts or other benefits, or imposing
            penalties.
          </li>
          <li>
            Provide you a different level or quality of goods or services.
          </li>
          <li>
            Suggest that you may receive a different price or rate for goods or
            services or a different level or quality of goods or services.
          </li>
        </ul>
        <p>
          However, we may offer you certain financial incentives permitted by
          the CCPA that <strong>can result</strong> in different prices, rates,
          or quality levels. Any CCPA-permitted financial incentive we offer
          will reasonably relate to your personal information’s value and
          contain written terms that describe the program’s material aspects.
          Participation in a financial incentive program requires your prior opt
          in consent, which you may revoke at any time.
        </p>
        <p className="bold margin-top-3">Other California Privacy Rights</p>
        <p>
          California’s “Shine the Light” law (Civil Code Section § 1798.83)
          permits users of our Site that are California residents to request
          certain information regarding our disclosure of personal information
          to third parties for their direct marketing purposes. To make such a
          request, please send an email to{' '}
          <a href="mailto:privacy@fansly.com">privacy@fansly.com</a>.
        </p>
        <p className="bold margin-top-3">Changes to Our Privacy Notice</p>
        <p>
          We reserve the right to amend this privacy notice at our discretion
          and at any time. When we make changes to this privacy notice, we will
          post the updated notice on the Site and update the notice’s effective
          date.{' '}
          <strong>
            Your continued use of our Site following the posting of changes
            constitutes your acceptance of such changes.
          </strong>
        </p>
        <p className="bold margin-top-3">Contact Information</p>
        <p>
          If you have any questions or comments about this notice, the ways in
          which Select Media LLC collects and uses your information described
          below and in the Privacy Policy, your choices and rights regarding
          that use, or wish to exercise your rights under California law, please
          do not hesitate to contact us at: <br />
          <span>
            <strong>Email: </strong>
            <a href="mailto:privacy@fansly.com">privacy@fansly.com</a>
          </span>
          <br />
          <span>
            <strong>Website: </strong>
            <a href="https://fansly.com/">www.fansly.com</a>
          </span>
        </p>
      </div>
    </div>
  )
}
