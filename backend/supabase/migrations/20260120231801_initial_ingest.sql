drop extension if exists "pg_net";

create schema if not exists "bronze";

create schema if not exists "dbt_dev_gold";

create schema if not exists "dbt_dev_silver";

create schema if not exists "dbt_gold";

create schema if not exists "dbt_silver";


  create table "bronze"."bronze_api_logs" (
    "log_id" bigint generated always as identity not null,
    "timestamp" timestamp with time zone not null,
    "user_id" character varying(255),
    "endpoint" character varying(500) not null,
    "http_method" character varying(10) not null,
    "status_code" integer not null,
    "response_time_ms" integer,
    "request_body" jsonb,
    "response_body" jsonb,
    "ip_address" inet,
    "user_agent" text,
    "ingested_at" timestamp without time zone not null default now()
      );



  create table "dbt_dev_gold"."gold_api_logs_daily" (
    "created_day" date,
    "status" text,
    "count" bigint
      );



  create table "dbt_dev_silver"."silver_api_logs" (
    "log_id" bigint,
    "timestamp" timestamp with time zone,
    "user_id" character varying(255),
    "endpoint" character varying(500),
    "http_method" character varying(10),
    "status_code" integer,
    "status" text,
    "response_time_ms" integer,
    "response_body" jsonb,
    "ip_address" inet,
    "user_agent" text,
    "ingested_at" timestamp without time zone
      );



  create table "dbt_gold"."gold_api_logs_daily" (
    "created_day" date,
    "status" text,
    "count" bigint
      );



  create table "dbt_silver"."silver_api_logs" (
    "log_id" bigint,
    "timestamp" timestamp with time zone,
    "user_id" character varying(255),
    "endpoint" character varying(500),
    "http_method" character varying(10),
    "status_code" integer,
    "status" text,
    "response_time_ms" integer,
    "response_body" jsonb,
    "ip_address" inet,
    "user_agent" text,
    "ingested_at" timestamp without time zone
      );


CREATE UNIQUE INDEX bronze_api_logs_pkey ON bronze.bronze_api_logs USING btree (log_id);

alter table "bronze"."bronze_api_logs" add constraint "bronze_api_logs_pkey" PRIMARY KEY using index "bronze_api_logs_pkey";


