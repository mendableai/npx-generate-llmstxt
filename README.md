# generate-llmstxt

A simple NPX package that generates LLMs.txt files using the Firecrawl API. Specify the URL you want and it creates two files in your specified output directory (defaults to 'public' folder):
- `llms.txt`: Contains a summary of the LLM-related content
- `llms-full.txt`: Contains the full text content

## Usage

You can run this package using NPX without installing it. There are two ways to provide your Firecrawl API key:

### 1. Using Command Line Arguments

```bash
npx generate-llmstxt --api-key YOUR_FIRECRAWL_API_KEY
```

### 2. Using Environment Variables

Create a `.env` file in your project root and add your API key:

```env
FIRECRAWL_API_KEY=your_api_key_here
```

Then run the command without the --api-key option:

```bash
npx generate-llmstxt
```

### Options

- `-k, --api-key <key>` (optional if set in .env): Your Firecrawl API key
- `-u, --url <url>` (optional): URL to analyze (default: https://example.com)
- `-m, --max-urls <number>` (optional): Maximum number of URLs to analyze (default: 50)
- `-o, --output-dir <path>` (optional): Output directory path (default: 'public')

### Examples

```bash
# Using command line argument with default output directory
npx generate-llmstxt -k your_api_key -u https://your-website.com -m 20

# Using .env file with default output directory
npx generate-llmstxt -u https://your-website.com -m 20

# Specifying a custom output directory
npx generate-llmstxt -k your_api_key -u https://your-website.com -o custom/path/to/output

# Using .env file and custom output directory
npx generate-llmstxt -u https://your-website.com -o content/llms
```

## Requirements

- Node.js 14 or higher
- A valid Firecrawl API key (via command line or .env file)

## Output

The package will create two files in your specified output directory (defaults to 'public'):

1. `llms.txt`: Contains a summary of the LLM-related content
2. `llms-full.txt`: Contains the full text content

## Future Improvements

- [ ] Local version

## License

MIT 
