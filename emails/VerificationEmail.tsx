import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "react-email";

interface VerificationEamilProps {
  username: string;
  otp: string;
  email: string;
}

export default function VerificationEmail({
  username,
  otp,
  email,
}: VerificationEamilProps) {
  const verifyUrl = `https://mystrymessage.com/verify?email=${encodeURIComponent(
    email,
  )}&otp=${otp}`;
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxK.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Your verification code: {otp}</Preview>

      <Section
        style={{
          backgroundColor: "#ffffff",
          padding: "40px 20px",
          fontFamily: "Roboto, Verdana, sans-serif",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {/* header */}

        <Row>
          <Heading
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#1a1a1a",
              textAlign: "center",
              margin: "0 0 20px 0",
            }}
          >
            Verify Your Email
          </Heading>
        </Row>
        {/* greeting */}

        <Row>
          <Text
            style={{
              fontSize: "16px",
              color: "#4a4a4a",
              lineHeight: "24px",
              margin: "0 0 20px 0",
            }}
          >
            Hi <strong>{username}</strong>,
          </Text>
        </Row>
        {/* message */}
        <Row>
          <Text
            style={{
              fontSize: "16px",
              color: "#4a4a4a",
              lineHeight: "24px",
              margin: "0 0 20px 0",
            }}
          >
            Thanks for signing up! Use the verification code below to complete
            your registration:
          </Text>
        </Row>
        {/* OTP box */}
        <Row>
          <Section
            style={{
              backgroundColor: "#f4f4f5",
              borderRadius: "8px",
              padding: "24px",
              textAlign: "center",
              margin: "20px 0",
            }}
          >
            <Text
              style={{
                fontSize: "14px",
                color: "#71717a",
                margin: "0 0 8px 0",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Verification Code
            </Text>
            <Text
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#1a1a1a",
                letterSpacing: "8px",
                margin: "0",
                fontFamily: "monospace",
              }}
            >
              {otp}
            </Text>
          </Section>
        </Row>
        {/* Button — Verify Link */}
        <Row>
          <Section style={{ textAlign: "center", margin: "30px 0" }}>
            <Button
              href={verifyUrl}
              style={{
                backgroundColor: "#1a1a1a",
                color: "#ffffff",
                padding: "14px 28px",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "bold",
                display: "inline-block",
              }}
            >
              Verify Email
            </Button>
          </Section>
        </Row>
        {/* expiry warning */}

        <Row>
          <Text
            style={{
              fontSize: "14px",
              color: "#71717a",
              textAlign: "center",
              margin: "20px 0",
            }}
          >
            This code will expire in <strong>10 minutes</strong>.
          </Text>
        </Row>
        {/* divider */}
        <Row>
          <Section
            style={{
              borderTop: "1px solid #e4e4e7",
              margin: "30px 0",
            }}
          />
        </Row>
        {/* security note */}

        <Row>
          <Text
            style={{
              fontSize: "13px",
              color: "#a1a1aa",
              lineHeight: "20px",
              margin: "0",
            }}
          >
            If you didn&apos;t request this code, please ignore this email.
            Someone may have typed your email address by mistake.
          </Text>
        </Row>
        {/* footer */}
        <Row>
          <Text
            style={{
              fontSize: "12px",
              color: "#a1a1aa",
              textAlign: "center",
              margin: "30px 0 0 0",
            }}
          >
            © {new Date().getFullYear()} MystryMessage. All rights reserved.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
