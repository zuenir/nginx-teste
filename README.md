# 🚀 NGINX Teste CI/CD Pipeline

Este projeto é uma aplicação Node.js simples que utiliza uma pipeline completa de CI/CD com **Jenkins**, **Netlify**, notificações via **Slack**, monitoramento com **Prometheus e Grafana**, e tunelamento com **Ngrok**.

---

## 📦 Tecnologias

- Node.js 22.14.0
- Jenkins (Declarative Pipeline)
- Docker (para stages de build e test)
- Netlify CLI (para deploy)
- Jest (testes unitários)
- Vite (build frontend)
- Slack (notificações)
- Ngrok (webhook GitHub)
- Prometheus & Grafana (monitoramento)
- NGINX (reverse proxy)

---

## 🔁 Pipeline (Jenkinsfile)

O pipeline executa as seguintes etapas:

1. **Trigger**:
   - Automático via push para GitHub.
   - Usando webhook via [Ngrok](https://3bde-129-122-175-119.ngrok-free.app/github-webhook/).

2. **Build**:
   - Usa Docker com `node:22.14.0`.
   - Instala dependências com `npm ci`.
   - Gera a build com `vite build`.

3. **Testes**:
   - Roda testes com Jest.
   - Gera relatórios em `test-results/junit.xml`.

4. **Deploy**:
   - Realiza deploy com `netlify-cli` para produção.
   - Site Netlify:  
     🔗 [https://venerable-hummingbird-a835ec.netlify.app](https://venerable-hummingbird-a835ec.netlify.app)

5. **Notificações Slack**:
   - Status do build enviado para o canal `#ci-cd-alertas`.

6. **Observabilidade**:
   - Jenkins expõe métricas para Prometheus.
   - Dashboards customizados no Grafana.
---

## 🧰 Pré-requisitos para rodar localmente
   - Docker instalado e rodando
   - Node.js v22.14.0
   - Jenkins em container ou instalado localmente
   - Conta Netlify com site configurado
   - Token Netlify armazenado no Jenkins Credentials (netlify-token)
   - Conta Slack com Webhook configurado
   - Ngrok instalado (ou tunnel alternativo)
   - Prometheus e Grafana (via docker-compose, opcional)
---

## 🌐 Site publicado

🔗 **[Acesse aqui o site no Netlify](https://venerable-hummingbird-a835ec.netlify.app)**

---

## 📦 Scripts disponíveis

```bash
npm run build        # Gera os arquivos estáticos para produção
npm run test:jest    # Roda os testes unitários