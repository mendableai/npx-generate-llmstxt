#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import fs from "fs/promises";
import path from "path";
import { config } from "dotenv";
import FirecrawlApp from "@mendable/firecrawl-js";

// Load environment variables from .env file
config();

const program = new Command();

program
  .name("generate-llmstxt")
  .description("Generate LLMs.txt files using Firecrawl API")
  .option(
    "-k, --api-key <key>",
    "Firecrawl API key (can also be set via FIRECRAWL_API_KEY in .env)"
  )
  .option("-u, --url <url>", "URL to analyze", "https://example.com")
  .option("-m, --max-urls <number>", "Maximum URLs to analyze", "50")
  .option("-o, --output-dir <path>", "Output directory path", "public")
  .version("1.0.0");

async function generateLLMsText(
  apiKey: string | undefined,
  url: string,
  maxUrls: number,
  outputDir: string
) {
  try {
    // Check for API key in environment variables if not provided via command line
    const finalApiKey = apiKey || process.env.FIRECRAWL_API_KEY;

    if (!finalApiKey) {
      throw new Error(
        "API key is required. Provide it via --api-key option or FIRECRAWL_API_KEY in .env file"
      );
    }

    const firecrawl = new FirecrawlApp({ apiKey: finalApiKey });

    console.log(chalk.blue("Generating LLMs text files..."));

    const params = {
      maxUrls,
      showFullText: true,
    };

    const results = await firecrawl.generateLLMsText(url, params);

    if (!results.success) {
      throw new Error(results.error || "Unknown error occurred");
    }

    // Create output directory if it doesn't exist
    await fs.mkdir(outputDir, { recursive: true });

    // Write the summary file
    await fs.writeFile(
      path.join(outputDir, "llms.txt"),
      results.data.llmstxt || "",
      "utf-8"
    );

    // Write the full text file
    await fs.writeFile(
      path.join(outputDir, "llms-full.txt"),
      results.data.llmsfulltxt || "",
      "utf-8"
    );

    console.log(chalk.green("✓ Successfully generated LLMs text files"));
    console.log(chalk.gray("Files created:"));
    console.log(chalk.gray(`- ${path.join(outputDir, "llms.txt")}`));
    console.log(chalk.gray(`- ${path.join(outputDir, "llms-full.txt")}`));
  } catch (error) {
    console.error(
      chalk.red("Error:"),
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    process.exit(1);
  }
}

async function main() {
  program.parse();
  const options = program.opts();

  await generateLLMsText(
    options.apiKey,
    options.url,
    parseInt(options.maxUrls, 10),
    options.outputDir
  );
}

main();
