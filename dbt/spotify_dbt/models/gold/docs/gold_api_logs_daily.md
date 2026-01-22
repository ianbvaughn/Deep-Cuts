{% docs gold_api_logs_daily %}

Performs the following transformations on `dbt_silver.silver_api_logs`:

- Truncates the `timestamp` field to a `Date` type, and aggregates by day.
- Performs aggregations based on the new grain, namely `count` and `avg_response_time`.

{% enddocs %}