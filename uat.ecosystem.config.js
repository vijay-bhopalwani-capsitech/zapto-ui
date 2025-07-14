module.exports = {
  apps: [
    {
      name: "cit-uat-app",
      script: "yarn",
      args: "app:linux-start",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
