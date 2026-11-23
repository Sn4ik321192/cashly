import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({base:'/cashly/',plugins:[react(),tailwindcss(),VitePWA({registerType:'autoUpdate',includeAssets:['icon.svg','apple-touch-icon.png'],manifest:{name:'Cashly — личный бюджет',short_name:'Cashly',description:'Личный бюджет и расходы',lang:'ru',theme_color:'#11111c',background_color:'#11111c',display:'standalone',start_url:'/cashly/',scope:'/cashly/',icons:[{src:'/cashly/icon-192.png',sizes:'192x192',type:'image/png',purpose:'any'},{src:'/cashly/icon-512.png',sizes:'512x512',type:'image/png',purpose:'any maskable'}]}})],test:{environment:'jsdom',setupFiles:'./src/testSetup.ts',globals:true,testTimeout:20000}});
