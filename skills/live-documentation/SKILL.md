---
name: live-documentation
description: Guidelines and workflows for keeping project documentation (README, API docs) up-to-date with code changes. Use this skill when the user asks to "update docs", "refresh the readme", or "document this feature".
---

# Live Documentation Skill

This skill ensures that project documentation evolves in sync with the codebase, preventing "documentation drift."

## 1. Core Philosophy

- **Documentation is Code**: Treat documentation updates with the same rigor as code changes.
- **Proximity**: Keep documentation close to the code it describes (e.g., docstrings, `README.md` in component folders).
- **Just-in-Time**: fast small updates are better than massive, infrequent rewrites.

## 2. Agent Workflow for Updates

When asked to update documentation:

### Step 1: Context Analysis

1.  Read the current `README.md` or target documentation file.
2.  Analyze recent code changes (using `git diff` or by reviewing the files modified in the current session).
3.  Identify **Drift**: What is in the code but missing/wrong in the docs? (e.g., new env vars, broken installation steps, changed API endpoints).

### Step 2: Incremental Updates

Do not rewrite the entire file unless requested. Target specific sections:

- **Installation**: Did dependencies change? Update `pip install`/`npm install` instructions.
- **Configuration**: Did `.env.example` change? Update the "Configuration" table.
- **Usage**: Did the API signature change? Update code examples.

### Step 3: Verification

1.  After updating, `view_file` the result to ensure formatting is correct (Markdown tables, code blocks).
2.  If the change implies a command (e.g., "Run this script"), verify the command actually works or is correct based on the codebase.

## 3. README Structure Standard

Ensure the root `README.md` always contains:

1.  **Title & Description**: What does this project do?
2.  **Getting Started**: Essentials to run it locally (Prerequisites, Installation, Running).
3.  **Project Structure**: High-level overview of important folders.
4.  **Key Features**: Bullet points of what is implemented.

## 4. Documentation formatting

- Use **Markdown** best practices.
- Use commands in code blocks for easy copying.
- Link to internal files using relative paths.
- Keep language simple and direct.

## 5. Usage Triggers

- "Update the README."
- "Add this new script to the docs."
- "Document the changes we just made."
