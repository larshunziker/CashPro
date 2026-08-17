#!/usr/bin/env groovy

import groovy.json.JsonSlurperClassic
import org.jenkinsci.plugins.pipeline.modeldefinition.Utils

def dryRun = false

def minuteTimeout = 60

def lagoonLib = null //will have to be loaded in `node` context below

env.PRIMARY_BUILD_JOB_NAME = 'rasch-stack/master'
STAGE_ONLY_BUILD_JOB_NAME = 'rasch-stack-stage-deploy/master'

env.OVERRIDE_BUILD_TARGET_BRANCH = ''
if(env.JOB_NAME == STAGE_ONLY_BUILD_JOB_NAME) {
  env.OVERRIDE_BUILD_TARGET_BRANCH = 'stage'
}

// We capture the exception outside of the retry so that we _don't_ retry on non-caputured exceptions
def runException = null

//This is used to drive the build and push steps
def raschProjects = false


if (thisIsAPullRequest()) {
  raschProjects = determineEnvironmentFromPR(env.CHANGE_TITLE)
} else if (env.OVERRIDE_BUILD_TARGET_BRANCH == 'stage') {
  raschProjects = getEnvironmentsForSpecialMasterStageBuild()
} else {
  raschProjects = determindEnvironmentForNonPRBuild(env.BRANCH_NAME)
}

timeout(time:minuteTimeout, unit: 'MINUTES') {
  
  retry(2) {
    try {
      runJob(raschProjects, dryRun)
    }
    catch(org.jenkinsci.plugins.workflow.steps.FlowInterruptedException ex) {
      print "caught FlowInterruptedException"
      throw new Exception("Attempting to replay")
    }
    catch(exc) {
        print "Caught Generic exception"
        currentBuild.result = 'FAILURE'
        runException = exc
    }
  }

  if(runException != null) {
    throw runException
  }
}


def runJob(raschProjects, dryRun) {

def dryRunEcho = ""
if (dryRun) {
  dryRunEcho = "echo "
}

def podTemplateYaml = getPodTemplateForEnvironments(raschProjects)

podTemplate(
  yaml: podTemplateYaml,
    ) {
  node(POD_LABEL) {

 properties([
  buildDiscarder(logRotator(daysToKeepStr: '30', numToKeepStr: '30')),
  parameters([
    string(name: 'RUN_CD', defaultValue: 'false')
  ])
 ])
 
  withCredentials([
    usernamePassword(credentialsId: 'rasch-harbor-secret', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME'),
    sshUserPrivateKey(keyFileVariable: "LAGOON_CLI_SSH_KEY_FILE", credentialsId: "rasch-lagoon-cli-ssh")
     ]) {
    withEnv(['DOCKER_HOST=tcp://localhost:2375', 'CONTAINER_REPO=rasjenkinstest', 'DOCKER_SERVER=harbor.rasch3.amazee.io']) {

      env.CI_BUILD_TAG = env.BUILD_TAG.replaceAll('%2f','').replaceAll("[^A-Za-z0-9]+", "").toLowerCase()

      // here we're going to determine which branches and/or PRs require CI only builds
      // Rules we're focusing on are
      // If this is master, stage, or develop - presumably we do the full deal
      // If it's a PR, we do CI _unless_ the build is triggered via API call
      // otherwise, it's CI only
      def RUN_CD = false

      def blessedBranches = ["master", "stage", "develop"]
      def isBlessedBranch = blessedBranches.contains(env.BRANCH_NAME)
      def isCDOnCommitEnabled = false
      if(env.CHANGE_TITLE ==~ /.*(Release).*/) {
        isCDOnCommitEnabled = true
      }
      def isCISkipped = true

      if(env.CHANGE_ID) {
        if (currentBuild.number == 1) {
          pullRequest.addLabel("CI")
        }
        for (label in pullRequest.labels) {
          if(label == 'CI') {
            isCISkipped = false;
          }
          if(label == 'CD') {
            isCDOnCommitEnabled = true
          }
        }
      } else{
        isCISkipped = false;
      }

      if(isBlessedBranch || (thisIsAPullRequest() && params.RUN_CD != "false") || isCDOnCommitEnabled) {
        RUN_CD = true
      }
      print "RUN CD"
      print params.RUN_CD


      stage('Preliminary steps') {
        def kickoffStageMaster = (env.OVERRIDE_BUILD_TARGET_BRANCH != 'stage') && env.JOB_NAME == PRIMARY_BUILD_JOB_NAME
        if(kickoffStageMaster) {
          print "Starting stage build - conditions met"
          build quietPeriod: 4, wait: false, propagate: false, job: "${STAGE_ONLY_BUILD_JOB_NAME}", parameters: [string(name: 'OVERRIDE_BUILD_TARGET_BRANCH', value: 'stage')]
        } else {
          print "Not starting stage build - conditions not met"
        }
      }
      
      stage('Checkout Code') {
        container('alpine') {
          def checkout = checkout scm
          env.GIT_COMMIT = checkout["GIT_COMMIT"]
        }
      }
	  


      stage('Load libs and wait for Docker Host') {
        lagoonLib = load "./.lagoon/Jenkinslib.groovy"
		    sleep(60)	    
	    }

      notifySlack()
      
      container('alpine') {
        stage('Build Environment') {
          sh "${dryRunEcho}make ci.up"
        }
        
        stage('Run make ci.persistgraphql') {
          sh "${dryRunEcho}make ci.persistgraphql"
        }
        if(!isCISkipped) {
          parallel(
                  'lint': {
                    stage(RUN_CD && raschProjects != false ? 'Run make ci.cd.lint' : 'Run make ci.lint') {
                      sh RUN_CD && raschProjects != false ? "${dryRunEcho}make ci.cd.lint" : "${dryRunEcho}make ci.lint"
                    }
                  },
                  'test': {
                    stage('Run make ci.test') {
                      sh "${dryRunEcho}make ci.test"
                    }
                  },
          ) //End parallel steps
        }
        stage("Build Images") {
          if(RUN_CD && raschProjects != false) {
            container("alpine") {
              def runningSet = [:]
              def lastMapElementName = null
              def taggedAsRelease = "FALSE"
              if(shouldPostRunStepsBePerformed()) {
                taggedAsRelease = "TRUE"
              }

              for(raschProject in raschProjects) {
                def localRaschProject = raschProject
                runningSet.put(localRaschProject.getArrayIndex(), {
                  echo "Building: " + localRaschProject.getName()
                  setLagoonEnvironmentVariables(localRaschProject.getName())
                  withEnv(localRaschProject.getEnvironmentOverrides()) {
                    def lagoonProject=getLagoonProjectForEnvironment(localRaschProject.getName(), env.BRANCH_NAME)

                    withEnv(["LAGOON_PROJECT=" + lagoonProject]) {
                      withCredentials([
                        usernamePassword(credentialsId: 'aws-querymaps', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')
                      ]) {
                        buildImage(lagoonProject, localRaschProject.getName(), getDockerTagNameForProjectInCurrentEnvironment(lagoonProject), taggedAsRelease, dryRunEcho)
                      }
                    }
                  }
                })
                lastMapElementName = raschProject
              }

              print "Splitting and running buildsets"

              def numberParallelBuilds = 99

              runningSet.keySet().collate(numberParallelBuilds).each {
                def subMap = [:]
                for(k in it) {
                  subMap.put(k, runningSet[k])
                }
                parallel subMap
              }
            }
          } else {
              Utils.markStageSkippedForConditional("Build Images")
          }
        }

        stage("Lagoon Login") {
          if(RUN_CD) {
            lagoonLogin()
            setGitEnvironmentVariables()
          } else {
            Utils.markStageSkippedForConditional("Lagoon Login")
          }
        }

        stage("Publish Images") {
          if(RUN_CD && raschProjects != false) {
            dockerLogin()
            for(raschProject in raschProjects) {
              def localRaschProject = raschProject
              
              echo "Pushing: " + raschProject.getName()
              setLagoonEnvironmentVariables(raschProject.getName())
              withEnv(localRaschProject.getEnvironmentOverrides()) {
                lagoonProject=getLagoonProjectForEnvironment(raschProject.getName(), env.BRANCH_NAME)

                // Note, we push the image _twice_ once to push the build hash, and again to push up as "latest"
                // This allows us to deploy to environments that don't yet have the BUILD_HASH variable set for the
                // latest image
                def buildHash = env.GIT_COMMIT
                retry(4) {
                      pushImageToRepo(lagoonProject, "node", buildHash, dryRunEcho)
                      pushImageToRepo(lagoonProject, "nginx", buildHash, dryRunEcho)
                      pushImageToRepo(lagoonProject,"node", "latest", dryRunEcho)
                      pushImageToRepo(lagoonProject, "nginx", "latest", dryRunEcho)
                }
              }
            }
          } else {
            Utils.markStageSkippedForConditional("Publish Images")
          }
        }

        //we will make use of this to keep track of the deployments we want to see through to deploy
        def waitForEnvironmentDeploys = []

        stage("Deploy Environment") {
          if(RUN_CD && raschProjects != false){
            for(raschProject in raschProjects) {

              echo "Deploying: " + raschProject.getName()
              setLagoonEnvironmentVariables(raschProject.getName())
              def localRaschProject = raschProject
              withEnv(localRaschProject.getEnvironmentOverrides()) {
                def lagoonProject=getLagoonProjectForEnvironment(raschProject.getName(), env.BRANCH_NAME)
                withEnv(["LAGOON_PROJECT=" + lagoonProject]) {
                  def buildHash = env.GIT_COMMIT

                  if(thisIsAPullRequest()) {
                    lagoonSetBuildVariable(lagoonProject, "pr-" + env.CHANGE_ID, "BUILD_HASH", buildHash, dryRunEcho)
                    deployPRBasedEnvironmentForLagoonProject(lagoonProject, env.CHANGE_TITLE, env.CHANGE_ID, env.CHANGE_TARGET, env.CHANGE_BRANCH, env.BASE_BRANCH_REF, env.HEAD_BRANCH_REF, dryRunEcho)
                    def deploymentEnvironment = lagoonLib.getLatestDeploymentForProjectAndEnvironment(lagoonProject, "pr-" + env.CHANGE_ID, dryRunEcho)
                  } else {
                    if(env.OVERRIDE_BUILD_TARGET_BRANCH == 'stage') {
                      lagoonSetBuildVariable(lagoonProject, env.BRANCH_NAME, "BUILD_HASH", buildHash, dryRunEcho)
                      deployBranchBasedEnvironmentForLagoonProjectBySHA(lagoonProject, env.BRANCH_NAME, buildHash, dryRunEcho)
                      def deploymentEnvironment = lagoonLib.getLatestDeploymentForProjectAndEnvironment(lagoonProject, env.BRANCH_NAME, dryRunEcho)
                    } else {
                      lagoonSetBuildVariable(lagoonProject, env.BRANCH_NAME, "BUILD_HASH", buildHash, dryRunEcho)
                      deployBranchBasedEnvironmentForLagoonProject(lagoonProject, env.BRANCH_NAME, dryRunEcho)
                      def deploymentEnvironment = lagoonLib.getLatestDeploymentForProjectAndEnvironment(lagoonProject, env.BRANCH_NAME, dryRunEcho)
                    }
                  }
                }
              }
            }

          } else {
            Utils.markStageSkippedForConditional("Deploy Environment")
          }
        }

    } //end container('alpine')
    container('alpine') {
      try {
        stage('Clean Up') {
          sh "${dryRunEcho}make ci.down"
        }
      } catch (error) {
        echo "cleanup failed"
      }
    }

  notifySlack(currentBuild.result)

      } //end withenv
    } //end withCredentials
  } //end node(label)
 }//end podTemplate
}

def shouldPostRunStepsBePerformed() {
  if(thisIsAPullRequest()) {
    println "CALCULATING RELEASE"
    println "CHANGE_TITLE" + env.CHANGE_TITLE
    if(env.CHANGE_TITLE ==~ /(^Release\/).*/) {
      println "MATCHES"
      return true
    } else {
      println "NO MATCH"
    }

    def ret = false
    def labels = getLabelsForPR()
    labels.each { value ->
       if(value.toString() == "release") {
         ret = true
       }
      }
    return ret
  }
}

def getLabelsForPR() {
  withCredentials([usernamePassword(credentialsId: 'poleposition-jenkins-github-secret', passwordVariable: 'PP_PASSWORD', usernameVariable: 'PP_USER')]) {
  return lagoonLib.getLabelsForGithubRepoPR("rasch-dtc", "rasch-stack",env.CHANGE_ID, env.PP_USER, env.PP_PASSWORD)
  }
}

class RasEnvironment {
  String envName
  List<String> environmentOverridesList

  public RasEnvironment(String name, List<String> envOverrides = []) {
    this.envName = name
    this.environmentOverridesList  = envOverrides
  }

  public getArrayIndex() {
    def tail = ""
    if(this.environmentOverridesList.size() > 0) {
      tail = "-" + this.environmentOverridesList.join("-")
    }

    return this.envName + tail
  }

  public getName() {
    return this.envName
  }

  public getEnvironmentOverrides() {
    return this.environmentOverridesList
  }
}

def getPodTemplateForEnvironments(raschProjects) {
  
  def numEnvironments = 1
  if(raschProjects != false) {
    numEnvironments = raschProjects.size()
  } 
  

  echo "Found " + numEnvironments + " Projects"

  switch(numEnvironments) {
    //numberMilliCores = 6000
    //numberGiMemory = 12
    //numberCPUs = 8
    //break;
  case 1:
  case 2:
  case 3:
  case 4:
    numberMilliCores = 12000
    numberGiMemory = 24
    numberCPUs = 16
    break;
  default:
    numberMilliCores = 24000
    numberGiMemory = 48
    numberCPUs = 36
    break;
} 

return """
kind: Pod
apiVersion: v1
metadata:
  labels:
    rasch.dev/jenkinsBuildPod: 'true'
  annotations:
    cluster-autoscaler.kubernetes.io/safe-to-evict: 'false'
spec:
  affinity:
    podAntiAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        - labelSelector: # make sure no other build pod is running on the same compute node
            matchExpressions:
              - key: rasch.dev/jenkinsBuildPod
                operator: In
                values:
                  - 'true' 
          topologyKey: kubernetes.io/hostname
  volumes:
    - name: docker-lib
      emptyDir: {}
  containers:
    - name: alpine
      image: 'imagecache.amazeeio.cloud/algmprivsecops/jenkins-compose-lagooncli:v1.2'
      command:
        - cat
      resources:
        requests:
          cpu: 100m
          memory: 200Mi
      securityContext:
        privileged: false
      tty: true
    - name: dindcontainer
      image: 'imagecache.amazeeio.cloud/library/docker:27.0.2-dind'
      args: ["--registry-mirror=https://imagecache.amazeeio.cloud"]
      env:
        - name: DOCKER_TLS_CERTDIR
      resources:
        requests:
          cpu: ${numberMilliCores}m
          memory: ${numberGiMemory}Gi
      volumeMounts:
        - name: docker-lib
          mountPath: /var/lib/docker
      securityContext:
        privileged: true
      tty: true
  nodeSelector:
    lagoon.sh/build: allowed
    lagoon.sh/cpus: "${numberCPUs}"
  tolerations:
    - key: lagoon.sh/build
      operator: Exists
      effect: NoSchedule
    - key: lagoon.sh/spot
      operator: Exists
      effect: NoSchedule
"""
}

def determindEnvironmentForNonPRBuild(String branchName) {
  environments = []
  if(branchName == "master" || branchName == "develop" || branchName == "stage") {
    environments.add(new RasEnvironment("beobachter"))
    environments.add(new RasEnvironment("cash"))
    environments.add(new RasEnvironment("gaultmillau"))
  }

  return environments
}


def getEnvironmentsForSpecialMasterStageBuild() {
  environments = []
  environments.add(new RasEnvironment("beobachter", ["BRANCH_NAME=stage","LAGOON_GIT_BRANCH=stage"]))
  environments.add(new RasEnvironment("cash", ["BRANCH_NAME=stage","LAGOON_GIT_BRANCH=stage"]))
  environments.add(new RasEnvironment("gaultmillau", ["BRANCH_NAME=stage","LAGOON_GIT_BRANCH=stage"]))

  return environments
}

def determineEnvironmentFromPR(String prname) {

  environments = []

  //beobachter

  if(prname ==~ /(^PNT-|^DTCPP-|^RAS-|^DTC-|^AD-|^RDP-|^BEO-|.*\[BEO\]).*/) {
    environments.add(new RasEnvironment("beobachter"))
  }

  //cash

  if(prname ==~ /(^PNT-|^DTCPP-|^RAS-|^DTC-|^AD-|^RDP-|^CASH-|.*\[CASH\]).*/) {
    environments.add(new RasEnvironment("cash"))
  }

  //gaultmillau
  if(prname ==~ /(^PNT-|^DTCPP-|^RAS-|^DTC-|^AD-|^RDP-|^GM-|.*\[GM\]).*/) {
    environments.add(new RasEnvironment("gaultmillau"))
  }

  if( environments.size() == 0) {
    return false
  }
  return environments
}

def getLagoonProjectForEnvironment(String environmentName, String branchName) {
  switch(environmentName) {
    case "beobachter":
      switch(branchName) {
        case "master":
          return "beobachter-k8s-prod"
        break
        default:
          return "beobachter-k8s"
        break
      }
    break
    case "cash":
      switch(branchName) {
        case "master":
          return "cash-k8s-prod"
        break
        default:
          return "cash-k8s"
        break
      }
    break
    case "gaultmillau":
      switch(branchName) {
        case "master":
          return "gaultmillau-k8s-prod"
        break
        default:
          return "gaultmillau-k8s"
        break
      }
    break
  }
}


def setGitEnvironmentVariables() {

  if(thisIsAPullRequest()) {
    env.BASE_BRANCH_REF = sh (
      script: 'git rev-parse origin/$CHANGE_TARGET',
      returnStdout: true
    ).trim()

    env.HEAD_BRANCH_REF = sh (
      script: 'git rev-parse origin/$BRANCH_NAME',
      returnStdout: true
    ).trim()
  }
}

def setLagoonEnvironmentVariables(projectName) {

    def lagoonProject = projectName

    def lagoonBuildType = "branch"
    if(thisIsAPullRequest()) {
        lagoonBuildType = "pullrequest"
    }

    def lagoonGitBranch = env.BRANCH_NAME
    if(thisIsAPullRequest()) {
        lagoonGitBranch = env.CHANGE_BRANCH
    }

    def prTitle = ""
    if(thisIsAPullRequest()) {
        prTitle = env.CHANGE_TITLE
    }

    def lagoonBaseBranch = ""
    if(thisIsAPullRequest()) {
        lagoonBaseBranch = env.CHANGE_TARGET
    }


    env.LAGOON_PROJECT = lagoonProject
    env.LAGOON_GIT_BRANCH = lagoonGitBranch
    env.LAGOON_BUILD_TYPE = lagoonBuildType
    env.LAGOON_PR_BASE_BRANCH = lagoonBaseBranch
    env.LAGOON_PR_TITLE = prTitle
    env.LAGOON_PR_HEAD_BRANCH = lagoonGitBranch
}

// Harbor interaction functions follow
def dockerLogin() {
  sh "docker login -u$DOCKER_USERNAME -p$DOCKER_PASSWORD $DOCKER_SERVER"
}

def pushImageToRepo(projectName, imageName, tag = "latest", dryRunEcho) {
  env.buildProjectName = projectName
  env.buildTagName = tag
  env.imageName = imageName
  env.DOCKER_PUSH_BRANCH_NAME = env.BRANCH_NAME.toLowerCase()
  targetImageName = "${buildProjectName}_${imageName}:latest"
  sh """
  image=\$(docker images $targetImageName --format="{{.ID}}")
	${dryRunEcho}docker tag \$image \$DOCKER_SERVER/\$buildProjectName/\$DOCKER_PUSH_BRANCH_NAME/\$imageName:\$buildTagName
  ${dryRunEcho}docker push \$DOCKER_SERVER/\$buildProjectName/\$DOCKER_PUSH_BRANCH_NAME/\$imageName:\$buildTagName
  """
}


def buildImage(lagoonProject, raschProject, tag, buildTaggedAsRelease = "FALSE", dryRunEcho) {
  sh """
    ${dryRunEcho}docker-compose --project-name=${lagoonProject} build --build-arg RASCH_PROJECT=${raschProject} --build-arg LAGOON_GIT_BRANCH=\"$LAGOON_GIT_BRANCH\" --build-arg LAGOON_BUILD_TYPE=\"$LAGOON_BUILD_TYPE\" --build-arg LAGOON_PR_TITLE=\"$LAGOON_PR_TITLE\" --build-arg LAGOON_PR_BASE_BRANCH=\"$LAGOON_PR_BASE_BRANCH\" --build-arg BUILD_TAGGED_AS_RELEASE=${buildTaggedAsRelease} --build-arg LAGOON_PR_HEAD_BRANCH=\"$LAGOON_PR_HEAD_BRANCH\" --build-arg AWS_ACCESS_KEY_ID=\"$AWS_ACCESS_KEY_ID\" --build-arg AWS_SECRET_ACCESS_KEY=\"$AWS_SECRET_ACCESS_KEY\"
  """
}


def getDockerTagNameForProjectInCurrentEnvironment(projectName) {
  if(thisIsAPullRequest()) {
    return env.BRANCH_NAME.toLowerCase()
  }
  return env.BRANCH_NAME
}


//Lagoon interaction functions follow

def getLagoonProjectList() {
  projectList = sh (
    script: "lagoon list projects --output-json",
    returnStdout: true
  )
  def jsonSlurper = new JsonSlurperClassic()
  def dataoutput = jsonSlurper.parseText(projectList)
  def projects = []

  dataoutput['data'].each { value ->
    projects.add(value['projectname'])
  }
 return projects
}


def getLagoonProjectEnvironmentList(project) {
  environmentList = sh (
    script: "lagoon list environments --project=${project} --output-json",
    returnStdout: true
  )
  def jsonSlurper = new JsonSlurperClassic()
  def dataoutput = jsonSlurper.parseText(environmentList)

  def environments = []

  dataoutput['data'].each { value ->
    environments.add(value['name'])
  }

 return environments
}


def lagoonLogin() {
  sh "lagoon -i $LAGOON_CLI_SSH_KEY_FILE login --force"
}

def lagoonSetBuildVariable(project, environment, name, value, dryRunEcho) {
  if(doesEnvironmentExist(project, environment)) {
    if(sh(script:"lagoon list variables -p ${project} -e ${environment} --output-json | grep -q ${name}", returnStatus: true) == 0) {
      if(sh(script: "${dryRunEcho}lagoon delete variable -p ${project} -e ${environment} -N ${name} --force", returnStatus: true) != 0) {
        error("Unable to delete Lagoon variable '${name}' - failing build")
      }
    }
    
    if(sh(script: "${dryRunEcho}lagoon add variable -p ${project} -e ${environment} -S build -N ${name} -V '${value}'", returnStatus: true) != 0) {
      error("Unable to add Lagoon variable '${name}' - failing build")
    }
  }
}

def doesEnvironmentExist(project, environment) {
  return getLagoonProjectEnvironmentList(project).contains(environment)
}

/**
* returns true if environment created/deployed, false if otherwise
*/
def deployBranchBasedEnvironmentForLagoonProject(project, environmentName, dryRunEcho) {
  return sh (
      script: "${dryRunEcho}lagoon deploy branch --project=${project} -b ${environmentName} --force --output-json",
      returnStatus: true
    ) == 0
}


def deployPRBasedEnvironmentForLagoonProject(project, title, prNumber, baseBranchName, headBranchName, baseBranchRef, headBranchRef, dryRunEcho) {
    return sh (
      script: """${dryRunEcho}lagoon deploy pullrequest --project=${project} -t "${title}" -n ${prNumber} --baseBranchName="${baseBranchName}" --headBranchName="${headBranchName}" --baseBranchRef="${baseBranchRef}" --headBranchRef="${headBranchRef}" --force --output-json""",
      returnStatus: true
    ) == 0
}

def deployBranchBasedEnvironmentForLagoonProjectBySHA(project, environmentName, SHA, dryRunEcho) {
  return sh (
      script: "${dryRunEcho}lagoon deploy branch --project=${project} -b ${environmentName} -r ${SHA} --force --output-json",
      returnStatus: true
    ) == 0
}

// Miscillaneous functions follow

def thisIsAPullRequest() {
  if (env.CHANGE_ID) {
   return true
  }
  return false
}

def notifySlack(String buildStatus = 'STARTED') {
    // Build status of null means success.
    buildStatus = buildStatus ?: 'SUCCESS'

    def color

    if (buildStatus == 'STARTED') {
        color = '#68A1D1'
    } else if (buildStatus == 'SUCCESS') {
        color = '#BDFFC3'
    } else if (buildStatus == 'UNSTABLE') {
        color = '#FFFE89'
    } else {
        color = '#FF9FA1'
    }

    def msg = "${buildStatus}: `${env.JOB_NAME}` #${env.BUILD_NUMBER}:\n${env.BUILD_URL}"

    // slackSend(color: color, message: msg, channel: 'ras-ci', teamDomain: 'amazee', token: 'xFWAhjdCiXO26K7KXMsBwGT4')
}
