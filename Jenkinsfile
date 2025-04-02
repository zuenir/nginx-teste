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
                        npm run test
                    '''
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
                        npm run test:2e2
                    ''' 
                }
            }
        }
    }

    post {
        always {
            junit 'test-results/junit.xml'
        }
    }
}
