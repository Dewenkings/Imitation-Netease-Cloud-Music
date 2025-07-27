module.exports = {
  apps: [
    {
      name: process.env.NAME || 'netease-music',
      exec_mode: 'cluster',
      instances: process.env.INSTANCES || 1,
      script: './server/app.js',
      cwd: './',
      env: {
        NODE_ENV: process.env.NODE_ENV || 'production',
        PORT: process.env.PORT || 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: process.env.PORT || 3001
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '1G'
    }
  ]
}
