// lib/ai/openai.js
import { OPENAI_API_KEY } from '@env';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4.1-nano';

async function callOpenAI(body) {
  const res = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || `OpenAI error: ${res.status}`);
  }
  return data.choices[0].message;
}

/**
 * Freestyle chat completion
 */
export async function chatCompletion(messages) {
  return callOpenAI({
    model:       MODEL,
    messages,
    temperature: 0.7,
  });
}

/**
 * Generate a personalized workout plan via function call
 */
export async function generateWorkoutPlan({
  goal,
  daysPerWeek,
  durationMinutes,
  injuries = [],
}) {
  const functionSpec = [
    {
      name:        'generateWorkoutPlan',
      description: 'Create a personalized workout plan',
      parameters: {
        type: 'object',
        properties: {
          goal:           { type: 'string',  description: 'The user’s fitness goal' },
          daysPerWeek:    { type: 'integer', description: 'Workouts per week' },
          durationMinutes:{ type: 'integer', description: 'Session length in minutes' },
          injuries: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of injuries',
          },
        },
        required: ['goal', 'daysPerWeek', 'durationMinutes'],
      },
    },
  ];

  const systemMessage = {
    role:    'system',
    content: 'You are a fitness coach. Provide a workout plan.',
  };

  const response = await callOpenAI({
    model:         MODEL,
    messages:      [systemMessage],
    functions:     functionSpec,
    function_call: { name: 'generateWorkoutPlan' },
  });

  const call = response.function_call;
  if (!call) throw new Error('No plan returned');
  return JSON.parse(call.arguments);
}

/**
 * Adjust an existing macro plan based on user feedback via function call
 */
export async function adjustMacroPlan({ plan, feedback }) {
  const functionSpec = [
    {
      name:        'adjustMacroPlan',
      description: 'Adjust macros and calories based on user feedback',
      parameters: {
        type: 'object',
        properties: {
          calories: { type: 'integer', description: 'Adjusted total calories' },
          protein:  { type: 'integer', description: 'Adjusted protein grams' },
          fats:     { type: 'integer', description: 'Adjusted fat grams' },
          carbs:    { type: 'integer', description: 'Adjusted carb grams' },
        },
        required: ['calories', 'protein', 'fats', 'carbs'],
      },
    },
  ];

  const messages = [
    { role: 'system',    content: 'You are a nutrition coach. Adjust the macros.' },
    { role: 'assistant', content: JSON.stringify(plan) },
    { role: 'user',      content: feedback },
  ];

  const response = await callOpenAI({
    model:         MODEL,
    messages,
    functions:     functionSpec,
    function_call: { name: 'adjustMacroPlan' },
  });

  const call = response.function_call;
  if (!call) throw new Error('No adjustments returned');
  return JSON.parse(call.arguments);
}
