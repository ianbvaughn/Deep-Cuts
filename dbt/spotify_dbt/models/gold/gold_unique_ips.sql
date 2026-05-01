select
   ip_address,
   min(timestamp) as first_seen_ts
from
   {{ ref('silver_api_logs') }}
where
    ip_address is not null
group by
   ip_address
order by
   first_seen_ts desc