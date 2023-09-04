import {OpenAI} from 'langchain/llms/openai'
import z from 'Zod'
import {StructuredOutputParser} from 'langchain/output_parsers'
import { PromptTemplate } from 'langchain/prompts'

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood:z.string().describe('mood of the person who wrote the journal entry.'),
        subject: z.string().describe('the subject of the journal entry.'),
        summary:z.string().describe('summary of the entire journal entry.'),
        negative:z.boolean().describe('is the journal entry negative?(i.e does it contain negative emotion?)'),
        color: z
      .string()
      .describe(
        'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'
      ),
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