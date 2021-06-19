import { withSentry } from '@sentry/nextjs';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }
const handler = async (req, res) => {
  res.status(200).json({ name: 'John Doe' })
}

export default withSentry(handler);