// 1
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string)

// 2
const generationConfig = {
  stopSequences: ['red'],
  maxOutputTokens: 500,
  temperature: 0.7,
  topP: 0.6,
  topK: 16,
}

// 3
const model = genAI.getGenerativeModel({ model: 'gemini-pro', generationConfig })

// 4
export async function POST(request: NextRequest) {
  const { messages } = await request.json()
  const prompt = messages[messages.length - 1].content
  const result = await model.generateContent(prompt)

  // 5
  return NextResponse.json(result.response.text(), { status: 200 })
}

/*
 *
1
genAI implements a GoogleGenerativeAI instance, this allows us to access Gemini AI using the API key created earlier.

2
generationConfig configures model parameters that controls how Gemini Pro should generate responses:

stopSequences: Sets a stop sequence to tell the model to stop generating content. A stop sequence can be any sequence of characters. In this case, it will stop if it encounters the word "red".
maxOutputTokens: Specifies the maximum number of tokens that can be generated in the response. A token is approximately four characters. 100 tokens correspond to roughly 60–80 words.
temperature: This controls the randomness of the response. A higher temperature (closer to 1) leads to more creative but potentially nonsensical responses, while a lower temperature (closer to 0) gives more predictable but potentially repetitive answers.
topP: This influences which words Gemini AI chooses when generating text. A lower value focuses on the most likely words, while a higher value gives some weight to less likely but potentially interesting options.
topK: This considers the top K most likely continuations for each word, increasing the diversity of possible responses.
model initializes the “gemini-pro” Generative Model, with the parameters declared. (For detailed information about the available models, including their capabilities and rate limits, check the documentation)
4
The POST function will receive data through an API request.
It then extracts the user’s last message (prompt) from the received data and uses the model to generate a response (result) based on the user's prompt.

5
The POST function converts the generated response from Gemini AI into a format suitable for sending back through the API (NextResponse.json).
It sends the response back to the user along with a success code (200).

TL;DR
In essence, this code acts as a bridge between the application and Gemini AI. It allows us to send prompts to Gemini AI, receive its responses, and format them appropriately for the application.
**/
