import { response } from "express";
import { pool } from "./pg-db.mjs";

const apiLogger = async (req, res, next) => {
   const startTime = Date.now();

   const requestBody = req.body ? JSON.stringify(req.body) : null;

   const originalSend = res.send;
   const originalJson = res.json;
   let responseBody = null;

   res.json = function(data) {
      responseBody = JSON.stringify(data);
      return originalJson.call(this,data);
   };

   res.send = function(data) {
      if (!responseBody && data) {
         responseBody = typeof data === 'string' ? data : JSON.stringify(data);
      }
      return originalSend.call(this,data);
   };

   res.on('finish', async () => {
      try {

      // Capture response time delta
      const responseTimeMs = Date.now() - startTime;
      
      // Get user ID from request
      const userId = req.user?.id || null;
      
      // Get IP address (handle proxies)
      const ipAddress = req.ip || 
                        req.headers['x-forwarded-for']?.split(',')[0] || 
                        req.connection.remoteAddress ||
                        req.socket.remoteAddress;
      
      // Get user agent
      const userAgent = req.headers['user-agent'] || null;
      
      // Prepare data for insertion
      const logData = {
        timestamp: new Date(),
        userId: userId,
        endpoint: req.originalUrl || req.url,
        httpMethod: req.method,
        statusCode: res.statusCode,
        responseTimeMs: responseTimeMs,
        requestBody: requestBody,
        responseBody: responseBody,
        ipAddress: ipAddress,
        userAgent: userAgent,
      };
      
      // Insert into database (non-blocking)
      await insertApiLog(logData);
      
    } catch (error) {
      // Log error but don't break the response
      console.error('Error logging API call:', error);
    }
   });

   next();
};

async function insertApiLog(logData) {
  const query = `
    INSERT INTO bronze.bronze_api_logs (
      timestamp,
      user_id,
      endpoint,
      http_method,
      status_code,
      response_time_ms,
      request_body,
      response_body,
      ip_address,
      user_agent
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `;
  
  const values = [
    logData.timestamp,
    logData.userId,
    logData.endpoint,
    logData.httpMethod,
    logData.statusCode,
    logData.responseTimeMs,
    logData.requestBody,
    logData.responseBody,
    logData.ipAddress,
    logData.userAgent,
  ];
  
  await pool.query(query, values);
}

export { apiLogger };