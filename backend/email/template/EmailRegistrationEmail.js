// import {
//   Button,
//   Container,
//   Heading,
//   Img,
//   Text,
//   Html,
//   Preview,
//   Section,
// } from "@react-email/components";

// export const EventRegistrationEmail = ({
//   name,
//   eventName,
//   startDate,
//   endDate,
//   eventLink,
//   qrCode,
// }) => (
//   <Html>
//     <Preview>You're registered for {eventName}!</Preview>
//     <Section>
//       <Container>
//         <Heading>Hi {name}!</Heading>
//         <Text>You're successfully registered for:</Text>
//         <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
//           {eventName}
//         </Text>
//         <Text>
//           📅 {startDate} → {endDate}
//         </Text>

//         <Section style={{ textAlign: "center", margin: "40px 0" }}>
//           <Img
//             src={qrCode}
//             alt="QR Code"
//             width={280}
//             height={280}
//             style={{ margin: "0 auto" }}
//           />
//           <Text style={{ marginTop: "16px", color: "#555" }}>
//             Show this QR code at the venue
//           </Text>
//         </Section>

//         <div style={{ textAlign: "center" }}>
//           <Button href={eventLink}>View Event Details</Button>
//         </div>
//       </Container>
//     </Section>
//   </Html>
// );
