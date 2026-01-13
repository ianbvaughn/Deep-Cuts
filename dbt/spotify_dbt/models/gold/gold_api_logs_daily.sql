select
   date_trunc('day', timestamp)::date as created_day,
   status,
   count(*)
from
   {{ ref('silver_api_logs') }}
group by
   created_day,
   status
order by
   created_day desc,
   status desc