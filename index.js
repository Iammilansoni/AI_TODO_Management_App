// index.js
import 'dotenv/config';
import { db } from './src/db/index.js';
import { todosTable } from './src/db/schema.js';
import { ilike, eq } from 'drizzle-orm';
import { GoogleGenerativeAI } from "@google/generative-ai";
import readlineSync from 'readline-sync';

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// DB tool functions
async function getAllTodos() {
  return await db.select().from(todosTable);
}

async function createTodo(todo) {
  const [result] = await db
    .insert(todosTable)
    .values({ todo })
    .returning({ id: todosTable.id });
  return result.id;
}

async function deleteTodoById(id) {
  return await db.delete(todosTable).where(eq(todosTable.id, id));
}

async function searchTodos(query) {
  return await db.select().from(todosTable).where(ilike(todosTable.todo, `%${query}%`));
}

// Map tool functions so that the AI can decide what to do
const tools = {
  getAllTodos,
  createTodo,
  deleteTodoById,
  searchTodos,
};

// In‑memory conversation history
const messages = [];

// Improved system prompt with examples to guide the AI to return strict JSON
const SYSTEM_PROMPT = `
You are an AI To-Do List Assistant that follows a structured conversation format.
When a user asks to add, view, or delete tasks, output a JSON object with one of the following formats:

Example for creating a task:
{
  "type": "action",
  "function": "createTodo",
  "input": "Build E-commerce Project (Due: 8:00 AM)"
}

Example for deleting a task:
{
  "type": "action",
  "function": "deleteTodoById",
  "input": "3"
}

Example for viewing tasks:
{
  "type": "action",
  "function": "getAllTodos",
  "input": ""
}

Or, if no tool action is needed, output:
{
  "type": "output",
  "output": "Your response message here"
}

Also, consider the following Todo DB Schema:
- id: Int (Primary Key)
- todo: String
- created_at: Date Time
- updated_at: Date Time

Before planning an action, include any previous tasks (from getAllTodos) as context.
`;

async function runApp() {
  while (true) {
    try {
      const userInput = readlineSync.question('User: ');
      // Append the new user message to the conversation
      messages.push({ role: "user", parts: [{ text: userInput }] });

      // Fetch current tasks to provide context
      const currentTodos = await getAllTodos();
      const contextInfo = `Current tasks: ${JSON.stringify(currentTodos)}`;

      // Start the chat with Gemini AI, adding context and our conversation history
      const chat = model.startChat({ history: messages });
      const fullContext = `${SYSTEM_PROMPT}\n${contextInfo}`;
      const response = await chat.sendMessage(userInput, {
        context: fullContext,
      });
      
      // Extract the text from the response
      const rawResponse = await response.response.text();
      console.log(`\n\n -------------START AI----------`);
      console.log(rawResponse);
      console.log(`\n\n -------------END AI----------`);

      try {
        // Expecting a valid JSON response from the AI
        const action = JSON.parse(rawResponse);
        messages.push({ role: "model", parts: [{ text: rawResponse }] });
  
        if (action.type === 'output') {
          console.log('Assistant:', action.output);
        } else if (action.type === 'action') {
          const fn = tools[action.function];
          if (!fn) {
            throw new Error(`Invalid tool function: ${action.function}`);
          }
          const observation = await fn(action.input);
          console.log(`Tool [${action.function}] observation:`, observation);
  
          // Append the observation back to the conversation for further context
          messages.push({
            role: "user",
            parts: [{ text: JSON.stringify({ type: 'observation', observation }) }],
          });
        }
      } catch (jsonError) {
        console.error('Invalid AI JSON response:', rawResponse);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
}

runApp();
