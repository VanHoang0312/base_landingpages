pipeline {
    agent any
    stages {
        stage('Init') {
            steps {
                echo 'Testing..'
                telegramSend(message: 'Building Job Daihathanh - Home - Web...', chatId: -740504133)
            }
        }
        stage ('Deployments') {
            steps {
                echo 'Deploying to Production environment...'
                echo 'Copy project over SSH...'
                sshPublisher(publishers: [
                    sshPublisherDesc(
                        configName: 'thinklabs20',
                        transfers:
                            [sshTransfer(
                                cleanRemote: false,
                                excludes: '',
                                execCommand: "docker build -t registry.thinklabs.com.vn:5000/daihathanh-home ./thinklabsdev/daihathanh-homeCI/ --no-cache \
                                    && docker image push registry.thinklabs.com.vn:5000/daihathanh-home \
                                    && docker service rm daihathanh-home_web || true \
                                    && docker stack deploy -c ./thinklabsdev/daihathanh-homeCI/docker-compose.yml daihathanh-home \
                                    && rm -rf ./thinklabsdev/daihathanh-homeCIB \
                                    && mv ./thinklabsdev/daihathanh-homeCI/ ./thinklabsdev/daihathanh-homeCIB",
                                execTimeout: 1200000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: './thinklabsdev/daihathanh-homeCI',
                                remoteDirectorySDF: false,
                                removePrefix: '',
                                sourceFiles: '*, app/, public/'
                            )],
                        usePromotionTimestamp: false,
                        useWorkspaceInPromotion: false,
                        verbose: false
                    )
                ])
                telegramSend(message: 'Build Job Daihathanh - Home - Web - STATUS: $BUILD_STATUS!', chatId: -740504133)
            }
        }
    }
}