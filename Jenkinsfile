pipeline {
    agent any

    options {
        // Skip the default automatic SCM checkout so we can perform an explicit, cross-platform checkout
        skipDefaultCheckout()
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        NODE_ENV = 'test'
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                echo '===== Checking out source code (explicit) ====='
                script {
                    // Diagnostic info to help when Git is not found on Windows agents
                    if (isUnix()) {
                        sh 'echo PATH=$PATH'
                        sh 'which git || true'
                        sh 'git --version || true'
                        // clone into workspace
                        sh "git clone ${env.GIT_URL} . || true"
                        sh "git rev-parse --abbrev-ref HEAD || true"
                    } else {
                        bat 'echo %PATH%'
                        bat 'where git || echo git-not-found'
                        bat 'git --version || echo git-version-failed'
                        // clone into workspace (Windows)
                        bat "git clone %GIT_URL% . || echo clone-failed"
                        bat 'git rev-parse --abbrev-ref HEAD || echo no-branch'
                    }
                    // If you prefer to use Jenkins' built-in checkout, replace the above with `checkout scm`
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '===== Installing npm dependencies ====='
                script {
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo '===== Running Playwright tests ====='
                script {
                    if (isUnix()) {
                        sh '''
                            npm run clean:allure
                            npm run clean:test-results
                            npm run setup:allure
                            npx playwright test
                        '''
                    } else {
                        bat """
                            npm run clean:allure
                            npm run clean:test-results
                            npm run setup:allure
                            npx playwright test
                        """
                    }
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                echo '===== Generating Allure report ====='
                script {
                    if (isUnix()) {
                        sh 'npm run allure:generate'
                    } else {
                        bat 'npm run allure:generate'
                    }
                }
            }
        }
    }

    post {
        always {
            echo '===== Collecting test results ====='
            
            // Publish Allure report
            allure includeProperties: false,
                   jdk: '',
                   results: [[path: 'allure-results']]
            
            // Archive test results and Allure report
            archiveArtifacts artifacts: 'allure-report/**,allure-results/**',
                             allowEmptyArchive: true,
                             fingerprint: true
            
            // Clean workspace (optional)
            cleanWs(
                deleteDirs: true,
                patterns: [[pattern: 'allure-report', type: 'INCLUDE']]
            )
        }

        success {
            echo '✓ All tests passed successfully!'
        }

        failure {
            echo '✗ Tests failed. Check the Allure report for details.'
        }
    }
}
