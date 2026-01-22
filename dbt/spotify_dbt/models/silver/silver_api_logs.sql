select
   log_id,
   timestamp,
   user_id,
   endpoint,
   http_method,
   status_code,
   case when status_code >= 200 or status_code <= 399 then 'Success' else 'Failure' end as status,
   response_time_ms,
   response_body,
   ip_address,
   user_agent,
   ingested_at
from
   {{ source('bronze', 'bronze_api_logs') }}
where
   response_body is not null