import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'./tests/browser',workers:1,use:{channel:'chrome',baseURL:'http://127.0.0.1:3100',viewport:{width:390,height:844}},webServer:{command:'npm run start -- --port 3100',url:'http://127.0.0.1:3100',reuseExistingServer:false,timeout:120000}});
