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
                    // Perform explicit GitSCM checkout using optional credentials if provided.
                    // Set repo URL and branch via environment variables or defaults.
                    def repoUrl = env.GIT_URL ?: 'https://github.com/prasanth-dataart/Playwright-JavaScript-UI-Automation-GenAI'
                    def branchName = env.BRANCH_NAME ?: 'main'
                    def credentialsId = env.GIT_CREDENTIALS ?: ''

                    echo "Checking out ${repoUrl} branch ${branchName}"

                    def userRemote
                    if (credentialsId?.trim()) {
                        echo "Using credentialsId: ${credentialsId}"
                        userRemote = [[url: repoUrl, credentialsId: credentialsId]]
                    } else {
                        userRemote = [[url: repoUrl]]
                    }

                    try {
                        checkout([$class: 'GitSCM', branches: [[name: "*/${branchName}"]], doGenerateSubmoduleConfigurations: false, extensions: [], userRemoteConfigs: userRemote])
                    } catch (err) {
                        echo "Explicit GitSCM checkout failed: ${err}"
                        echo 'Running diagnostics and attempting fallback clone only if workspace empty'
                        if (isUnix()) {
                            sh 'echo PATH=$PATH'
                            sh 'which git || true'
                            sh 'git --version || true'
                            sh '''
                                if [ -z "$(ls -A .)" ]; then
                                  git clone ${repoUrl} . || true
                                else
                                  echo "Workspace not empty, skipping clone"
                                fi
                            '''
                        } else {
                            bat 'echo %PATH%'
                            bat 'where git || echo git-not-found'
                            bat 'git --version || echo git-version-failed'
                            bat "if not exist .git ( git clone ${repoUrl} . ) else ( echo Workspace not empty, skipping clone )"
                        }
                    }
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
            
            // Publish Allure report if plugin is available; otherwise archive artifacts so report can be downloaded
            script {
                try {
                    allure includeProperties: false,
                           jdk: '',
                           results: [[path: 'allure-results']]
                    echo 'Allure report published via plugin.'
                } catch (err) {
                    echo "Allure plugin not available or publish failed: ${err}"
                    echo 'Archiving allure artifacts instead.'
                }
            }

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
