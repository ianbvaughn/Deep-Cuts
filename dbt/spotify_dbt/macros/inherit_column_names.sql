{% macro get_columns_from_source() %}
   {% if execute %}
      {% for source in graph.sources.values() %}
         {% for column in source.columns %}
            {{ print(column) }}
         {% endfor %}   
      {% endfor %}
   {% endif %}
{% endmacro %}