pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        NETLIFY_SITE_ID ='22266909-eb01-406d-b359-57407541046a'
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
        SLACK_WEBHOOK = credentials('slack-webhook')
        SLACK_CHANNEL = '#ci-cd-alertas'
    }

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:22.14.0'
                    reuseNode true
                }
            }
            steps {
                echo "🚀 Iniciando build do projeto: ${env.JOB_NAME} [#${env.BUILD_NUMBER}]"
                sh '''
                    ls -la
                    node --version
                    npm --version
                    npm ci
                    npm run build
                    ls -la
                '''
            }
            post {
                success {
                    echo "✅ Build finalizado com sucesso!"
                }
                failure {
                    echo "❌ Build falhou!"
                }
            }
        }

        stage('Tests'){
            parallel{
                stage('Unit Tests'){
                    agent {
                        docker {
                            image 'node:22.14.0'
                            reuseNode true
                        }
                    }
                    steps {
                        sh '''
                            #test -f dist/index.html
                            npm run test:jest
                        '''
                    }
                    post {
                        always {
                            junit 'test-results/junit.xml'
                        }
                        success {
                            echo "✅ Testes passaram com sucesso!"
                        }
                        failure {
                            echo "❌ Algum teste falhou!"
                        }
                    }
                }
            }
        }

        stage('Tag Release') {
            steps {
                echo "🏷️ Criando TAG no Git..."
                sh '''
                    TAG_NAME="v$(date +%Y%m%d%H%M%S)"
                    git config --global user.email "zuenirlima@gmail.com"
                    git config --global user.name "zuenir"
                    git tag $TAG_NAME
                    git push origin $TAG_NAME
                    echo "✅ TAG criada: $TAG_NAME"
                '''
            }
        }

        stage('Deploy') {
            agent {
                docker {
                    image 'node:22.14.0'
                    reuseNode true
                }
            }
            steps {
                echo "🚀 Iniciando deploy para Netlify..."
                sh '''
                    npm install netlify-cli
                    NETLIFY_VERSION=$(node_modules/.bin/netlify --version)
                    echo "Netlify CLI: $NETLIFY_VERSION"

                    echo "Deploying to production, Site Id: $NETLIFY_SITE_ID"
                    node_modules/.bin/netlify status

                    DEPLOY_OUTPUT=$(node_modules/.bin/netlify deploy --dir=dist --prod)
                    echo "$DEPLOY_OUTPUT"

                    SITE_URL=$(echo "$DEPLOY_OUTPUT" | grep -i "Website URL" | awk '{print $3}')
                    echo "🌍 Site publicado com sucesso: $SITE_URL"
                '''
            }
        }
    }

    post {
        success {
            slackSend (channel: '#ci-cd-alertas', color: 'good', message: "✅ *Build Sucesso* - Projeto `${env.JOB_NAME}` [#${env.BUILD_NUMBER}]\nURL: ${env.BUILD_URL}")slackSend (
                color: '#36a64f',
                message: "✅ *SUCESSO:* Pipeline finalizado com sucesso em `${env.JOB_NAME}` (<${env.BUILD_URL}|#${env.BUILD_NUMBER}>)",
                channel: "${env.SLACK_CHANNEL}",
                webhookUrl: "${env.SLACK_WEBHOOK}"
            )
        }
        failure {
            slackSend (channel: '#ci-cd-alertas', color: 'danger', message: "❌ *Build Falhou* - Projeto `${env.JOB_NAME}` [#${env.BUILD_NUMBER}]\nVeja o log: ${env.BUILD_URL}")slackSend (
                color: '#ff0000',
                message: "❌ *FALHA:* Algo deu errado em `${env.JOB_NAME}` (<${env.BUILD_URL}|#${env.BUILD_NUMBER}>)",
                channel: "${env.SLACK_CHANNEL}",
                webhookUrl: "${env.SLACK_WEBHOOK}"
            )
        }
    }
}
