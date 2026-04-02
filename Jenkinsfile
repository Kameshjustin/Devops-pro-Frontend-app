pipeline {
    agent any

    environment {
        AWS_REGION = "eu-north-1"
        S3_BUCKET = "task-manager002"
        CLOUDFRONT_DISTRIBUTION_ID = "E37F27H7BLUDBY"
        NODE_OPTIONS = "--openssl-legacy-provider"
    }

    options {
        timestamps()
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    credentialsId: 'git-cred-akjus',
                    url: 'https://github.com/Kameshjustin/Devops-pro-Frontend-app.git'
            }
        }

        stage('Check Node & NPM') {
            steps {
                sh '''
                  node -v
                  npm -v
                '''
            }
        }

        stage('Install & Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Verify Build Output') {
            steps {
                sh 'ls -la build'
            }
        }

        stage('Deploy to S3') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'askey-seakey-cred-aj'
                ]]) {
                    sh '''
                      aws s3 sync build/ s3://${S3_BUCKET}/ \
                        --delete \
                        --region ${AWS_REGION}
                    '''
                }
            }
        }

        stage('Invalidate CloudFront Cache') {
            when {
                expression { env.CLOUDFRONT_DISTRIBUTION_ID?.trim() }
            }
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'askey-seakey-cred-aj'
                ]]) {
                    sh '''
                      aws cloudfront create-invalidation \
                        --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} \
                        --paths "/*"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Frontend deployed successfully to S3 + CloudFront!"
        }
        failure {
            echo "Pipeline failed!!!!!!!!. Check Jenkins logs."
        }
    }
}

