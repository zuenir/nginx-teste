import { defineConfig } from 'vite';

export default defineConfig({
  // Configuração do Vite
  build: {
    outDir: 'dist', // Diretório de saída do build
  },
  server: {
    port: 3000, // Porta que o Vite vai rodar (ajuste conforme necessário)
  },
});
