// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const body = await req.json();

//   const response = await fetch(
//     `https://usX.api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email_address: body.email,
//         status: "subscribed",
//         merge_fields: {
//           FNAME: body.name,
//           COMPANY: body.company,
//           MESSAGE: body.message,
//         },
//       }),
//     }
//   );

//   if (!response.ok) {
//     return NextResponse.json({ error: true }, { status: 400 });
//   }

//   return NextResponse.json({ success: true });
// }
