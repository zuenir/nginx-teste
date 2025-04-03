pipeline {
    agent any

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:22.14.0'
                    reuseNode true
                }
            }
            steps {
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
                /*
                stage('Start Server') {
                    steps {
                        // Inicia o servidor em segundo plano
                        sh 'npm start &'
                        // Aguardar um pouco para garantir que o servidor tenha iniciado
                        sh 'sleep 5'
                    }
                }
                stage('E2E'){
                    agent {
                        docker {
                        image 'cypress/included:14.2.1'
                        reuseNode true  
                        }
                    }
                    steps{
                        sh '''
                            npm run test:cypress
                        ''' 
                    }
                    post {
                        always {
                            junit 'test-results/junit.xml'
                        }
                    }
                }
                stage('Stop Server') {
                    steps {
                        // Desliga o servidor
                        sh 'pkill -f "npm start"' // Encerra o processo iniciado
                    }
                }*/
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
                '''
            }
        }
    }
}
