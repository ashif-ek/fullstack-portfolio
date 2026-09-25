const { Client } = require('pg');

const salaryCheckerContent = `## Overview
Salary Reality Checker is an AI-powered salary analytics platform built with FastAPI, PostgreSQL, and React. It calculates market percentiles, predicts salaries using machine learning, and auto-corrects user input using fuzzy matching to provide accurate FAANG-style insights.

## The Challenge
Salary data is often messy, missing, or inconsistent. Traditional salary calculators struggle with typos in job titles (e.g. "py devloper" vs "Python Developer") and lack predictive capabilities for missing data points or edge cases. The goal was to build an analytics platform capable of smart inference and robust input validation.

## The Solution
We implemented a secure, modular architecture using Python and scikit-learn for machine learning, backed by PostgreSQL. The system features:

- **Smart Percentile Engine:** Dynamically calculates precise percentiles (P10, P25, P50, P75, P90) based on market data.
- **Fuzzy Matching:** Automatically corrects typos and resolves location abbreviations to the closest valid match.
- **ML Salary Prediction:** Trains a Linear Regression model to predict salaries based on experience trends when exact database entries are missing.
- **Admin Tools:** Features secure CSV dataset uploading and bulk inserts directly into PostgreSQL.

## Tech Stack
- **Backend:** FastAPI, Python, SQLAlchemy
- **Database:** PostgreSQL
- **AI/ML:** scikit-learn
- **Frontend:** React, Vite, Tailwind CSS, Recharts, Framer Motion`;

const timelensContent = `## Overview
Time Lens is a mindset and mental model tool that transforms how we perceive time. It reframes real minutes into life-equivalents to help users feel the true weight of time and make every minute intentional.

## The Concept
People often say "value your time," but struggle to visualize what a minute is actually worth. Time Lens reframes every real duration into a life-model:
- **1 real day** = **1 life-year**
- **1 real hour** = **1 life-month**
- **1 real minute** = **1 life-day**
- **1 real second** = **1 life-hour**

## The Solution
The application takes any real duration and instantly returns its life-equivalent metrics (life-days, life-months, life-years). It pairs these conversions with deep insights and meaningful actionable advice, turning passive time-tracking into active mindfulness. By reframing a wasted hour as a lost "life-month", the application drives immediate behavioral change and intentionality.

## Tech Stack
- **Language:** Python
- **Deployment:** Vercel`;

async function main() {
  const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_k4pJBtbXK1nl@ep-bitter-cell-a1rr32mu-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
  });

  await client.connect();

  console.log("Updating salary-checker...");
  await client.query('UPDATE core_project SET content = $1 WHERE slug = $2', [salaryCheckerContent, 'salary-checker']);

  console.log("Updating timelens...");
  await client.query('UPDATE core_project SET content = $1 WHERE slug = $2', [timelensContent, 'timelens']);

  console.log("Updates completed successfully.");
  await client.end();
}

main().catch(console.error);
