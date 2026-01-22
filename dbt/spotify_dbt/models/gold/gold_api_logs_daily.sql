select
   date_trunc('day', timestamp)::date as created_day,
   status,
   count(*),
   round(avg(response_time_ms),2) as avg_response_time
from
   {{ ref('silver_api_logs') }}
group by
   created_day,
   status
order by
   created_day desc,
   status desc