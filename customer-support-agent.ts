import { BedrockClient, InvokeModelCommand } from '@aws-sdk/client-bedrock';  // AWS SDK for Bedrock
import { config } from 'dotenv';
import { readFileSync } from 'fs';

// Load environment variables (AWS credentials, etc.)
config();

// Load a product catalog (optional)
const productCatalog = JSON.parse(readFileSync('productCatalog.json', 'utf8'));

// Initialize AWS Bedrock Client
const client = new BedrockClient({
  region: 'us-east-1', // Specify region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

// Function to handle customer inquiries using Bedrock
async function handleCustomerInquiry(inquiry: string): Promise<string> {
  // Prepare input to send to the Bedrock model
  const inputText = `Customer Inquiry: ${inquiry}\nResponse:`;

  const params = {
    modelId: 'amazon.titan-text-1.0',  // (Can change to your specific model)
    body: JSON.stringify({ prompt: inputText, maxTokens: 150, temperature: 0.7 })
  };

  try {
    // Invoke Bedrock model to get a response
    const command = new InvokeModelCommand(params);
    const response = await client.send(command);

    // Parse and return the response text from Bedrock
    if (response.body) {
      const body = JSON.parse(Buffer.from(response.body).toString('utf-8'));
      return body.choices[0].text.trim();
    }
    return 'Sorry, I couldn\'t understand your query.';
  } catch (error) {
    console.error('Error invoking Bedrock model:', error);
    return 'Sorry, there was an error processing your request.';
  }
}

// Function to process a customer query with contextual information (e.g., from the product catalog)
async function processQuery(query: string): Promise<string> {
  // Example query types to process differently
  if (query.includes('product')) {
    const product = productCatalog.find((item: any) => query.toLowerCase().includes(item.name.toLowerCase()));
    if (product) {
      return `Here is the information about ${product.name}: ${product.description}. It costs $${product.price}.`;
    }
    return 'I couldn\'t find any product matching your query.';
  } else if (query.includes('shipping')) {
    return 'We offer free shipping on orders over $50. Estimated delivery is 3-5 business days.';
  } else {
    // For general inquiries, use Bedrock
    return await handleCustomerInquiry(query);
  }
}

// Simulate a customer interacting with the AI-powered support agent
async function simulateCustomerInteraction() {
  const queries = [
    "Can you tell me about the latest iPhone?",
    "What are the shipping charges for my order?",
    "I need help with my recent order.",
    "Do you have any discounts on laptops?"
  ];

  for (const query of queries) {
    console.log(`Customer Query: ${query}`);
    const response = await processQuery(query);
    console.log(`AI Response: ${response}\n`);
  }
}

// Start the simulation of customer interactions
simulateCustomerInteraction().catch(console.error);
