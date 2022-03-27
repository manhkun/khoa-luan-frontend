/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: 'http://localhost:8000',
    MAPBOX_ACCESS_TOKEN: 'pk.eyJ1Ijoia3VucHJvIiwiYSI6ImNsMThvdTRrZzFmeW4za2thMGxocGh1ZjgifQ.lqhRqC0A8LbNsyw9X5ro2g'
  }
}

module.exports = nextConfig
