export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
  
    const data = req.body;
    console.log('Waitlist Submission:', data);
  
    res.status(200).json({ message: 'Success' });
  }
  