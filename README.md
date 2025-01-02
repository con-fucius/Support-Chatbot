# AI-Powered Customer Support with AWS Bedrock

This project demonstrates the use of AWS Bedrock to create an AI-powered customer support agent capable of answering customer inquiries. It leverages the **AWS SDK for Bedrock** to interact with a pre-trained model for natural language processing, along with a local product catalog for contextual query handling.

---

## Features

1. Customer Inquiry Handling 
   Uses AWS Bedrock's pre-trained models to generate responses for general inquiries.

2. Context-Aware Responses 
   Handles product-specific queries using a locally stored product catalog (`productCatalog.json`).

3. Dynamic Query Processing  
   Distinguishes between general inquiries, product-specific questions, and shipping-related queries for tailored responses.

4. Simulated Interaction  
   Includes a simulation of multiple customer queries with AI-generated responses.

---

## Prerequisites

1. AWS Account
   Ensure you have access to AWS and the Bedrock service.

2. Environment Setup  
   - Install Node.js and npm.
   - Configure your AWS credentials (`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`).

3. Dependencies  
   Install the required packages using:
   ```bash
   npm install @aws-sdk/client-bedrock dotenv
   ```

4. Product Catalog
   Create a `productCatalog.json` file in the root directory containing your product data, e.g.:
   ```json
   [
       {
           "name": "iPhone 15",
           "description": "The latest smartphone from Apple with cutting-edge technology.",
           "price": 999
       },
       {
           "name": "MacBook Pro",
           "description": "A high-performance laptop for professionals.",
           "price": 1999
       }
   ]
   ```

---

## Usage

### Run the Simulation
To start the project and simulate customer interactions, run:
```bash
node <filename>.js
```

### Key Functionalities
- **General Inquiries**: Uses AWS Bedrock for open-ended questions.
- **Product Queries**: Matches the query with the product catalog for tailored responses.
- **Shipping Information**: Provides pre-defined shipping policy details.

---

## Code Overview

### Initialization
- Loads environment variables using `dotenv`.
- Initializes AWS Bedrock client with necessary credentials.

### Core Functions
1. **`handleCustomerInquiry`**  
   Sends customer queries to the Bedrock model for AI-generated responses.

2. **`processQuery`**  
   Routes queries to appropriate handlers:
   - Product-related queries are matched against the catalog.
   - Shipping queries return predefined answers.
   - General queries are forwarded to `handleCustomerInquiry`.

3. **`simulateCustomerInteraction`**  
   Demonstrates the system's ability to process multiple customer queries and generate responses.

---

## Security Considerations
- **Environment Variables**: Use `.env` to securely store AWS credentials.
- **Error Handling**: Includes error-catching mechanisms for Bedrock interactions.
- **Data Privacy**: Ensure sensitive customer data is handled in compliance with privacy regulations.

---

## Future Improvements
1. Expand product catalog integration with real-time databases.
2. Enhance AI model capabilities for better context understanding.
3. Add multi-language support for international customers.

--- 

## License
This project is licensed under the [MIT License](LICENSE).
