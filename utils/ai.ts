import {OpenAI} from 'langchain/llms/openai'
import {z} from 'zod'
import {StructuredOutputParser} from 'langchain/output_parsers'
import { PromptTemplate } from 'langchain/prompts'
import {Document} from 'langchain/document'
import { loadQARefineChain } from 'langchain/chains'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'


const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood:
          z.string().describe('mood of the person who wrote the journal entry.'),
        subject: 
          z.string().describe('the subject of the journal entry.'),
        summary:
          z.string().describe('summary of the entire journal entry.'),
        negative:
          z.boolean().describe('is the journal entry negative?(i.e does it contain negative emotion?)'),
        color: 
        z.string().describe(
        'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'
      ),
        sentimentScore: 
          z.number().describe(
            'sentiment of the text and rated from scale -10 to 10  where -10 is extremely negative, 0 is neutral, 1 is positive and 10 is extremely positive.'
          )
    })
)

const getPrompt =async (content) => {
  const fromattedInstructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({
    entry: content,
  })

  return input
}


export const qa = async(question, entries) => {
  const docs = entries.map((entry) => new Document({
    pageContent: entry.content,
    metadata: { id: entry.id, createdAt: entry.createdAt },
  }))
  const model = new OpenAI({temperature:0, modelName:'gpt-3.5-turbo'})
  const chain = loadQARefineChain(model)
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)
  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  })
  return res.output_text;
}

export const analyze = async(prompt) => {
    const model = new OpenAI({temperature:0, modelName:'gpt-3.5-turbo'})
    const result =await model.call(prompt)
    console.log(result)
    try {
      return parser.parse(result)
    } catch (e) {
      const fixParser = OutputFixingParser.fromLLM(
        new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' }),
        parser
      )
      const fix = await fixParser.parse(result)
      return fix
    }

}