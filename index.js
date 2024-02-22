const express = require('express')
const OpenAI = require('openai');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT;


const openai = new OpenAI({
  apiKey: process.env.Apikey
});




app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res)=>{
    res.send('Letter')
})


app.post('/letter', async (req, res)=>{
  const {question, letter} = req.body

   const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: `Analyze the below letter type: formal, informal, semi-formal. Check grammar, punctuation, spelling errors and count the exact number of words in the letter. And provide suggestions for improvement, offer explanations for corrections. Give feedback and assess the letter. Send result like the below format with html tags:
    <b>Letter type:</b> ['formal', 'informal', 'semi-formal'] <br>;
    <b>Sentences:</b> sentences <br>;
    <b>Paragraphs:</b> paragraphs <br>;
    <b>Grammar Errors:</b> grammar mistakes <br>;
    <b>Spelling errors:</b> spelling errors <br>;
    <b>Overall Score:</b> score/12<br>
    <hr>
    <b>Corrected version:</b> <i>corrected letter</i><br>;
    <hr>
    <b>Explanation:</b> explanations<br>

    Question: ${question}
    Essay: ${letter}
    `,
    max_tokens: 1000,
    temperature: 0,
  });
  
   res.json(completion)
})





server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});