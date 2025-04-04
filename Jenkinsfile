pipeline {
    agent any

    triggers {
        githubPush()  // Para GitHub
    }

    environment {
        NETLIFY_SITE_ID ='22266909-eb01-406d-b359-57407541046a'
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
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
