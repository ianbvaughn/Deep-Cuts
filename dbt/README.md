A dbt (data build tool) project that transforms API log data using a medallion architecture, ensuring data quality through comprehensive testing and automated daily runs via GitHub Actions.

## Overview

This repository contains the data transformation layer for API log analytics, implementing a medallion architecture (Bronze → Silver → Gold) to progressively refine and aggregate API usage data captured from the Express.js backend.

## Features

- **Medallion Architecture**: Three-layer data model for progressive data refinement
- **Data Quality Testing**: Comprehensive test suite to ensure data integrity
- **Automated Runs**: Daily scheduled execution via GitHub Actions
- **Incremental Models**: Efficient processing of new data
- **API Analytics**: Transformed models for insights into API usage patterns

## Development

- Create a `.env` file in the `dbt/spotify_dbt` directory with the following variables:
```
DBT_POSTGRES_DBNAME
DBT_POSTGRES_HOST
DBT_POSTGRES_PASSWORD
DBT_POSTGRES_USER
DBT_POSTGRES_PORT
```
- You can get all of the above values from the localhost Supabase instance.
- When performing any dbt commands locally, be sure to preface them with `dotenv run ...`, as this will ensure that environment variables are pulled in. Otherwise, the command will fail.

## Tech Stack

- **Transformation Tool**: dbt Core
- **Database**: PostgreSQL
- **CI/CD**: GitHub Actions
- **Version Control**: Git
