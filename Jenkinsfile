pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        NETLIFY_SITE_ID ='22266909-eb01-406d-b359-57407541046a'
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
        NGROK_URL = '2674-129-122-174-226.ngrok-free.app' 
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
                script {
                    // Configurar npm para usar o proxy ngrok
                    sh '''
                        npm config set proxy http://$NGROK_URL
                        npm config set https-proxy https://$NGROK_URL
                        npm config set fetch-timeout 60000   # Aumentar o tempo de timeout
                        npm config set fetch-retries 5       # Número de tentativas em caso de falha de rede
                    '''
                }
                sh '''
                    ls -la
                    node --version
                    npm --version
                    npm ci
                    npm run build
                    ls -la
                '''
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
                    }
                }
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
                sh '''
                    npm install netlify-cli
                    node_modules/.bin/netlify --version
                    echo "Deploying to production, Site Id: $NETLIFY_SITE_ID"
                    node_modules/.bin/netlify status
                    node_modules/.bin/netlify deploy --dir=dist --prod
                '''
            }
        }
    }
}
