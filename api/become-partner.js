export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
  
    const data = req.body;
    console.log('Partner Submission:', data);
  
    res.status(200).json({ message: 'Success' });
  }
  