pipeline {
    agent any

    options {
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
                echo '===== Checking out source code ====='
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '===== Installing npm dependencies ====='
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo '===== Running Playwright tests ====='
                sh '''
                    npm run clean:allure
                    npm run clean:test-results
                    npm run setup:allure
                    npx playwright test
                '''
            }
        }

        stage('Generate Allure Report') {
            steps {
                echo '===== Generating Allure report ====='
                sh 'npm run allure:generate'
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
