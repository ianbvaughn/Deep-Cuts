{% docs silver_api_logs %}

Performs the following clean operations on `bronze.bronze_api_logs`.

- Removes records where `response_body` is `null`.
- Adds an additional column `status`, derived from `status_code`, which indicates if the API call succeeded or failed.

{% enddocs %}